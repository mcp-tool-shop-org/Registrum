/**
 * Structural Registrar Implementation
 *
 * The constitutional component that validates and orders State Transitions.
 *
 * Design rules:
 * - All methods are pure with respect to content
 * - No method may mutate State directly
 * - No method may adapt behavior over time
 * - No hidden state affecting outcomes
 * - Determinism is mandatory
 *
 * This implementation:
 * - Tracks registered state IDs
 * - Maintains lineage relationships
 * - Enforces all 11 invariants
 * - Produces deterministic ordering
 */

import type {
  State,
  Transition,
  RegistrationResult,
  ValidationReport,
  InvariantDescriptor,
  LineageTrace,
  StateID,
  Invariant,
  InvariantViolation,
  InvariantInput,
} from "./types";
import type { Registrar } from "./registrar";
import { isState, isTransition } from "./registrar";
import { INITIAL_INVARIANTS } from "./invariants";

/**
 * Internal state entry for a registered state.
 */
interface RegisteredState {
  readonly id: StateID;
  readonly parentId: StateID | null;
  readonly orderIndex: number;
}

/**
 * StructuralRegistrar — The Phase 1 Registrar implementation.
 *
 * This class implements the constitutional Registrar interface with:
 * - In-memory state tracking (no persistence)
 * - All 11 invariants from INVARIANTS.md
 * - Deterministic ordering
 * - Explicit failure surfacing
 */
export class StructuralRegistrar implements Registrar {
  /**
   * Registry of all accepted states.
   * Key: StateID, Value: RegisteredState
   */
  private readonly registry: Map<StateID, RegisteredState> = new Map();

  /**
   * Current order index (monotonically increasing).
   */
  private currentOrderIndex: number = 0;

  /**
   * Active invariants.
   */
  private readonly invariants: readonly Invariant[];

  constructor(invariants: readonly Invariant[] = INITIAL_INVARIANTS) {
    this.invariants = invariants;
  }

  /**
   * Register a proposed Transition.
   *
   * Behavior:
   * - Validates transition against all applicable invariants
   * - Enforces ordering rules
   * - Produces a deterministic outcome
   *
   * Returns:
   * - Acceptance with stateId, orderIndex, and appliedInvariants
   * - Rejection with all violations
   */
  register(transition: Transition): RegistrationResult {
    // Collect all violations
    const violations: InvariantViolation[] = [];
    const appliedInvariants: string[] = [];
    let shouldHalt = false;

    // Build the invariant input for registration-scope invariants
    const registrationInput: InvariantInput = {
      kind: "registration",
      transition,
      registeredStateIds: new Set(this.registry.keys()),
      currentOrderIndex: this.currentOrderIndex,
    };

    // Build transition-scope input
    const transitionInput: InvariantInput = {
      kind: "transition",
      transition,
    };

    // Build state-scope input for the target state
    const stateInput: InvariantInput = {
      kind: "state",
      state: transition.to,
    };

    // Evaluate all invariants
    for (const invariant of this.invariants) {
      appliedInvariants.push(invariant.id);

      // Select appropriate input based on scope
      let input: InvariantInput;
      switch (invariant.scope) {
        case "state":
          input = stateInput;
          break;
        case "transition":
          input = transitionInput;
          break;
        case "registration":
          input = registrationInput;
          break;
        default:
          input = registrationInput;
      }

      // Evaluate predicate
      const passed = invariant.predicate(input);

      if (!passed) {
        violations.push({
          invariantId: invariant.id,
          message: `Invariant violation: ${invariant.description}`,
        });

        if (invariant.failureMode === "halt") {
          shouldHalt = true;
        }
      }
    }

    // If any violations, reject
    if (violations.length > 0) {
      // For halt-level violations, we could throw, but for now we return rejected
      // with a clear indication in the message
      if (shouldHalt) {
        // Mark halt violations clearly
        const haltViolations = violations.map((v) => {
          const inv = this.invariants.find((i) => i.id === v.invariantId);
          if (inv?.failureMode === "halt") {
            return {
              ...v,
              message: `[HALT] ${v.message}`,
            };
          }
          return v;
        });

        return {
          kind: "rejected",
          violations: haltViolations,
        };
      }

      return {
        kind: "rejected",
        violations,
      };
    }

    // All invariants passed — register the state
    const orderIndex = this.currentOrderIndex;
    this.currentOrderIndex += 1;

    const registeredState: RegisteredState = {
      id: transition.to.id,
      parentId: transition.from,
      orderIndex,
    };

    this.registry.set(transition.to.id, registeredState);

    return {
      kind: "accepted",
      stateId: transition.to.id,
      orderIndex,
      appliedInvariants,
    };
  }

