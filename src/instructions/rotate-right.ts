import { LawnMower } from '../lawn-mower';
import { RotationDirection } from '../rotation-direction';

export function RotateRight(mower: LawnMower): void {
  mower.rotate(RotationDirection.Clockwise);
}
