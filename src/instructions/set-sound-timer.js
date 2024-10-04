import { State } from "../state.js";

export class SetSoundTimer {
  static mask = 0xf0ff;
  static opcode = 0xf018;

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
    state.registers.soundTimer = state.registers.V[registerIndex];
  }
}
