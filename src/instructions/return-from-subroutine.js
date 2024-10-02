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
    const newAddress = state.registers.stack.pop();
    if (typeof newAddress === "undefined") {
      throw new Error("Cannot return from subroutine; empty stack");
    }

    state.registers.PC = newAddress;
  }
}
