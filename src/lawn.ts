export class Lawn {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    if (width <= 0) {
      throw new Error(`Lawn width must be greater than 0, received ${width}`);
    }

    if (height <= 0) {
      throw new Error(`Lawn height must be greater than 0, received ${height}`);
    }

    this.width = width;
    this.height = height;
  }

  isPositionInside(x: number, y: number): boolean {
    return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);  
  }
}
