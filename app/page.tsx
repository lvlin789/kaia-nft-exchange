"use client"

import { useState,useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Gift, Shield, CheckCircle, Star, Trophy } from "lucide-react"
import WalletModal from "./components/WalletModal"
import ExchangeModal from "./components/ExchangeModal"
import CountdownTimer from "./components/CountdownTimer"
import Image from "next/image"
import { useAccount } from 'wagmi'

export default function Home() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const handleWalletConnect = (walletName: string, address: string) => {
    setConnectedWallet(walletName)
    setWalletAddress(address)
    setIsWalletModalOpen(false)
  }

  const handleDisconnect = () => {
    setConnectedWallet(null)
    setWalletAddress(null)
  }

  const {address,connector} = useAccount()

  useEffect(() => {
    if (address) {
      setConnectedWallet(address)
      setWalletAddress(address)
    }
  }, [address])

  

  return (
    <div className="min-h-screen bg-[#040404] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#040404]/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* <div className="w-8 h-8 md:w-10 md:h-10 bg-[#bff009] rounded-lg md:rounded-xl flex items-center justify-center"> */}
              {/* <Gift className="w-4 h-4 md:w-6 md:h-6 text-[#040404]" /> */}
            {/* </div> */}
              <Image src="/kaia-logo.svg" alt="Kaia Logo" width={32} height={32} />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-white">Kaia Chain Anniversary</h1>
              <p className="text-xs text-[#bff009] font-medium">Official Airdrop</p>
            </div>
          </div>

          {walletAddress ? (
            <div className="flex items-center space-x-2 md:space-x-3">
              
              <span className="text-xs md:text-sm text-gray-400 hidden md:inline">
                {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent text-xs md:text-sm px-2 md:px-3"
              >
                <span className="hidden sm:inline">Disconnect</span>
                <span className="sm:hidden">×</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsWalletModalOpen(true)}
              className="bg-[#bff009] text-[#040404] hover:bg-[#bff009]/90 font-semibold text-sm md:text-base px-3 md:px-4"
            >
              <Wallet className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Connect Wallet</span>
              <span className="sm:hidden">Connect</span>
            </Button>
          )}
        </div>
      </header>

      {/* Airdrop Claim Interface - Prominently positioned at top */}
      <section className="py-6 md:py-8 px-4 bg-gradient-to-r from-[#040404] via-gray-900 to-[#040404]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center text-white mb-6 md:mb-8">
            <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-[#bff009]" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Anniversary Airdrop</h2>
            </div>
            <p className="text-lg md:text-xl text-gray-300 mb-4 md:mb-6 px-2">
              Claim your commemorative Kaia tokens by exchanging your Anniversary NFTs
            </p>
            <CountdownTimer />
          </div>

          <Card className="border-2 border-[#bff009]/20 shadow-2xl bg-gray-900/50 backdrop-blur-sm mx-2 md:mx-0">
            <CardHeader className="text-center px-4 md:px-6 py-4 md:py-6">
              <CardTitle className="text-xl md:text-2xl text-white flex items-center justify-center space-x-2">
                <Gift className="w-5 h-5 md:w-6 md:h-6 text-[#bff009]" />
                <span>Claim Your Airdrop</span>
              </CardTitle>
              <CardDescription className="text-gray-400 text-sm md:text-base">
                Exchange your Kaia Chain Anniversary NFTs for 1,000 KAIA tokens each
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6 pb-4 md:pb-6">
              {!connectedWallet ? (
                <div className="text-center py-6 md:py-8">
                  <Wallet className="w-12 h-12 md:w-16 md:h-16 text-gray-600 mx-auto mb-3 md:mb-4" />
                  <h4 className="text-lg font-medium text-white mb-2">Connect Your Wallet</h4>
                  <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base px-2">
                    Connect your wallet to view and claim your anniversary airdrop
                  </p>
                  <Button
                    onClick={() => setIsWalletModalOpen(true)}
                    size="lg"
                    className="bg-[#bff009] text-[#040404] hover:bg-[#bff009]/90 font-semibold w-full sm:w-auto"
                  >
                    <Wallet className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Connect Wallet
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between p-3 md:p-4 bg-[#bff009]/10 rounded-lg border border-[#bff009]/20">
                    <div>
                      <div className="font-medium text-white text-sm md:text-base">Wallet Connected</div>
                      <div className="text-xs md:text-sm text-gray-400">{connectedWallet}</div>
                    </div>
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#bff009]" />
                  </div>

                  <div className="bg-gradient-to-r from-[#bff009]/10 to-[#bff009]/5 p-4 md:p-6 rounded-lg border border-[#bff009]/20">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-[#bff009] mb-2">1,000 KAIA</div>
                      <div className="text-gray-400 mb-3 md:mb-4 text-sm md:text-base">per Anniversary NFT</div>
                      <div className="text-xs md:text-sm text-[#bff009] bg-[#bff009]/10 px-2 md:px-3 py-1 rounded-full inline-block border border-[#bff009]/30">
                        Official Kaia Anniversary Airdrop
                      </div>
                    </div>
                  </div>

                  <div className="text-center py-3 md:py-4">
                    <div className="text-lg font-medium text-white mb-2">Ready to Claim</div>
                    <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base px-2">
                      Click below to start claiming your anniversary airdrop tokens
                    </p>
                    <Button
                      onClick={() => setIsExchangeModalOpen(true)}
                      size="lg"
                      className="bg-[#bff009] text-[#040404] hover:bg-[#bff009]/90 font-semibold w-full sm:w-auto"
                    >
                      <Gift className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Claim Airdrop
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4 md:mb-6">
              <Star className="w-6 h-6 md:w-8 md:h-8 text-[#bff009]" />
              <Badge
                variant="outline"
                className="bg-[#bff009]/10 text-[#bff009] border-[#bff009]/30 text-xs md:text-sm px-2 md:px-3 py-1"
              >
                Official Kaia Initiative
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 px-2">
              Celebrating
              <span className="text-[#bff009]"> Kaia Chain's Anniversary</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 px-2">
              As part of our anniversary celebration, Kaia is proud to present this commemorative airdrop. Exchange your
              exclusive Anniversary NFTs for Kaia tokens and be part of our blockchain journey.
            </p>
            <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-[#bff009]">
                <Shield className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base">Official Kaia Airdrop</span>
              </div>
              <div className="flex items-center space-x-2 text-[#bff009]">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base">Commemorative Event</span>
              </div>
              <div className="flex items-center space-x-2 text-[#bff009]">
                <Gift className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base">Limited Time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anniversary Details */}
      <section className="py-12 px-4 bg-gray-900/30">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-center text-white mb-8">Anniversary Airdrop Details</h3>
          <div className="max-w-3xl mx-auto">
            <Card className="border-[#bff009]/20 hover:shadow-lg transition-shadow bg-gray-900/50">
              <CardHeader className="text-center">
                <CardTitle className="text-[#bff009] flex items-center justify-center space-x-2">
                  <Trophy className="w-6 h-6" />
                  <span>Kaia Anniversary NFT Airdrop</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Exclusive commemorative token distribution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-[#bff009]/10 rounded-lg border border-[#bff009]/20">
                    <div className="text-2xl font-bold text-[#bff009] mb-2">1,000 KAIA</div>
                    <div className="text-gray-400">per Anniversary NFT</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="text-2xl font-bold text-[#bff009] mb-2">Limited Time</div>
                    <div className="text-gray-400">Anniversary Event Only</div>
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                  <div className="text-sm text-[#bff009] font-medium mb-2">Eligibility</div>
                  <div className="text-gray-400">
                    Only holders of official Kaia Chain Anniversary NFTs are eligible for this commemorative airdrop
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-center text-white mb-8 md:mb-12">
            Why This Anniversary Airdrop?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#bff009] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-[#040404]" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Commemorative Celebration</h4>
              <p className="text-gray-400 text-sm md:text-base px-2">
                Celebrating Kaia Chain's milestone anniversary with our community through this special airdrop event
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#bff009] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Gift className="w-6 h-6 md:w-8 md:h-8 text-[#040404]" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Community Rewards</h4>
              <p className="text-gray-400 text-sm md:text-base px-2">
                Rewarding our loyal community members who hold Anniversary NFTs with Kaia tokens
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#bff009] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-[#040404]" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Official & Secure</h4>
              <p className="text-gray-400 text-sm md:text-base px-2">
                Official Kaia initiative with secure smart contracts and verified authenticity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {/* <div className="w-8 h-8 bg-[#bff009] rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 text-[#040404]" />
            </div> */}
              <Image src="/kaia-logo.svg" alt="Kaia Logo" width={32} height={32} />

            <h1 className="text-xl font-bold text-white">Kaia Chain Anniversary</h1>
          </div>
          <p className="text-gray-400 mb-6">Official anniversary airdrop initiative by Kaia</p>
          <div className="text-sm text-gray-500">
            © 2024 Kaia. All rights reserved. | Official Anniversary Airdrop Event
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />

      <ExchangeModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        walletAddress={walletAddress}
      />
    </div>
  )
}
