import { ChipRomDialog } from "./chip-rom-dialog";

export class ChipMenu extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = /* HTML */ `
      <button type="button" id="load-game-btn">Load game</button>
    `;
  }

  connectedCallback() {
    this.querySelector("#load-game-btn")!.addEventListener("click", () => {
      (document.body.querySelector("chip-rom-dialog") as ChipRomDialog).show();
    });
  }
}

customElements.define("chip-menu", ChipMenu);
