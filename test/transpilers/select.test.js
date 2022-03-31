import language from "../../src/language";
import select from "../../src/transpilers/select";

describe('Transpiles select', () => {
  test('select all', () => {
    const ast = language.Select.tryParse('select *');
    expect(select(ast)).toEqual('F.identity(data)');
  });

  test('select fields', () => {
    const ast = language.Select.tryParse('select `foo`, `bar`');
    expect(select(ast)).toEqual('F.pick([`foo`, `bar`], data)');
  });
});
