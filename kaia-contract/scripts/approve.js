import hardhat from "hardhat";
const { ethers } = hardhat;


async function main() {
  const tokenAddress = "0x5c13e303a62fc5dedf5b52d66873f2e59fedadc2";
  const spenderAddress = "0x9605d95B76a406982c08BC379c032dc80F273448"; // 授权给合约的地址
//   const amount = ethers.parseUnits("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 18); // 授权 1000 个代币，按18位精度

  const [signer] = await ethers.getSigners();

  console.log(`🧾 当前账户: ${signer.address}`);

  // ERC20 标准 ABI 中的 approve 方法
  const erc20Abi = [
    "function approve(address spender, uint256 amount) public returns (bool)"
  ];

  const token = new ethers.Contract(tokenAddress, erc20Abi, signer);

  const tx = await token.approve(spenderAddress, ethers.MaxUint256);
  console.log(`🚀 授权交易已发送: ${tx.hash}`);

  const receipt = await tx.wait();
  console.log(`✅ 授权完成，区块号: ${receipt.blockNumber}`);
}

main().catch((error) => {
  console.error("❌ 执行失败:", error);
  process.exit(1);
});
