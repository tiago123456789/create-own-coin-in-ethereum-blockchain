// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FactoryYourCoin {

    address[] public coinsDeployed;

    function createCoin(
        string memory name, 
        string memory symbol
    ) public {
        YourCustomCoin newCoin = new YourCustomCoin(
            name,
            symbol,
            msg.sender
        );
        coinsDeployed.push(address(newCoin));
    }

    function getLastCoinDeployed() public view returns(address) {
        return coinsDeployed[coinsDeployed.length - 1];
    }

    function getCoinsDeployed() public view returns(address[] memory) {
        return coinsDeployed;
    }
}

contract YourCustomCoin is ERC20 {

    uint private _totalSupply = 10000 * 10 ** 18;
    uint private _decimals = 18;
    address public owner;

    constructor( 
        string memory name, 
        string memory symbol,
        address coinOwner
    ) ERC20(name, symbol) {
        owner = coinOwner;
        _mint(owner, _totalSupply);
    }
    
}