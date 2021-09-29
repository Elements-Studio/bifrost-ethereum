// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.0;

import "./IERC20.sol";

interface ISTC is IERC20 {

    function setAuthorizedMintCaller(address caller) external;
    function removeAuthorizedMintCaller(address caller) external;

//    function mintUnlockedToken(address to, uint256 amount) external;
    function mintLockedToken(address to, uint256 amount) external;

    function depositFromStarcoinChain(address to, uint256 amount)  external returns (bool);
    function withdrawToStarcoinChain(bytes20 to, uint256 amount)  external returns (bool);
    event CrossChainWithdrawEvent(address indexed from, bytes20 to, address indexed owner, uint256 value, uint8 from_chain);
}