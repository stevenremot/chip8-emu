import { CanvasRenderer } from "./canvas-renderer.js";
import { Runner } from "./runner.js";
import { logger } from "./utils/logger.js";
import { screenMemoryToASCII } from "./utils/screen-memory-to-ascii.js";
import { WebFileLoader } from "./web-file-loader.js";
import "./input-button.js";
import { InputManager } from "./input-manager.js";
import { Timer } from "./timer.js";
import { SoundManager } from "./sound-manager.js";

/**
 * @type {{stop: () => void}[]}
 */
let processes = [];

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
    processes.forEach((loop) => loop.stop());

    Object.assign(window, {
      state,
      debugScreen: () => screenMemoryToASCII(state.screenMemory),
    });

    const inputManager = new InputManager();

    processes = [
      new Runner(state, inputManager).run(),

      new CanvasRenderer(
        /** @type {HTMLCanvasElement} */ (canvas),
        state.screenMemory,
      ).startRenderLoop(),

      new Timer(state).start(),
      inputManager.attachTo(document.body),
      new SoundManager(state).start(),
    ];
  });

  webFileLoader.attachToInput(/** @type {HTMLInputElement} */ (input));
}

document.addEventListener("DOMContentLoaded", start);

Object.assign(window, { logger });
