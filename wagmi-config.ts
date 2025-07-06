import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { kaia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "KAIA",
  projectId: process.env.REOWN_API_KEY || "3a4857733afd04b4cd65be32a2ea78b8",
  chains: [kaia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

