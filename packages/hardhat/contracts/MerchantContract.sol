//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MerchantEscrow {

    // =========================== Enums ==============================

    enum Status { 
        OPEN,
        PAID,
        CONFIRMED,
        COMPLETED,
        REFUNDED,
        CANCELED
    }

    // =========================== Structs ==============================

    struct Escrow {
        address buyer; 
        address payable seller; 
        uint256 amount;
        Status escrowStatus;
        string title;
        string description;
    }
    
    // =========================== Mappings & Variables ==============================

    mapping(uint256 => Escrow) public escrows;

    uint256 public escrowCount;

  address payable public owner;
  IERC20 public token;

  // =========================== User functions ==============================

  constructor(IERC20 _token) {
      owner = payable(msg.sender);
      token = _token;
  }

  modifier onlyOwner() {
      require(msg.sender == owner, "Must be owner.");
        _;
  }

    function createEscrow(address payable _seller, uint256 _amount, string calldata _title, string calldata _description) external {
        escrows[escrowCount] = Escrow(address(0x0), _seller, _amount, Status.OPEN, _title, _description);
        escrowCount++;
        emit EscrowCreated(escrowCount, address(0x0), _seller, _amount, _title, _description);
    }

    function payEscrow(uint256 _escrowId) external {
        Escrow storage escrow = escrows[_escrowId];
        require(escrow.escrowStatus == Status.OPEN, "Funds have already been released");
        escrow.escrowStatus = Status.PAID;
        escrow.buyer = msg.sender;
        token.transferFrom(msg.sender, address(this), escrow.amount);
        emit EscrowPaid(_escrowId, msg.sender, escrow.amount);
    }

    function confirmEscrow(uint256 _escrowId) external {
        Escrow storage escrow = escrows[_escrowId];
        require(escrow.escrowStatus == Status.PAID, "Funds have already been released");
        require(msg.sender == escrow.buyer, "Only the buyer can confirm that purchase was completed");
        escrow.escrowStatus = Status.CONFIRMED;
        emit EscrowConfirmed(_escrowId, msg.sender);
    }

    function completeEscrow(uint256 _escrowId) external {
        Escrow storage escrow = escrows[_escrowId];
        require(msg.sender == escrow.seller, "Only the seller can release funds");
        require(escrow.escrowStatus == Status.CONFIRMED, "Funds have already been released or ");
        escrow.escrowStatus = Status.COMPLETED;
        token.transfer(escrow.seller, escrow.amount);
        emit EscrowCompleted(_escrowId, msg.sender);
    }

    // =========================== Owner functions ==============================

    // =========================== Events ==============================

     // Event emitted when a new escrow is created
    event EscrowCreated(
        uint256 indexed escrowId,
        address indexed buyer,
        address indexed seller,
        uint256 amount,
        string title,
        string description
    );

    // Event emitted when a buyer pays an escrow
    event EscrowPaid(
        uint256 indexed escrowId,
        address indexed buyer,
        uint256 amount
    );

    // Event emitted when a buyer confirms that the purchase was completed
    event EscrowConfirmed(
        uint256 indexed escrowId,
        address indexed buyer
    );

    // Event emitted when a seller completes an escrow and funds are released
    event EscrowCompleted(
        uint256 indexed escrowId,
        address indexed seller
    );

    // Event emitted when an escrow is refunded
    event EscrowRefunded(
        uint256 indexed escrowId,
        address indexed buyer,
        uint256 amount
    );

    // Event emitted when an escrow is canceled
    event EscrowCanceled(
        uint256 indexed escrowId,
        address indexed buyer
    );
}