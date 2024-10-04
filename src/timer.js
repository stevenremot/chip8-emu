import { AnimationFrameLoop } from "./animation-frame-loop.js";
import { State } from "./state.js";

export class Timer {
  /**
   * @param {State} state
   */
  constructor(state) {
    this.state = state;
  }

  start() {
    const loop = new AnimationFrameLoop(() => {
      if (this.state.registers.delayTimer > 0) {
        this.state.registers.delayTimer -= 1;
      }

      if (this.state.registers.soundTimer > 0) {
        this.state.registers.soundTimer -= 1;
      }
    }, 60);

    loop.start();

    return loop;
  }
}
