import { State } from "../state.js";

export class CallSubroutine {
  static mask = 0xf000;
  static opcode = 0x2000;

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
    const newAddress = this.opcode & 0x0fff;
    state.registers.stack.push(state.registers.PC);
    state.registers.PC = newAddress;
  }
}
