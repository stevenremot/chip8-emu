import { State } from "../state.js";

export class SetTimer {
  static mask = 0xf0ff;
  static opcode = 0xf015;

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
    const registerIndex = (this.opcode & 0x0f00) >> 8;
    state.registers.delayTimer = state.registers.V[registerIndex];
  }
}
