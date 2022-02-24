// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./AccessControl.sol";
import "./VeTokenStorage.sol";
import "./VeTokenProxy.sol";

// # Interface for checking whether address belongs to a whitelisted
// # type of a smart wallet.
interface SmartWalletChecker {
    function check(address addr) external returns (bool);
}

contract VeToken is ReentrancyGuard, AccessControl, VeTokenStorage {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    constructor() {}
    
    function initialize(
        address tokenAddr_,
        string memory name_,
        string memory symbol_,
        string memory version_,
        uint256 scorePerBlk_,
        uint256 startBlk_
    ) external onlyOwner 
    {
        token = tokenAddr_;
        
        name = name_;
        symbol = symbol_;
        version = version_;

        scorePerBlk = scorePerBlk_;
        startBlk = startBlk_;
    }

    /* ========== VIEWS ========== */

    function getPoolInfo() external view returns (PoolInfo memory) {
        return poolInfo;
    }

    function getUserInfo(address user_) public view returns (UserInfo memory) {
        return userInfo[user_];
    }
    
    function getUserScore(address user_) public view returns (uint accumulated) {
        accumulated = userInfo[user_].amount.mul(poolInfo.accScorePerToken).div(1e12);
    }

    // RETURN | REWARD MULTIPLIER OVER GIVEN BLOCK RANGE | INCLUDES START BLOCK
    function getMultiplier(
        uint256 from_, 
        uint256 to_
    ) public view returns (uint256) {
        require(from_ <= to_, "from_ must less than to_");
        from_ = from_ >= startBlk ? from_ : startBlk;

        return to_.sub(from_);
    }
    
    // clearScore
    function clearUserScore(
        address user_
    ) internal view returns(bool isClearScore)
    {
        if (block.number > clearBlk && 
            userInfo[user_].lastUpdateBlk < clearBlk) {
                isClearScore = true;
            }
    } 

    function clearPoolScore() internal view returns(bool isClearScore)
    {
        if (block.number > clearBlk && 
            poolInfo.lastUpdateBlk < clearBlk) {
                isClearScore = true;
            }        
    }

    // VIEW | PENDING REWARD
    function pendingScore(
        address user_
    ) internal view returns (uint256 pending) {
        UserInfo storage user = userInfo[user_];

        if (user.amount == 0) {
            return 0;
        }

        uint256 accScorePerToken = poolInfo.accScorePerToken;
        uint256 totalStaked = IERC20(token).balanceOf(address(this));
        
        if (block.number > poolInfo.lastUpdateBlk && totalStaked != 0) {
            uint256 multiplier = getMultiplier(poolInfo.lastUpdateBlk, 
                                               block.number);
            uint256 scoreReward = multiplier.mul(scorePerBlk);
            accScorePerToken = accScorePerToken.add(scoreReward.mul(1e12).div(totalStaked));
        }
        pending = user.amount.mul(accScorePerToken).div(1e12).sub(user.scoreDebt);
                         
    }

    function currentScore(
        address user_,
        bool isClearScore_
    ) public view returns(uint256)
    {
        uint256 pending = pendingScore(user_);
        UserInfo storage user = userInfo[user_];

        if (isClearScore_) {
            return pending.mul(block.number.sub(clearBlk))
                          .div(block.number.sub(user.lastUpdateBlk));
        } else {
            return pending.add(user.score);
        }
    }

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
        return userInfo[addr_].amount;
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

    function updateStakingPool(
        bool isClearScore_
    ) public 
    {
        if (block.number <= poolInfo.lastUpdateBlk) { 
            return;
        }

        poolInfo.lastUpdateBlk = block.number; 

        if (totalStaked == 0) {
            return;
        }  

        uint256 multiplier = getMultiplier(poolInfo.lastUpdateBlk, 
                                           block.number);
        uint256 scoreReward = multiplier.mul(scorePerBlk);
        if (isClearScore_) {
            poolInfo.accScorePerToken = poolInfo.accScorePerToken
                                                .mul(block.number.sub(clearBlk))
                                                .add(scoreReward.mul(1e12)
                                                .div(block.number.sub(poolInfo.lastUpdateBlk))
                                                .div(totalStaked));
        } else {
            poolInfo.accScorePerToken = poolInfo.accScorePerToken
                                                .add(scoreReward.mul(1e12)
                                                .div(totalStaked));
        }

        emit UpdateStakingPool(isClearScore_);
    }

    /**
        * @notice Deposit and lock tokens for a user
        * @dev Anyone (even a smart contract) can deposit for someone else
        * @param value_ Amount to add to user's lock
        * @param user_ User's wallet address
    */
    function depositFor(
        uint256 value_,
        address user_
    ) public nonReentrant activeStake notZeroAddr(user_) {
        require (value_ > 0, "Need non-zero value");

        UserInfo storage user = userInfo[user_];
        if (user.amount == 0) {
            assertNotContract(msg.sender);
        }

        supply = supply.add(value_);
        IERC20(token).safeTransferFrom(msg.sender, address(this), value_);

        updateStakingPool(clearPoolScore());
        user.amount = user.amount.add(value_);
        user.score = currentScore(user_, clearUserScore(user_));
        user.scoreDebt = user.amount.mul(poolInfo.accScorePerToken);
        user.lastUpdateBlk = block.number;

        emit DepositFor(user_, value_);
    }

    /**
        * @notice Withdraw tokens for `msg.sender`ime`
        * @param value_ Token amount to be claimed
        * @dev Only possible if it's claimable
    */
    function withdraw(
        uint256 value_
    ) public nonReentrant activeClaim
    {
        require (value_ > 0, "Need non-zero value");
        UserInfo storage user = userInfo[msg.sender];
        require (user.amount >= value_, "Exceed staked value");
        
        supply = supply.sub(value_);
        IERC20(token).safeTransfer(msg.sender, value_);

        updateStakingPool(clearPoolScore());
        user.amount = user.amount.sub(value_);
        user.score = currentScore(msg.sender, clearUserScore(msg.sender));
        user.scoreDebt = user.amount.mul(poolInfo.accScorePerToken);
        user.lastUpdateBlk = block.number;

        emit Withdraw(value_);
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    function _become(VeTokenProxy veTokenProxy) public {
        require(msg.sender == veTokenProxy.owner(), "only MultiSigner can change brains");
        veTokenProxy._acceptImplementation();
    }

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

    function setScorePerBlk(uint256 scorePerBlk_) external onlyOwner {
        scorePerBlk = scorePerBlk_;

        emit SetScorePerBlk(scorePerBlk_);
    }

    function setClearBlk(uint256 clearBlk_) external onlyOwner {
        clearBlk = clearBlk_;

        emit SetClearBlk(clearBlk_);
    }

    /* ========== EVENTS ========== */
    event DepositFor(address depositor, uint256 value);
    event Withdraw(uint256 value);
    event ApplySmartWalletChecker(address smartWalletChecker);
    event Recovered(address tokenAddress, uint256 tokenAmount);
    event UpdateStakingPool(bool isClearScore);
    event SetScorePerBlk(uint256 scorePerBlk);
    event SetClearBlk(uint256 clearBlk);
}
