import * as F from 'funky-lib';

const select = (ast) => {
  if (ast.selectType === 'all') {
    return selectAll();
  }

  const fields = F.pipe(
    F.pluck('value'),
    F.map(field => "`" + field + "`"),
    F.join(', ')
  )(ast.value);

  return `F.pick([${fields}], data)`;
};

const selectAll = () => `F.identity(data)`;

export default select;
