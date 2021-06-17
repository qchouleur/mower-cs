import { Lawn } from '../src/lawn';
import { Interpreter } from '../src/interpreter';
import { Direction } from '../src/direction';

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
  const lawn = new Lawn(1,1);

  expect(() => interpreter.parseMowerInfo('-1 1 N', lawn)).toThrowError();
  expect(() => interpreter.parseMowerInfo('X 1 N', lawn)).toThrowError();
});

test('Parsing mower with invalid y position should throw', () => {
  const lawn = new Lawn(1,1);

  expect(() => interpreter.parseMowerInfo('1 -1 N', lawn)).toThrowError();
  expect(() => interpreter.parseMowerInfo('1 Y N', lawn)).toThrowError();
});

test('Parsing mower with invalid direcition should throw', () => {
  const lawn = new Lawn(1,1);

  expect(() => interpreter.parseMowerInfo('1 1 Z', lawn)).toThrowError();
});

test('Parsing mower info with valid parameters should return mower instance', () => {
  const lawn = new Lawn(1,1);

  const actual = interpreter.parseMowerInfo('0, 0, N', lawn);

  expect(actual.x).toBe(0);
  expect(actual.y).toBe(0);
  expect(actual.direction).toBe(Direction.North);
});

test('Parsing F mower instruction should return Forward instruction', () => {
});

test('Parsing R mower instruction should return Rotate right instruction', () => {
});

test('Parsing L mower instruction should return Rotate left instruction', () => {
});

test('Parsing instruction with unknown instruction letter should throw', () => {
});

test('Parsing multiple instructions should return instructions', () => {
});

test('Processing test instruction should return expected mower positions', () => {
});
