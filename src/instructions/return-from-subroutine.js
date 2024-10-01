import { State } from "../state.js";

export class ReturnFromSubroutine {
  static mask = 0xffff;
  static opcode = 0x00ee;

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
    if (state.registers.stack.length === 0) {
      throw new Error("Cannot return from subroutine; empty stack");
    }

    const newAddress = state.registers.stack.pop();
    state.registers.PC = newAddress;
  }
}
