# CODEX MASTER PROMPT: BUILD WORKZENO FROM ZERO TO A WORKING STELLAR PRODUCT

## 1. Your Role

Act as a senior full-stack software engineer, Stellar/Soroban smart contract engineer, security engineer, test engineer, and technical product architect.

Your task is to build **WorkZeno**, a complete, working freelance marketplace and milestone-based payment escrow platform powered by Stellar and Soroban smart contracts.

The project repository is:

`Tundeakinbami-dev/WorkZeno`

The repository has not yet had its source code implemented. Treat this as a greenfield product unless inspection reveals existing files or functionality that should be preserved.

Work independently, make sensible engineering decisions, and move quickly. Do not stop after writing a proposal, README, architecture document, or implementation plan. Implement the actual product, run the tests, diagnose failures, and fix them.

Do not ask me to approve every ordinary engineering decision. Ask questions only when an external credential, irreversible operation, genuinely ambiguous business rule, or important product decision makes progress impossible.

## 2. Primary Objective

Build a credible, secure, testable Stellar-native product that can be demonstrated to developers, users, and reviewers of the Stellar Wave Program.

The product must have:

- A functional, responsive web application.
- A real Soroban smart contract implementing milestone escrow.
- Stellar testnet integration.
- Client and freelancer workflows.
- Persistent off-chain project and user data.
- Automated contract, application, and integration tests.
- Reproducible development and deployment instructions.
- Strong technical documentation.
- GitHub Actions CI.
- A demonstrable end-to-end user journey.

Do not treat a sophisticated UI, a blockchain-themed landing page, or a mock transaction as a completed product.

The implementation must demonstrate genuine technical substance and meaningful use of Stellar.

Program acceptance is not guaranteed. Optimize for actual product quality, ecosystem relevance, transparency, and verifiable evidence.

## 3. Product Definition

WorkZeno is a platform that helps clients and freelancers collaborate through milestone-based projects.

A client creates a project, selects or invites a freelancer, agrees to milestone conditions, and funds the required escrow. The freelancer submits evidence of completed work. The client approves or rejects the submission according to the agreed workflow. Upon valid approval, the contract releases the corresponding payment.

The platform must distinguish between:

1. Off-chain marketplace operations.
2. On-chain financial state and authorization.
3. Evidence, notifications, and audit history.
4. Administrative and dispute-resolution operations.

The blockchain must enforce the financial rules. The backend and frontend must never be trusted to authorize an otherwise invalid release of escrowed funds.

## 4. First Action: Inspect and Establish the Repository

Before making changes:

1. Inspect all existing repository files, branches where available, Git history, configuration, and project metadata.
2. Determine whether the repository contains any existing code, documentation, licenses, or user work.
3. Preserve useful existing work.
4. Identify the current branch and working-tree changes. Never overwrite unrelated user modifications.
5. Establish a concise implementation checklist and immediately proceed to implementation.

Create a coherent monorepo unless existing repository constraints justify another structure.

Use a structure similar to:

- `apps/web/` for the Next.js application.
- `apps/api/` for the backend API if a separate API service is justified.
- `packages/shared/` for shared types and validation.
- `contracts/workzeno-escrow/` for the Rust/Soroban contract.
- `docs/` for architecture, security, deployment, and operations.
- `.github/workflows/` for CI.
- Root configuration for package management, formatting, and development scripts.

Do not create unnecessary services or abstractions. Prefer the simplest architecture that delivers the complete product reliably.

## 5. Technology Stack

Use a modern, compatible, production-oriented stack.

### Frontend

- Next.js with the App Router.
- React and TypeScript with strict type checking.
- Tailwind CSS.
- An accessible component system such as shadcn/ui where appropriate.
- React Hook Form and Zod for form validation.
- TanStack Query where server-state management benefits from it.

### Smart contracts

- Rust.
- The current compatible stable Soroban SDK.
- Stellar testnet for development and demonstration.
- Stellar's supported contract testing and CLI tooling.

### Backend and persistence

- PostgreSQL.
- Prisma ORM.
- A supported authentication solution.
- Server-side validation and authorization.
- A documented database migration workflow.

### Testing and quality

