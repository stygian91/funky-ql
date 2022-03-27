import * as F from "funky-lib";

import language from "../../src/language";

describe("Arithmetic", () => {
  test("operators", () => {
    const plusAst = language.ArithmeticOperator.tryParse("+");
    const minusAst = language.ArithmeticOperator.tryParse("-");
    const asteriskAst = language.ArithmeticOperator.tryParse("*");
    const slashAst = language.ArithmeticOperator.tryParse("/");

    const assocSign = (sign) =>
      F.assoc("value", sign, { name: "ArithmeticOperator" });

    expect(plusAst).toEqual(assocSign("+"));
    expect(minusAst).toEqual(assocSign("-"));
    expect(asteriskAst).toEqual(assocSign("*"));
    expect(slashAst).toEqual(assocSign("/"));
  });

  test("operation", () => {
    const numAst = language.ArithmeticOperation.tryParse("(1 + 3)");
    expect(numAst).toEqual({
      name: "ArithmeticOperation",
      left: { name: "Number", numberType: "Integer", value: 1 },
      operator: { name: "ArithmeticOperator", value: "+" },
      right: { name: "Number", numberType: "Integer", value: 3 },
    });

    const fieldAst = language.ArithmeticOperation.tryParse("(`col` - 3.14)");
    expect(fieldAst).toEqual({
      name: "ArithmeticOperation",
      left: { name: "FieldIdentifier", value: "col" },
      operator: { name: "ArithmeticOperator", value: "-" },
      right: { name: "Number", numberType: "Float", value: 3.14 },
    });

    const onlyFieldAst = language.ArithmeticOperation.tryParse("(`col1` * `col2`)");
    expect(onlyFieldAst).toEqual({
      name: "ArithmeticOperation",
      left: { name: "FieldIdentifier", value: "col1" },
      operator: { name: "ArithmeticOperator", value: "*" },
      right: { name: "FieldIdentifier", value: "col2" },
    });

    const nestedAst = language.ArithmeticOperation.tryParse("(`col1` * (2 - `col2`))");
    expect(nestedAst).toEqual({
      name: "ArithmeticOperation",
      left: { name: "FieldIdentifier", value: "col1" },
      operator: { name: "ArithmeticOperator", value: "*" },
      right: {
        name: "ArithmeticOperation",
        left: {
          name: "Number",
          numberType: "Integer",
          value: 2,
        },
        operator: {
          name: "ArithmeticOperator",
          value: "-",
        },
        right: {
          name: "FieldIdentifier",
          value: "col2",
        },
      },
    });
  });
});
