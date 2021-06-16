import { Direction } from './direction';
import { Instruction } from './instructions/instruction';
import { Lawn } from './lawn';
import { LawnMower } from './lawn-mower';

export class Interpreter {
  /* source format is the following:
   * <lawn-width> <lawn-height>
   * <mower-1-x-position> <mower-1-y-position> <mower-1-direction>
   * <mower-1-instructions...>
   * ...
   * <mower-n-x-position> <mower-n-y-position> <mower-n-direction>
   * <mower-n-instructions...>
   */
  process(source: string): string {}

  parseLawnInfo(source: string): Lawn {
    const rawLawnInfo = source.split(' ');
    if (rawLawnInfo.length !== 2) {
      throw new Error(
        `Invalid lawn information, should include 2 parameters, received ${rawLawnInfo.length}`,
      );
    }

    const [width, height] = rawLawnInfo.map((x) => Number.parseInt(x));

    if (Number.isNaN(width) || width <= 0) {
      throw new Error(
        `Invalid lawn width, should be a positive integer, received ${rawLawnInfo[0]}`,
      );
    }

    if (Number.isNaN(height) || height <= 0) {
      throw new Error(
        `Invalid lawn height, should be a positive integer, received ${rawLawnInfo[0]}`,
      );
    }

    return new Lawn(width, height);
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

    if(Number.isNaN(xPosition) || xPosition < 0) {
      throw new Error(
        `Invalid mower x position, should be greater or equal to 0, received ${rawXPosition}`
      );
    }

    const yPosition = Number.parseInt(rawYPosition);
    if(Number.isNaN(yPosition) || yPosition < 0) {
      throw new Error(
        `Invalid mower y position, should be greater or equal to 0, received ${rawYPosition}`
      );
    }

    const direction: Direction = Direction[rawDirection as keyof typeof Direction];
    return new LawnMower(xPosition, yPosition, direction, lawn);
  }

  parseMowerInstructions(source: string): Array<Instruction> {
    return new Array<Instruction>();
  }
}
