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
};
