import language from "../../src/language";

describe('Select', () => {
  test('everything', () => {
    const ast = language.Select.tryParse('select *');
    expect(ast).toEqual({ name: 'Select', selectType: 'all' });
  });

  test('single field', () => {
    const ast = language.Select.tryParse('select `asd`');
    expect(ast).toEqual({
      name: 'Select',
      selectType: 'fields',
      value: [{
        name: 'FieldIdentifier',
        value: 'asd',
      }],
    });
  });

  test('multiple fields', () => {
    const ast = language.Select.tryParse('select `asd`, `qwe`');
    expect(ast).toEqual({
      name: 'Select',
      selectType: 'fields',
      value: [
        {
          name: 'FieldIdentifier',
          value: 'asd',
        },
        {
          name: 'FieldIdentifier',
          value: 'qwe',
        },
      ],
    });
  });
});
