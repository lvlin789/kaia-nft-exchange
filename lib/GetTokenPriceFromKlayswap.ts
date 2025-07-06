import axios from "axios";

interface KlayswapToken {
  address: string;
  image: string;
  decimal: number;
  nameEn: string;
  nameKo: string;
  grade: string;
  price: string;
  symbol: string;
  bridgeType: string;
}

interface KlayswapResponse {
  statusCode: number;
  skip: number;
  take: number;
  total: number;
  tokens: KlayswapToken[];
}

/**
 * 获取某个代币在 Klayswap 上的价格
 * @param tokenAddress 代币合约地址
 * @returns 价格字符串（如 "1"），如果未找到返回 null
 */
export async function getTokenPriceFromKlayswap(
  tokenAddress: string
): Promise<string | null> {
  const url = `https://api.klayswap.com/tokens?skip=0&take=10&keyword=${tokenAddress}`;

  try {
    const response = await axios.get<KlayswapResponse>(url, {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (compatible; TokenPriceBot/1.0; +https://yourdomain.com)",
      },
    });
    return response.data.tokens[0] ? response.data.tokens[0].price : null;
  } catch (error) {
    console.error("Error fetching token price:", error);
    return null;
  }
}