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

  test('array', () => {
    const ast = language.Array.tryParse('[1, 2, (2 * 3)]');
    expect(ast).toEqual({
      name: 'Array',
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
            name: 'Number',
            numberType: 'Integer',
            value: 2,
          },
        },
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
              value: 3,
            },
          },
        },
      ],
    });

    const ast2 = language.Array.tryParse('[1, [2, 3]]');
    expect(ast2).toEqual({
      name: 'Array',
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
            name: 'Array',
            value: [
              {
                name: 'Expression',
                value: {
                  name: 'Number',
                  numberType: 'Integer',
                  value: 2,
                },
              },
              {
                name: 'Expression',
                value: {
                  name: 'Number',
                  numberType: 'Integer',
                  value: 3,
                },
              },
            ],
          },
        },
      ],
    });
  });

  test('object', () => {
    const ast = language.Object.tryParse('{ key1: "str", key2: 2, key3: 3.14 }');
    expect(ast).toEqual({
      name: 'Object',
      value: [
        {
          key: 'key1',
          value: {
            name: 'Expression',
            value: {
              name: 'String',
              value: "str",
              quoteType: '"',
            },
          },
        },
        {
          key: 'key2',
          value: {
            name: 'Expression',
            value: {
              name: 'Number',
              numberType: 'Integer',
              value: 2,
            },
          },
        },
        {
          key: 'key3',
          value: {
            name: 'Expression',
            value: {
              name: 'Number',
              numberType: 'Float',
              value: 3.14,
            },
          },
        },
      ],
    });

    const ast2 = language.Object.tryParse('{ key1: 1, key2: { key1: 99 } }');
    expect(ast2).toEqual({
      name: 'Object',
      value: [
        {
          key: 'key1',
          value: {
            name: 'Expression',
            value: {
              name: 'Number',
              numberType: 'Integer',
              value: 1,
            },
          },
        },
        {
          key: 'key2',
          value: {
            name: 'Expression',
            value: {
              name: 'Object',
              value: [
                {
                  key: 'key1',
                  value: {
                    name: 'Expression',
                    value: {
                      name: 'Number',
                      value: 99,
                      numberType: 'Integer',
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });
  });
});
