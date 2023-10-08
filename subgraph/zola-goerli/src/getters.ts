import { BigInt } from "@graphprotocol/graph-ts";
import { ZERO, ZERO_ADDRESS } from "./constants";
import { Escrow } from "../generated/schema";

export function getOrCreateEscrow(id: string): Escrow {
  let escrow = Escrow.load(id)

  if (!escrow) {
    escrow = new Escrow(id.toString())
    escrow.buyer = ZERO_ADDRESS
    escrow.description = ""
    escrow.seller = ZERO_ADDRESS
    escrow.refund = false
    escrow.title = ""
    escrow.save()
  }

  return escrow;
}
