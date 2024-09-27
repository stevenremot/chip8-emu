const START_ADDRESS = 0x200;

export class Registers {
  constructor() {
    this.I = 0;
    this.PC = START_ADDRESS;
    this.V = Array.from({ length: 16 }, () => 0);
    this.delayTimer = 0;
    this.soundTimer = 0;
    this.stack = [];
  }
}
