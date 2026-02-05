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
import type { CompiledInvariantRegistry } from "./registry/loader";
import { evaluatePredicate } from "./registry/predicate/evaluator";
import type { EvaluationContext } from "./registry/predicate/evaluator";
import type { RegistrarSnapshotV1 } from "./persistence/snapshot";
import {
  SNAPSHOT_VERSION,
  computeLegacyRegistryHash,
  computeRegistryHash,
} from "./persistence/snapshot";

/**
 * Registrar mode.
 *
 * - "legacy": Use TypeScript predicates from src/invariants.ts (default)
 * - "registry": Use compiled registry DSL from invariants/registry.json
 */
export type RegistrarMode = "legacy" | "registry";

/**
 * Internal state entry for a registered state.
 */
interface RegisteredState {
  readonly id: StateID;
  readonly parentId: StateID | null;
  readonly orderIndex: number;
}

/**
 * StructuralRegistrar configuration options.
 */
export interface StructuralRegistrarOptions {
  /**
   * Registrar mode.
   * - "legacy": Use TypeScript predicates (default)
   * - "registry": Use compiled registry DSL
   */
  readonly mode?: RegistrarMode;

  /**
   * Legacy invariants (used when mode is "legacy").
   */
  readonly invariants?: readonly Invariant[];

  /**
   * Compiled registry (required when mode is "registry").
   */
  readonly compiledRegistry?: CompiledInvariantRegistry;
}

