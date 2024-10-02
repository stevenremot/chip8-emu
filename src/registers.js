const START_ADDRESS = 0x200;

/**
 * @param {number} n
 */
function hex(n) {
  return `0x${n.toString(16)}`;
}

export class Registers {
  constructor() {
    this.I = 0;
    this.PC = START_ADDRESS;
    this.V = Array.from({ length: 16 }, () => 0);
    this.delayTimer = 0;
    this.soundTimer = 0;
    /**
     * @type {number[]}
     */
    this.stack = [];
  }

  toString() {
    return `PC: ${hex(this.PC)}, I: ${hex(this.I)}
${this.V.map((value, index) => `V${index}: ${hex(value)}`).join(", ")}
stack: ${this.stack.map(hex).join(", ")}`;
  }
}
