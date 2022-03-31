import generate from "../src/generate";
import * as F from "funky-lib";

test('generate function', () => {
  const right = generate('query := where `a` = 2;');
  expect(right).toBeInstanceOf(F.Right);

  const left = generate('query := select *');
  expect(left).toBeInstanceOf(F.Left);
});