/**
 * StructuralRegistrar — The Phase 1 Registrar implementation.
 *
 * This class implements the constitutional Registrar interface with:
 * - In-memory state tracking (no persistence)
 * - All 11 invariants from INVARIANTS.md
 * - Deterministic ordering
 * - Explicit failure surfacing
 *
 * Mode Support:
 * - "legacy" (default): Uses TypeScript predicate functions
 * - "registry": Uses compiled registry DSL evaluation
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
   * Operating mode.
   */
  private readonly mode: RegistrarMode;

  /**
   * Active invariants (legacy mode).
   */
  private readonly invariants: readonly Invariant[];

  /**
   * Compiled registry (registry mode).
   */
  private readonly compiledRegistry: CompiledInvariantRegistry | null;

  constructor(options: StructuralRegistrarOptions = {}) {
    this.mode = options.mode ?? "legacy";
    this.invariants = options.invariants ?? INITIAL_INVARIANTS;
    this.compiledRegistry = options.compiledRegistry ?? null;

    // Validate registry mode has required registry
    if (this.mode === "registry" && !this.compiledRegistry) {
      throw new Error(
        "StructuralRegistrar: registry mode requires compiledRegistry option"
      );
    }
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
    // Delegate to mode-specific implementation
    if (this.mode === "registry") {
      return this.registerWithRegistry(transition);
    }
    return this.registerWithLegacy(transition);
  }

  /**
   * Register using legacy TypeScript predicates.
   */
  private registerWithLegacy(transition: Transition): RegistrationResult {
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
    return this.acceptTransition(transition, appliedInvariants);
  }

  /**
   * Register using compiled registry DSL.
   */
  private registerWithRegistry(transition: Transition): RegistrationResult {
    const registry = this.compiledRegistry!;
    const violations: InvariantViolation[] = [];
    const appliedInvariants: string[] = [];
    let shouldHalt = false;

    // Build evaluation context
    const context = this.buildEvaluationContext(transition);

    // Evaluate all invariants
    for (const invariant of registry.invariants) {
      appliedInvariants.push(invariant.id);

      // Evaluate the predicate AST
      const passed = evaluatePredicate(invariant.ast, context);

      if (!passed) {
        violations.push({
          invariantId: invariant.id,
          message: `Invariant violation: ${invariant.description}`,
        });

        if (invariant.failure_mode === "halt") {
          shouldHalt = true;
        }
      }
    }

    // If any violations, reject
    if (violations.length > 0) {
      if (shouldHalt) {
        const haltViolations = violations.map((v) => {
          const inv = registry.invariants.find((i) => i.id === v.invariantId);
          if (inv?.failure_mode === "halt") {
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
    return this.acceptTransition(transition, appliedInvariants);
  }

  /**
   * Accept a transition and register the state.
   * Common path for both legacy and registry modes.
   */
  private acceptTransition(
    transition: Transition,
    appliedInvariants: string[]
  ): RegistrationResult {
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
   * Build evaluation context for registry mode.
   */
  private buildEvaluationContext(transition: Transition): EvaluationContext {
    return {
      state: {
        id: transition.to.id,
        structure: transition.to.structure as Record<string, unknown>,
      },
      transition: {
        from: transition.from,
        to: {
          id: transition.to.id,
          structure: transition.to.structure as Record<string, unknown>,
        },
      },
      registry: {
        contains_state: (id: StateID | null) =>
          id !== null && this.registry.has(id),
        max_order_index: () => this.currentOrderIndex - 1,
        compute_order_index: () => this.currentOrderIndex,
      },
      ordering: {
        index: this.currentOrderIndex,
      },
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
    if (this.mode === "registry") {
      return this.validateWithRegistry(target);
    }
    return this.validateWithLegacy(target);
  }

  /**
   * Validate using legacy TypeScript predicates.
   */
  private validateWithLegacy(target: State | Transition): ValidationReport {
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
   * Validate using compiled registry DSL.
   */
  private validateWithRegistry(target: State | Transition): ValidationReport {
    const registry = this.compiledRegistry!;
    const violations: InvariantViolation[] = [];

    if (isState(target)) {
      const context = this.buildStateValidationContext(target);

      for (const invariant of registry.invariants) {
        if (invariant.scope !== "state") continue;

        const passed = evaluatePredicate(invariant.ast, context);
        if (!passed) {
          violations.push({
            invariantId: invariant.id,
            message: `Invariant violation: ${invariant.description}`,
          });
        }
      }
    } else if (isTransition(target)) {
      const context = this.buildTransitionValidationContext(target);

      for (const invariant of registry.invariants) {
        if (invariant.scope !== "state" && invariant.scope !== "transition") {
          continue;
        }

        const passed = evaluatePredicate(invariant.ast, context);
        if (!passed) {
          violations.push({
            invariantId: invariant.id,
            message: `Invariant violation: ${invariant.description}`,
          });
        }
      }
    }

    return {
      valid: violations.length === 0,
      violations,
    };
  }

  /**
   * Build evaluation context for state validation.
   */
  private buildStateValidationContext(state: State): EvaluationContext {
    return {
      state: {
        id: state.id,
        structure: state.structure as Record<string, unknown>,
      },
      transition: {
        from: null,
        to: {
          id: state.id,
          structure: state.structure as Record<string, unknown>,
        },
      },
      registry: {
        contains_state: (id: StateID | null) =>
          id !== null && this.registry.has(id),
        max_order_index: () => this.currentOrderIndex - 1,
        compute_order_index: () => this.currentOrderIndex,
      },
      ordering: null,
    };
  }

  /**
   * Build evaluation context for transition validation.
   */
  private buildTransitionValidationContext(
    transition: Transition
  ): EvaluationContext {
    return {
      state: {
        id: transition.to.id,
        structure: transition.to.structure as Record<string, unknown>,
      },
      transition: {
        from: transition.from,
        to: {
          id: transition.to.id,
          structure: transition.to.structure as Record<string, unknown>,
        },
      },
      registry: {
        contains_state: (id: StateID | null) =>
          id !== null && this.registry.has(id),
        max_order_index: () => this.currentOrderIndex - 1,
        compute_order_index: () => this.currentOrderIndex,
      },
      ordering: null,
    };
  }

  /**
   * Return all active invariants.
   *
   * Returns descriptors (without predicates) for safe serialization.
   */
  listInvariants(): readonly InvariantDescriptor[] {
    if (this.mode === "registry") {
      return this.compiledRegistry!.invariants.map((inv) => ({
        id: inv.id,
        scope: inv.scope,
        appliesTo: inv.applies_to,
        failureMode: inv.failure_mode,
        description: inv.description,
      }));
    }

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
  // Persistence (Phase E)
  // =========================================================================

  /**
   * Create a snapshot of the current registrar state.
   *
   * The snapshot contains all structural information needed to
   * reconstruct the registrar exactly, and nothing more.
   *
   * Guarantees:
   * - No semantic data included
   * - No derived metrics
   * - No caches or summaries
   * - Deterministic output
   */
  snapshot(): RegistrarSnapshotV1 {
    // Build state_ids in canonical order (by orderIndex)
    const entries = Array.from(this.registry.values());
    entries.sort((a, b) => a.orderIndex - b.orderIndex);
    const stateIds = entries.map((e) => e.id);

    // Build lineage map
    const lineage: Record<StateID, StateID | null> = {};
    for (const entry of entries) {
      lineage[entry.id] = entry.parentId;
    }

    // Build ordering map
    const assigned: Record<StateID, number> = {};
    for (const entry of entries) {
      assigned[entry.id] = entry.orderIndex;
    }

    // Compute registry hash
    const registryHash =
      this.mode === "registry"
        ? computeRegistryHash(this.compiledRegistry!.registry_id)
        : computeLegacyRegistryHash(this.invariants.map((i) => i.id));

    return {
      version: SNAPSHOT_VERSION,
      registry_hash: registryHash,
      mode: this.mode,
      state_ids: stateIds,
      lineage,
      ordering: {
        max_index: this.currentOrderIndex - 1,
        assigned,
      },
    };
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

  /**
   * Get current operating mode.
   * For testing purposes only.
   */
  getMode(): RegistrarMode {
    return this.mode;
  }
}
