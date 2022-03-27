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
    P.string('('),
    P.optWhitespace,
    ['left', r.Term],
    P.optWhitespace,
    ['operator', r.ArithmeticOperator],
    P.optWhitespace,
    ['right', r.Term],
    P.optWhitespace,
    P.string(')'),
  )
  .map(setName('ArithmeticOperation')),


  Term: (r) => P.alt(
    r.ArithmeticOperation,
    r.FieldIdentifier,
    r.Number
  ),
};
