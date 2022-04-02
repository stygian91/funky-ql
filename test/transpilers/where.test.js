import language from "../../src/language";
import where, { comparison, expression, logicalExpression } from "../../src/transpilers/where";

describe('Transpiles where', () => {
  test('Where Condition', () => {
    const ast = language.Comparison.tryParse('`a` > `b`');
    const ast2 = language.Comparison.tryParse('`foo` = "foobar"');
    const ast3 = language.Comparison.tryParse('`qwe` < 3.14');
    const ast4 = language.Comparison.tryParse('`bar` <= 3');
    const ast5 = language.Comparison.tryParse('`bar` >= 10');
    const ast6 = language.Comparison.tryParse('`bar` >= (2 * 4)');
    const ast7 = language.Expression.tryParse('true');
    const ast8 = language.Expression.tryParse('false');

    expect(comparison(ast)).toEqual('(F.path(`a`, data) > F.path(`b`, data))');
    expect(comparison(ast2)).toEqual('(F.path(`foo`, data) === "foobar")');
    expect(comparison(ast3)).toEqual('(F.path(`qwe`, data) < 3.14)');
    expect(comparison(ast4)).toEqual('(F.path(`bar`, data) <= 3)');
    expect(comparison(ast5)).toEqual('(F.path(`bar`, data) >= 10)');
    expect(comparison(ast6)).toEqual('(F.path(`bar`, data) >= 8)');
    expect(() => expression({
      name: 'Expression',
      value: { value: 'b', name: 'lorem' }
    })).toThrow();
    expect(expression(ast7)).toEqual('true');
    expect(expression(ast8)).toEqual('false');
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

    const ast3 = language.Where.tryParse('where inRange(1, 10, 2)');
    expect(where(ast3)).toEqual('F.inRange(1, 10, 2)');

    const ast4 = {
      name: 'Where',
      value: {
        left: { value: 'a', name: 'FieldIdentifier' },
        operator: '=',
        right: { name: 'Expression', value: [] },
        name: 'qwerty'
      }
    };
    expect(() => where(ast4)).toThrow();
  });
});
