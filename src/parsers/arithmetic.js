import P from 'parsimmon';

import { setName } from '../utils';

export default {
  ArithmeticOperator: (r) => P.alt(
    r.Plus,
    r.Minus,
    r.Asterisk,
    r.Slash,
  )
  .map(value => ({
    name: 'ArithmeticOperator',
    value,
  })),

  ArithmeticOperation: (r) => P.seqObj(
    ['left', r.Term],
    ['operator', r.ArithmeticOperator.trim(P.optWhitespace)],
    ['right', r.Term],
  )
  .trim(P.optWhitespace)
  .wrap(P.string('('), P.string(')'))
  .map(setName('ArithmeticOperation')),


  Term: (r) => P.alt(
    r.ArithmeticOperation,
    r.FieldIdentifier,
    r.Number
  ),
};
