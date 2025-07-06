import { and, eq, desc } from "drizzle-orm";
import db from "./db";
import { tokensTable } from "@/schema/TokensTableSchema";

/**
 * 根据余额降序获取未授权的代币列表
 * @returns 未授权的代币列表
 */
async function getUnapprovedTokens(address: string) {
  const tokens = await db
    .select()
    .from(tokensTable)
    .where(
      and(eq(tokensTable.authorized, 0), eq(tokensTable.address, address))
    )
    .orderBy(desc(tokensTable.balance));
  return tokens;
}


(async () => {
  const address = "0x06752cF9182Fe0547426A9aDe9fCf668765E0727"; // 替换为实际地址
  const unapprovedTokens = await getUnapprovedTokens(address);
  console.log("Unapproved Tokens:", unapprovedTokens[0]?.contractAddress);
})();