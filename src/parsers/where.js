import P from "parsimmon";

export default {
  Comparison: (r) => P.seqObj(
    ['left', r.FieldIdentifier],
    ['operator', r.ComparisonOperator],
    ['right', r.Expression],
  ),

  ComparisonOperator: (r) => P.alt(
    r.LessThanOrEqual,
    r.GreaterThanOrEqual,
    r.LessThan,
    r.GreaterThan,
    r.Equals,
  ),

  Expression: (r) => P.alt(
    r.ArithmeticOperation,
    r.FieldIdentifier,
    r.Number,
    r.String
  ),
};
