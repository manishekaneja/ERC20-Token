//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract LuckyCoin is ERC20 {
  address private previousSender; 
  constructor() ERC20("Luck","LKY") {
    _mint(_msgSender(), 100 ether);
    previousSender = msg.sender;
  }
  function transfer(address recipient, uint256 amount) public override returns (bool) {
        uint256 actualTransfer = amount * 90;
        uint256 luck = amount * 10;
        _transfer(_msgSender(), previousSender, luck /100);
        _transfer(_msgSender(), recipient, actualTransfer/100);
        previousSender = _msgSender();
        return true;
  }

}
