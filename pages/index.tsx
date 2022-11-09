import styled from 'styled-components';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

export const Container = styled.div`
    text-align: center;
    font-family: sans-serif;

    & button {
        padding: 0.5rem;
        margin: 0.5rem;
    }
`;

const TestApp: NextPage = () => {
    const router = useRouter();
    return (
        <Container>
            <h1>Quadrata Passport Example App</h1>
            <p>Example of how to implement and mint passports</p>
            <button onClick={() => router.push('/kyc')}>Example for KYC flow only</button>
            <button onClick={() => router.push('/kyb')}>Example for KYB flow only</button>
            <button onClick={() => router.push('/all')}>Example for both KYC & KYB flow</button>
        </Container>
    );
};

export default TestApp;
