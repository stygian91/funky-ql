import P from "parsimmon";

import { setName } from "../utils";

export default {
  Where: (r) => P
    .string('where')
    .skip(P.optWhitespace)
    .then(P.alt(r.LogicalExpression, r.WhereCondition))
    .map(value => ({
      name: 'Where',
      value,
    })),

  WhereCondition: (r) => P.seqObj(
    ['left', r.FieldIdentifier],
    ['operator', r.ComparisonOperator.trim(P.optWhitespace)],
    ['right', r.Expression],
  )
  .trim(P.optWhitespace)
  .map(setName('WhereCondition')),

  LogicalExpression: (r) => P.seqObj(
    ['left', r.WhereCondition],
    ['operator', P.regex(/and|or/).trim(P.optWhitespace)],
    ['right', P.alt(r.LogicalExpression, r.WhereCondition)],
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
    r.ArithmeticOperation,
    r.FunctionCall,
    r.FieldIdentifier,
    r.Number,
    r.String,
    r.Bool,
  )
  .map(value => ({
    name: 'Expression',
    value,
  })),
};
