pragma solidity ^0.5.0;

contract ApprovalContract {

    address payable public sender;
    address payable public reciever;
    address public constant approver = 0xE1cb6E09a0859F6D9f1d1cE23DC592606EbfA664;

    function deposit(address payable _reciever) external payable {
        require(msg.value > 0);
        sender = msg.sender;
        reciever = _reciever;
    }

    function viewApprover() external pure returns(address) {
        return (approver);
    }

    function approve() external{
        require(msg.sender == approver);
        reciever.transfer(address(this).balance);
    }

}