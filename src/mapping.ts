import { Domain, TwitterHandle, Node } from "../generated/schema";
import {
  SetTextCall,
  AddressChanged,
} from "../generated/PublicResolveV1/Resolver";
import { NewOwner, Transfer } from "../generated/Registrar/Registrar";

function toLowerCase(str: string): string {
  let chars = str.split("");
  for (let i = 0; i < chars.length; i += 1) {
    let char = chars[i];
    let charCode = char.charCodeAt(0);
    if (charCode > 64 && charCode < 91) {
      chars[i] = String.fromCharCode(charCode + 32);
    } else {
      chars[i] = char;
    }
  }
  return chars.join("");
}

function resolveTwitterHandle(raw: string): string {
  let raw_ = raw.trim();
  if (raw_ == "") return "";
  let chunks = raw_.split("/");
  let handle = chunks[chunks.length - 1];
  return toLowerCase(handle[0] == "@" ? handle.substr(1) : handle);
}

/**
 * Update text record
 * @param call
 * @returns
 */
export function handleSetText(call: SetTextCall): void {
  let key = call.inputs.key;
  if (
    !key.includes("twitter") &&
    !key.includes("Twitter") &&
    !key.includes("TWITTER")
  )
    return;

  // retrieve node
  let id = call.inputs.node.toHexString();
  let node = Node.load(id);
  if (node == null) {
    node = new Node(id);
  }

  // retrieve handle
  let raw = call.inputs.value;
  let handle = resolveTwitterHandle(raw);
  let twitterHandle = TwitterHandle.load(handle);
  if (twitterHandle == null) {
    twitterHandle = new TwitterHandle(handle);
    twitterHandle.raw = raw;
    twitterHandle.nodes = [];
  }

  // update now
  node.save();

  // update twitter handle
  let nodes = twitterHandle.nodes;
  if (!nodes.includes(node.id)) nodes.push(node.id);
  twitterHandle.nodes = nodes;
  twitterHandle.save();
}

/**
 * New subnode domain found
 * @param event
 */
export function handleNewOwner(event: NewOwner): void {
  // retrieve node
  let id = event.params.node.toHexString();
  let node = Node.load(id);
  if (node == null) {
    node = new Node(id);
  }

  // retrieve domain
  let domain = Domain.load(id);
  if (domain == null) {
    domain = new Domain(id);
  }

  // update domain
  domain.owner = event.params.owner;
  domain.save();

  // update node
  node.domain = id;
  node.save();
}

/**
 * Transfer domain owner
 * @param event
 * @returns
 */
export function handleTransfer(event: Transfer): void {
  // retrieve node
  let id = event.params.node.toHexString();
  let node = Node.load(id);
  if (node == null) {
    node = new Node(id);
  }

  // retrieve domain
  let domain = Domain.load(id);
  if (domain == null) {
    domain = new Domain(id);
  }

  // update domain
  domain.owner = event.params.owner;
  domain.save();

  // update node
  node.domain = id;
  node.save();
}

/**
 * Set ETH address
 * @param event
 * @returns
 */
export function handleAddressChanged(event: AddressChanged): void {
  // retrieve domain
  let id = event.params.node.toHexString();
  let domain = Domain.load(id);
  if (domain == null) {
    domain = new Domain(id);
  }

  // update domain
  let coinType = event.params.coinType.toI32();
  if (coinType != 60) return;
  domain.eth_address = event.params.newAddress;
  domain.save();
}
