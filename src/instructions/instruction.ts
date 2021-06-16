import { LawnMower } from '../lawn-mower';

export interface Instruction {
  (mower: LawnMower): void;
}