  /**
   * Validate a State or Transition without registering it.
   *
   * Used for:
   * - Inspection
   * - Testing
   * - Diagnostics
   *
   * Does not modify registrar state.
   */
  validate(target: State | Transition): ValidationReport {
    const violations: InvariantViolation[] = [];

    if (isState(target)) {
      // Validate as pure state
      const stateInput: InvariantInput = {
        kind: "state",
        state: target,
      };

      for (const invariant of this.invariants) {
        if (invariant.scope === "state") {
          const passed = invariant.predicate(stateInput);
          if (!passed) {
            violations.push({
              invariantId: invariant.id,
              message: `Invariant violation: ${invariant.description}`,
            });
          }
        }
      }
    } else if (isTransition(target)) {
      // Validate as transition (without registration context)
      const transitionInput: InvariantInput = {
        kind: "transition",
        transition: target,
      };

      // Also validate the target state
      const stateInput: InvariantInput = {
        kind: "state",
        state: target.to,
      };

      for (const invariant of this.invariants) {
        let input: InvariantInput | null = null;

        if (invariant.scope === "state") {
          input = stateInput;
        } else if (invariant.scope === "transition") {
          input = transitionInput;
        }
        // Skip registration-scope invariants for pure validation

        if (input) {
          const passed = invariant.predicate(input);
          if (!passed) {
            violations.push({
              invariantId: invariant.id,
              message: `Invariant violation: ${invariant.description}`,
            });
          }
        }
      }
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  }

  /**
   * Return all active invariants.
   *
   * Returns descriptors (without predicates) for safe serialization.
   */
  listInvariants(): readonly InvariantDescriptor[] {
    return this.invariants.map((inv) => ({
      id: inv.id,
      scope: inv.scope,
      appliesTo: inv.appliesTo,
      failureMode: inv.failureMode,
      description: inv.description,
    }));
  }

  /**
   * Return the traceable ancestry of a State.
   *
   * Returns StateIDs from the given state to root (most recent first).
   * Returns empty array if state is not registered.
   */
  getLineage(stateId: StateID): LineageTrace {
    const lineage: StateID[] = [];
    let currentId: StateID | null = stateId;
    const visited = new Set<StateID>();

    // Traverse parent chain
    while (currentId !== null) {
      // Prevent infinite loops (self-referential or circular)
      if (visited.has(currentId)) {
        break;
      }
      visited.add(currentId);

      const entry = this.registry.get(currentId);
      if (!entry) {
        // State not found — return what we have
        break;
      }

      lineage.push(currentId);
      currentId = entry.parentId;
    }

    return lineage;
  }

  // =========================================================================
  // Internal inspection methods (for testing only)
  // =========================================================================

  /**
   * Get count of registered states.
   * For testing purposes only.
   */
  getRegisteredCount(): number {
    return this.registry.size;
  }

  /**
   * Check if a state ID is registered.
   * For testing purposes only.
   */
  isRegistered(stateId: StateID): boolean {
    return this.registry.has(stateId);
  }

  /**
   * Get current order index.
   * For testing purposes only.
   */
  getCurrentOrderIndex(): number {
    return this.currentOrderIndex;
  }
}
