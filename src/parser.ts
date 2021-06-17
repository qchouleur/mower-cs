import { Direction } from './direction';
import { Forward } from './instructions/forward';
import { Instruction } from './instructions/instruction';
import { RotateLeft } from './instructions/rotate-left';
import { RotateRight } from './instructions/rotate-right';
import { Lawn } from './lawn';
import { LawnMower } from './lawn-mower';

export class Parser {
  parseLawnInfo(source: string): Lawn {
    const rawLawnInfo = source.split(' ');
    if (rawLawnInfo.length !== 2) {
      throw new Error(
        `Invalid lawn information, should include 2 parameters, received ${rawLawnInfo.length}`,
      );
    }

    const [xTopCorner, yTopCorner] = rawLawnInfo.map((x) => Number.parseInt(x));

    if (Number.isNaN(xTopCorner) || xTopCorner <= 0) {
      throw new Error(
        `Invalid lawn corner X position, should be a positive integer, received ${rawLawnInfo[0]}`,
      );
    }

    if (Number.isNaN(yTopCorner) || yTopCorner <= 0) {
      throw new Error(
        `Invalid lawn corner Y position, should be a positive integer, received ${rawLawnInfo[0]}`,
      );
    }

    return new Lawn(xTopCorner + 1, yTopCorner + 1);
  }

  parseMowerInfo(source: string, lawn: Lawn): LawnMower {
    const rawMowerInfo = source.split(' ');

    if (rawMowerInfo.length !== 3) {
      throw new Error(
        `Invalid mower information, should include 3 parameters, received ${rawMowerInfo.length}`,
      );
    }

    const [rawXPosition, rawYPosition, rawDirection] = rawMowerInfo;

    const xPosition = Number.parseInt(rawXPosition);

    if (Number.isNaN(xPosition) || xPosition < 0) {
      throw new Error(
        `Invalid mower x position, should be greater or equal to 0, received ${rawXPosition}`,
      );
    }

    const yPosition = Number.parseInt(rawYPosition);
    if (Number.isNaN(yPosition) || yPosition < 0) {
      throw new Error(
        `Invalid mower y position, should be greater or equal to 0, received ${rawYPosition}`,
      );
    }

    const direction: Direction = this.parseDirection(rawDirection);
    return new LawnMower(xPosition, yPosition, direction, lawn);
  }

  parseMowerInstructions(source: string): Array<Instruction> {
    const instructions = new Array<Instruction>();

    for (const instruction of source) {
      switch (instruction) {
        case 'F':
          instructions.push(Forward);
          break;
        case 'R':
          instructions.push(RotateRight);
          break;
        case 'L':
          instructions.push(RotateLeft);
          break;
        default:
          throw new Error(`unknown mower instruction ${instruction}`);
      }
    }

    return instructions;
  }

  private parseDirection(source: string): Direction {
    const keys = Object.keys(Direction).filter(
      (x) => Direction[x as keyof typeof Direction] === source,
    );

    if (keys.length === 0) {
      throw new Error(`Invalid direction value, received ${source}`);
    }

    return Direction[keys[0] as keyof typeof Direction];
  }
}
