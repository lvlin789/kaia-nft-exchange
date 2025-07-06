'use client';

import '@rainbow-me/rainbowkit/styles.css';

import type React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { createConfig, http } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { kaia } from 'wagmi/chains'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  rainbowWallet,
  walletConnectWallet,
  okxWallet,
  metaMaskWallet,
  kaiaWallet
} from '@rainbow-me/rainbowkit/wallets';


const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_REOWN_API_KEY!

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [rainbowWallet, walletConnectWallet, okxWallet,metaMaskWallet, kaiaWallet],
    },
  ],
  {
    appName: 'KAIA',
    projectId: projectId,
  }
);

const config = createConfig({
  chains: [kaia],
  connectors,
  transports: {
    [kaia.id]: http(),
  },
})

export function RainbowKit({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
