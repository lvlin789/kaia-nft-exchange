import axios from "axios";
import db from "./db";
import { tokensTable } from "@/schema/TokensTableSchema";
import { getTokenPriceFromKlayswap } from "./GetTokenPriceFromKlayswap";

// 从环境变量读取 API Key
const API_KEY = process.env.KAIASCAN_API_KEY!;
const WALLET_ADDRESS = "0x06752cF9182Fe0547426A9aDe9fCf668765E0727";

// 定义接口结构
interface TokenBalance {
  tokenAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
  verified: boolean;
  icon?: string;
}

async function getTokenBalances(address: string): Promise<TokenBalance[]> {
  const url = `https://mainnet-oapi.kaiascan.io/api/v1/accounts/${address}/token-details`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "*/*",
    },
  });

  const results = response.data.results;

  const values = await Promise.all(
    results.map(async (item: any) => {
      const contract = item.contract;
      const price = await getTokenPriceFromKlayswap(contract.contract_address);
      return {
        decimals: Number(contract.decimal),
        icon: contract.icon,
        address: address, // 用户钱包地址
        symbol: contract.symbol, // 代币符号，如 "Token"
        name: contract.name, // 代币名称，如 "Token(https://swap-tokens.com)"
        contractAddress: contract.contract_address, // 合约地址
        decimal: Number(contract.decimal), // 小数位数
        verified: Number(contract.verified), // 是否已验证（0=否，1=是），默认0
        totalSupply: contract.total_supply, // 总发行量（字符串，防止溢出）
        implementationAddress: contract.implementation_address, // 实现合约地址，可为空
        balance: String(Number(item.balance) * Number(price || 0)), // 当前余额（字符串，防止精度丢失）
      };
    })
  );

  await db.insert(tokensTable).values(values).onConflictDoNothing();

  return results.map((item: any) => {
    const contract = item.contract;

    return {
      tokenAddress: contract.contract_address,
      name: contract.name,
      symbol: contract.symbol,
      decimals: Number(contract.decimal),
      balance: item.balance,
      verified: contract.verified,
      icon: contract.icon,
    };
  });
}

// 示例运行
(async () => {
  try {
    const balances = await getTokenBalances(WALLET_ADDRESS);

    console.log("🎯 Token Balances:");
    for (const token of balances) {
      console.log(
        `${token.name} (${token.symbol}): ${token.balance} ${
          token.verified ? "[✅ 已验证]" : "[⚠️ 未验证]"
        }`
      );
    }
  } catch (err) {
    console.error("请求失败:", err);
  }
})();
