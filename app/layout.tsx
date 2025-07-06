import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { RainbowKit } from "@/providers/RainbowKit";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Official Kaia Chain Anniversary Airdrop - Claim Your Commemorative Tokens",
  description:
    "Official Kaia anniversary airdrop initiative. Exchange your exclusive Kaia Chain Anniversary NFTs for commemorative Kaia tokens. Limited time anniversary celebration event.",
  keywords: "Kaia, anniversary, airdrop, NFT, blockchain, commemorative, tokens, official, celebration",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RainbowKit>{children}</RainbowKit>
      </body>
    </html>
  )
}
