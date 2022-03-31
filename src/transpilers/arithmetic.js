import * as F from 'funky-lib';

import { fieldIdentifier, number } from './terminals';

export const arithmeticOperation = (ast) => {
  const left = ast.left;
  const right = ast.right;
  const operator = ast.operator.value;

  if (left.name === 'Number' && right.name === 'Number') {
    return simpleArithmetic(operator, left.value, right.value);
  }

  const leftTerm = term(left);
  const rightTerm = term(right);

  return `(${leftTerm} ${operator} ${rightTerm})`;
};

const simpleArithmetic = (operator, left, right) => {
  let result;

  switch (operator) {
    case '+':
      result = F.add(right, left);
      break;

    case '-':
      result = F.subtract(right, left);
      break;

    case '*':
      result = F.multiply(right, left);
      break;

    case '/':
      result = F.divide(right, left);
      break;

    default:
      throw new Error('Invalid arithmetic operation.');
  }

  return result.toString();
};

const term = (ast) => {
  switch (ast.name) {
    case 'FieldIdentifier':
      return fieldIdentifier(ast);

    case 'ArithmeticOperation':
      return arithmeticOperation(ast);

    case 'Number':
      return number(ast);

    default:
      throw new Error('Invalid term type.');
  }
};
