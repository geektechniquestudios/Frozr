const { expect } = require("chai")
const { ethers } = require("hardhat")

let frozr, account1, account2

beforeEach(async () => {
  await hre.network.provider.send("hardhat_reset")
  const frozrContract = await ethers.getContractFactory("Frozr")
  frozr = await frozrContract.deploy()
  ;[owner, account1, account2] = await ethers.getSigners()
})

describe("Frozr", () => {
  it("should allow users to make a deposit", async () => {
    const initialBalance = await ethers.provider.getBalance(account1.address)

    await frozr
      .connect(account1)
      .deposit(5, { value: ethers.utils.parseEther("1") })
      .catch(console.error)

    const finalBalance = await ethers.provider.getBalance(account1.address)

    expect(finalBalance.lt(initialBalance)).to.be.true
  })

  it("should allow users to view their deposits", async () => {
    await frozr.deposit(5, { value: ethers.utils.parseEther("1") })
    await frozr.deposit(7, { value: ethers.utils.parseEther("2") })

    const deposits = await frozr.viewDeposits()

    expect(deposits).to.have.length(2)
  })

  it("should allow users to withdraw their deposits once they are ready", async () => {
    await frozr
      .connect(account1)
      .deposit(1, { value: ethers.utils.parseEther("1") })
      .catch(console.error)

    const initialBalance = await ethers.provider.getBalance(account1.address)
    await ethers.provider.send("evm_increaseTime", [3600 * 25])
    await frozr.connect(account1).withdraw(0).catch(console.error)
    const finalBalance = await ethers.provider.getBalance(account1.address)

    expect(finalBalance.gt(initialBalance)).to.be.true
  })

  it("should not allow users to withdraw their deposits before they are ready", async () => {
    await frozr
      .connect(account1)
      .deposit(1, { value: ethers.utils.parseEther("1") })
      .catch(console.error)

    await expect(frozr.connect(account1).withdraw(0)).to.be.revertedWith(
      "This deposit is not yet ready to be withdrawn",
    )
  })

  it("should not allow users to withdraw a deposit that does not belong to them", async () => {
    await frozr
      .connect(account1)
      .deposit(1, { value: ethers.utils.parseEther("1") })
      .catch(console.error)

    await expect(frozr.connect(account2).withdraw(0)).to.be.revertedWith(
      "You are not the owner of this deposit",
    )
  })

  it("should not allow users to withdraw a deposit that has already been withdrawn", async () => {
    await frozr
      .connect(account1)
      .deposit(1, { value: ethers.utils.parseEther("1") })
      .catch(console.error)

    await ethers.provider.send("evm_increaseTime", [3600 * 25])
    await frozr.connect(account1).withdraw(0).catch(console.error)

    await expect(frozr.connect(account1).withdraw(0)).to.be.revertedWith(
      "This deposit has already been withdrawn",
    )
  })
})
