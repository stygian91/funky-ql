import language from "../../src/language";
import functionCall from "../../src/transpilers/function";

describe('transpiles functions', () => {
  test('regular call', () => {
    const ast = language.FunctionCall.tryParse('func(1, 2)');
    const actual = functionCall(ast);

    expect(actual).toEqual('func(1, 2)');
  });

  test('nested call', () => {
    const ast = language.FunctionCall.tryParse('func(1, func2(3))');
    const actual = functionCall(ast);

    expect(actual).toEqual('func(1, func2(3))');
  });

  test('call with arithmetic', () => {
    const ast = language.FunctionCall.tryParse('func(1, (41 + 1))');
    const actual = functionCall(ast);

    expect(actual).toEqual('func(1, 42)');
  });
});
