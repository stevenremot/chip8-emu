import { State } from "../state.js";

export class SetIndexPointer {
  static mask = 0xf000;
  static opcode = 0xa000;

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
    state.registers.I = this.opcode ^ SetIndexPointer.opcode;
  }
}
