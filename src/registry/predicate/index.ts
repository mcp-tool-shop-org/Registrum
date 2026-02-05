/**
 * Registrum Predicate DSL
 *
 * Exports for the predicate expression language.
 */

// AST types and constructors
export type {
  ASTNode,
  LiteralNode,
  IdentifierNode,
  BinaryNode,
  UnaryNode,
  CallNode,
  BinaryOperator,
  UnaryOperator,
} from "./ast";

export {
  isLiteralNode,
  isIdentifierNode,
  isBinaryNode,
  isUnaryNode,
  isCallNode,
  literal,
  identifier,
  binary,
  unary,
  call,
} from "./ast";

// Parser
export { parsePredicate, ParseError } from "./parser";

// Validator
export {
  validatePredicate,
  validatePredicateSafe,
  ValidationError,
} from "./validator";
export type { ValidationResult } from "./validator";

// Evaluator
export { evaluatePredicate, EvaluationError } from "./evaluator";
export type { EvaluationContext } from "./evaluator";
