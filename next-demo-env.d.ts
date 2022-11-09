import React from 'react';

declare global {
    interface Window {
        ethereum?: {
            isMetaMask?: true;
            on?: (...args: any[]) => void;
            removeListener?: (...args: any[]) => void;
            autoRefreshOnNetworkChange?: boolean;
            request?: (a: any) => any;
        };
        web3?: Record<string, unknown>;
    }
}
