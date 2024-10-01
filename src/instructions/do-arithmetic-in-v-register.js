import { State } from "../state.js";

/**
 * @typedef {(a: number, b: number) => {result: number, carry: number}} Operation
 */

/**
 * @type {Record<number, Operation>}
 */
const operations = {
  0: function copy(_a, b) {
    return { result: b, carry: 0 };
  },
  1: function logicalOr(a, b) {
    return { result: a | b, carry: 0 };
  },
  2: function logicalAnd(a, b) {
    return { result: a & b, carry: 0 };
  },
  3: function logicalXor(a, b) {
    return { result: a ^ b, carry: 0 };
  },
  4: function add(a, b) {
    const result = a + b;

    return result > 0xff
      ? { result: result - 0x100, carry: 1 }
      : { result, carry: 0 };
  },
  5: function substract(a, b) {
    const result = a - b;

    return result < 0
      ? { result: result + 0x100, carry: 0 }
      : { result, carry: 1 };
  },
  7: function substractInv(a, b) {
    const result = b - a;

    return result < 0
      ? { result: result + 0x100, carry: 0 }
      : { result, carry: 1 };
  },
  6: function shiftRight(_a, b) {
    return { result: b >> 1, carry: b & 1 };
  },
  [0xe]: function shiftRight(_a, b) {
    return { result: (b << 1) & 0xff, carry: b >> 7 };
  },
};

export class DoArithmeticInVRegister {
  static mask = 0xf000;
  static opcode = 0x8000;

  /**
   *
   * @param {number} opcode
   */
  constructor(opcode) {
    this.opcode = opcode;
  }

  /**
   *
   * @param {State} state
   */
  execute(state) {
    const registerNumber1 = (this.opcode & 0x0f00) >> 8;
    const registerNumber2 = (this.opcode & 0x00f0) >> 4;
    const operationCode = this.opcode & 0x000f;

    if (!(operationCode in operations)) {
      console.warn(
        `No arithmetic operation found for opcode 0x${this.opcode.toString(16)}; treated as noop`,
      );
      return;
    }

    const { result, carry } = operations[operationCode](
      state.registers.V[registerNumber1],
      state.registers.V[registerNumber2],
    );
    state.registers.V[0xf] = carry;
    state.registers.V[registerNumber1] = result;
  }
}
