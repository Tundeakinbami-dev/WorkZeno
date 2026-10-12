# WorkZeno

> **Status: prototype.** The repository contains a runnable web workspace demonstration and an uncompiled Soroban escrow prototype. It is not ready for real funds or production use.

WorkZeno is intended to be a Stellar-native freelance marketplace for milestone-based work. A client and freelancer agree on deliverables and milestone amounts, the client funds an escrow, the freelancer submits evidence, and an approved milestone releases payment through a Soroban smart contract.

## Problem

Freelance work needs a credible way to show that a client has funded payment while keeping clients in control of release until agreed work is delivered. Direct wallet transfers do not provide milestone controls, a review workflow, or an auditable payment trail.

## Intended product

- Client and freelancer accounts with public profiles and Stellar wallet association.
- Project discovery, proposals, invitations, and project membership.
- Milestone definitions, submissions, review, approval, rejection, and disputes.
- A Soroban escrow contract that enforces funding, authorization, release, refund, and duplicate-payment protections.
- Stellar testnet transaction status and explorer links.
- Off-chain persistence for projects, submissions, notifications, and audit history; on-chain state remains authoritative for funds.

## Why Stellar and Soroban

Stellar provides a low-cost network suitable for cross-border payments. Soroban allows the escrow rules—milestone allocations, authorization, and valid state transitions—to execute on-chain rather than relying on the application database or frontend.

## Repository status

The only committed materials at present are the following proposal documents:

- [`docs/ESCROWAFRICA_PRODUCT_AND_ARCHITECTURE_BLUEPRINT.md`](docs/ESCROWAFRICA_PRODUCT_AND_ARCHITECTURE_BLUEPRINT.md) — commercial product and architecture proposal.
- [`docs/ESCROWAFRICA_MVP_TECHNOLOGY_STACK.md`](docs/ESCROWAFRICA_MVP_TECHNOLOGY_STACK.md) — recommended stack and operational considerations.

Those documents describe **EscrowAfrica**, including an EVM/Base/USDC design. They are reference material only and do not yet match the WorkZeno Stellar/Soroban implementation described in `Prompt.md`. Before implementation begins, the product owner should reconcile the chain and product decision.

The repository now includes a Next.js workspace, shared domain validation, a Soroban contract prototype, baseline documentation, and GitHub Actions CI. Authentication, PostgreSQL persistence, wallet signing, a deployed contract, transaction tracking, and full end-to-end tests are still pending.

## Proposed architecture

```text
Next.js web app
       |
       +-- authenticated API / server actions ---- PostgreSQL
       |                  |                         (projects, submissions,
       |                  |                          audit and notifications)
       |                  |
       |                  +---- Stellar SDK ---- Stellar testnet / Soroban
       |                                        (authoritative escrow state)
       |
Freelancer and client wallets sign value-moving transactions
```

Suggested monorepo layout:

```text
apps/web/                       Next.js application
apps/api/                       API service, if separate from the web app
packages/shared/                Shared types and validation schemas
contracts/workzeno-escrow/      Rust/Soroban contract and tests
docs/                           Architecture, security, testing, and deployment docs
.github/workflows/              Continuous integration workflows
```

## Prerequisites for the planned implementation

- Node.js 22 or later and a package manager such as pnpm.
- PostgreSQL 16 or later.
- Rust stable, `cargo`, the `wasm32v1-none` target, and Stellar CLI/Soroban tooling.
- A Stellar testnet account and a supported Stellar wallet for manual end-to-end testing.

Never place seed phrases, private keys, production database URLs, or provider credentials in source control. Keep local values in `.env`, which should be ignored by Git.

## Planned local workflow

Install dependencies and run:

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
cargo test --manifest-path contracts/workzeno-escrow/Cargo.toml
```

## Security principles

- The contract, not the web application or database, authorizes releases and refunds.
- Amounts must use integer base units—never JavaScript floating-point values.
- Wallet ownership must be proven with a signature; a public address alone is not identity verification.
- Private deliverables and personal data remain off-chain; only minimum necessary identifiers or hashes should be recorded on-chain.
- Testnet assets have no real monetary value. Mainnet deployment requires separate security, operational, and legal review.

## Current limitations

WorkZeno is not a production product. It has no authentication, persistence, wallet connection, Stellar testnet deployment, transaction execution, or end-to-end testnet evidence. The Soroban contract has not been compiled in this environment. Do not use this repository to hold or move funds.

## Development roadmap

1. Confirm whether WorkZeno will follow the Stellar/Soroban brief or the Base/USDC EscrowAfrica blueprint.
2. Scaffold the monorepo, environment configuration, PostgreSQL schema, and CI.
3. Implement and test the escrow contract before integrating a user interface.
4. Build authenticated project, proposal, milestone, and audit workflows.
5. Add wallet signing, testnet transaction tracking, reconciliation, and end-to-end tests.
6. Conduct a security review before any mainnet or real-value use.

## Contributing

Until contribution guidance and automated checks are added, keep changes small, do not commit secrets, run all available checks before opening a pull request, and preserve the distinction between planned and verified functionality.

## License

No license has been added. All rights are reserved unless and until the project owner adds a license file.
