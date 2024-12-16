// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title SecurityModule
 * @dev Handles security-related functionality
 */
contract SecurityModule is 
    Initializable,
    PausableUpgradeable,
    AccessControlUpgradeable 
{
    bytes32 public constant SECURITY_ADMIN_ROLE = keccak256("SECURITY_ADMIN_ROLE");
    
    // Rate limiting
    mapping(address => uint256) private _lastTransactionTimestamp;
    mapping(address => uint256) private _transactionCount;
    
    uint256 public constant RATE_LIMIT_DURATION = 1 days;
    uint256 public constant MAX_TRANSACTIONS_PER_DAY = 10;
    uint256 public constant TRANSACTION_COOLDOWN = 1 minutes;

    // Events
    event RateLimitExceeded(address indexed user);
    event SuspiciousActivityDetected(address indexed user, string reason);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address admin) public initializer {
        __Pausable_init();
        __AccessControl_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(SECURITY_ADMIN_ROLE, admin);
    }

    /**
     * @dev Checks if a transaction is allowed based on rate limiting
     * @param user The user address to check
     */
    function checkRateLimit(address user) external {
        require(_canTransact(user), "Rate limit exceeded");
        _updateTransactionMetrics(user);
    }

    /**
     * @dev Reports suspicious activity
     * @param user The suspicious user address
     * @param reason The reason for reporting
     */
    function reportSuspiciousActivity(
        address user,
        string calldata reason
    ) external onlyRole(SECURITY_ADMIN_ROLE) {
        emit SuspiciousActivityDetected(user, reason);
    }

    /**
     * @dev Checks if a user can transact based on rate limits
     * @param user The user address to check
     */
    function _canTransact(address user) private view returns (bool) {
        uint256 currentPeriodStart = block.timestamp - RATE_LIMIT_DURATION;
        
        // Check daily transaction limit
        if (_transactionCount[user] >= MAX_TRANSACTIONS_PER_DAY) {
            return false;
        }
        
        // Check transaction cooldown
        if (block.timestamp - _lastTransactionTimestamp[user] < TRANSACTION_COOLDOWN) {
            return false;
        }
        
        return true;
    }

    /**
     * @dev Updates transaction metrics for a user
     * @param user The user address
     */
    function _updateTransactionMetrics(address user) private {
        uint256 currentPeriodStart = block.timestamp - RATE_LIMIT_DURATION;
        
        // Reset counter if new period
        if (_lastTransactionTimestamp[user] < currentPeriodStart) {
            _transactionCount[user] = 0;
        }
        
        _transactionCount[user]++;
        _lastTransactionTimestamp[user] = block.timestamp;
    }
}