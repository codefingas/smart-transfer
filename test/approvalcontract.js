const ApprovalContract = artifacts.require(
  ".../contracts/ApprovalContract.sol"
);

contract(ApprovalContract, function (accounts) {
  it("initiates contract", async function () {
    const contract = await ApprovalContract.deployed();
    const approver = await contract.approver.call();

    assert.equal(
      approver,
      0xe1cb6e09a0859f6d9f1d1ce23dc592606ebfa664,
      "approvers dont match"
    );
  });

  it("takes a deposit", async function () {
    const contract = await ApprovalContract.deployed();
    await contract.deposit(accounts[0], { value: 1e18, from: accounts[1] });
    const accountBalance = await web3.eth.getBalance(contract.address);
    assert.equal(accountBalance, 1e18, "amount was not deposited");
  });
});
