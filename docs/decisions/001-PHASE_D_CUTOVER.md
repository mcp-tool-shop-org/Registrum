# Decision: Phase D Cutover

**Decision Number:** 001
**Date:** [PENDING]
**Proposal Reference:** `docs/proposals/001-PHASE_D_CUTOVER.md`
**Classification:** Class B — Semantic-Preserving Structural Change
**Decision:** Pending

---

## Decision Statement

[Decision pending Constitutional Steward review]

---

## Proposal Summary

Make registry mode the default implementation, deprecate legacy mode, and release v1.0.0.

This is a Class B change: structural shift with proven behavioral equivalence.

---

## Evidence Reviewed

| Evidence | Location | Status |
|----------|----------|--------|
| Parity tests | `tests/parity/` | Verified (58 tests) |
| Replay parity | `tests/parity/persistence.parity.test.ts` | Verified (12 tests) |
| Migration criteria | `MIGRATION_CRITERIA.md` | Met (all items) |
| Full test suite | All test files | 233 passing |

---

## Rationale

[To be completed upon decision]

---

## Conditions

[To be completed upon decision]

---

## Implementation Authorization

[To be completed upon decision]

**If Approved:**

- [ ] Update default mode to `registry`
- [ ] Add deprecation notice for legacy mode
- [ ] Update documentation
- [ ] Remove `STOP.md`
- [ ] Bump version to v1.0.0
- [ ] Create release tag
- [ ] Update changelog

**Not Authorized:**

- Removal of legacy mode
- Changes to invariant definitions
- Changes to snapshot schema
- Any untested behavioral changes

---

## Effective Date

[To be completed upon decision]

---

## Version Impact

| Current Version | New Version | Bump Type |
|-----------------|-------------|-----------|
| 0.x.x (pre-1.0) | 1.0.0 | Major (stability milestone) |

---

## Steward Signature

**Constitutional Steward:** [PENDING]
**Date:** [PENDING]

---

## Post-Decision Notes

[Reserved for implementation notes]

---

*This decision record demonstrates the governance process.*
*Status: Awaiting Constitutional Steward review and approval.*
