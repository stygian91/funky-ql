import select from "./select";
import where from "./where";

const query = (ast) => {
  const queryName = ast.queryName;
  const inner = ast.value;
  const whereAst = inner.where;
  const selectAst = inner.select || { name: 'Select', selectType: 'all' };

  const pick = select(selectAst);

  let filter;
  if (whereAst) {
    filter = `    if(!${where(whereAst)}) return;`;
  } else {
    filter = '';
  }

  return `export const ${queryName} = (list) => {
  const isArray = Array.isArray(list);
  const result = isArray ? [] : {};
  F.forEach((data, key) => {
${filter}
    const pick = ${pick};
    if (isArray) {
      result.push(pick);
    } else {
      result[key] = pick;
    }
  }, list);
  return result;
};`;
};

export default query;
