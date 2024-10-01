import { State } from "../state.js";

export class SkipOnVRegisterValueNotEquals {
  static mask = 0xf000;
  static opcode = 0x4000;

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
    const registerNumber = (this.opcode & 0x0f00) >> 8;
    const value = this.opcode & 0x00ff;

    if (state.registers.V[registerNumber] !== value) {
      state.registers.PC += 2;
    }
  }
}
