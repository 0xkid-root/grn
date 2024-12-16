// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "../interfaces/IStablecoinBridge.sol";

/**
 * @title StablecoinBridge
 * @dev Handles stablecoin deposits and withdrawals
 */
contract StablecoinBridge is 
    Initializable,
    PausableUpgradeable,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    IStablecoinBridge 
{
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    // Supported stablecoins
    mapping(address => bool) private _supportedStablecoins;
    
    // Events
    event StablecoinAdded(address indexed token);
    event StablecoinRemoved(address indexed token);
    event TokensDeposited(address indexed token, address indexed user, uint256 amount);
    event TokensWithdrawn(address indexed token, address indexed user, uint256 amount);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address admin) public initializer {
        __Pausable_init();
        __AccessControl_init();
        __ReentrancyGuard_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(OPERATOR_ROLE, admin);
    }

    /**
     * @dev Adds support for a stablecoin
     * @param token The stablecoin address
     */
    function addStablecoin(
        address token
    ) external onlyRole(OPERATOR_ROLE) {
        require(token != address(0), "Invalid token address");
        _supportedStablecoins[token] = true;
        emit StablecoinAdded(token);
    }

    /**
     * @dev Removes support for a stablecoin
     * @param token The stablecoin address
     */
    function removeStablecoin(
        address token
    ) external onlyRole(OPERATOR_ROLE) {
        require(_supportedStablecoins[token], "Token not supported");
        _supportedStablecoins[token] = false;
        emit StablecoinRemoved(token);
    }

    /**
     * @dev Deposits stablecoins
     * @param token The stablecoin address
     * @param amount The amount to deposit
     */
    function deposit(
        address token,
        uint256 amount
    ) external whenNotPaused nonReentrant {
        require(_supportedStablecoins[token], "Token not supported");
        require(amount > 0, "Invalid amount");

        IERC20Upgradeable(token).transferFrom(msg.sender, address(this), amount);
        emit TokensDeposited(token, msg.sender, amount);
    }

    /**
     * @dev Withdraws stablecoins
     * @param token The stablecoin address
     * @param to The recipient address
     * @param amount The amount to withdraw
     */
    function withdraw(
        address token,
        address to,
        uint256 amount
    ) external whenNotPaused nonReentrant onlyRole(OPERATOR_ROLE) {
        require(_supportedStablecoins[token], "Token not supported");
        require(amount > 0, "Invalid amount");
        require(to != address(0), "Invalid recipient");

        IERC20Upgradeable(token).transfer(to, amount);
        emit TokensWithdrawn(token, to, amount);
    }

    /**
     * @dev Checks if a token is supported
     * @param token The token address to check
     */
    function isTokenSupported(address token) external view returns (bool) {
        return _supportedStablecoins[token];
    }

    /**
     * @dev Returns the balance of a specific token
     * @param token The token address
     */
    function getTokenBalance(address token) external view returns (uint256) {
        return IERC20Upgradeable(token).balanceOf(address(this));
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
}