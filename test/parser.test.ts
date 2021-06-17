import { Direction } from '../src/direction';
import { Forward } from '../src/instructions/forward';
import { RotateLeft } from '../src/instructions/rotate-left';
import { RotateRight } from '../src/instructions/rotate-right';
import { Lawn } from '../src/lawn';
import { Parser } from '../src/parser';

const parser = new Parser();

test('Parsing lawn info with less than two parameters should throw', () => {
  expect(() => parser.parseLawnInfo('1')).toThrowError();
});

test('Parsing lawn info with less than two parameters should throw', () => {
  expect(() => parser.parseLawnInfo('1 2 3')).toThrowError();
});

test('Parsing lawn info with invalid width should throw', () => {
  expect(() => parser.parseLawnInfo('L 2')).toThrowError();
  expect(() => parser.parseLawnInfo('-1 2')).toThrowError();
});

test('Parsing lawn info with invalid height should throw', () => {
  expect(() => parser.parseLawnInfo('2 X')).toThrowError();
  expect(() => parser.parseLawnInfo('2 -2')).toThrowError();
});

test('Parsing lawn info with valid parameters should return lawn instance', () => {
  const actual = parser.parseLawnInfo('1 2');

  // The parsed information is actually the top righ corner of the lawn.
  // The width is the x top right corner position + 1 and height the y top right corner position + 1
  expect(actual.width).toBe(2);
  expect(actual.height).toBe(3);
});

test('Parsing mower info with less than three parameters should throw', () => {
  const lawn = new Lawn(4, 4);

  expect(() => parser.parseMowerInfo('', lawn)).toThrowError();
});

test('Parsing mower info with more than three parameters should throw', () => {
  const lawn = new Lawn(4, 4);

  expect(() => parser.parseMowerInfo('1 2 3 4', lawn)).toThrowError();
});

test('Parsing mower with invalid x position should throw', () => {
  const lawn = new Lawn(1, 1);

  expect(() => parser.parseMowerInfo('-1 1 N', lawn)).toThrowError();
  expect(() => parser.parseMowerInfo('X 1 N', lawn)).toThrowError();
});

test('Parsing mower with invalid y position should throw', () => {
  const lawn = new Lawn(1, 1);

  expect(() => parser.parseMowerInfo('1 -1 N', lawn)).toThrowError();
  expect(() => parser.parseMowerInfo('1 Y N', lawn)).toThrowError();
});

test('Parsing mower with invalid direcition should throw', () => {
  const lawn = new Lawn(1, 1);

  expect(() => parser.parseMowerInfo('1 1 Z', lawn)).toThrowError();
});

test('Parsing mower info with valid parameters should return mower instance', () => {
  const lawn = new Lawn(1, 1);

  const actual = parser.parseMowerInfo('0 0 N', lawn);

  expect(actual.x).toBe(0);
  expect(actual.y).toBe(0);
  expect(actual.direction).toBe(Direction.North);
});

test('Parsing F mower instruction should return Forward instruction', () => {
  const actual = parser.parseMowerInstructions('F')[0];

  expect(actual).toBe(Forward);
});

test('Parsing R mower instruction should return Rotate right instruction', () => {
  const actual = parser.parseMowerInstructions('R')[0];

  expect(actual).toBe(RotateRight);
});

test('Parsing L mower instruction should return Rotate left instruction', () => {
  const actual = parser.parseMowerInstructions('L')[0];

  expect(actual).toBe(RotateLeft);
});

test('Parsing instruction with unknown instruction letter should throw', () => {
  expect(() => parser.parseMowerInstructions('X')).toThrowError();
});

test('Parsing multiple instructions should return instructions', () => {
  const actual = parser.parseMowerInstructions('RF');

  expect(actual[0]).toBe(RotateRight);
  expect(actual[1]).toBe(Forward);
});

