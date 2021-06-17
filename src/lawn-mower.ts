import { Direction, DirectionVector } from './direction';
import { Instruction } from './instructions/instruction';
import { Lawn } from './lawn';
import { RotationDirection } from './rotation-direction';

export class LawnMower {
  x: number;
  y: number;
  direction: Direction;
  lawn: Lawn;

  constructor(x: number, y: number, direction: Direction, lawn: Lawn) {
    if (x < 0) {
      throw new Error(
        `The mower x position should be greater or equal to zero, received ${x}`,
      );
    }

    if (y < 0) {
      throw new Error(
        `The mower y position should be greater or equal to zero, received ${y}`,
      );
    }

    if (!lawn.isPositionInside(x, y)) {
      throw new Error(
        'The mower should be initially placed within the assigned lawn',
      );
    }

    this.x = x;
    this.y = y;
    this.direction = direction;
    this.lawn = lawn;
  }

  execute(instruction: Instruction): void {
    instruction(this);
  }

  move(): void {
    const vector = DirectionVector.get(this.direction);
    if (vector === undefined) {
      return;
    }

    const [vx, vy] = vector;

    if (this.lawn.isPositionInside(this.x + vx, this.y + vy)) {
      this.x += vx;
      this.y += vy;
    }
  }

  rotate(rotationDirection: RotationDirection): void {
    const directionIncrement =
      rotationDirection === RotationDirection.Clockwise ? 1 : -1;
    
    const directions = Object.values(Direction);
    const currentDirectionIndex: number = directions.indexOf(this.direction);
     
    let newDirectionIndex: number;

    if(directionIncrement < 0 && currentDirectionIndex === 0) {
      newDirectionIndex = directions.length - 1;
    } else if (directionIncrement > 0 && currentDirectionIndex === (directions.length - 1)) {
      newDirectionIndex = 0;
    } else {
      newDirectionIndex = currentDirectionIndex + directionIncrement;
    }
    this.direction = Object.values(Direction)[newDirectionIndex];
  }

  getPosition(): string {
    return `${this.x} ${this.y} ${this.direction}`;
  }
}
