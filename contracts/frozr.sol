//SPDX-License-Identifier: Affero-3.0
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract Frozr {
  uint depositId = 0;
  struct Deposit {
    address sender;
    bool isComplete;
    uint depositId;
    uint amount;
    uint startDate;
    uint releaseDate;
  }
  mapping(uint => Deposit) private deposits;
  mapping(address => uint[]) private addressToDepositIds;

  function deposit(uint _daysToFreeze) external payable {
    require(msg.value > 0, "Non-zero amount required");
    require(_daysToFreeze > 0, "You must store funds for at least 1 day");

    deposits[depositId] = Deposit(
      msg.sender,
      false,
      depositId,
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

  function viewDeposits() external view returns (Deposit[] memory) {
    uint[] memory ids = addressToDepositIds[msg.sender];
    Deposit[] memory userDeposits = new Deposit[](ids.length);
    for (uint i = 0; i < ids.length; i++) {
      userDeposits[i] = deposits[ids[i]];
    }
    return userDeposits;
  }
}
