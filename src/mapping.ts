import { Domain } from "../generated/schema";
import { SetTextCall } from "../generated/PublicResolveV1/Contract"
import { KEY_COM_TWITTER, KEY_TWITTER, KEY_VND_TWITTER } from "./constants";
import { sanitizeTwitterHandle } from "./helpers";

export function handleSetText(call: SetTextCall): void {
  let node = call.inputs.node.toHexString();
  let domain = Domain.load(node);
  if (!domain) {
    domain = new Domain(node);
  }

  // set domain data
  domain.node = call.inputs.node;
  domain.twitter = "";

  let key = call.inputs.key;

  // twitter handle
  if (key == KEY_TWITTER || key === KEY_COM_TWITTER || key == KEY_VND_TWITTER) {
    domain.twitter = sanitizeTwitterHandle(call.inputs.value);
  }

  domain.save();
}
