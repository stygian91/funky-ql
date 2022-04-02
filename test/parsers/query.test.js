import language from "../../src/language";

describe('Query', () => {
  test('select only', () => {
    const ast = language.Query.tryParse('simple := select *');
    const expected = {
      name: 'Query',
      queryName: 'simple',
      value: {
        select: {
          name: 'Select',
          selectType: 'all'
        },
      },
    };

    expect(ast).toEqual(expected);
  });

  test('where only', () => {
    const ast = language.Query.tryParse('simple2 := where `id` = 1');
    const expected = {
      name: 'Query',
      queryName: 'simple2',
      value: {
        where: {
          name: 'Where',
          value: {
            name: 'Expression',
            value: {
              name: 'Comparison',
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
        },
      },
    };

    expect(ast).toEqual(expected);
  });

  test('both', () => {
    const ast = language.Query.tryParse('both := select `id`, `name` where `id` = 1');
    const expected = {
      name: 'Query',
      queryName: 'both',
      value: {
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
            name: 'Expression',
            value: {
              name: 'Comparison',
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
        },
      },
    };

    expect(ast).toEqual(expected);
  });
});
