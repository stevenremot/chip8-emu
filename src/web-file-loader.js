import { State } from "./state.js";

export class WebFileLoader {
  /**
   * @param {(state: State) => void} onRomLoaded
   */
  constructor(onRomLoaded) {
    this.onRomLoaded = onRomLoaded;
  }

  /**
   * @param {File} file
   */
  loadFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * @param {Event} event
   */
  handleFileInputChange(event) {
    const file = /** @type {HTMLInputElement|null} */ (event.target)
      ?.files?.[0];

    if (!file) {
      return;
    }

    this.loadFile(file).then((data) => {
      const programData = new Uint8Array(data);
      const newState = State.makeClearState();
      newState.mainMemory.writeRange(newState.registers.PC, programData);
      this.onRomLoaded(newState);
    });
  }

  /**
   * @param {HTMLInputElement} input
   */
  attachToInput(input) {
    input.addEventListener("change", this.handleFileInputChange.bind(this));
  }
}
