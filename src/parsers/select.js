import P from "parsimmon";
import * as F from 'funky-lib';

export default {
  Select: (r) => P.seq(
    P.string("select").skip(P.optWhitespace),
    P.alt(
      r.FieldList
        .map(value => ({ selectType: 'fields', value })),

      P.string("*")
        .map(() => ({ selectType: 'all' })),
    )
  ).map(F.nth(1)),

  FieldList: (r) => r.FieldIdentifier
    .sepBy1(r.CommaWithWhitespace),
};
