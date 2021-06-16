import { Instruction } from '../../src/instructions/instruction';
import { Lawn } from '../../src/lawn';
import { LawnMower } from '../../src/lawn-mower';
import { RotateLeft } from '../../src/instructions/rotate-left';
import { Direction } from '../../src/direction';

test('Executing the rotate left instruction on a mower should change direction', () => {
  const lawn = new Lawn(2, 2);
  const lawnMower = new LawnMower(0, 0, Direction.North, lawn);
  const rotateLeftInstruction : Instruction = RotateLeft; 

  lawnMower.execute(rotateLeftInstruction);
  const actual = lawnMower.getPosition();

  expect(actual).toBe('0, 0, W');
});

