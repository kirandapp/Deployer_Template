// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CONTRACTNAME is ERC20, Ownable {

    uint256 public totalToken;
    uint256 public CONTRACTNAME;
    constructor(
        // string memory _name,
        // string memory _symbol,
        // uint256 _totalsupply
    ) ERC20("", "") {
        totalToken = 100;
        CONTRACTNAME = 100;
        
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // function totalSupply() public view override returns (uint256) {
    //     return total;
    // }
}