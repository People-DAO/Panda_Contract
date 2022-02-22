// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


contract PandaClaim {
    bytes32 public merkleRoot;
    address public pandaToken;
    mapping(address=>bool) private claimed;


    event MerkleRootChanged(bytes32 merkleRoot);
    event Claim(address indexed claimant, uint256 amount);


    /**
     * @dev Constructor.
     */
    constructor(
        address pandaToken_
    )
    {
        pandaToken = pandaToken_;
    }


    /**
     * @dev Claims  tokens.
     * @param amount The amount of the claim being made.
     * @param merkleProof A merkle proof proving the claim is valid.
     */
    function claimTokens(uint256 amount, bytes32[] calldata merkleProof) public {
        require(amount > 0, "PandaDAO: Valid amount required.");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, amount));
        bool valid = MerkleProof.verify(merkleProof, merkleRoot, leaf);
        require(valid, "PandaDAO: Valid proof required.");
        require(!claimed[msg.sender], "PandaDAO: Tokens already claimed.");
        claimed[msg.sender] = true;

        IERC20(token).transfer(msg.sender, amount);
        emit Claim(msg.sender, amount);
    }


    /**
     * @dev Sets the merkle root. Only callable if the root is not yet set.
     * @param _merkleRoot The merkle root to set.
     */
    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
        emit MerkleRootChanged(_merkleRoot);
    }

}