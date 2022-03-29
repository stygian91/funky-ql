import P from "parsimmon";

import { setName } from "../utils";

export default {

  Select: (r) => P.string("select")
    .trim(P.optWhitespace)
    .then(
      P.alt(
        r.FieldList
          .map(value => ({ selectType: 'fields', value })),

        P.string("*")
          .map(() => ({ selectType: 'all' })),
      )
    )
    .map(setName('Select')),

  FieldList: (r) => r.FieldIdentifier
    .sepBy1(r.CommaWithWhitespace),
};
