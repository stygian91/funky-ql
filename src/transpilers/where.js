import { bool, fieldIdentifier, number, string } from "./terminals";
import { arithmeticOperation } from "./arithmetic";
import functionCall, { array, object } from "./function";

const where = (ast) => {
  const inner = ast.value;

  switch (inner.name) {
    case "Expression":
      return expression(inner);

    case "LogicalExpression":
      return logicalExpression(inner);

    default:
      throw new Error("Invalid where type.");
  }
};

export const comparison = (ast) => {
  const left = fieldIdentifier(ast.left);
  const operator = ast.operator === "=" ? "===" : ast.operator;
  const right = expression(ast.right);

  return `(${left} ${operator} ${right})`;
};

export const logicalExpression = (ast) => {
  const left = expression(ast.left);
  const operator = ast.operator === "and" ? "&&" : "||";
  const right = ast.right.name === "Expression" ?
    expression(ast.right) : logicalExpression(ast.right);

  return `${left} ${operator} ${right}`;
};

export const expression = (ast) => {
  const inner = ast.value;

  switch (inner.name) {
    case "Number":
      return number(inner);

    case "String":
      return string(inner);

    case "Bool":
      return bool(inner);

    case "FieldIdentifier":
      return fieldIdentifier(inner);

    case "ArithmeticOperation":
      return arithmeticOperation(inner);

    case "FunctionCall":
      return functionCall(inner);

    case "Comparison":
      return comparison(inner);

    case "Array":
      return array(inner);

    case "Object":
      return object(inner);

    default:
      throw new Error("Invalid expression type.");
  }
};

export default where;
