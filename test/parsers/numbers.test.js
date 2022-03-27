import language from "../../src/language";

const num = language.Number;

describe('Parses numbers', () => {
  test('Parses integers', () => {
    expect(num.tryParse('42')).toEqual({
      name: 'Number',
      numberType: 'Integer',
      value: 42,
    });

    expect(num.tryParse('-305')).toEqual({
      name: 'Number',
      numberType: 'Integer',
      value: -305,
    });
  });

  test('Parses floats', () => {
    expect(num.tryParse('3.14159')).toEqual({
      name: 'Number',
      numberType: 'Float',
      value: 3.14159,
    });

    expect(num.tryParse('2.')).toEqual({
      name: 'Number',
      numberType: 'Float',
      value: 2.0,
    });

    expect(num.tryParse('-1203.5')).toEqual({
      name: 'Number',
      numberType: 'Float',
      value: -1203.5,
    });
  });
});
