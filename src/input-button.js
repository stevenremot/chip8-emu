export class InputButton extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<button type="button">${this.keyCode.toString(16)}</button>`;
    this.querySelector("button")?.addEventListener(
      "pointerdown",
      this.onPointerDown.bind(this),
    );
    this.querySelector("button")?.addEventListener(
      "pointerup",
      this.onPointerUp.bind(this),
    );

    const keyboard = this.getAttribute("keyboard") ?? "";

    document.addEventListener("keydown", (event) => {
      if (event.code === keyboard) {
        event.preventDefault();
        this.onPointerDown();
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.code === keyboard) {
        event.preventDefault();
        this.onPointerUp();
      }
    });
  }

  onPointerDown() {
    this.button.classList.add("pressed");
    this.dispatchEvent(
      new CustomEvent("chip8:input-pressed", {
        bubbles: true,
        detail: { keyCode: this.keyCode, pressed: true },
      }),
    );
  }

  onPointerUp() {
    this.button.classList.remove("pressed");
    this.dispatchEvent(
      new CustomEvent("chip8:input-released", {
        bubbles: true,
        detail: { keyCode: this.keyCode, pressed: false },
      }),
    );
  }

  get button() {
    const button = this.querySelector("button");
    if (!button) {
      throw new Error("button not found");
    }

    return button;
  }

  get keyCode() {
    return Number.parseInt(this.getAttribute("key-code") ?? "", 16);
  }
}

customElements.define("chip8-input-button", InputButton);
