import { Direction } from '../src/direction';
import { Lawn } from '../src/lawn';
import { LawnMower } from '../src/lawn-mower';
import { RotationDirection } from '../src/rotation-direction';

const defaultLawn = new Lawn(1, 1);

test('Instanciating a lawnMower should use the given parameters', () => {
  const lawnMower = new LawnMower(0, 0, Direction.North, defaultLawn);

  const actual = lawnMower.getPosition();

  expect(actual).toBe('0, 0, N');
});

test('Rotation the mower clockwise should move to next direction', () => {
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
