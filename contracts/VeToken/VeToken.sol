// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./AccessControl.sol";

// # Interface for checking whether address belongs to a whitelisted
// # type of a smart wallet.
interface SmartWalletChecker {
    function check(address addr) external returns (bool);
}

contract VeToken is ReentrancyGuard, AccessControl {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    /* ========== STATE VARIABLES ========== */

    address public token;  // token
    uint256 public supply; // veToken

    mapping (address => uint256) public lockedBalance;

    // veToken related
    string public name;
    string public symbol;
    string public version;
    uint256 public decimals = 18;

    address public smartWalletChecker;

    constructor(
        address tokenAddr_,
        string memory name_,
        string memory symbol_,
        string memory version_
    ) {
        token = tokenAddr_;
        
        name = name_;
        symbol = symbol_;
        version = version_;
    }

    /* ========== VIEWS ========== */

    // Boolean value of claimable or not
    function isClaimable() external view returns(bool) 
    {
        return claimIsActive;
    }

    // Boolean value of stakable or not
    function isStakable() external view returns(bool) 
    {
        return stakeIsActive;
    }

    /**
        * @notice Get the current voting power for `msg.sender` 
        * @dev Adheres to the ERC20 `balanceOf` interface for Aragon compatibility
        * @param addr_ User wallet address
        * @return User voting power
    */
    function balanceOf(
        address addr_
    ) external view notZeroAddr(addr_) returns(uint256)
    {
        return lockedBalance[addr_];
    }

    /**
        * @notice Calculate total voting power 
        * @dev Adheres to the ERC20 `totalSupply` interface for Aragon compatibility
        * @return Total voting power
    */
    function totalSupply() external view returns(uint256) {
        return supply;
    }

    /* ========== INTERNAL FUNCTIONS ========== */

    /**
        * @notice Check if the call is from a whitelisted smart contract, revert if not
        * @param addr_ Address to be checked
    */
    function assertNotContract(
        address addr_
    ) internal {
        if (addr_ != tx.origin) {
            address checker = smartWalletChecker;
            if (checker != ZERO_ADDRESS){
                if (SmartWalletChecker(checker).check(addr_)){
                    return;
                }
            }
            revert("Smart contract depositors not allowed");
        }
    }

    /* ========== WRITES ========== */

    /**
        * @notice Deposit and lock tokens for a user
        * @dev Anyone (even a smart contract) can deposit for someone else
        * @param addr_ User's wallet address
        * @param value_ Amount to add to user's lock
    */
    function depositFor(
        address addr_,
        uint256 value_
    ) external nonReentrant activeStake notZeroAddr(addr_) {
        require (value_ > 0, "Need non-zero value");

        if (lockedBalance[addr_] == 0) {
            assertNotContract(msg.sender);
        }
        lockedBalance[addr_] = lockedBalance[addr_].add(value_);
        supply = supply.add(value_);

        IERC20(token).safeTransferFrom(msg.sender, address(this), value_);

        emit DepositFor(addr_, value_);
    }

    /**
        * @notice Withdraw tokens for `msg.sender`ime`
        * @param value_ Token amount to be claimed
        * @dev Only possible if it's claimable
    */
    function withdraw(
        uint256 value_
    ) external nonReentrant activeClaim {
        require (value_ > 0, "Need non-zero value");
        require (lockedBalance[msg.sender] >= value_, "Exceed staked value");
        lockedBalance[msg.sender] = lockedBalance[msg.sender].sub(value_);
        supply = supply.sub(value_);

        IERC20(token).safeTransfer(msg.sender, value_);

        emit Withdraw(value_);
    }

    /* ========== RESTRICTED FUNCTIONS ========== */
    /**
        * @notice Apply setting external contract to check approved smart contract wallets
    */
    function applySmartWalletChecker(
        address smartWalletChecker_
    ) external onlyOwner notZeroAddr(smartWalletChecker_) {
        smartWalletChecker = smartWalletChecker_;

        emit ApplySmartWalletChecker(smartWalletChecker_);
    }

    // Added to support recovering LP Rewards and other mistaken tokens from other systems to be distributed to holders
    function recoverERC20(
        address tokenAddress, 
        uint256 tokenAmount
    ) external onlyOwner notZeroAddr(tokenAddress) {
        // Only the owner address can ever receive the recovery withdrawal
        require(tokenAddress != token, "Not in migration");
        IERC20(tokenAddress).transfer(owner(), tokenAmount);

        emit Recovered(tokenAddress, tokenAmount);
    }

    /* ========== EVENTS ========== */
    event DepositFor(address depositor, uint256 value);
    event Withdraw(uint256 value);
    event ApplySmartWalletChecker(address smartWalletChecker);
    event Recovered(address tokenAddress, uint256 tokenAmount);
}
