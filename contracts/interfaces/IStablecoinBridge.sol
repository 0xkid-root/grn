// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IStablecoinBridge {
    function addStablecoin(address token) external;
    
    function removeStablecoin(address token) external;
    
    function deposit(address token, uint256 amount) external;
    
    function withdraw(address token, address to, uint256 amount) external;
    
    function isTokenSupported(address token) external view returns (bool);
    
    function getTokenBalance(address token) external view returns (uint256);
}