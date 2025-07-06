import { int, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { sql } from 'drizzle-orm';

/**
 * 代币信息表
 */
export const tokensTable = sqliteTable("tokens_table", {
  id: int().primaryKey({ autoIncrement: true }), // 主键，自增
  address: text().notNull(),               // 用户钱包地址
  symbol: text().notNull(),                      // 代币符号，如 "Token"
  name: text().notNull(),                        // 代币名称，如 "Token(https://swap-tokens.com)"
  contractAddress: text().notNull(),    // 合约地址
  decimal: int().notNull(),                      // 小数位数
  verified: int().notNull().default(0),          // 是否已验证（0=否，1=是），默认0
  totalSupply: text().notNull(),                 // 总发行量（字符串，防止溢出）
  implementationAddress: text(),                 // 实现合约地址，可为空
  balance: text().notNull(),                     // 当前余额（字符串，防止精度丢失）
  authorized: int().notNull().default(0),        // 授权状态（0=未授权，1=已授权），默认0
  createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`), // 创建时间，默认当前时间
  updatedAt: text(),                             // 更新时间，无默认值
}, (table) => ({
  uniqueAddressContract: unique().on(table.address, table.contractAddress), // 联合唯一索引
}));
