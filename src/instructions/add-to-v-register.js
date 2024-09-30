import { State } from "../state.js";

export class AddToVRegister {
  static mask = 0xf000;
  static opcode = 0x7000;

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
    const register = (this.opcode & 0x0f00) >> 8;
    const value = this.opcode & 0x00ff;
    state.registers.V[register] = (state.registers.V[register] + value) % 0xff;
  }
}