- Rust unit and contract tests.
- Vitest for TypeScript application logic.
- React Testing Library for important UI workflows.
- Playwright for end-to-end browser tests.
- ESLint and formatting tools.
- GitHub Actions for continuous integration.

Verify compatibility before selecting dependency versions. Pin versions appropriately and commit lockfiles.

Do not add every library listed above if it does not serve a real implementation need. Avoid unnecessary complexity.

## 6. Soroban Escrow Contract

Implement the actual escrow logic before connecting the user interface to it.

Design a clearly documented contract state machine.

At minimum, support:

- Creating an escrow agreement.
- Recording the client and freelancer identities.
- Defining the supported payment asset and amount.
- Defining milestone identifiers, amounts, deadlines, and states.
- Funding the escrow.
- Recording valid work-submission or approval state as appropriate.
- Releasing a funded milestone after valid authorization.
- Handling cancellation only under explicit, enforceable conditions.
- Tracking completed releases and refunded amounts.
- Preventing duplicate payments.
- Emitting useful contract events.
- Querying escrow and milestone state.

Use an explicit state machine with documented transitions. Reject invalid transitions rather than trying to repair them silently.

### Contract requirements

1. Verify authorization for all privileged operations.
2. Ensure the client cannot withdraw funds after the agreement becomes irrevocable except under the contract's documented cancellation rules.
3. Ensure the freelancer cannot release funds without satisfying the release conditions.
4. Prevent reentrancy or other execution-order vulnerabilities where applicable to the chosen contract design.
5. Prevent duplicate funding and duplicate payouts.
6. Validate amounts, addresses, identifiers, milestone allocations, and state transitions.
7. Handle partial funding only if the financial model explicitly supports it.
8. Ensure total milestone allocations reconcile with the agreed escrow amount.
9. Track released, refunded, and remaining balances consistently.
10. Avoid unbounded storage growth and unnecessary on-chain data.
11. Write security-focused tests for every financial operation.

Use a suitable Stellar asset interface and transfer mechanism supported by the selected Soroban SDK. Do not invent APIs or rely on obsolete examples.

### Multiple milestones

Design the contract so that an agreement can contain multiple milestones with independently tracked amounts and statuses.

Prevent releasing more than the amount allocated to a milestone.

Define how the system behaves when one milestone is approved while another remains incomplete.

### Disputes and cancellation

Do not implement an arbitrary administrative withdrawal function.

For the MVP, choose a simple, explicit dispute policy. A disputed milestone may be frozen pending resolution, with no automatic payout to either party.

If an arbitrator or multisignature resolution mechanism is introduced, document its authority, authorization requirements, trust assumptions, and limits.

Cancellation and refunds must have deterministic rules that cannot be bypassed by the frontend or backend.

### Asset and network safety

Use Stellar testnet for the initial implementation.

Clearly distinguish testnet from mainnet throughout configuration and the interface.

Do not hardcode mainnet asset assumptions. Validate the asset contract or identifier and the network configuration.

Do not claim that testnet assets have real monetary value.

## 7. Stellar Integration

Integrate the application with the Stellar network through maintained, compatible SDKs and documented APIs.

Implement:

- Network configuration.
- Contract deployment instructions.
- Contract identification and configuration.
- Wallet connection.
- Transaction preparation, signing, and submission.
- Transaction status tracking.
- Contract state reads.
- Event or transaction history where supported.
- Clear handling of pending, successful, failed, and expired transactions.
- Testnet explorer links generated from the configured network.
- Helpful wallet and network error messages.

Use a supported Stellar wallet integration approach and verify that the chosen library works with the selected Next.js version.

Never expose secret keys, seed phrases, or private signing material to browser code, logs, or source control.

Do not build a custodial wallet for the MVP.

The user should approve transactions through their wallet when the selected flow requires wallet authorization.

Handle transaction retries carefully. Do not blindly resubmit a payment because the first response was delayed.

Use actual testnet transactions when credentials and wallet authorization are available. If external credentials or user approvals are missing, complete everything that can be tested locally, provide the exact remaining steps, and do not fabricate successful transactions.

## 8. Marketplace Application

Build the complete frontend, not merely a dashboard mockup.

### Public pages

