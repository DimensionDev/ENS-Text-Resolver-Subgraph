import { Address, ByteArray } from '@graphprotocol/graph-ts';
import { Domain, TwitterHandle } from '../generated/schema';
import { SetTextCall, AddressChanged } from '../generated/PublicResolveV1/Resolver'
import { NewOwner, Transfer } from '../generated/Registrar/Registrar'

function toLowerCase(str: string): string {
  let chars = str.split('');
  for (let i = 0; i < chars.length; i += 1) {
    let char = chars[i];
    let charCode = char.charCodeAt(0);
    if (charCode > 64 && charCode < 91) {
      chars[i] = String.fromCharCode(charCode + 32);
    } else {
      chars[i] = char;
    }
  }
  return chars.join('');
}

function resolveTwitterHandle(raw: string): string {
  let raw_ = raw.trim();
  if (raw_ == '') return '';
  let chunks = raw_.split('/');
  let handle = chunks[chunks.length - 1];
  return toLowerCase(handle[0] == '@' ? handle.substr(1) : handle);
}

function createDomain(id: string): Domain {
  let domain = Domain.load(id);
  if (domain == null) {
    domain = new Domain(id);
  }
  return domain as Domain;
}

function createTwitterHandle(raw: string): TwitterHandle {
  let handle = resolveTwitterHandle(raw);
  let twitterHandle = TwitterHandle.load(handle);
  if (!twitterHandle) {
    twitterHandle = new TwitterHandle(handle);
    twitterHandle.raw = raw;
    twitterHandle.domains = [];
  }
  return twitterHandle as TwitterHandle;
}

/**
 * Update text record
 * @param call 
 * @returns 
 */
export function handleSetText(call: SetTextCall): void {
  let key = call.inputs.key;
  if (!key.includes('twitter') && !key.includes('Twitter') && !key.includes('TWITTER')) return;

  // retrieve entities
  let id = call.inputs.node.toHexString();
  let raw = call.inputs.value;
  let domain = createDomain(id);
  let twitterHandle = createTwitterHandle(raw);

  // update domain
  domain.save();

  // update twitter handle
  let domains = twitterHandle.domains;
  if (!domains.includes(domain.id)) domains.push(domain.id);
  twitterHandle.domains = domains;
  twitterHandle.save();
}

/**
 * New subnode domain found
 * @param event 
 */
export function handleNewOwner(event: NewOwner): void {
  // retrieve entities
  let id = event.params.node.toHexString();
  let domain = createDomain(id);

  // update domain
  domain.owner = event.params.owner;
  domain.save();
}

/**
 * Transfer domain owner
 * @param event 
 * @returns 
 */
export function handleTransfer(event: Transfer): void {
  // retrieve entities
  let id = event.params.node.toHexString();
  let domain = createDomain(id);

  // update domain
  domain.owner = event.params.owner;
  domain.save();
}

/**
 * Set ETH address
 * @param event 
 * @returns 
 */
export function handleAddressChanged(event: AddressChanged): void {
  // retrieve entities
  let id = event.params.node.toHexString();
  let domain = createDomain(id);

  // update domain
  if (!domain) return;
  if (event.params.coinType.toI32() != 60) return;
  domain.eth_address = event.params.newAddress;
  domain.save();
}