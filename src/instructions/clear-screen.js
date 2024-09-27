import { State } from "../state.js";

export class ClearScreen {
  static opcode = 0x00e0;

  /**
   * @param {State} state
   */
  execute(state) {
    state.screenMemory.clear();
  }
}
