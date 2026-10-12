# Contributing

Use small pull requests, preserve unrelated work, and do not commit credentials. Add or update tests for behavior changes. Run `npm run validate` and, where Rust is available, `npm run contract:test` before opening a pull request.

Financial behavior needs explicit state-transition tests and security review. Never represent a mock, local test, or transaction hash as a confirmed testnet payment.
