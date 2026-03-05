---
title: Reference
description: Complete API reference for StructuralRegistrar, exported types, invariant utilities, and the persistence layer.
sidebar:
  order: 6
---

This page documents the complete public API surface of Registrum: the core class, all exported types, invariant lookup utilities, and the persistence layer.

## Core exports

All primary exports are available from the main package entry point:

```typescript
import {
  // Implementation
  StructuralRegistrar,

  // Invariants
  INITIAL_INVARIANTS,
  getInvariantsByScope,
  getInvariantById,

  // Version
  REGISTRUM_VERSION,
} from "@mcp-tool-shop/registrum";
```

Types are available as type-only imports:

```typescript
import type {
  State,
  Transition,
  RegistrationResult,
  Invariant,
  InvariantViolation,
} from "@mcp-tool-shop/registrum";
```

The registry engine has a separate entry point:

```typescript
import { loadCompiledRegistry } from "@mcp-tool-shop/registrum/registry";
```

## StructuralRegistrar

The central class. All state transitions flow through it.

### Constructor

```typescript
// Legacy mode — TypeScript predicates only
const registrar = new StructuralRegistrar({ mode: "legacy" });

// Registry mode (default) — compiled DSL + legacy as dual witnesses
const compiledRegistry = loadCompiledRegistry();
const registrar = new StructuralRegistrar({ compiledRegistry });
```

| Option | Type | Description |
|--------|------|-------------|
| `mode` | `"legacy"` | Use TypeScript predicates as the sole engine |
| `compiledRegistry` | `CompiledRegistry` | Enable dual-witness mode with the compiled RPEG v1 DSL as primary |

### Methods

#### `register(transition: Transition): RegistrationResult`

Validate and record a state transition. This is the primary method — all structural validation happens here.

**Parameters:**

| Field | Type | Description |
|-------|------|-------------|
| `transition.from` | `State \| null` | Source state, or `null` for a root registration |
| `transition.to` | `State` | Target state to register |
| `transition.metadata` | `object` (optional) | Arbitrary metadata attached to the transition |

**Returns:** A `RegistrationResult` — either an acceptance or a structured refusal.

**Accepted result:**

```typescript
{
  kind: "accepted",
  stateId: string,      // The registered state's ID
  orderIndex: number,   // Monotonic position in the acceptance sequence
}
```

**Refused result:**

```typescript
{
  kind: "refused",
  violations: InvariantViolation[],  // Every invariant that was breached
}
```

#### `getState(id: string): State | undefined`

Retrieve a registered state by its ID. Returns `undefined` if the ID has not been registered.

#### `getHistory(): Transition[]`

Returns the full ordered history of all accepted transitions. The array is ordered by acceptance sequence (matching order indices).

#### `snapshot(): RegistrarSnapshotV1`

Produce a deterministic, content-addressed snapshot of the entire registrar state. The snapshot includes all registered states, the full transition history, and ordering indices. Snapshots use a versioned schema and deterministic serialization for cross-engine compatibility.

## Types

### State

Represents a registered state in the system.

```typescript
interface State {
  id: string;              // Unique, immutable, content-addressed identifier
  structure: object;       // The structural content of the state
  data: object;            // Arbitrary data payload
}
```

### Transition

Represents a proposed state change submitted for validation.

```typescript
interface Transition {
  from: State | null;      // Source state (null = root registration)
  to: State;               // Target state
  metadata?: object;       // Optional metadata
}
```

### RegistrationResult

The verdict returned by `register()`. Always one of two kinds:

```typescript
type RegistrationResult =
  | { kind: "accepted"; stateId: string; orderIndex: number }
  | { kind: "refused"; violations: InvariantViolation[] };
```

### Invariant

Describes a single structural invariant.

```typescript
interface Invariant {
  id: string;              // Unique invariant identifier
  scope: "identity" | "lineage" | "ordering";
  check: (transition, registrar) => boolean;
}
```

### InvariantViolation

Describes a specific invariant breach in a refusal verdict.

```typescript
interface InvariantViolation {
  invariantId: string;          // Which invariant was violated
  classification: string;       // Violation category
  message: string;              // Human-readable explanation
}
```

## Invariant utilities

### `INITIAL_INVARIANTS`

The complete array of all 11 structural invariants. These are the constitutional constraints that every transition is evaluated against.

### `getInvariantsByScope(scope: string): Invariant[]`

Filter invariants by their scope class:

```typescript
const identityInvariants = getInvariantsByScope("identity");   // 3 invariants
const lineageInvariants = getInvariantsByScope("lineage");     // 4 invariants
const orderingInvariants = getInvariantsByScope("ordering");   // 4 invariants
```

### `getInvariantById(id: string): Invariant | undefined`

Look up a specific invariant by its unique identifier. Returns `undefined` if the ID does not match any known invariant.

## Version

### `REGISTRUM_VERSION`

A string constant containing the current version of the Registrum library. Useful for diagnostics and snapshot metadata.

```typescript
import { REGISTRUM_VERSION } from "@mcp-tool-shop/registrum";
console.log(REGISTRUM_VERSION); // e.g., "1.0.0"
```

## Security and data scope

Registrum operates within a deliberately narrow security boundary:

| Aspect | Detail |
|--------|--------|
| **Data touched** | In-memory state transitions, optional JSON snapshots to local filesystem |
| **Data not touched** | No network requests, no external APIs, no databases, no user credentials |
| **Permissions** | Read/write only to user-specified snapshot paths (when persistence is used) |
| **Network** | None — fully offline library (XRPL attestation disabled by default) |
| **Telemetry** | None collected or sent |

Vulnerability reports should be directed to the process described in `SECURITY.md` in the repository root.
