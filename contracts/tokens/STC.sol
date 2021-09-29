//SPDX-License-Identifier: Apache-2.0

pragma solidity >=0.6.0 <0.8.0;

import "./ERC20.sol";
import "./ISTC.sol";
import "./SafeERC20.sol";
import "../libs/Ownable.sol";
import "../libs/ReentrancyGuard.sol";
import "../libs/SafeMath.sol";

contract STC is Context, ERC20, Ownable, ISTC, ReentrancyGuard {
//    address payable public owner;
//    constructor() ERC20Detailed("Starcoin", "STC", 9) public {
//        owner = msg.sender;
////        _mint(msg.sender, 1e26); //
//    }
//
//    function destroy() public {
//        require(msg.sender == owner, "only owner");
//        selfdestruct(owner);
//    }

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    uint256 public constant FACTOR_DENOMINATOR = 10 ** 9;
//    uint8 public constant decimals = 9; //STC precision is 9
    uint8 private constant from_chain_ethereum = 1;

    mapping (address => uint256) private _unlocks;
    mapping (address => bool) private _authorizedMintCaller;

    uint256 private _totalUnlocked;

    modifier onlyAuthorizedMintCaller() {
        require(_msgSender() == owner() || _authorizedMintCaller[_msgSender()],"STC : MINT_CALLER_NOT_AUTHORIZED");
        _;
    }

    constructor () public ERC20("Starcoin Token", "STC", 9) {}


    function mintLockedToken(address to, uint256 amount) onlyAuthorizedMintCaller external override {
        _mint(to, amount);
        require(totalSupply() <= 10**26, "STC : TOTAL_SUPPLY_EXCEEDED");
    }

    function setAuthorizedMintCaller(address caller) onlyOwner external override {
        _authorizedMintCaller[caller] = true;
    }

    function removeAuthorizedMintCaller(address caller) onlyOwner external override {
        _authorizedMintCaller[caller] = false;
    }

    // can only call by admin
    function depositFromStarcoinChain(address to, uint256 amount) onlyOwner public virtual override returns (bool) {
        _mint(_msgSender(), amount);
        _transfer(_msgSender(), to, amount);
        return true;
    }

    function withdrawToStarcoinChain(bytes20 to, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), owner(), amount);
        _burn(owner(), amount);
        emit CrossChainWithdrawEvent(_msgSender(), to, owner(), amount, from_chain_ethereum);
        return true;
    }

}