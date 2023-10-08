//SPDX-License-Identifier: MIT
pragma solidity ^ 0.8 .20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract MerchantEscrow is Ownable {
    // =========================== Enums ==============================
    enum Status {
        OPEN,
        PAID,
        CONFIRMED,
        COMPLETED,
        REFUNDED,
        CANCELED,
        // Refund states
        REFUND_REQUESTED,
        REFUND_REJECTED,
        REFUND_ACCEPTED
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
    struct Request {
        uint256 escrowId;
        string reason;
    }
    // =========================== Mappings & Variables ==============================
    mapping(uint256 => Escrow) public escrows;
    Request[] public activeRefundRequests;
    uint256 public escrowCount;
    IERC20 public token;
    // =========================== User functions ==============================
    constructor(IERC20 _token) Ownable(msg.sender) {
        token = _token;
    }

    function createEscrow(address payable _seller, uint256 _amount, string calldata _title, string calldata _description) external {
        escrows[escrowCount] = Escrow(address(0x0), _seller, _amount, Status.OPEN, _title, _description);
        escrowCount++;
        emit EscrowCreated(escrowCount, address(0x0), _seller, _amount, _title, _description);
    }

    function payEscrow(uint256 _escrowId) external checkIfEscrowExists(_escrowId) {
        Escrow storage escrow = escrows[_escrowId];
        require(escrow.escrowStatus == Status.OPEN, "Funds have already been released");
        escrow.escrowStatus = Status.PAID;
        escrow.buyer = msg.sender;
        token.transferFrom(msg.sender, address(this), escrow.amount);
        emit EscrowPaid(_escrowId, msg.sender, escrow.amount);
    }

    function confirmEscrow(uint256 _escrowId) external checkIfEscrowExists(_escrowId) {
        Escrow storage escrow = escrows[_escrowId];
        require(escrow.escrowStatus == Status.PAID, "Funds have already been released");
        require(msg.sender == escrow.buyer, "Only the buyer can confirm that purchase was completed");
        escrow.escrowStatus = Status.CONFIRMED;
        emit EscrowConfirmed(_escrowId, msg.sender);
    }

    function completeEscrow(uint256 _escrowId) external checkIfEscrowExists(_escrowId) {
        Escrow storage escrow = escrows[_escrowId];
        require(msg.sender == escrow.seller, "Only the seller can release funds");
        require(escrow.escrowStatus == Status.CONFIRMED, "Escrow state has to be set to confirmed");
        escrow.escrowStatus = Status.COMPLETED;
        token.transfer(escrow.seller, escrow.amount);
        emit EscrowCompleted(_escrowId, msg.sender);
    }

    function cancelEscrow(uint256 _escrowId) external checkIfEscrowExists(_escrowId) {
        Escrow storage escrow = escrows[_escrowId];
        require(msg.sender == escrow.seller, "Only the seller can cancel escrow");
        require(escrow.escrowStatus == Status.OPEN, "Escrow can only be canceled when it's state is open");
        escrow.escrowStatus = Status.CANCELED;
        emit EscrowCanceled(_escrowId, msg.sender);
    }

    function requestRefund(uint256 _escrowId, string calldata _reason) external checkIfEscrowExists(_escrowId) {
        Escrow storage escrow = escrows[_escrowId];
        require(msg.sender == escrow.buyer, "Only the buyer can request refund");
        require(escrow.escrowStatus == Status.PAID, "Escrow state has to be set to paid to request refund");
        escrow.escrowStatus = Status.REFUND_REQUESTED;
        token.transfer(escrow.seller, escrow.amount);
        activeRefundRequests.push(Request(_escrowId, _reason));
        emit RefundRequest(_escrowId, msg.sender, escrow.seller, escrow.amount, activeRefundRequests.length, _reason);
    }
    // =========================== Owner functions ==============================
    function reviewRefund(uint256 _refundId, bool _refundDecision) external onlyOwner {
        Request storage request = activeRefundRequests[_refundId];
        Escrow storage escrow = escrows[request.escrowId];
        require(_refundId < activeRefundRequests.length, "Can't review nonexisting refund request");
        require(escrow.escrowStatus == Status.REFUND_REQUESTED, "Payment can only be reversed if refund was requested");
        escrow.escrowStatus = Status.REFUND_ACCEPTED;
        emit RefundResult(request.escrowId, escrow.buyer, escrow.seller, _refundDecision, escrow.amount);
        activeRefundRequests[_refundId] = activeRefundRequests[activeRefundRequests.length - 1];
        activeRefundRequests.pop();
    }
    // =========================== Modifiers ==============================
    modifier checkIfEscrowExists(uint256 _escrowId) {
        require(_escrowId < escrowCount, "Escrow with provided escrowId does not exist");
        _;
    }
    // =========================== Events ==============================
    // Event emitted when a new escrow is created
    event EscrowCreated(uint256 indexed escrowId, address indexed buyer, address indexed seller, uint256 amount, string title, string description);
    // Event emitted when a buyer pays an escrow
    event EscrowPaid(uint256 indexed escrowId, address indexed buyer, uint256 amount);
    // Event emitted when a buyer confirms that the purchase was completed
    event EscrowConfirmed(uint256 indexed escrowId, address indexed buyer);
    // Event emitted when a seller completes an escrow and funds are released
    event EscrowCompleted(uint256 indexed escrowId, address indexed seller);
    // Event emitted when an escrow refund is requested
    event RefundRequest(uint256 indexed escrowId, address indexed buyer, address indexed seller, uint256 amount, uint256 activeRefundRequestCount, string refundReason);
    // Event emitted when an escrow refund is reviewed
    event RefundResult(uint256 indexed escrowId, address indexed buyer, address indexed seller, bool result, uint256 amount);
    // Event emitted when an escrow is canceled
    event EscrowCanceled(uint256 indexed escrowId, address indexed buyer);
}