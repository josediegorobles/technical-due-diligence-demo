# Technical Due Diligence Methodology

This methodology is designed for fast, practical technical due diligence. It is not an academic audit and it is not a substitute for a full security penetration test. The goal is to identify the technical risks most likely to affect investment, acquisition, delivery, maintainability, or takeover decisions.

## Review Inputs

Depending on access and scope, the review may include:

- Source repositories.
- Dependency manifests and lockfiles.
- CI/CD configuration.
- Infrastructure configuration.
- Deployment notes and runbooks.
- Product documentation.
- Architecture diagrams.
- Incident notes.
- Engineering interviews or walkthroughs.

## Repository Structure Analysis

The review starts by understanding how the codebase is organized.

Key questions:

- Is the repository structure clear and intentional?
- Are product domains separated or tangled together?
- Are shared packages genuinely shared, or are they dumping grounds?
- Are scripts, migrations, tests, and infrastructure easy to find?
- Would a new senior engineer understand the system quickly?

Signals reviewed:

- Module boundaries.
- File and folder organization.
- Naming consistency.
- Size and complexity hotspots.
- Generated code and vendor code.
- Internal documentation.

## Dependency Review

Dependencies are reviewed for operational and strategic risk.

Key questions:

- Are critical packages actively maintained?
- Are outdated or vulnerable dependencies present?
- Are lockfiles used consistently?
- Are licenses compatible with the business model?
- Is the product relying on fragile wrappers or abandoned libraries?
- Are dependency upgrades routine or avoided until crisis?

Signals reviewed:

- Package manifests.
- Lockfiles.
- Known vulnerability output where available.
- Direct versus transitive dependency exposure.
- Security, license, and maintenance posture.

## Test And CI Review

Testing is evaluated by business risk, not just line coverage.

Key questions:

- Are revenue-critical flows tested?
- Are integration and failure paths tested?
- Does CI run reliably on pull requests?
- Are flaky tests tolerated?
- Are incidents converted into regression tests?
- Can the team deploy with confidence?

Signals reviewed:

- Unit tests.
- Integration tests.
- End-to-end tests.
- CI configuration.
- Test runtime and reliability.
- Coverage of critical paths.
- Deployment gates.

## Architecture Review

Architecture is reviewed for fit, clarity, and future cost.

Key questions:

- Does the architecture match the product's current stage?
- Are boundaries between domains clear?
- Are scaling constraints understood?
- Are data models stable and coherent?
- Are third-party integrations isolated?
- Is the system resilient to common failure modes?

Signals reviewed:

- Application boundaries.
- Data flow.
- API design.
- Background jobs and queues.
- Database schema and migrations.
- External integrations.
- Caching and performance assumptions.
- Infrastructure design.

## Security Smell Review

The review looks for security smells and obvious risk patterns. It does not claim to be a full penetration test.

Key questions:

- Are authentication and authorization clearly separated?
- Are sensitive actions protected server-side?
- Are secrets stored and rotated properly?
- Are audit logs present for important events?
- Are dependency vulnerabilities managed?
- Are customer data export, deletion, and access flows controlled?

Signals reviewed:

- Authorization checks.
- Secret handling.
- Input validation.
- Logging behavior.
- Dependency scanning.
- Access controls.
- Administrative actions.
- Data handling patterns.

## Maintainability Review

Maintainability is assessed through the lens of future delivery cost.

Key questions:

- Can engineers change the system safely?
- Are core workflows understandable?
- Are abstractions helping or hiding complexity?
- Are large modules accumulating too much responsibility?
- Are errors handled consistently?
- Is technical knowledge encoded in code, tests, and docs?

Signals reviewed:

- Coupling and cohesion.
- Code complexity.
- Duplication.
- Error handling.
- Documentation quality.
- Testability.
- Onboarding difficulty.
- Bus factor.

## Senior Engineering Judgment

The final assessment combines evidence with senior engineering judgment.

The review distinguishes between:

- Problems that are normal for the company's stage.
- Problems that create immediate business risk.
- Problems that will become expensive if ignored.
- Problems that are cosmetic and should not distract from higher-risk work.

The output is direct and decision-oriented: what is risky, why it matters, how urgent it is, and what to do next.
