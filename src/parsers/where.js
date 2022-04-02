import P from "parsimmon";

import { setName } from "../utils";

export default {
  Where: (r) => P
    .string('where')
    .skip(P.optWhitespace)
    .then(P.alt(r.LogicalExpression, r.Expression))
    .map(value => ({
      name: 'Where',
      value,
    })),

  Comparison: (r) => P.seqObj(
    ['left', r.FieldIdentifier],
    ['operator', r.ComparisonOperator.trim(P.optWhitespace)],
    ['right', r.Expression],
  )
  .trim(P.optWhitespace)
  .map(setName('Comparison')),

  LogicalExpression: (r) => P.seqObj(
    ['left', r.Expression],
    ['operator', P.regex(/and|or/).trim(P.optWhitespace)],
    ['right', P.alt(r.LogicalExpression, r.Expression)],
  )
  .trim(P.optWhitespace)
  .map(setName('LogicalExpression')),

  ComparisonOperator: (r) => P.alt(
    r.LessThanOrEqual,
    r.GreaterThanOrEqual,
    r.LessThan,
    r.GreaterThan,
    r.Equals,
  ),

  Expression: (r) => P.alt(
    r.Comparison,
    r.ArithmeticOperation,
    r.FunctionCall,
    r.FieldIdentifier,
    r.Array,
    r.Number,
    r.String,
    r.Bool
  )
  .map(value => ({
    name: 'Expression',
    value,
  })),
};
