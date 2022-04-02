import * as F from 'funky-lib';

import { expression } from "./where";

const permittedFunctionNames = [
  // math
  'clamp',
  'inRange',
  'modulo',
  // string
  'indexOf',
  'replace',
  'split',
  'toLower',
  'toUpper',
  'trim',
  // logic
  'defaultTo',
  'equals',
  'isEmpty',
  'isNil',
  'ifElse',
  'when',
  'unless',
  'not',
  'and',
  'or',
  'xor',
  // function
  'F',
  'T',
  'always',
  'compose',
  'identity',
  'nthArg',
  'pipe',
  'tap',
  // list
  'all',
  'any',
  'difference',
  'differenceWith',
  'find',
  'findIndex',
  'findLast',
  'findLastIndex',
  'flatten',
  'head',
  'includes',
  'intersection',
  'intersectionWith',
  'join',
  'nth',
  'of',
  'pluck',
  'range',
  'size',
  'slice',
  'tail',
  'take',
  'takeLast',
  'times',
  'union',
  'unionWith',
  'unique',
  // object
  'has',
  'hasPath',
  'keys',
  'omit',
  'path',
  'pathOr',
  'pathSatisfies',
  'prop',
  'propEq',
  'propSatisfies',
  'values',
];

const functionCall = (ast) => {
  const argumentList = functionArguments(ast.arguments);
  if (!F.includes(ast.functionName, 0, permittedFunctionNames)) {
    throw new Error('Unknown function name.');
  }

  return `F.${ast.functionName}(${argumentList})`;
};

const functionArguments = (ast) => {
  const expressions = ast.value.map(expression);

  return expressions.join(', ');
};

export default functionCall;
