# Architectural Constraints

This document defines what cannot be built, regardless of implementation language.

---

## Constitutional Authority

1. **All state transitions must register.**
   No state change occurs outside the Registrar's awareness.

2. **No subsystem may mutate state independently.**
   Subsystems propose transitions; the Registrar validates and orders them.

3. **Registrar decisions are final but non-semantic.**
   The Registrar permits or rejects based on invariants, not meaning.

---

## Prohibited Capabilities

The following capabilities are permanently prohibited in Registrum:

### No Learning Loops

Registrum does not learn from outcomes.
Registration does not inform future registration.
There is no feedback from "success" or "failure."

### No Feedback-Based Adaptation

Registrum does not adapt its behavior based on results.
Constraints are declared, not evolved.
The Registrar does not improve.

### No Scoring Functions

Registrum does not rank, score, or compare states.
There is no "better" or "worse."
There is no utility function.

### No Hidden Heuristics

All constraints are explicit and inspectable.
There are no implicit rules.
There is no emergent behavior by design.

---

## Allowed Extensions

The following extensions are permitted, within constraints:

### New Invariants

Additional invariants may be declared.
Each invariant must be explicit, testable, and non-semantic.

### New Registrable Subsystems

New subsystems may be added.
Each subsystem must register through the Registrar.
No subsystem may act independently.

### New Inspection Metrics

New metrics may be added for visibility.
All metrics must be descriptive, not prescriptive.
Metrics do not influence registration.

---

## Summary

This document is the guardrail against accidental intelligence.

Registrum may grow in structure.
It may not grow in agency.
