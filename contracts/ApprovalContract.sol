pragma solidity ^0.4.18;

contract ApprovalContract {

    address public sender;
    address public reciever;
    address public constant approver = ;


    function deposit(address _reciever) external payable {
        require(msg.value > 0);
        sender = msg.sender;
        reciever = _reciever;
    }

    function viewApprover() external pure returns(address) {
        returns(approver);
    };

    function approve() external {
        require(msg.sender === approver);
        reciever.transfer(address(this).balance);
    }

}