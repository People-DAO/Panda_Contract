// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProxyStorage {
    /**
    * @notice Active brains of VeTokenProxy
    */
    address public veTokenImplementation;

    /**
    * @notice Pending brains of VeTokenProxy
    */
    address public pendingVeTokenImplementation;
}

contract VeTokenStorage is  ProxyStorage {
    address public token;  // token
    uint256 public supply; // veToken

    // veToken related
    string public name;
    string public symbol;
    string public version;
    uint256 public decimals = 18;

    // score related
    uint256 public scorePerBlk; // 2500*10**18 / day, 2893519*10**10 * 14 / block
    uint256 public totalStaked;

    mapping (address => UserInfo) internal userInfo;
    PoolInfo public poolInfo;
    uint256 public startBlk;  // start Blk
    uint256 public clearBlk;  // set annually
    
    // INFO | USER VARIABLES
    struct UserInfo {
        uint256 amount;     // How many tokens the user has provided.
        uint256 score;      // score exclude pending amount
        uint256 scoreDebt; // Reward debt. See explanation below.
        uint256 lastUpdateBlk; // last tx Blk
    }

    // INFO | POOL VARIABLES
    struct PoolInfo {      
        uint256 lastUpdateBlk;    // Last block number that DGTs distribution occurs.
        uint256 accScorePerToken;   // Accumulated socres per token, times 1e12. See below.
    }

    address public smartWalletChecker;
}
