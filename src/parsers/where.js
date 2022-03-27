import P from "parsimmon";
import { setName } from "../utils";

export default {
  Where: (r) => P
    .string('where')
    .skip(P.optWhitespace)
    .then(r.Comparison)
    .map(value => ({
      name: 'Where',
      value,
    })),

  Comparison: (r) => P.seqObj(
    P.optWhitespace,
    ['left', r.FieldIdentifier],
    P.optWhitespace,
    ['operator', r.ComparisonOperator],
    P.optWhitespace,
    ['right', r.Expression],
    P.optWhitespace,
  )
  .map(setName('Comparison')),

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
    r.String,
  )
  .map(value => ({
    name: 'Expression',
    value,
  })),
};
