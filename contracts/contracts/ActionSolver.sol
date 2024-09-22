// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract SignedMessageStorage is Ownable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    struct Action {
        address signer;
        string action;
        uint256 deadline;
        bytes32 actionArgs;
    }

    struct ActionInfo {
        string name;
        bool isEnabled;
    }

    mapping(address => mapping(bytes => bool)) public cancelledSignatures;
    mapping(address => mapping(bytes => address)) public signatureExecutor;
    ActionInfo[] public actions;
    mapping(string => uint256) public actionIndexes;

    event ActionCancelled(address indexed signer, bytes signature);
    event ActionExecuted(address indexed signer, address indexed executor, string action);

    constructor() Ownable(msg.sender) {
        // Initialize with a "swap" action
        addAction("swap");
    }

    function addAction(string memory _name) public onlyOwner {
        require(actionIndexes[_name] == 0, "Action already exists");
        actions.push(ActionInfo(_name, true));
        actionIndexes[_name] = actions.length;
    }

    function removeAction(string memory _name) public onlyOwner {
        require(actionIndexes[_name] != 0, "Action does not exist");
        uint256 index = actionIndexes[_name] - 1;
        actions[index] = actions[actions.length - 1];
        actionIndexes[actions[actions.length - 1].name] = index + 1;
        actions.pop();
        delete actionIndexes[_name];
    }

    function toggleAction(string memory _name) public onlyOwner {
        require(actionIndexes[_name] != 0, "Action does not exist");
        uint256 index = actionIndexes[_name] - 1;
        actions[index].isEnabled = !actions[index].isEnabled;
    }

    function getMessageHash(Action memory _action) public pure returns (bytes32) {
        return keccak256(abi.encode(_action));
    }

    function getEthSignedMessageHash(bytes32 _messageHash) public pure returns (bytes32) {
        return _messageHash.toEthSignedMessageHash();
    }

    function verify(Action memory _action, bytes memory signature) public pure returns (address) {
        bytes32 messageHash = getMessageHash(_action);
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        return ethSignedMessageHash.recover(signature);
    }

    function cancelAction(bytes memory signature) public {
        cancelledSignatures[msg.sender][signature] = true;
        emit ActionCancelled(msg.sender, signature);
    }

    function executeAction(Action memory action, bytes memory signature) public returns 
    // (bool) 
    (address, uint256, string memory, uint256) 
    {
        address recoveredSigner = verify(action, signature);

        require(recoveredSigner == action.signer, "Invalid signature");
        require(!cancelledSignatures[action.signer][signature], "Action was cancelled");
        require(block.timestamp <= action.deadline, "Action expired");

        uint256 actionIndex = actionIndexes[action.action];
        require(actionIndex != 0, "Action does not exist");
        require(actions[actionIndex - 1].isEnabled, "Action is disabled");

        // return true;

        signatureExecutor[action.signer][signature] = msg.sender;
        emit ActionExecuted(action.signer, msg.sender, action.action);

        // if (keccak256(abi.encodePacked(action.action)) == keccak256(abi.encodePacked("swap"))) {
        //     return executeSwap(action.actionArgs);
        // }

        // return true;
        (address to, uint256 amount, string memory message, uint256 nonce) = decodeSwapArgs(action.actionArgs);
        return ( to,  amount, message, nonce);
    }

    function executeSwap(bytes32 actionArgs) internal pure returns (bool) {
        (address to, uint256 amount, string memory message, uint256 nonce) = decodeSwapArgs(actionArgs);
        
        // Here you would implement the actual swap logic
        // For this example, we'll just return true
        return true;
    }

    function decodeSwapArgs(bytes32 actionArgs) internal pure returns (address to, uint256 amount, string memory message, uint256 nonce) {
        // This is a simplified decoding. In practice, you might need a more sophisticated approach
        // depending on how you originally encoded these values.
        to = address(uint160(uint256(actionArgs)));
        amount = uint256(actionArgs) >> 160;
        // For simplicity, we're not decoding the message and nonce here.
        // In a real implementation, you'd need to devise a way to encode and decode
        // all four values into/from a bytes32.
        message = "";
        nonce = 0;
    }
}