import language from "../../src/language";

describe('function', () => {
  test('empty arguments', () => {
    const ast = language.FunctionCall.tryParse('func()');
    const expected = {
      name: 'FunctionCall',
      functionName: 'func',
      arguments: {
        name: 'FunctionArguments',
        value: [],
      },
    };

    expect(ast).toEqual(expected);
  });

  test('single call', () => {
    const ast = language.FunctionCall.tryParse('someFunc(1, "qwe", 42.12)');
    const expected = {
      name: 'FunctionCall',
      functionName: 'someFunc',
      arguments: {
        name: 'FunctionArguments',
        value: [
          {
            name: 'Expression',
            value: {
              name: 'Number',
              numberType: 'Integer',
              value: 1,
            },
          },
          {
            name: 'Expression',
            value: {
              name: 'String',
              quoteType: '"',
              value: 'qwe',
            },
          },
          {
            name: 'Expression',
            value: {
              name: 'Number',
              numberType: 'Float',
              value: 42.12,
            },
          },
        ],
      },
    };

    expect(ast).toEqual(expected);
  });

  test('nested call', () => {
    const ast = language.FunctionCall.tryParse('func(1, func2((2 * 2)))');
    const expected = {
      name: 'FunctionCall',
      functionName: 'func',
      arguments: {
        name: 'FunctionArguments',
        value: [
          {
            name: 'Expression',
            value: {
              name: 'Number',
              numberType: 'Integer',
              value: 1,
            },
          },
          {
            name: 'Expression',
            value: {
              name: 'FunctionCall',
              functionName: 'func2',
              arguments: {
                name: 'FunctionArguments',
                value: [
                  {
                    name: 'Expression',
                    value: {
                      name: 'ArithmeticOperation',
                      left: {
                        name: 'Number',
                        numberType: 'Integer',
                        value: 2,
                      },
                      operator: {
                        name: 'ArithmeticOperator',
                        value: '*',
                      },
                      right: {
                        name: 'Number',
                        numberType: 'Integer',
                        value: 2,
                      },
                    },
                  }
                ],
              },
            },
          },
        ],
      },
    };

    expect(ast).toEqual(expected);
  });
});
