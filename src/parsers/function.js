import P from "parsimmon";

import { setName } from "../utils";

export default {
  FunctionCall: (r) => P.seqObj(
    ['functionName', r.FunctionIdentifier.trim(P.optWhitespace)],
    P.string('('),
    ['arguments', r.FunctionArguments],
    P.string(')'),
  )
  .trim(P.optWhitespace)
  .map(setName('FunctionCall')),

  FunctionArguments: (r) => P.sepBy(
    P.alt(
      P.string('__').map(value => ({ name: 'Placeholder', value })),
      r.Expression
    ),
    P.string(',').trim(P.optWhitespace)
  )
  .trim(P.optWhitespace)
  .map(args => ({ name: 'FunctionArguments', value: args })),

  Array: (r) => r.Expression.sepBy(
    P.string(',').trim(P.optWhitespace)
  )
  .trim(P.optWhitespace)
  .wrap(
    P.string('['),
    P.string(']'),
  )
  .map(value => ({ name: 'Array', value })),

  Object: (r) => P.sepBy(
    P.seqObj(
      ['key', r.Identifier.trim(P.optWhitespace)],
      P.string(':').trim(P.optWhitespace),
      ['value', r.Expression.trim(P.optWhitespace)]
    ),
    P.string(',').trim(P.optWhitespace)
  )
  .trim(P.optWhitespace)
  .wrap(
    P.string('{'),
    P.string('}')
  )
  .map(value => ({ name: 'Object', value })),
};
