// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyToken is ERC20, Ownable, ERC20Permit {
    constructor(address initialOwner)
        ERC20("Fake DAI", "DAI")
        Ownable(initialOwner)
        ERC20Permit("Fake DAI")
    {
        _mint(msg.sender, 999999999999999999999999999);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
