# Definitions

This document locks terminology before code introduces ambiguity.

**Rule:** If a term is not in this file, it cannot appear in core code without discussion.

---

## State

A complete, immutable snapshot of a system at a point in registration order.
States do not evaluate as better or worse.

## Transition

A change from one state to another.
Transitions must be explicit, atomic, and registrable.

## Registration

The act of recording a transition through the Registrar.
Registration validates constraints and establishes ordering.
Registration does not imply approval or endorsement.

## Invariant

An explicit condition that must hold for a transition to register.
Invariants are declared, not inferred.
Violation of an invariant surfaces a failure; it does not trigger correction.

## Constraint

A boundary on what transitions are allowed.
Constraints are structural, not semantic.
Constraints do not optimize; they exclude.

## Registrar

The constitutional authority that validates and orders all state transitions.
The Registrar is deterministic, non-adaptive, and non-semantic.
The Registrar does not act; it permits or rejects.

## Structure

The arrangement and relationships of elements within a state.
Structure is what Registrum preserves.
Structure does not imply meaning.

## Entropy (Operational)

The accumulation of disorder or unpredictability in a system over time.
Registrum does not reduce entropy globally.
Registrum constrains where entropy may accumulate to preserve legibility.

## Legibility

The property of a system or state being interpretable.
Legibility means that identity, lineage, and structure can be examined.
Legibility does not mean simplicity or correctness.

## Subsystem

A component that registers through the Registrar.
Subsystems do not act independently.
Subsystems expose structure; they do not decide.
