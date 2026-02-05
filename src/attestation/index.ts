/**
 * Attestation Module
 *
 * External attestation payload generation for Registrum.
 * Pure functions, no network calls, no side effects.
 *
 * @module attestation
 */

export type {
  AttestationPayload,
  AttestationOptions,
  AttestationMode,
  ParityStatus,
  TransitionRange,
  XrplMemo,
  XrplAttestationMemos,
} from "./types.js";

export {
  ATTESTATION_VERSION,
  REGISTRUM_VERSION,
  generateAttestationPayload,
  computeSnapshotHashForAttestation,
  canonicalizeForHash,
  serializeAttestationPayload,
  computeAttestationHash,
  toAttestationMode,
  encodeAsXrplMemos,
  decodeXrplMemos,
  validateAttestationPayload,
} from "./generator.js";
