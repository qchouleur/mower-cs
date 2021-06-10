import { Lawn } from '../src/lawn';

test('Instanciating a lawn with negative width should throw', () => {
  expect(() => new Lawn(-1, 1)).toThrowError();
});

test('Instanciating a lawn with zero width should throw', () => {
  expect(() => new Lawn(0, 1)).toThrowError();
});

test('Instanciating a lawn with negative height should throw', () => {
  expect(() => new Lawn(1, -1)).toThrowError();
});

test('Instanciating a lawn with zero height should throw', () => {
  expect(() => new Lawn(1, 0)).toThrowError();
});

test('Instanciating a lawn width and height greater than zero succeed', () => {
  expect(() => new Lawn(1, 1)).not.toThrowError();
});

test('isPositionInside should return true for positions within the lawn', () => {
  const lawn = new Lawn(2, 2);

  expect(lawn.isPositionInside(1, 1)).toBe(true);
  expect(lawn.isPositionInside(0, 1)).toBe(true);
  expect(lawn.isPositionInside(1, 0)).toBe(true);
  expect(lawn.isPositionInside(0, 0)).toBe(true);
});

test('isPositionInside should return false for positions outside of the lawn', () => {
  const lawn = new Lawn(2, 2);

  expect(lawn.isPositionInside(-1, -1)).toBe(false);
  expect(lawn.isPositionInside(-10, -10)).toBe(false);
  expect(lawn.isPositionInside(2, 2)).toBe(false);
  expect(lawn.isPositionInside(10, 10)).toBe(false);
});
