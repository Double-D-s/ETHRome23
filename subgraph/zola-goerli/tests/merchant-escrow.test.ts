import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { EscrowCanceled } from "../generated/schema"
import { EscrowCanceled as EscrowCanceledEvent } from "../generated/MerchantEscrow/MerchantEscrow"
import { handleEscrowCanceled } from "../src/mappings/merchant-escrow"
import { createEscrowCanceledEvent } from "./merchant-escrow-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let escrowId = BigInt.fromI32(234)
    let buyer = Address.fromString("0x0000000000000000000000000000000000000001")
    let newEscrowCanceledEvent = createEscrowCanceledEvent(escrowId, buyer)
    handleEscrowCanceled(newEscrowCanceledEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("EscrowCanceled created and stored", () => {
    assert.entityCount("EscrowCanceled", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "EscrowCanceled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "escrowId",
      "234"
    )
    assert.fieldEquals(
      "EscrowCanceled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "buyer",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
