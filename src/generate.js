import * as F from "funky-lib";

import language from "./language";
import program from "./transpilers/program";

const generate = (query) => {
  const ast = language.Program.parse(query);

  if (ast.status) {
    return F.Either.of(program(ast.value));
  }

  const expected = F.join(", ", ast.expected);
  return new F.Left(
    new Error(
      `Error while parsing on line ${ast.index.line}, column ${ast.index.column}. Expected [${expected}].`
    )
  );
};

export default generate;
