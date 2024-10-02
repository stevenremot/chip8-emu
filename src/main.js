import { AnimationFrameLoop } from "./animation-frame-loop.js";
import { CanvasRenderer } from "./canvas-renderer.js";
import { Runner } from "./runner.js";
import { logger } from "./utils/logger.js";
import { screenMemoryToASCII } from "./utils/screen-memory-to-ascii.js";
import { WebFileLoader } from "./web-file-loader.js";

/**
 * @type {AnimationFrameLoop[]}
 */
let loops = [];

function start() {
  const canvas = document.getElementById("canvas");

  if (!canvas) {
    throw new Error("Could not find canvas element");
  }

  const input = document.getElementById("rom-loader");

  if (!input) {
    throw new Error("Could not find input element");
  }

  const webFileLoader = new WebFileLoader((state) => {
    loops.forEach((loop) => loop.stop());

    Object.assign(window, {
      state,
      debugScreen: () => screenMemoryToASCII(state.screenMemory),
    });

    loops = [
      new Runner(state).run(),

      new CanvasRenderer(
        /** @type {HTMLCanvasElement} */ (canvas),
        state.screenMemory,
      ).startRenderLoop(),
    ];
  });

  webFileLoader.attachToInput(/** @type {HTMLInputElement} */ (input));
}

document.addEventListener("DOMContentLoaded", start);

Object.assign(window, { logger });
