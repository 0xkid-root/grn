// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../libraries/RemittanceLib.sol";

interface IRemittanceCore {
    function initiateTransfer(
        address recipient,
        uint256 amount
    ) external payable returns (bytes32);

    function completeTransfer(bytes32 transferId) external;
    
    function cancelTransfer(bytes32 transferId) external;
    
    function verifyUser(address user) external;
    
    function getTransfer(
        bytes32 transferId
    ) external view returns (
        address sender,
        address recipient,
        uint256 amount,
        RemittanceLib.TransferStatus status,
        uint256 timestamp
    );
    
    function isUserVerified(address user) external view returns (bool);
}