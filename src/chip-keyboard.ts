import "./chip-keyboard.style.css";

import "./chip-input-button";

export class ChipKeyboard extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = /* HTML */ ` <chip-input-button
        key-code="1"
        keyboard="Digit1"
      ></chip-input-button>
      <chip-input-button key-code="2" keyboard="Digit2"></chip-input-button>
      <chip-input-button key-code="3" keyboard="Digit3"></chip-input-button>
      <chip-input-button key-code="C" keyboard="Digit4"></chip-input-button>

      <chip-input-button key-code="4" keyboard="KeyQ"></chip-input-button>
      <chip-input-button key-code="5" keyboard="KeyW"></chip-input-button>
      <chip-input-button key-code="6" keyboard="KeyE"></chip-input-button>
      <chip-input-button key-code="D" keyboard="KeyR"></chip-input-button>

      <chip-input-button key-code="7" keyboard="KeyA"></chip-input-button>
      <chip-input-button key-code="8" keyboard="KeyS"></chip-input-button>
      <chip-input-button key-code="9" keyboard="KeyD"></chip-input-button>
      <chip-input-button key-code="E" keyboard="KeyF"></chip-input-button>

      <chip-input-button key-code="A" keyboard="KeyZ"></chip-input-button>
      <chip-input-button key-code="0" keyboard="KeyX"></chip-input-button>
      <chip-input-button key-code="B" keyboard="KeyC"></chip-input-button>
      <chip-input-button key-code="F" keyboard="KeyV"></chip-input-button>`;
  }
}

customElements.define("chip-keyboard", ChipKeyboard);
