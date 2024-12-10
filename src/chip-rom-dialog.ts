import "./chip-rom-dialog.style.css";
import { WebFileLoader } from "./web-file-loader";

export class ChipRomDialog extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = /* HTML */ `<dialog class="backdrop">
      <form action="">
        <p>Upload a ROM to play</p>
        <input type="file" accept=".ch8" />
      </form>
    </dialog>`;
  }

  connectedCallback() {
    // Show at startup
    this.show();

    const webFileLoader = new WebFileLoader((gameState) => {
      window.dispatchEvent(
        new CustomEvent("chip:game-started", { detail: { gameState } }),
      );
      this.dialog.close();
    });

    webFileLoader.attachToInput(this.input);
  }

  show() {
    this.dialog.showModal();
  }

  private get dialog() {
    return this.querySelector("dialog") as HTMLDialogElement;
  }

  private get input() {
    return this.querySelector("input") as HTMLInputElement;
  }
}

customElements.define("chip-rom-dialog", ChipRomDialog);
