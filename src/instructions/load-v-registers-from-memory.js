import { State } from "../state.js";

export class LoadVRegistersFromMemory {
  static mask = 0xf0ff;
  static opcode = 0xf065;

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
    const address = state.registers.I;
    const maxRegister = (this.opcode & 0x0f00) >> 8;
    const values = state.mainMemory.readRange(address, maxRegister + 1);
    state.registers.I += maxRegister + 1;
    for (let i = 0; i <= maxRegister; i++) {
      state.registers.V[i] = values[i];
    }
  }
}
