import { FontLoader } from "../font-loader.js";
import { State } from "../state.js";

export class LoadFont {
  static mask = 0xf0ff;
  static opcode = 0xf029;

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
    const digit = state.registers.V[register] & 0xf;
    state.registers.I = FontLoader.getAddressForDigit(digit);
  }
}
