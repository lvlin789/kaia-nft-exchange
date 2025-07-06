import hre from "hardhat";

async function main() {
  console.log("🚀 开始部署 AuthorizedTransfer 合约...");

  const AuthorizedTransfer = await hre.ethers.getContractFactory("AuthorizedTransfer");
  const authorizedTransfer = await AuthorizedTransfer.deploy();

  await authorizedTransfer.waitForDeployment();

  const address = await authorizedTransfer.getAddress();
  console.log("✅ 合约部署成功！");
  console.log("📍 合约地址:", address);
}

main().catch((error) => {
  console.error("❌ 部署过程中发生错误：", error);
  process.exit(1);
});
