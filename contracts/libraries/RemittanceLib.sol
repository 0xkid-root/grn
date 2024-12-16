// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library RemittanceLib {
    enum TransferStatus { Pending, Completed, Cancelled }

    struct Transfer {
        address sender;
        address recipient;
        uint256 amount;
        TransferStatus status;
        uint256 timestamp;
    }

    /**
     * @dev Completes a transfer
     * @param transfer The transfer to complete
     */
    function complete(Transfer storage transfer) internal {
        require(transfer.status == TransferStatus.Pending, "Invalid transfer status");
        transfer.status = TransferStatus.Completed;
    }

    /**
     * @dev Cancels a transfer
     * @param transfer The transfer to cancel
     */
    function cancel(Transfer storage transfer) internal {
        require(transfer.status == TransferStatus.Pending, "Invalid transfer status");
        transfer.status = TransferStatus.Cancelled;
    }
}