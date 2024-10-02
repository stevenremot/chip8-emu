import { State } from "../state.js";

export class AddVRegisterToIndexPointer {
  static mask = 0xf0ff;
  static opcode = 0xf01e;

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
    state.registers.I += state.registers.V[register];
  }
}
