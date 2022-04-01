import { expression } from "./where";

const functionCall = (ast) => {
  const argumentList = functionArguments(ast.arguments);

  return `${ast.functionName}(${argumentList})`;
};

const functionArguments = (ast) => {
  const expressions = ast.value.map(expression);

  return expressions.join(', ');
};

export default functionCall;
