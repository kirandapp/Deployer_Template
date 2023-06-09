// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Vishesh is ERC20, Ownable {

    uint256 public totalToken;
    constructor(
        // string memory _name,
        // string memory _symbol,
        // uint256 _totalsupply
    ) ERC20("", "") {
        totalToken = 100;
        
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // function totalSupply() public view override returns (uint256) {
    //     return total;
    // }
}
//0xEE1af3C08535E27aF0fA5440E09fC725813D78F3