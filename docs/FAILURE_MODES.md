# Failure Modes

This document defines how Registrum can fail honestly.

Each failure mode includes what it looks like, why it violates Registrum's mission, and what to do if it appears.

---

## Silent Invariant Violation

### What it looks like

A constraint is broken, but no violation is surfaced.
A transition registers despite violating a declared invariant.
Tests pass, but the invariant was not actually checked.

### Why it violates Registrum's mission

Registrum's core guarantee is that violations are surfaced.
If violations are silent, legibility is an illusion.
The system appears constrained but is not.

### What to do

Stop. Do not proceed until the violation is surfaced.
Audit the invariant enforcement path.
Add explicit tests that prove the invariant is checked.

---

## Non-Deterministic Registration

### What it looks like

The same inputs produce different registration outcomes.
Ordering varies across runs.
State depends on timing, threading, or external factors.

### Why it violates Registrum's mission

Determinism is foundational.
If registration is not deterministic, traceability is meaningless.
Replay becomes impossible.

### What to do

Stop. Identify the source of non-determinism.
Remove or isolate all sources of variance.
Registration must be a pure function of inputs and declared invariants.

---

## Implicit Ordering of States

### What it looks like

States are compared as better or worse.
Transitions are prioritized by outcome.
Language like "preferred," "optimal," or "improved" appears.

### Why it violates Registrum's mission

Registrum does not rank states.
Implicit ordering introduces hidden semantics.
This is the seed of optimization pressure.

### What to do

Remove the ordering.
Replace comparative language with structural descriptions.
If ordering is needed, it must be explicit and non-evaluative (e.g., temporal order).

---

## Accidental Optimization Pressure

### What it looks like

The system begins to favor certain transitions.
Constraints are tuned to produce "better" outcomes.
Metrics influence registration decisions.

### Why it violates Registrum's mission

Registrum does not optimize.
Optimization pressure transforms a registrar into an agent.
This is scope corruption.

### What to do

Stop. Identify where the pressure originates.
Remove any feedback between outcomes and constraints.
Metrics must be descriptive, never prescriptive.

---

## Semantic Leakage

### What it looks like

Labels like "good," "bad," "correct," or "wrong" appear in code or documentation.
Transitions are described in terms of meaning or value.
Subsystems begin to interpret rather than register.

### Why it violates Registrum's mission

Registrum is structural, not semantic.
Semantic leakage introduces hidden assumptions.
The system begins to assert meaning it cannot justify.

### What to do

Remove the semantic language.
Replace with structural descriptions.
If meaning is needed, it must be external to Registrum.

---

## Why This Document Exists

Failure is allowed.
Rationalizing failure is not.

This document prevents Registrum from explaining away its own violations.
