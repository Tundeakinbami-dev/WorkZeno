# Soroban escrow contract

The source is at `contracts/workzeno-escrow`. It has one agreement per contract instance and keeps client, freelancer, token, total amount, funding state, and separately stored milestones.

## State transitions

```text
Draft --fund--> Funded --submit--> Submitted --approve_and_release--> Released
                                           \--dispute---------------> Disputed
```

`create` requires a positive total and milestone amounts that reconcile exactly. `fund` requires client authorization and transfers the agreed token amount to the contract. `submit` requires freelancer authorization. `approve_and_release` requires client authorization and transfers only the selected milestone amount to the freelancer. A released milestone cannot be released twice because it is no longer `Submitted`.

The current MVP deliberately freezes a disputed milestone. It does not include an arbitrator resolution or cancellation/refund path yet, so it must not hold real value. Those paths require a reviewed trust model, explicit arbitrator authorization, and tests before deployment.

## Build and test

```bash
rustup target add wasm32v1-none
cargo test --manifest-path contracts/workzeno-escrow/Cargo.toml
stellar contract build --manifest-path contracts/workzeno-escrow/Cargo.toml
```

The Rust and Stellar CLI toolchains are not installed in the current environment, so these commands have not been executed.
