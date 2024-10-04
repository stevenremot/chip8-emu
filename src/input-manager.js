const initialKeyStates = Array.from({ length: 16 }, () => false);

/**
 * @typedef {CustomEvent<{ keyCode: number }>} Chip8KeyEvent
 */

export class InputManager {
  #isStopped = false;
  #keyStates = Array.from(initialKeyStates);

  /**
   * @param {HTMLElement} body
   */
  attachTo(body) {
    const handlePressed = (/** @type {Chip8KeyEvent} */ evt) => {
      this.#keyStates[evt.detail.keyCode] = true;
    };

    const handleReleased = (/** @type {Chip8KeyEvent} */ evt) => {
      this.#keyStates[evt.detail.keyCode] = false;
    };

    // @ts-ignore
    body.addEventListener("chip8:input-pressed", handlePressed);
    // @ts-ignore
    body.addEventListener("chip8:input-released", handleReleased);

    return {
      stop: () => {
        this.#isStopped = true;

        // @ts-ignore
        body.removeEventListener("chip8:input-pressed", handlePressed);
        // @ts-ignore
        body.removeEventListener("chip8:input-released", handleReleased);
      },
    };
  }

  /**
   * @param {(keyCode: number) => void} callback
   */
  waitForAnyKeyPress(callback) {
    const listener = (
      /** @type {CustomEvent<{ keyCode: number; }>} */ event,
    ) => {
      if (!this.#isStopped) {
        callback(event.detail.keyCode);
      }
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
