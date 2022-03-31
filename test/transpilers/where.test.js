import language from "../../src/language";
import where, { whereCondition, expression, logicalExpression } from "../../src/transpilers/where";

describe('Transpiles where', () => {
  test('Where Condition', () => {
    const ast = language.WhereCondition.tryParse('`a` > `b`');
    const ast2 = language.WhereCondition.tryParse('`foo` = "foobar"');
    const ast3 = language.WhereCondition.tryParse('`qwe` < 3.14');
    const ast4 = language.WhereCondition.tryParse('`bar` <= 3');
    const ast5 = language.WhereCondition.tryParse('`bar` >= 10');
    const ast6 = language.WhereCondition.tryParse('`bar` >= (2 * 4)');

    expect(whereCondition(ast)).toEqual('(F.path(`a`, data) > F.path(`b`, data))');
    expect(whereCondition(ast2)).toEqual('(F.path(`foo`, data) === "foobar")');
    expect(whereCondition(ast3)).toEqual('(F.path(`qwe`, data) < 3.14)');
    expect(whereCondition(ast4)).toEqual('(F.path(`bar`, data) <= 3)');
    expect(whereCondition(ast5)).toEqual('(F.path(`bar`, data) >= 10)');
    expect(whereCondition(ast6)).toEqual('(F.path(`bar`, data) >= 8)');
    expect(() => expression({
      name: 'Expression',
      value: { value: 'b', name: 'lorem' }
    })).toThrow();
  });

  test('simple logical expression', () => {
    const ast = language.LogicalExpression.tryParse('`a` = "foo" and `b` < 3');
    expect(logicalExpression(ast)).toEqual('(F.path(`a`, data) === "foo") && (F.path(`b`, data) < 3)')
  });

  test('nested logical expression', () => {
    const ast = language.LogicalExpression.tryParse('`a` = "foo" and `b` < 3 or `c` >= (2 * 3)');
    expect(logicalExpression(ast)).toEqual('(F.path(`a`, data) === "foo") && (F.path(`b`, data) < 3) || (F.path(`c`, data) >= 6)');
  });

  test('where', () => {
    const ast = language.Where.tryParse('where `a` = 3');
    expect(where(ast)).toEqual('(F.path(`a`, data) === 3)');

    const ast2 = language.Where.tryParse('where `a` = 3 and `b` < 3.14');
    expect(where(ast2)).toEqual('(F.path(`a`, data) === 3) && (F.path(`b`, data) < 3.14)');

    const ast3 = {
      name: 'Where',
      value: {
        left: { value: 'a', name: 'FieldIdentifier' },
        operator: '=',
        right: { name: 'Expression', value: [Object] },
        name: 'qwerty'
      }
    };
    expect(() => where(ast3)).toThrow();
  });
});
