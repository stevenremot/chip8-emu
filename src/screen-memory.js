const WIDTH = 64;
const HEIGHT = 32;

export class ScreenMemory {
  constructor() {
    this.memory = new Uint8Array((WIDTH * HEIGHT) / 8);
  }

  clear() {
    this.memory.fill(0);
  }

  /**
   * @param {number} screenX
   * @param {number} screenY
   * @param {Uint8Array} sprite
   */
  applySprite(screenX, screenY, sprite) {
    let hasTurnedOffAPixel = false;
    // Sanitize X and Y
    screenX = screenX % WIDTH;
    screenY = screenY % HEIGHT;

    const baseOffset = screenX % 8;

    // Clip sprite to screen
    const spriteWidth = Math.min(8, WIDTH - screenX);
    const spriteHeight = Math.min(sprite.length, HEIGHT - screenY);

    for (let y = 0; y < spriteHeight; y++) {
      // For each row, apply the XOR twice as our screen is split ito 8 pixels groups
      // and the sprite may overlap two groups.

      const firstScreenAddress = (y + screenY) * WIDTH + screenX;
      const firstAddress = Math.floor(firstScreenAddress / 8);

      const firstBaseValue = this.memory[firstAddress];
      this.memory[firstAddress] ^= sprite[y] >> baseOffset;

      hasTurnedOffAPixel =
        hasTurnedOffAPixel || this.memory[firstAddress] < firstBaseValue;

      if (baseOffset > 0 && spriteWidth === 8) {
        const secondScreenAddress = (y + screenY) * WIDTH + screenX + 8;
        const secondAddress = Math.floor(secondScreenAddress / 8);
        const secondBaseValue = this.memory[secondAddress];
        this.memory[secondAddress] ^= sprite[y] << (8 - baseOffset);
        hasTurnedOffAPixel =
          hasTurnedOffAPixel || this.memory[secondAddress] < secondBaseValue;
      }
    }

    return hasTurnedOffAPixel;
  }

  /**
   * @param {(x: number, y: number, isLit: boolean) => void} callback
   */
  forEachPixel(callback) {
    let address = 0;
    let offset = 0;

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const comparison = 0b10000000 >> offset;
        callback(x, y, (this.memory[address] & comparison) === comparison);
        offset += 1;
        if (offset === 8) {
          offset = 0;
          address += 1;
        }
      }
    }
  }
}
