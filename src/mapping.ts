import {
  Domain,
} from "../generated/schema";
import {
  SetTextCall,
  TextChanged,
} from "../generated/Contract/Contract"
import { KEY_COM_TWITTER, KEY_TWITTER, KEY_VND_TWITTER } from "./constants";
import { sanitizeTwitterHandle } from "./helpers";

export function handleSetText(call: SetTextCall) {
  let node = call.inputs.node.toHexString();
  let domain = Domain.load(node);
  if (!domain) {
    domain = new Domain(node);
  }
  
  let key = call.inputs.key;

  // twitter handle
  if (key == KEY_TWITTER || key === KEY_COM_TWITTER || key == KEY_VND_TWITTER) {
    domain.twitter = sanitizeTwitterHandle(call.inputs.value);
  }

  domain.save();
}

export function handleTextChanged(event: TextChanged): void {}
