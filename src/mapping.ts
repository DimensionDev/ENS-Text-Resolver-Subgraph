import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  ABIChanged,
  AddrChanged,
  AddressChanged,
  AuthorisationChanged,
  ContenthashChanged,
  DNSRecordChanged,
  DNSRecordDeleted,
  DNSZoneCleared,
  InterfaceChanged,
  NameChanged,
  PubkeyChanged,
  TextChanged
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"

export function handleABIChanged(event: ABIChanged): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.node = event.params.node
  entity.contentType = event.params.contentType

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.ABI(...)
  // - contract.addr(...)
  // - contract.addr(...)
  // - contract.authorisations(...)
  // - contract.contenthash(...)
  // - contract.dnsRecord(...)
  // - contract.hasDNSRecords(...)
  // - contract.interfaceImplementer(...)
  // - contract.name(...)
  // - contract.pubkey(...)
  // - contract.supportsInterface(...)
  // - contract.text(...)
}

export function handleAddrChanged(event: AddrChanged): void {}

export function handleAddressChanged(event: AddressChanged): void {}

export function handleAuthorisationChanged(event: AuthorisationChanged): void {}

export function handleContenthashChanged(event: ContenthashChanged): void {}

export function handleDNSRecordChanged(event: DNSRecordChanged): void {}

export function handleDNSRecordDeleted(event: DNSRecordDeleted): void {}

export function handleDNSZoneCleared(event: DNSZoneCleared): void {}

export function handleInterfaceChanged(event: InterfaceChanged): void {}

export function handleNameChanged(event: NameChanged): void {}

export function handlePubkeyChanged(event: PubkeyChanged): void {}

export function handleTextChanged(event: TextChanged): void {}
