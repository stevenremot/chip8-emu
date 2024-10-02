export class InputManager {
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
}
