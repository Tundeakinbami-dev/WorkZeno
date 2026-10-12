# Security notes

- Treat every browser request as untrusted; authorization must be checked server-side.
- Use integer token base units (`i128` in the contract and `bigint` in TypeScript). Never use floating point for money.
- Contract calls use `require_auth` for client/freelancer actions and reject invalid states.
- Wallet association must use a domain-bound, expiring signature challenge. An address is not proof of identity.
- Do not store seed phrases, private keys, deliverables, or personal data on-chain.
- Show payments as pending until a successful transaction and contract state read confirm them.
- Add rate limits, CSRF protections where cookie sessions are used, audit events, and idempotency keys before exposing write APIs.

This code is not audited and is not suitable for mainnet or real-value funds.
