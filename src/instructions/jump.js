import { State } from "../state.js";

export class Jump {
  static mask = 0xf000;
  static opcode = 0x1000;

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
    state.registers.PC = this.opcode & 0x0fff;
  }
}
