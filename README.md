ENS Text Resolver Subgraph
=====

## Setup

```bash
yarn
yarn codegen
yarn build
```

## Running Locally

Make sure to update package.json settings to point to your own graph account.

### Contracts

### Registrar

| Registrar Name | Address |
| -------------- | ------- |
| ENS: Registry with Fallback | https://etherscan.io/address/0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e |

### Resolvers

| Resolver Name | Address |
| ------------- | ------- |
| Public Resolver 1 | https://etherscan.io/address/0xdaaf96c344f63131acadd0ea35170e7892d3dfba |
| Public Resolver 2 | https://etherscan.io/address/0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41 |
| Old Public Resolver 1 | https://etherscan.io/address/0x1da022710df5002339274aadee8d58218e9d6ab5 |
| Old Public Resolver 2 | https://etherscan.io/address/0x226159d592e2b063810a10ebf6dcbada94ed68b8 |

## Key Entity Overviews

### Domain

Contains data about a domain.

### TwitterHandle
Contains data about a Twitter handle.