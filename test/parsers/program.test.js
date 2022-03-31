import language from '../../src/language';

describe('parses program', () => {
  test('single query', () => {
    const ast = language.Program.tryParse('myQuery := select *;');
    const expected = {
      name: 'Program',
      queries: [
        {
          name: 'Query',
          queryName: 'myQuery',
          value: {
            select: {
              selectType: 'all',
              name: 'Select',
            },
          },
        }
      ],
    };

    expect(ast).toEqual(expected);
  });

  test('multiple queries', () => {
    const ql = `
      query1 := select \`foo\`;
      query2 := where \`bar\` = 3.14;
    `;
    const ast = language.Program.tryParse(ql);

    const expected = {
      name: 'Program',
      queries: [
        {
          name: 'Query',
          queryName: 'query1',
          value: {
            select: {
              selectType: 'fields',
              name: 'Select',
              value: [{
                name: 'FieldIdentifier',
                value: 'foo',
              }],
            },
          },
        },

        {
          name: 'Query',
          queryName: 'query2',
          value: {
            where: {
              name: 'Where',
              value: {
                name: 'WhereCondition',
                left: {
                  name: 'FieldIdentifier',
                  value: 'bar',
                },
                operator: '=',
                right: {
                  name: 'Expression',
                  value: {
                    name: 'Number',
                    numberType: 'Float',
                    value: 3.14,
                  },
                },
              },
            },
          },
        },
      ],
    };

    expect(ast).toEqual(expected);
  });
});
