import { State } from "../state.js";

export class StoreBinaryCodedDecimal {
  static mask = 0xf0ff;
  static opcode = 0xf033;

  /**
   * @param {number} opcode
   */
  constructor(opcode) {
    this.opcode = opcode;
  }

  /**
   * @param {State} state
   */
  execute(state) {
    const address = state.registers.I;
    const registerIndex = (this.opcode & 0x0f00) >> 8;
    const value = state.registers.V[registerIndex];

    const bytes = new Uint8Array([
      Math.floor(value / 100),
      Math.floor(value / 10) % 10,
      value % 10,
    ]);
    state.mainMemory.writeRange(address, bytes);
  }
}
