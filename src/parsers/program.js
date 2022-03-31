import P from "parsimmon";
import * as F from "funky-lib";

export default {
  Program: (r) => P.sepBy1(
    P.seq(
      r.Query.trim(P.optWhitespace),
      P.string(';')
    ).map(F.nth(0)),

    P.optWhitespace
  )
  .trim(P.optWhitespace)
  .map(queries => ({ name: 'Program', queries })),
};
