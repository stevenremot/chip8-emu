import { State } from "../state.js";

export class SkipOnVRegistersValuesEquals {
  static mask = 0xf00f;
  static opcode = 0x5000;

  /**
   *
   * @param {number} opcode
   */
  constructor(opcode) {
    this.opcode = opcode;
  }

  /**
   *
   * @param {State} state
   */
  execute(state) {
    const registerNumber1 = (this.opcode & 0x0f00) >> 8;
    const registerNumber2 = (this.opcode & 0x00f0) >> 4;

    if (
      state.registers.V[registerNumber1] === state.registers.V[registerNumber2]
    ) {
      state.registers.PC += 2;
    }
  }
}
