# STOP — Feature Freeze Notice

**Status:** ACTIVE
**Effective:** 2025-02-05
**Phase:** E Complete

---

## What This Means

Registrum has reached a stable, evidence-backed state. No new features should be added until a governance decision is made.

This is not a bug or a limitation. It is a signal of maturity.

---

## What Has Been Proven

Phase E establishes that Registrum is:

1. **Deterministic across time** — Same inputs always produce same outputs
2. **Replayable** — Any historical decision can be re-executed with identical results
3. **Fail-closed** — Invalid history cannot be partially recovered or reinterpreted
4. **Auditable** — Structural judgments are reproducible after the fact

These claims are backed by **233 passing tests** across 12 test files.

---

## What Is Explicitly Not Claimed

- Registrum does not evaluate meaning
- Registrum does not optimize outcomes
- Registrum does not summarize or compress history
- Registrum does not adapt behavior over time

These are features, not bugs.

---

## What Should Not Be Done

Until a governance decision is made:

- ❌ Do not remove legacy invariants
- ❌ Do not optimize persistence
- ❌ Do not add compression or summarization
- ❌ Do not introduce observers, hooks, or analytics
- ❌ Do not "improve" replay semantics

Any of these would weaken the epistemic claims Phase E earned.

---

## The Governance Fork

Two paths are now available:

### Option D — Cutover

Make registry mode the default implementation.

- Registry mode becomes authoritative
- Legacy mode is deprecated (not removed)
- DSL + registry becomes the constitutional surface

This is a **policy decision**, not a technical one.

### Option F — Stewardship

Freeze behavior and present Registrum as a research artifact.

- Feature freeze becomes permanent
- Technical documentation / paper
- Position Registrum as infrastructure, not product

---

## Current Test Summary

```
Test Files: 12 passed
Tests:      233 passed
```

| Category | Tests |
|----------|-------|
| Constitutional | 27 |
| Registry system | 25 |
| Parity (identity, lineage, ordering, metadata) | 58 |
| Registry mode (C.5) | 14 |
| Persistence (schema, serializer, rehydrator, replay) | 97 |
| Persistence parity | 12 |

---

## Next Steps

1. Review this document
2. Decide: Cutover (D) or Stewardship (F)
3. Remove this file when the decision is made

---

*This file signals intent. It should be committed and visible.*
