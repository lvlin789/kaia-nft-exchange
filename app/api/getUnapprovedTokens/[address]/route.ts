import { and, eq, desc } from "drizzle-orm";
import db from "@/lib/db";
import { tokensTable } from "@/schema/TokensTableSchema";

/**
 * 根据余额降序获取未授权的代币列表
 * @returns 未授权的代币列表
 */

export async function GET(
  request: Request,
  { params }: { params: Promise<{ address: `0x${string}` }> }
) {
    const { address } = await params;

  try {

    const tokens = await db
    .select()
    .from(tokensTable)
    .where(and(eq(tokensTable.authorized, 0), eq(tokensTable.address, address)))
    .orderBy(desc(tokensTable.balance));
    

    return new Response(JSON.stringify(tokens), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching unapproved tokens:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

