import { State } from "../state.js";

export class StoreVRegisterToMemory {
  static mask = 0xf0ff;
  static opcode = 0xf055;

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
    const values = Array.from(
      { length: maxRegister + 1 },
      (_, i) => state.registers.V[i],
    );
    state.mainMemory.writeRange(address, new Uint8Array(values));
    state.registers.I += maxRegister + 1;
  }
}