- Landing page.
- How it works.
- Project discovery.
- Freelancer profiles.
- Login and registration.
- Terms of service and privacy policy pages containing appropriate draft language clearly marked for review where necessary.

### Authentication and profiles

Implement:

- Registration and login.
- Secure session management.
- User profile editing.
- Client and freelancer roles.
- Profile display names and descriptions.
- Skills and portfolio entries.
- Stellar public address association.
- Wallet address validation and ownership verification where supported.

A public wallet address must not be treated as proof of real-world identity.

Enforce permissions server-side. Never rely on a role or user ID supplied by an untrusted browser request.

### Client features

- Create and edit projects.
- Publish and close projects.
- Define budgets and milestones.
- Invite or select freelancers.
- Review submitted milestone work.
- Approve or reject submissions.
- Fund escrow.
- View contract-backed balances and payment history.
- Review project activity and status.

### Freelancer features

- Browse and search projects.
- View project details and requirements.
- Submit proposals.
- View accepted projects.
- Review milestones and deadlines.
- Submit work descriptions and supporting links or evidence.
- Track milestone approvals and payments.
- View transaction history.

### Shared dashboard

Display:

- Active projects.
- Pending milestones.
- Upcoming deadlines.
- Completed milestones.
- Escrow funding status.
- Released payments.
- Outstanding actions.
- Recent activity.

Clearly identify which values come from the blockchain and which are stored off-chain.

Never display a payment as successful until the network or contract state confirms success.

## 9. Database and Data Model

Design a normalized, maintainable Prisma schema.

Include suitable entities for:

- User.
- User profile.
- Wallet association.
- Project.
- Project membership.
- Freelancer proposal.
- Milestone.
- Work submission.
- Escrow agreement.
- Blockchain transaction.
- Dispute.
- Notification.
- Audit event.

Use appropriate foreign keys, indexes, unique constraints, enums, timestamps, and ownership relationships.

Store contract identifiers, network identifiers, transaction hashes, and relevant reconciliation metadata.

Do not store private keys or seed phrases.

Do not use the database as the authoritative source for on-chain balances or release permissions.

Implement safe synchronization and reconciliation between database records and confirmed contract state.

Document how inconsistencies are detected and resolved.

## 10. API and Business Logic

Implement the required API routes or server actions with strict input validation.

Requirements:

- Validate inputs using shared schemas where appropriate.
- Enforce authentication and authorization.
- Check project membership and ownership.
- Prevent duplicate submissions and unintended repeated operations.
- Handle database transactions where necessary.
- Return consistent error responses.
- Avoid leaking secrets, stack traces, or sensitive personal information.
- Rate-limit security-sensitive endpoints where appropriate.
- Record important audit events.
- Use pagination for potentially large result sets.

Keep financial authorization in the contract. API validation is supplementary and cannot replace contract enforcement.

Do not implement endpoints that claim to execute an on-chain payment when they only update a database row.

## 11. Security Requirements

Treat security as part of implementation, not a final checklist.

Address:

- Broken object-level authorization.
- Cross-site scripting.
- Cross-site request forgery where applicable.
- SQL injection and unsafe queries.
- Authentication and session vulnerabilities.
- Insecure wallet association.
- Secret leakage.
- Duplicate transactions.
- Contract authorization failures.
- Integer overflow or incorrect amount arithmetic.
- Malicious or malformed inputs.
- File upload risks if uploads are supported.
- Abuse of dispute or cancellation workflows.
- Race conditions and inconsistent state.
- Dependency vulnerabilities.

Use safe defaults and document residual risks.

Use integer base units or another exact representation for token amounts. Never use floating-point arithmetic for financial transfers.

Do not claim the contract is audited or production-safe merely because automated tests pass.

## 12. UI and Product Quality

Create a polished, professional, responsive application suitable for desktop and mobile.

The visual language should convey trust, financial clarity, and professional collaboration.

Include:

- A coherent design system.
- Accessible forms and navigation.
- Loading states.
- Empty states.
- Error states.
- Confirmation dialogs for consequential actions.
- Transaction-pending indicators.
- Clear status badges.
- Responsive dashboards.
- Useful validation messages.
- Keyboard navigation and accessible contrast.

