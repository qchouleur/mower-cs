import { LawnMower } from "../lawn-mower";
import { RotationDirection } from "../rotation-direction";

export function RotateLeft(mower: LawnMower): void {
  mower.rotate(RotationDirection.AntiClockwise);
}

