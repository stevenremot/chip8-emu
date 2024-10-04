import { AnimationFrameLoop } from "./animation-frame-loop.js";
import { State } from "./state.js";

export class SoundManager {
  /**
   * @type {OscillatorNode|null}
   */
  #oscillator = null;

  /**
   * @param {State} state
   */
  constructor(state) {
    this.state = state;
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 0.2;
    this.gainNode.connect(this.audioContext.destination);
  }

  /**
   * @private
   */
  createOscillator() {
    this.#oscillator = this.audioContext.createOscillator();
    this.#oscillator.type = "square";
    this.#oscillator.frequency.value = 440;
    this.#oscillator.connect(this.gainNode);
    return this.#oscillator;
  }

  start() {
    const loop = new AnimationFrameLoop(
      () => {
        const { soundTimer } = this.state.registers;

        if (soundTimer > 2) {
          if (!this.#oscillator) {
            this.createOscillator().start();
          }
        } else if (this.#oscillator) {
          this.#oscillator.stop();
          this.#oscillator.disconnect();
          this.#oscillator = null;
        }
      },
      30,
      () => {
        this.audioContext.close();
      },
    );

    loop.start();

    return loop;
  }
}
