import query from "./query";
import * as F from 'funky-lib';

const program = (ast) => {
  const queries = F.pipe(
    F.map(query),
    F.join('\n')
  )(ast.queries);

  return `import * as F from 'funky-lib';
${queries}
`;
};

export default program;
