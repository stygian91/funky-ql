import P from "parsimmon";

import { setName } from "../utils";

export default {
  Query: (r) => P.alt(
    r.Where
      .trim(P.optWhitespace)
      .map(where => ({ where })),

    P.seqObj(
      ['select', r.Select],
      P.optWhitespace,
      ['where', r.Where],
    ),

    r.Select
      .trim(P.optWhitespace)
      .map(select => ({ select })),
  )
  .map(setName('Query')),
};
