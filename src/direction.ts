export enum Direction {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
}

export const DirectionVector: Map<Direction, [number, number]> = new Map([
  [Direction.North, [0, 1]],
  [Direction.East, [1, 0]],
  [Direction.West, [-1, 0]],
  [Direction.South, [0, -1]],
]);
