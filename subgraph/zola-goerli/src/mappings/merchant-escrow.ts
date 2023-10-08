import {
  EscrowCanceled,
  EscrowCanceled as EscrowCanceledEvent,
  EscrowCompleted as EscrowCompletedEvent,
  EscrowConfirmed as EscrowConfirmedEvent,
  EscrowCreated as EscrowCreatedEvent,
  EscrowPaid as EscrowPaidEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  RefundRequest as RefundRequestEvent,
  RefundResult as RefundResultEvent
} from "../../generated/MerchantEscrow/MerchantEscrow"
import { Escrow } from "../../generated/schema"
import { getOrCreateEscrow } from "../getters"


export function handleEscrowCreated(event: EscrowCreatedEvent): void {
  let entity = getOrCreateEscrow(
    event.transaction.hash.concatI32(event.logIndex.toI32())
      .toString()
  )
  entity.buyer = event.params.buyer
  entity.description = event.params.description
  entity.seller = event.params.seller
  entity.title = event.params.title
  entity.amount = event.params.amount
  entity.escrowStatus = "EscrowCreated"
  entity.save()
}

export function handleEscrowCanceled(event: EscrowCanceledEvent): void {
  let entity = getOrCreateEscrow(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toString()
  )
  entity.escrowStatus = "EscrowCanceled"
  entity.save()
}


export function handleEscrowPaid(event: EscrowPaidEvent): void {
  let entity = getOrCreateEscrow(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toString()
  )
  entity.escrowStatus = "EscrowPaid"
  entity.save()
}

export function handleEscrowConfirmed(event: EscrowConfirmedEvent): void {
  let entity = getOrCreateEscrow(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toString()
  )
  entity.escrowStatus = "EscrowConfirmend"
  entity.save()
}

export function handleEscrowCompleted(event: EscrowCompletedEvent): void {
  let entity = getOrCreateEscrow(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toString()
  )
  entity.escrowStatus = "EscrowCompleted"
  entity.save()
}

export function handleRefundRequest(event: RefundRequestEvent): void {
  let entity = getOrCreateEscrow(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toString()
  )
  entity.refund = true
  entity.save()
}
