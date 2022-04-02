import language from "../../src/language";
import functionCall from "../../src/transpilers/function";

describe('transpiles functions', () => {
  test('regular call', () => {
    const ast = language.FunctionCall.tryParse('clamp(1, 2, 3)');
    const actual = functionCall(ast);

    expect(actual).toEqual('F.clamp(1, 2, 3)');
  });

  test('nested call', () => {
    const ast = language.FunctionCall.tryParse('and(1, or(0, 1))');
    const actual = functionCall(ast);

    expect(actual).toEqual('F.and(1, F.or(0, 1))');
  });

  test('call with arithmetic', () => {
    const ast = language.FunctionCall.tryParse('clamp(1, (41 + 1), 3)');
    const actual = functionCall(ast);

    expect(actual).toEqual('F.clamp(1, 42, 3)');
  });

  test('throws with unknown functions', () => {
    const ast = language.FunctionCall.tryParse('qwerty(1, 2, 3)');

    expect(() => functionCall(ast)).toThrow();
  });
});
