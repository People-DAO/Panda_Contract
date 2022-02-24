// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20 {
    constructor() ERC20("TestToken1", "TT1") {
    }

    function mint(address to_, uint256 amount_) public {
        _mint(to_, amount_);
    }
}