Avoid excessive animation, generic placeholder dashboards, and decorative elements that do not improve usability.

Every visible primary action must work.

If a feature is not implemented, hide it or label it accurately rather than presenting a dead button as functional.

## 13. Testing Requirements

Create and run a meaningful automated test suite.

### Contract tests

Test:

- Valid escrow creation.
- Valid funding.
- Unauthorized funding or release attempts.
- Correct milestone approval and payout.
- Duplicate payout prevention.
- Invalid milestone transitions.
- Incorrect amounts.
- Invalid asset configuration.
- Cancellation eligibility.
- Refund calculations.
- Dispute restrictions.
- Multiple milestones.
- Balance reconciliation.
- Boundary conditions and adversarial sequences.

### Backend tests

Test:

- Authentication and authorization.
- Role restrictions.
- Project ownership.
- Input validation.
- Proposal workflows.
- Milestone submission.
- Database constraints.
- Duplicate requests.
- Transaction metadata.
- Failure handling.

### Frontend tests

Test:

- Registration and login.
- Project creation.
- Proposal submission.
- Milestone submission and review.
- Wallet connection states.
- Transaction-pending and failure states.
- Responsive and accessible core workflows where practical.

### End-to-end tests

Create at least one complete automated workflow covering:

1. Client creates a project.
2. Client defines milestones.
3. Freelancer submits a proposal.
4. Client accepts the proposal.
5. Client funds the escrow in the appropriate test environment.
6. Freelancer submits milestone work.
7. Client approves the milestone.
8. Contract releases payment.
9. Both users can inspect the resulting status and transaction record.

Use local contract tests and deterministic mocks for automated CI where live testnet transactions are unsuitable. Provide a separate reproducible testnet demonstration.

Never report tests as passing unless they have actually run and passed.

## 14. Documentation

Create the following files.

### README.md

Include:

- Product overview.
- Problem statement.
- Why Stellar and Soroban.
- Features implemented.
- Architecture overview.
- Repository structure.
- Technology stack.
- Prerequisites.
- Installation instructions.
- Environment configuration.
- Database setup and migrations.
- Local development commands.
- Smart contract testing.
- Contract build and deployment instructions.
- Stellar testnet setup.
- Wallet connection instructions.
- Automated testing.
- Demo instructions.
- Security considerations.
- Known limitations.
- Roadmap.
- Contribution guidelines.
- License information.
- Current implementation status.

Do not claim planned functionality already exists.

### Additional documentation

Create:

- `docs/ARCHITECTURE.md`
- `docs/SMART_CONTRACT.md`
- `docs/SECURITY.md`
- `docs/DEVELOPMENT.md`
- `docs/TESTING.md`
- `docs/DEPLOYMENT.md`
- `docs/THREAT_MODEL.md`
- `CONTRIBUTING.md`
- `.env.example`

Document all important architectural decisions and security assumptions.

Do not invent benchmark results, user counts, testnet deployments, transaction hashes, audits, partnerships, or reviewer endorsements.

## 15. Continuous Integration

Configure GitHub Actions to run the relevant checks on pushes and pull requests.

At minimum:

- Dependency installation.
- Formatting checks.
- Linting.
- TypeScript type checking.
- Frontend unit tests.
- Backend tests.
- Rust formatting checks.
- Rust and Soroban contract tests.
- Production build.
- Prisma schema validation and migration checks where practical.

Pin or constrain dependencies appropriately.

Cache dependencies where useful.

CI must not require private credentials for ordinary test execution.

Use test fixtures or mocks for external integrations when appropriate.

Do not put secrets into workflow files.

## 16. Developer Experience

Provide working root-level commands for common operations.

Examples of desired commands:

- Install dependencies.
- Start the development environment.
- Start the web application.
- Start required supporting services.
- Run database migrations.
- Run all tests.
- Run contract tests.
- Run linting.
- Run type checks.
- Build the application.
- Validate the repository before committing.

Use a package manager and Rust toolchain compatible with the implementation.

Provide Docker Compose for local infrastructure if it materially simplifies setup.

Make a new contributor's first successful local run as straightforward as possible.

## 17. Implementation Strategy

Work in the following order, but continue beyond each phase without waiting for approval.

### Phase A: Foundation

