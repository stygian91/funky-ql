import language from "../../src/language";

describe('Query', () => {
  test('select only', () => {
    const ast = language.Query.tryParse('select *');
    const expected = {
      name: 'Query',
      select: {
        name: 'Select',
        selectType: 'all'
      },
    };

    expect(ast).toEqual(expected);
  });

  test('where only', () => {
    const ast = language.Query.tryParse('where `id` = 1');
    const expected = {
      name: 'Query',
      where: {
        name: 'Where',
        value: {
          name: 'WhereCondition',
          left: {
            name: 'FieldIdentifier',
            value: 'id',
          },
          operator: '=',
          right: {
            name: 'Expression',
            value: {
              name: 'Number',
              numberType: 'Integer',
              value: 1,
            },
          },
        },
      },
    };

    expect(ast).toEqual(expected);
  });

  test('both', () => {
    const ast = language.Query.tryParse('select `id`, `name` where `id` = 1');
    const expected = {
      name: 'Query',
      select: {
        name: 'Select',
        selectType: 'fields',
        value: [
          {
            name: 'FieldIdentifier',
            value: 'id',
          },
          {
            name: 'FieldIdentifier',
            value: 'name',
          },
        ],
      },
      where: {
        name: 'Where',
        value: {
          name: 'WhereCondition',
          left: {
            name: 'FieldIdentifier',
            value: 'id',
          },
          operator: '=',
          right: {
            name: 'Expression',
            value: {
              name: 'Number',
              value: 1,
              numberType: 'Integer',
            },
          },
        },
      },
    };

    expect(ast).toEqual(expected);
  });
});
