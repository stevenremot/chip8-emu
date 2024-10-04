const initialKeyStates = Array.from({ length: 16 }, () => false);

/**
 * @typedef {CustomEvent<{ keyCode: number }>} Chip8KeyEvent
 */

export class InputManager {
  #keyStates = Array.from(initialKeyStates);

  /**
   * @param {HTMLElement} body
   */
  attachTo(body) {
    // @ts-ignore
    body.addEventListener(
      "chip8:input-pressed",
      (/** @type {Chip8KeyEvent} */ evt) => {
        this.#keyStates[evt.detail.keyCode] = true;
      },
    );

    // @ts-ignore
    body.addEventListener(
      "chip8:input-released",
      (/** @type {Chip8KeyEvent} */ evt) => {
        this.#keyStates[evt.detail.keyCode] = false;
      },
    );
  }

  /**
   * @param {(keyCode: number) => void} callback
   */
  waitForAnyKeyPress(callback) {
    const listener = (
      /** @type {CustomEvent<{ keyCode: number; }>} */ event,
    ) => {
      callback(event.detail.keyCode);
    };

    // @ts-ignore
    document.body.addEventListener("chip8:input-pressed", listener, {
      once: true,
    });
  }

  /**
   * @param {number} keyCode
   */
  isKeyPressed(keyCode) {
    return this.#keyStates[keyCode];
  }
}
