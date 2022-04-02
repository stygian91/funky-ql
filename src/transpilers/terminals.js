import * as F from 'funky-lib';

export const fieldIdentifier = (ast) => 'F.path(`' + ast.value + '`, data)';

export const number = F.prop('value');

export const string = (ast) => {
  const quote = ast.quoteType;
  return quote + ast.value + quote;
};

export const bool = (ast) => ast.value ? 'true' : 'false';
