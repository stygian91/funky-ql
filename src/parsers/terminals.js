import P from "parsimmon";
import * as F from 'funky-lib';

export default {
  String: () => P
    .alt(
      P.seqObj(
        ['quoteType', P.string("'")],
        ['value', P.regex(/[^']*/)],
        P.string("'")
      ),
      P.seqObj(
        ['quoteType', P.string('"')],
        ['value', P.regex(/[^"]*/)],
        P.string('"')
      ),
    )
    .map(F.assoc('name', 'String')),

  Number: () => P
    .alt(
      P.regex(/\-?\d+\.\d*/)
        .map(value => ({
          name: 'Number',
          numberType: 'Float',
          value: parseFloat(value),
        })),

      P.regex(/\-?\d+/)
        .map(value => ({
          name: 'Number',
          numberType: 'Integer',
          value: parseInt(value),
        })),
    ),

  Bool: () => P.alt(
    P.string('true'),
    P.string('false')
  )
  .map(value => ({ name: 'Bool', value: value === 'true' })),

  FieldIdentifier: () =>
    P.seqObj(
      P.string('`'),
      ['value', P.regex(/[a-zA-Z0-9_\-]+[a-zA-Z0-9_\-\.]*/)],
      P.string('`'),
    )
    .map(F.assoc('name', 'FieldIdentifier')),

  FunctionIdentifier: () => P.regex(/[A-Za-z_][A-Za-z0-9_]*/),

  CommaWithWhitespace: () => P
    .seq(
      P.optWhitespace,
      P.string(','),
      P.optWhitespace
    ),

  LessThan: () => P.string('<'),
  GreaterThan: () => P.string('>'),
  Equals: () => P.string('='),
  LessThanOrEqual: () => P.string('<='),
  GreaterThanOrEqual: () => P.string('>='),

  Plus: () => P.string('+'),
  Minus: () => P.string('-'),
  Asterisk: () => P.string('*'),
  Slash: () => P.string('/'),
};
