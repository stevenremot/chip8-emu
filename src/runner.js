import { AnimationFrameLoop } from "./animation-frame-loop.js";
import { makeInstruction } from "./instructions/make-instruction.js";
import { State } from "./state.js";
import { logger } from "./utils/logger.js";

export class Runner {
  /**
   * @param {State} state
   */
  constructor(state) {
    this.state = state;
  }

  run() {
    const loop = new AnimationFrameLoop(() => {
      this.runOneInstruction();
    }, 700);

    return loop.start();
  }

  runOneInstruction() {
    const opcode = this.state.mainMemory.readNumber(this.state.registers.PC, 2);
    logger.log(
      `[RUNNER] opcode: 0x${opcode.toString(16)}
${this.state.registers}`,
    );

    this.state.registers.PC += 2;
    this.execute(opcode);
  }

  /**
   * @param {number} opcode
   */
  execute(opcode) {
    const instruction = makeInstruction(opcode);
    if (!instruction) {
      console.warn(
        `No instruction found for opcode 0x${opcode.toString(16)}; treated as noop`,
      );
      return;
    }
    logger.log(` [RUNNER] instruction: ${instruction.constructor.name}`);
    instruction.execute(this.state);
  }
}
