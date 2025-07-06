"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, X, Wallet } from "lucide-react";
import Image from "next/image";
import { useAccount, useConnect } from "wagmi";
import { WalletButton } from "@rainbow-me/rainbowkit";

import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletName: string, address: string) => void;
}

const wallets = [
  {
    name: "Kaia Wallet",
    icon: "🌊",
    description: "Official Kaia wallet",
    featured: true,
    bgColor: "bg-[#bff009]",
    textColor: "text-[#040404]",
  },
  {
    name: "OKX Wallet",
    icon: "⭕",
    description: "Multi-chain wallet",
    featured: false,
    bgColor: "bg-gray-700 hover:bg-gray-600",
    textColor: "text-white",
  },
  {
    name: "Klip",
    icon: "📱",
    description: "Kakao blockchain wallet",
    featured: false,
    bgColor: "bg-blue-600 hover:bg-blue-500",
    textColor: "text-white",
  },
  {
    name: "MetaMask",
    icon: "🦊",
    description: "Popular Ethereum wallet",
    featured: false,
    bgColor: "bg-orange-500 hover:bg-orange-400",
    textColor: "text-white",
  },
  {
    name: "RainbowKit",
    icon: "🌈",
    description: "Beautiful wallet connection",
    featured: false,
    bgColor: "bg-gray-700 hover:bg-gray-600",
    textColor: "text-white",
  },
];

export default function WalletModal({
  isOpen,
  onClose,
  onConnect,
}: WalletModalProps) {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  const [connecting, setConnecting] = useState<string | null>(null);


    const handleConnect = async (walletName: string) => {
    setConnecting(walletName)

    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock address
    const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`

    setConnecting(null)
    onConnect(walletName, mockAddress)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[95vw] max-w-[420px] bg-[#121313] border-gray-700 mx-auto p-0 gap-0 rounded-3xl">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#121313] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Connect Wallet
            </h2>
            <p className="text-gray-400 text-sm">
              Choose your preferred wallet
            </p>
          </div>
        </div>

        {/* Wallet Options */}
        <div className="px-6 pb-6 space-y-4">
          {/* Featured Kaia Wallet */}

          <WalletButton.Custom wallet="kaia">
            {({ ready, connect }) => {
              return (
                <Button
                  variant="outline"
                  className="w-full h-12 bg-transparent  text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 rounded-2xl font-medium text-base"
                  disabled={!ready}
                  onClick={connect}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Image
                      src="https://docs.kaiawallet.io/img/symbol-light.svg"
                      alt="Metamask Icon"
                      width={24}
                      height={24}
                    />
                    <span>KAIA</span>
                  </div>
                </Button>
              );
            }}
          </WalletButton.Custom>

          <WalletButton.Custom wallet="okx">
            {({ ready, connect }) => {
              return (
                <Button
                  variant="outline"
                  className="w-full h-12 bg-transparent  text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 rounded-2xl font-medium text-base"
                  disabled={!ready}
                  onClick={connect}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Image
                      src="https://docs.kaiawallet.io/img/symbol-light.svg"
                      alt="Metamask Icon"
                      width={24}
                      height={24}
                    />
                    <span>OKX</span>
                  </div>
                </Button>
              );
            }}
          </WalletButton.Custom>

          <Button
            variant="outline"
            className="w-full h-12 bg-transparent  text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 rounded-2xl font-medium text-base"
            disabled={connecting !== null}
          >
            <div className="flex items-center justify-center space-x-3">
              <Wallet className="w-5 h-5" />
              <span>Klip</span>
            </div>
          </Button>

         

          <WalletButton.Custom wallet="metaMask">
            {({ ready, connect }) => {
              return (
                <Button
                  variant="outline"
                  className="w-full h-12 bg-transparent  text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 rounded-2xl font-medium text-base"
                  disabled={!ready}
                  onClick={() => {
                    setConnecting("MetaMask");
                    onClose();
                    connect().then(() => {
                      onConnect("MetaMask", address || "");
                    });
                  }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Image
                      src="https://docs.kaiawallet.io/img/symbol-light.svg"
                      alt="Metamask Icon"
                      width={24}
                      height={24}
                    />
                    <span>Metamask</span>
                  </div>
                </Button>
              );
            }}
          </WalletButton.Custom>

          <Button
            variant="outline"
            className="w-full h-12 bg-transparent  text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 rounded-2xl font-medium text-base"
            disabled={connecting !== null}
            onClick={() => {
              openConnectModal?.();
              onClose();
            }}
          >
            <div className="flex items-center justify-center space-x-3">
              <Wallet className="w-5 h-5" />
              <span>Other Wallets</span>
            </div>
          </Button>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-center text-xs text-gray-500">
            By connecting a wallet, you agree to our Terms of Service
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
