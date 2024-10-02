import { InputManager } from "../../src/input-manager.js";

export class MockInputManager extends InputManager {
  /**
   * @type {((keyCode: number) => void)[]}
   */
  #anyKeyPressCallbacks = [];

  /**
   * @param {(keyCode: number) => void} callback
   */
  waitForAnyKeyPress(callback) {
    this.#anyKeyPressCallbacks.push(callback);
  }

  /**
   * @param {number} keyCode
   */
  mockPressKey(keyCode) {
    for (const callback of this.#anyKeyPressCallbacks) {
      callback(keyCode);
    }

    this.#anyKeyPressCallbacks.length = 0;
  }
}
