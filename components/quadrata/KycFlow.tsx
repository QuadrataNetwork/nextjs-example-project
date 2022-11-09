import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { Container } from '../../pages';
import { CustomLoader } from '../CustomLoader';
import { StyledQuadrataKyc } from '../styled/QuadrataKyc.styled';
import { JsonRpcSigner, TransactionResponse, Web3Provider } from '@ethersproject/providers';
import { Page, PageError, QuadPassportOnMintClickEventHandler, QuadrataIssuer } from '@quadrata/kyc-react';

// Quadrata Passport
import { QuadPassport } from '@quadrata/contracts/types/QuadPassport';
import QUAD_PASSPORT_ABI from '@quadrata/contracts/abis/QuadPassport.json';
const QUAD_PASSPORT_ADDRESS = '0xF4d4F629eDD73680767eb7b509C7C2D1fE551522';

// Issuers credentials
const quadrataIssuers = {
    // Contact SpringLabs.com to request a testnet API key and a backend URL.
    [QuadrataIssuer.SPRINGLABS]: {
        API_URL: process.env.NEXT_PUBLIC_SPRINGLABS_API_URL!,
        API_KEY: process.env.NEXT_PUBLIC_SPRINGLABS_API_KEY!,
    },
    // Contact Cred Protocol Inc. to request credentials.
    [QuadrataIssuer.CRED]: {
        API_URL: process.env.NEXT_PUBLIC_CRED_API_URL!,
        API_KEY: process.env.NEXT_PUBLIC_CRED_API_KEY!,
    },
};

enum ErrorType {
    INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
    OTHER = 'OTHER',
}

const generateErrorMessage = (error?: ErrorType) => {
    if (error) return error === ErrorType.INSUFFICIENT_FUNDS ? 'Insufficient funds' : 'Something went wrong';
};

export const KycFlow: React.FC = () => {
    // State
    const [signer, setSigner] = useState<JsonRpcSigner>();
    const [account, setAccount] = useState<string>();
    const [chainId, setChainId] = useState<number>();
    const [provider, setProvider] = useState<Web3Provider>();
    const [signature, setSignature] = useState<string>();
    const [errorType, setErrorType] = useState<ErrorType>();
    const [mintComplete, setMintComplete] = useState<boolean>(false);
    const [transactionHash, setTransactionHash] = useState<string>();

    // Listening to provider changes
    useEffect(() => {
        if (window?.ethereum?.on) {
            window.ethereum.on('accountsChanged', function (accounts: string[]) {
                setAccount(accounts[0]);
                console.log('changed account to: ', accounts[0]);
            });
            window.ethereum.on('chainChanged', function (chainIdHex: string) {
                // converting hexadecimal chainId to decimal
                const chainId = parseInt(chainIdHex, 16);
                setChainId(chainId);
                console.log('chain changed to: ', chainId);
            });
        }
    }, []);

    // Event Handlers
    const handleConnectWalletClick = async () => {
        // Connecting ethereum injected provider (you may use any other provider)
        const provider = new ethers.providers.Web3Provider(window.ethereum as any, 'any');
        setProvider(provider);

        // Getting current chainId
        const chainId = await provider.getNetwork().then((res) => res.chainId);
        setChainId(chainId);

        // Getting account address & signer.
        provider.send('eth_requestAccounts', []).then(() => {
            const signer = provider.getSigner();
            setSigner(signer);
            signer.getAddress().then((address) => {
                setAccount(address);
            });
        });
    };

    const handleSign = async (message: string) => {
        // User clicked the initial sign button
        // Signing the message and updating state.
        // kyc form will automatically navigate to the next step upon signature update
        if (signer && account) {
            const signature = await signer.signMessage(message);
            setSignature(signature);
        }
    };

    const handlePageChange = (page: Page | PageError) => {
        if (page === Page.INTRO && signature) {
            // Intro page navigation will get triggered when a different wallet is detected,
            // Resetting previous signature if present
            setSignature(undefined);
        }
    };

    const handleMintClick: QuadPassportOnMintClickEventHandler = async ({
        fee,
        params,
        signatures,
        signaturesIssuers,
    }) => {
        // User clicked Approve & Mint Passport button
        // the parameters that are being passed to this function is all you need to mint the passport on chain

        // Resetting errors in case it's a retry
        setErrorType(undefined);

        // QuadPassport contract interface (you may use any provider or library to interact with the blockchain)
        const quadPassportContract = new ethers.Contract(
            QUAD_PASSPORT_ADDRESS,
            QUAD_PASSPORT_ABI,
            provider,
        ) as QuadPassport;

        if (signer) {
            try {
                // Minting passport
                const transaction: TransactionResponse = await quadPassportContract
                    .connect(signer)
                    .setAttributesBulk(params, signaturesIssuers, signatures, { value: fee });
                // Setting the transaction hash prop (required)
                // When defined, the from will automatically navigate to the "minting in progress" page
                // the tx hash will be added to the "View in Etherscan" link
                setTransactionHash(transaction.hash);
                transaction
                    .wait()
                    .then((receipt) => {
                        // Setting the mintComplete prop to true (required)
                        // The form will automatically navigate to the last page.
                        console.log('Passport minted successfully...', receipt);
                        setErrorType(undefined);
                        setMintComplete(true);
                    })
                    .catch((error) => {
                        // Setting the mintComplete prop to false
                        // You may handle errors here
                        console.error('Passport minting failed, ', error);
                        setErrorType(ErrorType.OTHER);
                        setMintComplete(false);
                    });
            } catch (e: any) {
                // Catching insufficient funds error
                if (e && e.code === ErrorType.INSUFFICIENT_FUNDS) {
                    setErrorType(ErrorType.INSUFFICIENT_FUNDS);
                } else {
                    // Caching any other errors here
                    setErrorType(ErrorType.OTHER);
                }
            }
        } else {
            setErrorType(ErrorType.OTHER);
            console.error('Missing required params to mint: ', { signer });
        }
    };

    const error = generateErrorMessage(errorType);

    return (
        <>
            {account && chainId ? (
                <StyledQuadrataKyc
                    error={error}
                    onSign={handleSign}
                    issuers={quadrataIssuers}
                    chainId={chainId}
                    account={account}
                    signature={signature}
                    onMintClick={handleMintClick}
                    mintComplete={mintComplete}
                    onPageChange={handlePageChange}
                    transactionHash={transactionHash}
                >
                    <CustomLoader />
                </StyledQuadrataKyc>
            ) : (
                <Container>
                    <h1>Please connect your wallet</h1>
                    <button onClick={handleConnectWalletClick}>Connect wallet</button>
                </Container>
            )}
        </>
    );
};
