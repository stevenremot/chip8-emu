import { CanvasRenderer } from "./canvas-renderer.js";
import { AnimationFrameLoop } from "./animation-frame-loop.js";
import { GameStartEvent } from "./dom-events.js";

import "./chip-canvas.style.css";

export class ChipCanvas extends HTMLElement {
  private currentProcess: AnimationFrameLoop | null = null;

  constructor() {
    super();
    this.innerHTML = `<canvas class="canvas-renderer"></canvas>`;
  }

  connectedCallback() {
    window.addEventListener("chip:game-started", (evt) =>
      this.start(evt as GameStartEvent),
    );
  }

  private start(evt: GameStartEvent) {
    if (this.currentProcess) {
      this.currentProcess.stop();
    }

    this.currentProcess = new CanvasRenderer(
      this.canvas,
      evt.detail.gameState.screenMemory,
    ).startRenderLoop();
  }

  private get canvas() {
    return this.querySelector("canvas") as HTMLCanvasElement;
  }
}

customElements.define("chip-canvas", ChipCanvas);
