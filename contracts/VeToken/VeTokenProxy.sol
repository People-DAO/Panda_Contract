// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AccessControl.sol";

/**
 * @title VeTokenCore
 * @dev Storage for the VeToken is at this address, while execution is delegated to the `veTokenImplementation`.
 */
contract VeTokenProxy is AccessControl {
    /**
    * @notice Active brains of VeTokenProxy
    */
    address public veTokenImplementation;

    /**
    * @notice Pending brains of VeTokenProxy
    */
    address public pendingVeTokenImplementation;

    /**
    * @notice Accepts new implementation of comptroller. msg.sender must be pendingImplementation
    * @dev Admin function for new implementation to accept it's role as implementation
    */
    function _acceptImplementation() public {
        // Check caller is pendingImplementation and pendingImplementation ≠ address(0)
        require (msg.sender == veTokenImplementation && veTokenImplementation != address(0),
                "Invalid veTokenImplementation");

        // Save current values for inclusion in log
        address oldImplementation = veTokenImplementation;
        address oldPendingImplementation = pendingVeTokenImplementation;

        veTokenImplementation = oldPendingImplementation;

        pendingVeTokenImplementation = address(0);

        emit NewImplementation(oldImplementation, veTokenImplementation);
        emit NewPendingImplementation(oldPendingImplementation, pendingVeTokenImplementation);
    }
    
    /**
     * @dev Delegates execution to an implementation contract.
     * It returns to the external caller whatever the implementation returns
     * or forwards reverts.
     */
    fallback () external payable {
        // delegate all other functions to current implementation
        (bool success, ) = veTokenImplementation.delegatecall(msg.data);

        assembly {
              let free_mem_ptr := mload(0x40)
              returndatacopy(free_mem_ptr, 0, returndatasize())

              switch success
              case 0 { revert(free_mem_ptr, returndatasize()) }
              default { return(free_mem_ptr, returndatasize()) }
        }
    }

    receive () external payable {}

    /**
      * @notice Emitted when pendingComptrollerImplementation is changed
      */
    event NewPendingImplementation(address oldPendingImplementation, address newPendingImplementation);

    /**
      * @notice Emitted when pendingComptrollerImplementation is accepted, which means comptroller implementation is updated
      */
    event NewImplementation(address oldImplementation, address newImplementation);
}
 