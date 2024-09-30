import { AnimationFrameLoop } from "./animation-frame-loop.js";
import { ScreenMemory } from "./screen-memory.js";

export class CanvasRenderer {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {ScreenMemory} screenMemory
   */
  constructor(canvas, screenMemory) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.screenMemory = screenMemory;

    this.canvas.width = 64;
    this.canvas.height = 32;
  }

  render() {
    if (!this.ctx) {
      console.warn("No context created");
      return;
    }

    const imageData = this.ctx.createImageData(
      this.canvas.width,
      this.canvas.height,
    );
    for (let i = 0; i < this.screenMemory.memory.length; i++) {
      const memoryValue = this.screenMemory.memory[i];
      for (let j = 0; j < 8; j++) {
        const bit = memoryValue & (0b10000000 >> j);
        const color = bit ? 255 : 0;
        const baseAddress = (i * 8 + j) * 4;

        imageData.data[baseAddress + 0] = color;
        imageData.data[baseAddress + 1] = color;
        imageData.data[baseAddress + 2] = color;
        imageData.data[baseAddress + 3] = 255;
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  startRenderLoop() {
    const animationLoop = new AnimationFrameLoop(() => {
      this.render();
    }, 60);

    return animationLoop.start();
  }
}
