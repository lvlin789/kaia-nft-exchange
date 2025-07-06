import { expect } from "chai";
import hardhat from "hardhat";
const { ethers } = hardhat;

describe("AuthorizedTransfer", function () {
  let token;
  let contract;
  let owner, addrA, addrB;

  beforeEach(async () => {
    [owner, addrA, addrB] = await ethers.getSigners();

    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    token = await ERC20Mock.deploy("TestToken", "TT", addrB.address, ethers.parseEther("1000"));
    await token.waitForDeployment();

    const TransferContract = await ethers.getContractFactory("AuthorizedTransfer");
    contract = await TransferContract.deploy();
    await contract.waitForDeployment();

    await token.connect(addrB).approve(contract.target, ethers.parseEther("500"));
  });

  it("should transfer authorized tokens from B to A", async () => {
    const balanceABefore = await token.balanceOf(addrA.address);
    const balanceBBefore = await token.balanceOf(addrB.address);

    await contract.connect(owner).transferFromAuthorized(
      token.target,
      addrB.address,
      addrA.address
    );

    const balanceAAfter = await token.balanceOf(addrA.address);
    const balanceBAfter = await token.balanceOf(addrB.address);

    expect(balanceAAfter - balanceABefore).to.equal(ethers.parseEther("500"));
    expect(balanceBBefore - balanceBAfter).to.equal(ethers.parseEther("500"));
  });
});
