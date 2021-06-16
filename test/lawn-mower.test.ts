import { Direction } from '../src/direction';
import { Lawn } from '../src/lawn';
import { LawnMower } from '../src/lawn-mower';
import { RotationDirection } from '../src/rotation-direction';

const defaultLawn = new Lawn(1, 1);

test('Initializing a lawn mower with negative x position should throw', () => {
  expect(() => new LawnMower(-1, 0, Direction.North, defaultLawn)).toThrowError();
});

test('Initializing a lawn mower with negative y position should throw', () => {
  expect(() => new LawnMower(0, -1, Direction.North, defaultLawn)).toThrowError();
});

test('Initializing a lawn mower outside of the assignated lawn should throw', () => {
  expect(() => new LawnMower(1, 1, Direction.North, defaultLawn)).toThrowError();
});

test('Initializing a lawnMower should use the given parameters', () => {
  const lawnMower = new LawnMower(0, 0, Direction.North, defaultLawn);

  const actual = lawnMower.getPosition();

  expect(actual).toBe('0, 0, N');
});

test('Rotating the mower clockwise should move to next direction', () => {
  const lawnMower = new LawnMower(0, 0, Direction.North, defaultLawn);

  lawnMower.rotate(RotationDirection.Clockwise);
  const actual = lawnMower.getPosition();

  expect(actual).toBe('0, 0, E');
});

test('Rotating the mower clockwise should return to North after West direction', () => {
  const lawnMower = new LawnMower(0, 0, Direction.West, defaultLawn);

  lawnMower.rotate(RotationDirection.Clockwise);
  const actual = lawnMower.getPosition();

  expect(actual).toBe('0, 0, N');
});

test('Rotating the mower anti-clockwise should move to previous direction', () => {
  const lawnMower = new LawnMower(0, 0, Direction.South, defaultLawn);

  lawnMower.rotate(RotationDirection.AntiClockwise);
  const actual = lawnMower.getPosition();

  expect(actual).toBe('0, 0, E');
});

test('Rotating the mower anti-clockwise should return to West after North direction', () => {
  const lawnMower = new LawnMower(0, 0, Direction.North, defaultLawn);

  lawnMower.rotate(RotationDirection.AntiClockwise);
  const actual = lawnMower.getPosition();

  expect(actual).toBe('0, 0, W');
});

test('Moving the mower with north direction should increase y position', () => {
  const lawnMower = new LawnMower(0, 0, Direction.North, new Lawn(2, 2));

  lawnMower.move();
  const actual = lawnMower.getPosition();

  expect(actual).toBe('0, 1, N');
});

test('Moving the mower with east direction should increase x position', () => {
  const lawnMower = new LawnMower(0, 0, Direction.East, new Lawn(2, 2));

  lawnMower.move();
  const actual = lawnMower.getPosition();

  expect(actual).toBe('1, 0, E');
});

test('Moving the mower with south direction should decrease y position', () => {
  const lawnMower = new LawnMower(0, 1, Direction.South, new Lawn(2, 2));

  lawnMower.move();
  const actual = lawnMower.getPosition();

  expect(actual).toBe('0, 0, S');
});

test('Moving the mower with west direction should decrease x position', () => {
  const lawnMower = new LawnMower(1, 0, Direction.West, new Lawn(2, 2));

  lawnMower.move();
  const actual = lawnMower.getPosition();

  expect(actual).toBe('0, 0, W');
});

test('Moving the mower outside of the lawn should not do anything', () => {
  const lawnMower = new LawnMower(1, 0, Direction.East, new Lawn(2, 2));

  lawnMower.move();
  const actual = lawnMower.getPosition();

  expect(actual).toBe('1, 0, E');
});
