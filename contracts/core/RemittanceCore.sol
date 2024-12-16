// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "../interfaces/IRemittanceCore.sol";
import "../libraries/RemittanceLib.sol";

/**
 * @title RemittanceCore
 * @dev Core contract for handling remittance operations
 */
contract RemittanceCore is 
    Initializable, 
    PausableUpgradeable, 
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    UUPSUpgradeable,
    IRemittanceCore 
{
    using RemittanceLib for RemittanceLib.Transfer;

    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    // State variables
    mapping(bytes32 => RemittanceLib.Transfer) private _transfers;
    mapping(address => bool) private _verifiedUsers;
    uint256 private _transferCount;

    // Events
    event TransferInitiated(bytes32 indexed transferId, address indexed sender, address indexed recipient, uint256 amount);
    event TransferCompleted(bytes32 indexed transferId);
    event TransferCancelled(bytes32 indexed transferId);
    event UserVerified(address indexed user);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address admin) public initializer {
        __Pausable_init();
        __AccessControl_init();
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(OPERATOR_ROLE, admin);
        _grantRole(UPGRADER_ROLE, admin);
    }

    /**
     * @dev Initiates a new transfer
     * @param recipient The recipient address
     * @param amount The transfer amount
     * @return transferId The unique transfer identifier
     */
    function initiateTransfer(
        address recipient,
        uint256 amount
    ) external payable whenNotPaused nonReentrant returns (bytes32) {
        require(_verifiedUsers[msg.sender], "Sender not verified");
        require(_verifiedUsers[recipient], "Recipient not verified");
        require(msg.value == amount, "Invalid amount");

        bytes32 transferId = keccak256(
            abi.encodePacked(
                msg.sender,
                recipient,
                amount,
                block.timestamp,
                _transferCount++
            )
        );

        _transfers[transferId] = RemittanceLib.Transfer({
            sender: msg.sender,
            recipient: recipient,
            amount: amount,
            status: RemittanceLib.TransferStatus.Pending,
            timestamp: block.timestamp
        });

        emit TransferInitiated(transferId, msg.sender, recipient, amount);
        return transferId;
    }

    /**
     * @dev Completes a transfer
     * @param transferId The transfer identifier
     */
    function completeTransfer(
        bytes32 transferId
    ) external whenNotPaused nonReentrant onlyRole(OPERATOR_ROLE) {
        RemittanceLib.Transfer storage transfer = _transfers[transferId];
        require(transfer.status == RemittanceLib.TransferStatus.Pending, "Invalid transfer status");

        transfer.complete();
        
        (bool success, ) = transfer.recipient.call{value: transfer.amount}("");
        require(success, "Transfer failed");

        emit TransferCompleted(transferId);
    }

    /**
     * @dev Cancels a transfer
     * @param transferId The transfer identifier
     */
    function cancelTransfer(
        bytes32 transferId
    ) external whenNotPaused nonReentrant {
        RemittanceLib.Transfer storage transfer = _transfers[transferId];
        require(msg.sender == transfer.sender, "Not transfer sender");
        require(transfer.status == RemittanceLib.TransferStatus.Pending, "Invalid transfer status");

        transfer.cancel();
        
        (bool success, ) = transfer.sender.call{value: transfer.amount}("");
        require(success, "Refund failed");

        emit TransferCancelled(transferId);
    }

    /**
     * @dev Verifies a user
     * @param user The user address to verify
     */
    function verifyUser(
        address user
    ) external onlyRole(OPERATOR_ROLE) {
        _verifiedUsers[user] = true;
        emit UserVerified(user);
    }

    /**
     * @dev Returns transfer details
     * @param transferId The transfer identifier
     */
    function getTransfer(
        bytes32 transferId
    ) external view returns (
        address sender,
        address recipient,
        uint256 amount,
        RemittanceLib.TransferStatus status,
        uint256 timestamp
    ) {
        RemittanceLib.Transfer storage transfer = _transfers[transferId];
        return (
            transfer.sender,
            transfer.recipient,
            transfer.amount,
            transfer.status,
            transfer.timestamp
        );
    }

    /**
     * @dev Checks if a user is verified
     * @param user The user address to check
     */
    function isUserVerified(address user) external view returns (bool) {
        return _verifiedUsers[user];
    }

    /**
     * @dev Pauses the contract
     */
    function pause() external onlyRole(OPERATOR_ROLE) {
        _pause();
    }

    /**
     * @dev Unpauses the contract
     */
    function unpause() external onlyRole(OPERATOR_ROLE) {
        _unpause();
    }

    /**
     * @dev Function that should revert when msg.sender is not authorized to upgrade the contract
     */
    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(UPGRADER_ROLE) {}
}