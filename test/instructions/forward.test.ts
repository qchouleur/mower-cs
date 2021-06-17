import { Instruction } from '../../src/instructions/instruction';
import { Lawn } from '../../src/lawn';
import { LawnMower } from '../../src/lawn-mower';
import { Forward } from '../../src/instructions/forward';
import { Direction } from '../../src/direction';

test('Executing the forward instruction on a mower should move it', () => {
  const lawn = new Lawn(2, 2);
  const lawnMower = new LawnMower(0, 0, Direction.North, lawn);
  const fowardInstruction: Instruction = Forward; 

  lawnMower.execute(fowardInstruction);
  const actual = lawnMower.getPosition();

  expect(actual).toBe('0 1 N');
});

