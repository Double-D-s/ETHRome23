import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  EscrowCanceled,
  EscrowCompleted,
  EscrowConfirmed,
  EscrowCreated,
  EscrowPaid,
  OwnershipTransferred,
  RefundRequest,
  RefundResult
} from "../generated/MerchantEscrow/MerchantEscrow"

export function createEscrowCanceledEvent(
  escrowId: BigInt,
  buyer: Address
): EscrowCanceled {
  let escrowCanceledEvent = changetype<EscrowCanceled>(newMockEvent())

  escrowCanceledEvent.parameters = new Array()

  escrowCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  escrowCanceledEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )

  return escrowCanceledEvent
}

export function createEscrowCompletedEvent(
  escrowId: BigInt,
  seller: Address
): EscrowCompleted {
  let escrowCompletedEvent = changetype<EscrowCompleted>(newMockEvent())

  escrowCompletedEvent.parameters = new Array()

  escrowCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  escrowCompletedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return escrowCompletedEvent
}

export function createEscrowConfirmedEvent(
  escrowId: BigInt,
  buyer: Address
): EscrowConfirmed {
  let escrowConfirmedEvent = changetype<EscrowConfirmed>(newMockEvent())

  escrowConfirmedEvent.parameters = new Array()

  escrowConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  escrowConfirmedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )

  return escrowConfirmedEvent
}

export function createEscrowCreatedEvent(
  escrowId: BigInt,
  buyer: Address,
  seller: Address,
  amount: BigInt,
  title: string,
  description: string
): EscrowCreated {
  let escrowCreatedEvent = changetype<EscrowCreated>(newMockEvent())

  escrowCreatedEvent.parameters = new Array()

  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  escrowCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )

  return escrowCreatedEvent
}

export function createEscrowPaidEvent(
  escrowId: BigInt,
  buyer: Address,
  amount: BigInt
): EscrowPaid {
  let escrowPaidEvent = changetype<EscrowPaid>(newMockEvent())

  escrowPaidEvent.parameters = new Array()

  escrowPaidEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  escrowPaidEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  escrowPaidEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return escrowPaidEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRefundRequestEvent(
  escrowId: BigInt,
  buyer: Address,
  seller: Address,
  amount: BigInt,
  activeRefundRequestCount: BigInt,
  refundReason: string
): RefundRequest {
  let refundRequestEvent = changetype<RefundRequest>(newMockEvent())

  refundRequestEvent.parameters = new Array()

  refundRequestEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  refundRequestEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  refundRequestEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  refundRequestEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  refundRequestEvent.parameters.push(
    new ethereum.EventParam(
      "activeRefundRequestCount",
      ethereum.Value.fromUnsignedBigInt(activeRefundRequestCount)
    )
  )
  refundRequestEvent.parameters.push(
    new ethereum.EventParam(
      "refundReason",
      ethereum.Value.fromString(refundReason)
    )
  )

  return refundRequestEvent
}

export function createRefundResultEvent(
  escrowId: BigInt,
  buyer: Address,
  seller: Address,
  result: boolean,
  amount: BigInt
): RefundResult {
  let refundResultEvent = changetype<RefundResult>(newMockEvent())

  refundResultEvent.parameters = new Array()

  refundResultEvent.parameters.push(
    new ethereum.EventParam(
      "escrowId",
      ethereum.Value.fromUnsignedBigInt(escrowId)
    )
  )
  refundResultEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  refundResultEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  refundResultEvent.parameters.push(
    new ethereum.EventParam("result", ethereum.Value.fromBoolean(result))
  )
  refundResultEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return refundResultEvent
}
