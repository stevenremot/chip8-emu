import { State } from "../state.js";

export class StoreRandomValue {
  static mask = 0xf000;
  static opcode = 0xc000;

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
    const mask = this.opcode & 0x00ff;
    const randomValue = Math.floor(Math.random() * 256);
    state.registers.V[register] = randomValue & mask;
  }
}
