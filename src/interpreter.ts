import { Parser } from './parser';

export class Interpreter {
  parser: Parser;

  constructor(parser: Parser) {
    this.parser = parser;
  }

  /* source format is the following:
   * <lawn-width> <lawn-height>
   * <mower-1-x-position> <mower-1-y-position> <mower-1-direction>
   * <mower-1-instructions...>
   * ...
   * <mower-n-x-position> <mower-n-y-position> <mower-n-direction>
   * <mower-n-instructions...>
   */
  process(source: string): string {
    const lines = source
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l !== '');

    // There should be at least be 3 lines, the number of lines mower lines should also be pair
    if (lines.length < 3 || (lines.length - 1) % 2 !== 0) {
      throw new Error('Invalid automatic mower file format');
    }

    const [lawnSource, ...mowerSource] = lines;
    const lawn = this.parser.parseLawnInfo(lawnSource);
    const output = new Array<string>();

    for (let i = 0; i < mowerSource.length / 2; i++) {
      const mower = this.parser.parseMowerInfo(mowerSource[i * 2], lawn);
      const instructions = this.parser.parseMowerInstructions(
        mowerSource[i * 2 + 1],
      );

      instructions.forEach((instruction) => mower.execute(instruction));
      output.push(mower.getPosition());
    }

    return output.join('\n');
  }
}
