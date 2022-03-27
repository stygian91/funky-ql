import language from "../../src/language";

describe('Parses strings', () => {
  test('Parses double quote strings', () => {
    const ast = language.String.tryParse('"something"');
    const expected = {
      name: 'String',
      quoteType: '"',
      value: 'something',
    };

    expect(ast).toEqual(expected);
  });

  test('Parses single quote strings', () => {
    const ast = language.String.tryParse("'lorem ipsum'");
    const expected = {
      name: 'String',
      quoteType: "'",
      value: 'lorem ipsum',
    };

    expect(ast).toEqual(expected);
  });

  test('Handles quotes inside string', () => {
    const ast = language.String.tryParse(`"'qwe'asdasd'"`);
    const expected = {
      name: 'String',
      quoteType: '"',
      value: `'qwe'asdasd'`,
    };
    expect(ast).toEqual(expected);

    const ast2 = language.String.tryParse(`'"asd"zzz'`);
    const expected2 = {
      name: 'String',
      quoteType: "'",
      value: `"asd"zzz`,
    };

    expect(ast2).toEqual(expected2);
  });
});
