/**
 * Registrum Persistence Module
 *
 * Provides snapshot, serialization, rehydration, and replay capabilities.
 *
 * Phase E deliverables:
 * - E.1: Snapshot schema
 * - E.2: Deterministic serialization
 * - E.3: Registrar rehydration
 * - E.4: Transition replay engine
 */

export {
  // Schema
  SNAPSHOT_VERSION,
  type RegistrarSnapshotV1,
  SnapshotValidationError,
  validateSnapshot,

  // Hash computation
  computeLegacyRegistryHash,
  computeRegistryHash,
} from "./snapshot";

export {
  // Serialization
  serializeSnapshot,
  deserializeSnapshot,
  computeSnapshotHash,
} from "./serializer";
