import { Effect } from "../effect.js";

const operationMask = 0x00ff;
const equalCode = 0x009e;
const notEqualCode = 0x00a1;

/**
 * @type {Record<number, (val: boolean) => boolean>}
 */
const operations = {
  [equalCode]: (value) => value,
  [notEqualCode]: (value) => !value,
};

export class SkipOnKeyPress {
  static mask = 0xf000;
  static opcode = 0xe000;

  /**
   * @param {number} opcode
   */
  constructor(opcode) {
    this.opcode = opcode;
  }

  execute() {
    const registerIndex = (this.opcode & 0x0f00) >> 8;

    const operation = operations[this.opcode & operationMask];

    if (!operation) {
      console.warn(`Unknown opcode for 0xe...: ${this.opcode}; treat as noop`);
      return;
    }

    return new Effect(({ state, inputManager, callback }) => {
      const expectedKeyCode = state.registers.V[registerIndex];
      if (operation(inputManager.isKeyPressed(expectedKeyCode))) {
        state.registers.PC += 2;
      }
      callback();
    });
  }
}
