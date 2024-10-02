import { InputManager } from "./input-manager.js";
import { State } from "./state.js";

/**
 * @typedef {Object} EffectBodyArgs
 * @property {State}   state
 * @property {InputManager} inputManager
 * @property {() => void} callback
 */

export class Effect {
  #body;

  /**
   * @param {(payload: EffectBodyArgs) => void} body
   */
  constructor(body) {
    this.#body = body;
  }

  /**
   * @param {EffectBodyArgs} args
   */
  run(args) {
    this.#body(args);
  }
}
