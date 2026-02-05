/**
 * Deterministic Serialization (E.2)
 *
 * Ensures snapshots are bitwise deterministic.
 *
 * Design rules:
 * - Canonical field ordering
 * - Stable array ordering (explicit sort)
 * - No environment-dependent output
 * - If two snapshots differ for the same structural state → bug, not tolerance
 */

import type { RegistrarSnapshotV1 } from "./snapshot";

// =============================================================================
// Serialization
// =============================================================================

/**
 * Serialize a snapshot to deterministic JSON.
 *
 * Guarantees:
 * - Canonical key ordering (sorted alphabetically)
 * - Stable array ordering (state_ids by orderIndex)
 * - No environment-dependent output
 * - Identical input → identical output (bitwise)
 *
 * @param snapshot - The snapshot to serialize
 * @param pretty - Whether to use 2-space indentation (default: false)
 * @returns Deterministic JSON string
 */
export function serializeSnapshot(
  snapshot: RegistrarSnapshotV1,
  pretty: boolean = false
): string {
  // Build canonical representation
  const canonical = buildCanonicalObject(snapshot);

  // Serialize with deterministic key ordering
  return JSON.stringify(
    canonical,
    null,
    pretty ? 2 : undefined
  );
}

/**
 * Build a canonical object representation for serialization.
 *
 * This ensures:
 * - Fields are in alphabetical order
 * - Arrays are in canonical order
 * - Nested objects follow the same rules
 */
function buildCanonicalObject(snapshot: RegistrarSnapshotV1): Record<string, unknown> {
  // Get state_ids sorted by their order index (already canonical in snapshot)
  // The snapshot.state_ids should already be in order, but we verify
  const stateIdsByOrder = [...snapshot.state_ids].sort((a, b) => {
    const orderA = snapshot.ordering.assigned[a];
    const orderB = snapshot.ordering.assigned[b];
    return orderA - orderB;
  });

  // Build lineage with sorted keys
  const lineageKeys = Object.keys(snapshot.lineage).sort();
  const lineage: Record<string, string | null> = {};
  for (const key of lineageKeys) {
    lineage[key] = snapshot.lineage[key];
  }

  // Build ordering.assigned with sorted keys
  const assignedKeys = Object.keys(snapshot.ordering.assigned).sort();
  const assigned: Record<string, number> = {};
  for (const key of assignedKeys) {
    assigned[key] = snapshot.ordering.assigned[key];
  }

  // Build canonical object with alphabetically ordered fields
  // JSON.stringify preserves insertion order in modern JS
  return {
    lineage,
    mode: snapshot.mode,
    ordering: {
      assigned,
      max_index: snapshot.ordering.max_index,
    },
    registry_hash: snapshot.registry_hash,
    state_ids: stateIdsByOrder,
    version: snapshot.version,
  };
}

// =============================================================================
// Deserialization
// =============================================================================

/**
 * Deserialize a JSON string to a snapshot.
 *
 * This is the inverse of serializeSnapshot.
 * Does NOT validate the snapshot - use validateSnapshot for that.
 *
 * @param json - The JSON string to deserialize
 * @returns The deserialized snapshot (unvalidated)
 */
export function deserializeSnapshot(json: string): unknown {
  return JSON.parse(json);
}

// =============================================================================
// Hash Computation
// =============================================================================

/**
 * Compute a content hash of a snapshot.
 *
 * This hash is based on the deterministic serialization.
 * It can be used to verify snapshot integrity.
 *
 * Note: Uses a simple hash algorithm suitable for integrity checking.
 * Not cryptographically secure.
 *
 * @param snapshot - The snapshot to hash
 * @returns A hex string hash
 */
export function computeSnapshotHash(snapshot: RegistrarSnapshotV1): string {
  const json = serializeSnapshot(snapshot, false);
  return simpleHash(json);
}

/**
 * Simple non-cryptographic hash function.
 * Based on djb2 algorithm.
 */
function simpleHash(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash = hash >>> 0; // Convert to unsigned 32-bit
  }
  return hash.toString(16).padStart(8, "0");
}
