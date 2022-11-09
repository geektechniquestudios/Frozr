//SPDX-License-Identifier: Affero-3.0
pragma solidity ^0.8.11;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Frozr is Ownable {
  uint depositId = 0;
  struct Deposit {
    uint depositId;
    address sender;
    bool isComplete;
    uint amount;
    uint startDate;
    uint releaseDate;
  }
  mapping(uint => Deposit) public deposits;
  mapping(address => uint[]) private addressToDepositIds;

  uint private frozrBalance;
  address payable private frozrAddress;

  constructor() {
    frozrAddress = payable(msg.sender);
    frozrBalance = 0;
  }

  function deposit(uint _daysToFreeze) external payable {
    require(msg.value > 0, "You must send some ether");
    require(_daysToFreeze > 0, "You must freeze for at least 1 day");

    deposits[depositId] = Deposit(
      depositId,
      msg.sender,
      false,
      msg.value,
      block.timestamp,
      block.timestamp + (_daysToFreeze * 1 days)
    );
    addressToDepositIds[msg.sender].push(depositId);
    depositId++;
  }

  function withdraw(uint _depositId) external payable {
    require(
      deposits[_depositId].isComplete == false,
      "This deposit has already been withdrawn"
    );
    require(
      deposits[_depositId].sender == msg.sender,
      "You are not the owner of this deposit"
    );
    require(
      deposits[_depositId].releaseDate <= block.timestamp,
      "This deposit is not yet ready to be withdrawn"
    );

    deposits[_depositId].isComplete = true;
    payable(msg.sender).transfer(deposits[_depositId].amount);
  }

  // function withdawEarly(uint _depositId) external payable {
  //   require(
  //     deposits[_depositId].isComplete == false,
  //     "This deposit has already been withdrawn"
  //   );
  //   require(
  //     deposits[_depositId].sender == msg.sender,
  //     "You are not the owner of this deposit"
  //   );

  //   // add 10% fee to fror balance
  //   frozrBalance += deposits[_depositId].amount / 10;

  //   deposits[_depositId].isComplete = true;
  //   payable(msg.sender).transfer(
  //     deposits[_depositId].amount - (deposits[_depositId].amount / 10)
  //   );

  // }

  function viewDeposits() external view returns (Deposit[] memory) {
    uint[] memory ids = addressToDepositIds[msg.sender];
    Deposit[] memory userDeposits = new Deposit[](ids.length);
    for (uint i = 0; i < ids.length; i++) {
      userDeposits[i] = deposits[ids[i]];
    }
    return userDeposits;
  }

  function withdrawFrozrBalance() external onlyOwner {
    frozrAddress.transfer(frozrBalance);
    frozrBalance = 0;
  }

  function viewFrozrBalance() external view onlyOwner returns (uint) {
    return frozrBalance;
  }
}
