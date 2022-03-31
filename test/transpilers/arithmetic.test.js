import language from "../../src/language";
import { arithmeticOperation } from "../../src/transpilers/arithmetic";

const op = language.ArithmeticOperation;

describe('Transpiles arithmetic', () => {
  test('simple operation', () => {
    expect(arithmeticOperation(op.tryParse('(1+2)'))).toEqual('3');
    expect(arithmeticOperation(op.tryParse('(12.3 + 2)'))).toEqual('14.3');
    expect(arithmeticOperation(op.tryParse('(15 - 2)'))).toEqual('13');
    expect(arithmeticOperation(op.tryParse('(13 * 3)'))).toEqual('39');
    expect(arithmeticOperation(op.tryParse('(15 / 3)'))).toEqual('5');

    const ast = {
      left: { name: 'Number', numberType: 'Integer', value: 1 },
      operator: { name: 'ArithmeticOperator', value: 'test' },
      right: { name: 'Number', numberType: 'Integer', value: 2 },
      name: 'ArithmeticOperation'
    };
    expect(() => arithmeticOperation(ast)).toThrow();

    const ast2 = {
      left: { name: 'Number', numberType: 'Integer', value: 1 },
      operator: { name: 'ArithmeticOperator', value: '+' },
      right: { name: 'Foobar', numberType: 'Integer', value: 2 },
      name: 'ArithmeticOperation'
    };
    expect(() => arithmeticOperation(ast2)).toThrow();
  });

  test('variable operation', () => {
    const ast = op.tryParse('(`a.b` * `c.d`)');
    expect(arithmeticOperation(ast)).toEqual('(F.path(`a.b`, data) * F.path(`c.d`, data))');
  });

  test('nested simple operation', () => {
    const ast = op.tryParse('(`a.b` * (3 + 2))');
    expect(arithmeticOperation(ast)).toEqual('(F.path(`a.b`, data) * 5)');
  });

  test('nested variable operation', () => {
    const ast = op.tryParse('(`a.b` * (`c.d` + 2))');
    expect(arithmeticOperation(ast)).toEqual('(F.path(`a.b`, data) * (F.path(`c.d`, data) + 2))');
  });
});

