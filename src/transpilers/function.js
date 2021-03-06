import * as F from "funky-lib";

import { expression } from "./where";

const permittedFunctionNames = [
  // math
  "clamp",
  "inRange",
  "modulo",
  // string
  "indexOf",
  "replace",
  "split",
  "toLower",
  "toUpper",
  "trim",
  // logic
  "defaultTo",
  "equals",
  "gt",
  "gte",
  "isEmpty",
  "isNil",
  "ifElse",
  "lt",
  "lte",
  "when",
  "unless",
  "not",
  "and",
  "or",
  "xor",
  // function
  "F",
  "T",
  "always",
  "compose",
  "identity",
  "nthArg",
  "pipe",
  "tap",
  // list
  "all",
  "any",
  "difference",
  "differenceWith",
  "find",
  "findIndex",
  "findLast",
  "findLastIndex",
  "flatten",
  "head",
  "includes",
  "intersection",
  "intersectionWith",
  "join",
  "nth",
  "of",
  "pluck",
  "range",
  "size",
  "slice",
  "tail",
  "take",
  "takeLast",
  "times",
  "union",
  "unionWith",
  "unique",
  // object
  "has",
  "hasPath",
  "keys",
  "omit",
  "path",
  "pathOr",
  "pathSatisfies",
  "prop",
  "propEq",
  "propSatisfies",
  "values",
];

const functionCall = (ast) => {
  const argumentList = functionArguments(ast.arguments);
  if (!F.includes(ast.functionName, 0, permittedFunctionNames)) {
    throw new Error("Unknown function name.");
  }

  return `F.${ast.functionName}(${argumentList})`;
};

export const functionArguments = (ast) => {
  const nameEq = F.propEq("name");
  const expressions = ast.value.map(
    F.cond([
      [nameEq("Expression"), expression],
      [nameEq("Placeholder"), placeholder],
      [F.T, () => { throw new Error("Invalid argument type.") }],
    ])
  );

  return expressions.join(", ");
};

const placeholder = () => `F.__`;

export const array = (ast) => {
  const expressions = ast.value.map(expression);
  return `[${expressions.join(', ')}]`;
};

export const object = (ast) => {
  const props = ast.value.map(prop => `${prop.key}: ${expression(prop.value)}`);
  return `{${props.join(', ')}}`;
};

export default functionCall;
