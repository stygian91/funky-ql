import language from "../../src/language";
import query from "../../src/transpilers/query";

describe('Transpiles query', () => {
  test('filter', () => {
    const ast = language.Query.tryParse('myQuery := where `a` > `qwe`')
    const actual = query(ast);

    const expected = `export const myQuery = (list) => {
  const isArray = Array.isArray(list);
  const result = isArray ? [] : {};
  F.forEach((data, key) => {
    if(!(F.path(\`a\`, data) > F.path(\`qwe\`, data))) return;
    const pick = F.identity(data);
    if (isArray) {
      result.push(pick);
    } else {
      result[key] = pick;
    }
  }, list);
  return result;
};`;

    expect(actual).toEqual(expected);
  });

  test('select', () => {
    const ast = language.Query.tryParse('myQuery := select `foo`')
    const actual = query(ast);

    const expected = `export const myQuery = (list) => {
  const isArray = Array.isArray(list);
  const result = isArray ? [] : {};
  F.forEach((data, key) => {

    const pick = F.pick([\`foo\`], data);
    if (isArray) {
      result.push(pick);
    } else {
      result[key] = pick;
    }
  }, list);
  return result;
};`;

    expect(actual).toEqual(expected);
  });

  test('both', () => {
    const ast = language.Query.tryParse('myQuery := select `foo`, `bar` where `a` > 2');
    const actual = query(ast);

    const expected = `export const myQuery = (list) => {
  const isArray = Array.isArray(list);
  const result = isArray ? [] : {};
  F.forEach((data, key) => {
    if(!(F.path(\`a\`, data) > 2)) return;
    const pick = F.pick([\`foo\`, \`bar\`], data);
    if (isArray) {
      result.push(pick);
    } else {
      result[key] = pick;
    }
  }, list);
  return result;
};`;

    expect(actual).toEqual(expected);
  });
});
