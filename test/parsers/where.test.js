import language from "../../src/language";

describe("Where", () => {
  test("comparison operator", () => {
    const comparisonOperator = language.ComparisonOperator;

    expect(comparisonOperator.tryParse("=")).toEqual("=");
    expect(comparisonOperator.tryParse(">")).toEqual(">");
    expect(comparisonOperator.tryParse("<")).toEqual("<");
    expect(comparisonOperator.tryParse(">=")).toEqual(">=");
    expect(comparisonOperator.tryParse("<=")).toEqual("<=");
  });

  test("expression", () => {
    const expression = language.Expression;

    expect(expression.tryParse("(1 / 3)")).toEqual({
      name: "Expression",
      value: {
        name: "ArithmeticOperation",
        left: {
          name: "Number",
          numberType: "Integer",
          value: 1,
        },
        operator: {
          name: "ArithmeticOperator",
          value: "/",
        },
        right: {
          name: "Number",
          numberType: "Integer",
          value: 3,
        },
      },
    });

    expect(expression.tryParse("`qwerty`")).toEqual({
      name: 'Expression',
      value: {
        name: 'FieldIdentifier',
        value: 'qwerty',
      },
    });

    expect(expression.tryParse("123")).toEqual({
      name: 'Expression',
      value: {
        name: 'Number',
        numberType: 'Integer',
        value: 123,
      },
    });

    expect(expression.tryParse("'foobar'")).toEqual({
      name: 'Expression',
      value: {
        name: 'String',
        quoteType: "'",
        value: 'foobar',
      },
    });
  });

  test("comparison", () => {
    const ast = language.Comparison.tryParse('`asd` > (2 * `qwe`)');
    expect(ast).toEqual({
      name: 'Comparison',
      operator: '>',
      left: {
        name: 'FieldIdentifier',
        value: 'asd',
      },
      right: {
        name: 'Expression',
        value: {
          name: 'ArithmeticOperation',
          left: {
            name: 'Number',
            numberType: 'Integer',
            value: 2,
          },
          right: {
            name: 'FieldIdentifier',
            value: 'qwe',
          },
          operator: {
            name: 'ArithmeticOperator',
            value: '*',
          },
        },
      },
    });
  });

  test("where", () => {
    const ast = language.Where.tryParse('where `foo` > 3.14');
    expect(ast).toEqual({
      name: 'Where',
      value: {
        name: 'Comparison',
        left: {
          name: 'FieldIdentifier',
          value: 'foo',
        },
        operator: ">",
        right: {
          name: 'Expression',
          value: {
            name: 'Number',
            numberType: 'Float',
            value: 3.14,
          },
        },
      },
    });
  });
});
