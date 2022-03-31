import language from '../../src/language';
import program from '../../src/transpilers/program';

describe('transpiles program', () => {
  test('single query', () => {
    const ast = language.Program.tryParse('query := where `a` > 100;');
    const actual = program(ast);
    const expected = `import * as F from 'funky-lib';
export const query = (list) => {
  const isArray = Array.isArray(list);
  const result = isArray ? [] : {};
  F.forEach((data, key) => {
    if(!(F.path(\`a\`, data) > 100)) return;
    const pick = F.identity(data);
    if (isArray) {
      result.push(pick);
    } else {
      result[key] = pick;
    }
  }, list);
  return result;
};
`;

    expect(actual).toEqual(expected);
  });

  test('multiple queries', () => {
    const ast = language.Program.tryParse('query := where `a` > 100; query2 := select *;');
    const actual = program(ast);
    const expected = `import * as F from 'funky-lib';
export const query = (list) => {
  const isArray = Array.isArray(list);
  const result = isArray ? [] : {};
  F.forEach((data, key) => {
    if(!(F.path(\`a\`, data) > 100)) return;
    const pick = F.identity(data);
    if (isArray) {
      result.push(pick);
    } else {
      result[key] = pick;
    }
  }, list);
  return result;
};
export const query2 = (list) => {
  const isArray = Array.isArray(list);
  const result = isArray ? [] : {};
  F.forEach((data, key) => {

    const pick = F.identity(data);
    if (isArray) {
      result.push(pick);
    } else {
      result[key] = pick;
    }
  }, list);
  return result;
};
`;

    expect(actual).toEqual(expected);
  });
});
