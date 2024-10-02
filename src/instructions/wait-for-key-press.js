import { Effect } from "../effect.js";

export class WaitForKeyPress {
  static mask = 0xf0ff;
  static opcode = 0xf00a;

  /**
   * @param {number} opcode
   */
  constructor(opcode) {
    this.opcode = opcode;
  }

  execute() {
    const registerIndex = (this.opcode & 0x0f00) >> 8;
    return new Effect(({ inputManager, state, callback }) => {
      inputManager.waitForAnyKeyPress((keyCode) => {
        state.registers.V[registerIndex] = keyCode;
        callback();
      });
    });
  }
}
