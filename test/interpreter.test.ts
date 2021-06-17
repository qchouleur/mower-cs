import { Interpreter } from '../src/interpreter';
import { Parser } from '../src/parser';

const interpreter = new Interpreter(new Parser());

test('Processing test instruction with source of less than 3 lines should throw', () => {
  const source = `1
    2`;

  expect(() => interpreter.process(source)).toThrowError();
});

test('Processing test instruction with source odd mower line count should throw', () => {
  const source = `lawn
    mower1
    mower1
    mower2`;

  expect(() => interpreter.process(source)).toThrowError();
});

test('Processing test instruction should return expected mower positions', () => {
  const source = `5 5
1 2 N
LFLFLFLFF
3 3 E
FFRFFRFRRF`;

  const output = interpreter.process(source);

  expect(output).toBe(`1 3 N
5 1 E`);
});


