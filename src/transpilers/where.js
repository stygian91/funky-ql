import { fieldIdentifier, number, string } from "./terminals";
import { arithmeticOperation } from "./arithmetic";

const where = (ast) => {
  const inner = ast.value;

  switch (inner.name) {
    case "WhereCondition":
      return whereCondition(inner);

    case "LogicalExpression":
      return logicalExpression(inner);

    default:
      throw new Error("Invalid where type.");
  }
};

export const whereCondition = (ast) => {
  const left = fieldIdentifier(ast.left);
  const operator = ast.operator === "=" ? "===" : ast.operator;
  const right = expression(ast.right);

  return `(${left} ${operator} ${right})`;
};

export const logicalExpression = (ast) => {
  const left = whereCondition(ast.left);
  const operator = ast.operator === "and" ? "&&" : "||";
  const right = ast.right.name === "WhereCondition" ?
    whereCondition(ast.right) : logicalExpression(ast.right);

  return `${left} ${operator} ${right}`;
};

export const expression = (ast) => {
  const inner = ast.value;

  switch (inner.name) {
    case "Number":
      return number(inner);

    case "String":
      return string(inner);

    case "FieldIdentifier":
      return fieldIdentifier(inner);

    case "ArithmeticOperation":
      return arithmeticOperation(inner);

    default:
      throw new Error("Invalid expression type.");
  }
};

export default where;
