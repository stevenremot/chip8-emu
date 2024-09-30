import { State } from "../state.js";

export class SetVRegister {
  static mask = 0xf000;
  static opcode = 0x6000;

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
    const n = (this.opcode & 0x0f00) >> 8;
    const value = this.opcode & 0x00ff;
    state.registers.V[n] = value;
  }
}
