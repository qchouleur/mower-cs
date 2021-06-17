import { Lawn } from '../src/lawn';
import { Interpreter } from '../src/interpreter';
import { Direction } from '../src/direction';
import { Forward } from '../src/instructions/forward';
import { RotateRight } from '../src/instructions/rotate-right';
import { RotateLeft } from '../src/instructions/rotate-left';

const interpreter = new Interpreter();

test('Parsing lawn info with less than two parameters should throw', () => {
  expect(() => interpreter.parseLawnInfo('1')).toThrowError();
});

test('Parsing lawn info with less than two parameters should throw', () => {
  expect(() => interpreter.parseLawnInfo('1 2 3')).toThrowError();
});

test('Parsing lawn info with invalid width should throw', () => {
  expect(() => interpreter.parseLawnInfo('L 2')).toThrowError();
  expect(() => interpreter.parseLawnInfo('-1 2')).toThrowError();
});

test('Parsing lawn info with invalid height should throw', () => {
  expect(() => interpreter.parseLawnInfo('2 X')).toThrowError();
  expect(() => interpreter.parseLawnInfo('2 -2')).toThrowError();
});

test('Parsing lawn info with valid parameters should return lawn instance', () => {
  const actual = interpreter.parseLawnInfo('1 2');

  // The parsed information is actually the top righ corner of the lawn.
  // The width is the x top right corner position + 1 and height the y top right corner position + 1
  expect(actual.width).toBe(2);
  expect(actual.height).toBe(3);
});

test('Parsing mower info with less than three parameters should throw', () => {
  const lawn = new Lawn(4, 4);

  expect(() => interpreter.parseMowerInfo('', lawn)).toThrowError();
});

test('Parsing mower info with more than three parameters should throw', () => {
  const lawn = new Lawn(4, 4);

  expect(() => interpreter.parseMowerInfo('1 2 3 4', lawn)).toThrowError();
});

test('Parsing mower with invalid x position should throw', () => {
  const lawn = new Lawn(1, 1);

  expect(() => interpreter.parseMowerInfo('-1 1 N', lawn)).toThrowError();
  expect(() => interpreter.parseMowerInfo('X 1 N', lawn)).toThrowError();
});

test('Parsing mower with invalid y position should throw', () => {
  const lawn = new Lawn(1, 1);

  expect(() => interpreter.parseMowerInfo('1 -1 N', lawn)).toThrowError();
  expect(() => interpreter.parseMowerInfo('1 Y N', lawn)).toThrowError();
});

test('Parsing mower with invalid direcition should throw', () => {
  const lawn = new Lawn(1, 1);

  expect(() => interpreter.parseMowerInfo('1 1 Z', lawn)).toThrowError();
});

test('Parsing mower info with valid parameters should return mower instance', () => {
  const lawn = new Lawn(1, 1);

  const actual = interpreter.parseMowerInfo('0 0 N', lawn);

  expect(actual.x).toBe(0);
  expect(actual.y).toBe(0);
  expect(actual.direction).toBe(Direction.North);
});

test('Parsing F mower instruction should return Forward instruction', () => {
  const actual = interpreter.parseMowerInstructions('F')[0];

  expect(actual).toBe(Forward);
});

test('Parsing R mower instruction should return Rotate right instruction', () => {
  const actual = interpreter.parseMowerInstructions('R')[0];

  expect(actual).toBe(RotateRight);
});

test('Parsing L mower instruction should return Rotate left instruction', () => {
  const actual = interpreter.parseMowerInstructions('L')[0];

  expect(actual).toBe(RotateLeft);
});

test('Parsing instruction with unknown instruction letter should throw', () => {
  expect(() => interpreter.parseMowerInstructions('X')).toThrowError();
});

test('Parsing multiple instructions should return instructions', () => {
  const actual = interpreter.parseMowerInstructions('RF');

  expect(actual[0]).toBe(RotateRight);
  expect(actual[1]).toBe(Forward);
});

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


