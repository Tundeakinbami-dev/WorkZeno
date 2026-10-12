# Deployment

Deploy only to Stellar testnet after the contract compiles, contract tests cover all financial operations, and a contract ID is recorded in protected environment configuration.

1. Build the WASM contract with Stellar CLI.
2. Create a funded Stellar testnet account outside the repository.
3. Deploy the contract and configure its token and participant addresses through wallet-signed transactions.
4. Set `NEXT_PUBLIC_ESCROW_CONTRACT_ID` only after independently verifying the contract ID and network.
5. Submit and confirm a complete testnet workflow before presenting the integration as complete.

Do not deploy to mainnet from this repository in its present state.
