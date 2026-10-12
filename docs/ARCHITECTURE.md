# Architecture

WorkZeno is a Next.js application with an API boundary and a Soroban escrow contract. PostgreSQL is planned for identities, projects, submissions, notifications, and audit records. The Soroban contract is the authority for token custody and settlement—not the browser or database.

The present application is an in-memory demonstration workspace. It persists neither users nor financial records and does not submit Stellar transactions.

## Boundaries

- Browser: displays user-owned data and requests wallet signatures; never receives secret keys.
- API: validates authenticated marketplace operations and records audit data.
- Database: a projection of off-chain activity, never an escrow balance authority.
- Contract: authorizes funding and milestone release using client and freelancer addresses.

## Reconciliation

When persistence is added, confirmed contract events must be indexed with contract ID, ledger sequence, transaction hash, event index, and canonical status. Any disagreement between a database projection and contract read must mark the record for reconciliation rather than changing the contract state.
