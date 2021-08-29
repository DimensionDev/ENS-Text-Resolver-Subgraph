import { Domain } from "../generated/schema";
import { SetTextCall } from "../generated/PublicResolveV1/Contract"

export function handleSetText(call: SetTextCall): void {
  let node = call.inputs.node.toHexString();
  let key = call.inputs.key;

  let domain = Domain.load(node);

  if (!domain) {
    domain = new Domain(node);
  }

  if (key.includes('twitter') || key.includes('Twitter')) {
    domain.key = key;
    domain.node = node;
    domain.twitter = call.inputs.value;
    domain.save();
  }
}