- Inspect the repository.
- Establish the monorepo and dependency strategy.
- Create project configuration.
- Write the architecture and README.
- Add CI foundations.

### Phase B: Contract

- Implement escrow data structures and state transitions.
- Implement authorization and asset transfers.
- Write comprehensive contract tests.
- Build the contract locally.
- Fix all discovered failures.

### Phase C: Application

- Implement the Prisma schema and migrations.
- Implement authentication and role-based authorization.
- Build project and proposal workflows.
- Build milestone and work-submission workflows.
- Build dashboard and profile interfaces.
- Add validation and error handling.

### Phase D: Stellar Integration

- Implement wallet connectivity.
- Integrate contract reads and transaction submission.
- Add transaction-status handling.
- Add testnet deployment configuration and documentation.
- Verify network and asset safety.

### Phase E: Integration

- Connect the UI to backend operations.
- Connect financial workflows to actual contract interactions.
- Implement reconciliation and transaction history.
- Add integration and end-to-end tests.
- Eliminate misleading mock functionality.

### Phase F: Quality and Delivery

- Run the full available test suite.
- Fix failures.
- Run linting and type checking.
- Run the production build.
- Check for broken links and missing environment variables.
- Review authorization boundaries.
- Update the README to reflect the final implementation.
- Produce a concise completion report.

If a phase is blocked by unavailable credentials, finish every independent task and clearly identify the external step that remains.

## 18. Working Rules

Follow these rules throughout the implementation:

1. Write actual code, not just plans.
2. Work in small, coherent, reviewable changes.
3. Prefer a working vertical slice over a large collection of incomplete modules.
4. Use maintained SDKs and verify API compatibility.
5. Do not fabricate API methods or pretend that external services were called.
6. Never commit secrets.
7. Never use fake transaction hashes or fabricated testnet evidence.
8. Never silently replace real blockchain functionality with mocked database updates.
9. Avoid `TODO` placeholders for core functionality.
10. Do not leave primary buttons nonfunctional.
11. Do not disable tests merely to make CI pass.
12. Do not suppress important compiler or type errors.
13. Preserve existing useful code and unrelated working-tree changes.
14. Use database migrations and reproducible dependency versions.
15. Run the appropriate tests after each major implementation phase.
16. Fix test failures instead of simply documenting them.
17. Do not deploy to mainnet or spend real funds.
18. Do not force-push, delete repository history, or perform destructive Git operations.
19. Do not claim production readiness or a security audit without evidence.
20. If a feature must be deferred, explain why and implement the strongest safe version that fits the MVP.

## 19. Definition of Done

WorkZeno is ready for technical review only when:

- The repository contains the actual application source code.
- The Soroban contract compiles.
- Contract tests pass.
- The application builds.
- Type checking and linting pass.
- The database schema and migrations are valid.
- Authentication and authorization work.
- Client and freelancer workflows are functional.
- The escrow flow uses real contract logic.
- Stellar testnet configuration and deployment instructions are reproducible.
- Transaction states are handled correctly.
- The main user journey is covered by tests.
- Security assumptions and limitations are documented.
- The README accurately describes the implementation.
- CI is configured and can run without private credentials.
- Remaining external requirements are listed explicitly.

If a live testnet deployment cannot be completed because credentials or user authorization are unavailable, report that limitation accurately. Do not represent an unexecuted deployment as successful.

## 20. Final Execution Instruction

Begin by inspecting the repository and identifying the current environment and available tooling.

Then implement the product in the phases above.

Do not stop after creating a plan or generating boilerplate. Continue writing source code, running tests, correcting errors, and completing the highest-priority functionality until the available environment prevents further progress or the definition of done is satisfied.

At completion, report:

1. What you implemented.
2. The principal files and modules created.
3. The Soroban contract's functionality.
4. The web application's completed workflows.
5. Stellar integration status.
6. The exact commands executed for testing.
7. Actual test results.
8. Build, lint, and type-check results.
9. Security limitations and deferred functionality.
10. The exact steps required for any remaining testnet deployment.
11. The recommended next improvements before applying to the Stellar Wave Program.

Be concise in progress reports, but thorough in the implementation. Prioritize a genuinely working product over superficial completion claims.