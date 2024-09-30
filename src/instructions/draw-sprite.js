import { State } from "../state.js";

const nMask = 0x000f;
const yMask = 0x00f0;
const xMask = 0x0f00;

export class DrawSprite {
  static mask = 0xf000;
  static opcode = 0xd000;

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
    const n = this.opcode & nMask;
    const yRegister = (this.opcode & yMask) >> 4;
    const xRegister = (this.opcode & xMask) >> 8;

    const x = state.registers.V[xRegister];
    const y = state.registers.V[yRegister];

    const sprite = state.mainMemory.readRange(state.registers.I, n * 2);

    const result = state.screenMemory.applySprite(x, y, sprite);
    state.registers.V[0xf] = result ? 1 : 0;
  }
}
