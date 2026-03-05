---
title: How It Works
description: The dual-witness architecture — how Registry and Legacy engines independently validate every transition, and why both must agree.
sidebar:
  order: 3
---

This page explains the internal mechanics of Registrum: how state transitions flow through the system, what the 11 structural invariants enforce, and how two independent engines collaborate to produce a single verdict.

## The Structural Registrar

The `StructuralRegistrar` is the sole constitutional authority in Registrum. Every state transition flows through it. Nothing bypasses it.

The registrar performs four functions:

1. **Validates** all state transitions against 11 structural invariants
2. **Enforces** identity, lineage, and ordering constraints
3. **Guarantees** determinism and traceability for every decision
4. **Surfaces** violations without resolving them (fail-closed behavior)

When you call `registrar.register(transition)`, the registrar evaluates the transition against every applicable invariant. If all pass, the transition is accepted and assigned a monotonic order index. If any fail, the transition is refused and you receive a structured verdict listing every violated invariant.

## The 11 Invariants

Registrum enforces exactly 11 structural invariants, organized into three classes:

### Identity invariants (3)

Identity invariants ensure that every state in the system is uniquely and permanently identifiable.

| # | What it enforces |
|---|------------------|
| 1 | Every state has a **unique** identifier — no two states may share an ID |
| 2 | Identifiers are **immutable** — once assigned, an ID never changes |
| 3 | Identifiers are **content-addressed** — the ID is derived from the state's structural content |

These invariants mean you can always point to a specific state and know exactly what it contains. There is no ambiguity about which state is which.

### Lineage invariants (4)

Lineage invariants ensure that the parentage chain between states remains valid and traceable.

| # | What it enforces |
|---|------------------|
| 4 | Every non-root state has a **valid parent** that exists in the registry |
| 5 | The lineage graph is **acyclic** — no state can be its own ancestor |
| 6 | Parent references are **traceable** — you can walk from any state back to its root |
| 7 | Lineage relationships are **consistent** — a parent's acceptance predates its child's |

These invariants mean you can always reconstruct how a state came to exist. The full history of derivation is preserved.

### Ordering invariants (4)

Ordering invariants ensure that the sequence of accepted transitions is deterministic and verifiable.

| # | What it enforces |
|---|------------------|
| 8 | Order indices are **monotonic** — each new acceptance gets a strictly higher index |
| 9 | Order indices are **gap-free** — no indices are skipped |
| 10 | Ordering is **deterministic** — replaying the same transitions produces the same indices |
| 11 | Order reflects **temporal precedence** — earlier registrations always have lower indices |

These invariants mean the sequence of events is unambiguous. Given a snapshot, any party can verify the exact order in which transitions were accepted.

## Dual constitutional witnesses

Registrum maintains two independent invariant engines that evaluate every transition:

| Witness | Role | Implementation |
|---------|------|----------------|
| **Registry** | Primary authority | Compiled RPEG v1 DSL |
| **Legacy** | Secondary witness | TypeScript predicates |

Since Phase H, **Registry is the default constitutional engine.** Legacy remains as an independent secondary witness.

### Why two witnesses?

The dual-witness architecture is a safety and legibility feature:

- **Agreement is required.** Both engines must independently accept a transition for it to be valid. If either refuses, the transition is refused.
- **Disagreement halts the system.** If the two engines reach different verdicts on the same transition, this is a parity divergence — a serious structural error that stops the system immediately (fail-closed).
- **Independence is intentional.** The Registry engine (compiled DSL) and Legacy engine (TypeScript predicates) are implemented in fundamentally different ways. If both agree, confidence in the verdict is high. If they disagree, something is genuinely wrong.

This is not technical debt or a transitional architecture. Dual-witness mode is indefinite. There is no plan to remove either witness.

### Parity evidence

The behavioral equivalence between Registry and Legacy is proven by 274 tests:

- **58 parity tests** across all invariant classes — the same transition is evaluated by both engines and the verdicts are compared
- **12 persistence parity tests** verifying temporal stability — snapshots produce identical results regardless of which engine created them
- **Replay parity** — live execution and replayed execution produce identical results across both engines

## State transition flow

Here is the complete flow when you register a transition:

1. You call `registrar.register({ from, to })` with the source state (or `null` for a root) and the target state.
2. The registrar passes the transition to the **Registry engine**, which evaluates all 11 invariants using the compiled RPEG v1 DSL.
3. The registrar independently passes the same transition to the **Legacy engine**, which evaluates all 11 invariants using TypeScript predicate functions.
4. The registrar compares the two verdicts:
   - **Both accept:** The transition is accepted. It receives a monotonic order index and is recorded in the registrar's history.
   - **Both refuse:** The transition is refused. You receive a structured verdict with all violated invariants listed.
   - **Disagreement:** Parity divergence. The system halts with a detailed error explaining which invariants diverged.

## Persistence layer

Registrum provides three persistence capabilities:

### Snapshot

Call `registrar.snapshot()` to produce a `RegistrarSnapshotV1` — a versioned, content-addressed, deterministically serialized representation of the entire registrar state. Snapshots are self-contained: they include all registered states, the full transition history, and the ordering indices.

### Replay

Given a snapshot, you can create a fresh `StructuralRegistrar` and replay every transition from the snapshot. Replay is read-only re-execution that proves temporal determinism: the new registrar reaches the exact same state as the original.

### Rehydrate

Snapshots can be used to restore a registrar to a previous state. Because everything is deterministic, rehydration produces a registrar that is functionally identical to the one that created the snapshot.

These three capabilities together mean that every structural judgment Registrum has ever made is reproducible, context-independent, and verifiable by any party with the snapshot.
