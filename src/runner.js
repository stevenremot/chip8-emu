import { AnimationFrameLoop } from "./animation-frame-loop.js";
import { Effect } from "./effect.js";
import { InputManager } from "./input-manager.js";
import { makeInstruction } from "./instructions/make-instruction.js";
import { State } from "./state.js";
import { logger } from "./utils/logger.js";

export class Runner {
  #isRunning = false;

  /**
   * @param {State} state
   * @param {InputManager} inputManager
   */
  constructor(state, inputManager) {
    this.state = state;
    this.inputManager = inputManager;
  }

  run() {
    this.#isRunning = true;
    const loop = new AnimationFrameLoop(() => {
      if (this.#isRunning) {
        this.runOneInstruction();
      }
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
    const result = instruction.execute(this.state);

    if (result && result instanceof Effect) {
      this.#isRunning = false;
      result.run({
        state: this.state,
        inputManager: this.inputManager,
        callback: () => {
          this.#isRunning = true;
        },
      });
    }
  }

  get isRunning() {
    return this.#isRunning;
  }
}
