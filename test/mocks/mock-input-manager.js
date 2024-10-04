import { InputManager } from "../../src/input-manager.js";

export class MockInputManager extends InputManager {
  /**
   * @type {((keyCode: number) => void)[]}
   */
  #anyKeyPressCallbacks = [];

  /**
   * @type {Set<number>}
   */
  #pressedKeys = new Set();

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
    this.#pressedKeys.add(keyCode);
    for (const callback of this.#anyKeyPressCallbacks) {
      callback(keyCode);
    }
    this.#anyKeyPressCallbacks.length = 0;
  }

  /**
   * @param {number} code
   * @returns {boolean}
   */
  isKeyPressed(code) {
    return this.#pressedKeys.has(code);
  }
}
