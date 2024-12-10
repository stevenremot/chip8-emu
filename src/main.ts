import { Runner } from "./runner.js";
import { logger } from "./utils/logger.js";
import { screenMemoryToASCII } from "./utils/screen-memory-to-ascii.js";
import { InputManager } from "./input-manager.js";
import { Timer } from "./timer.js";
import { SoundManager } from "./sound-manager.js";
import { GameStartEvent } from "./dom-events.js";

import "./chip-canvas";
import "./chip-rom-dialog";
import "./chip-keyboard";
import "./chip-menu";

let processes: { stop: () => void }[] = [];

window.addEventListener("chip:game-started", (evt) => {
  const state = (evt as GameStartEvent).detail.gameState;
  processes.forEach((loop) => loop.stop());

  Object.assign(window, {
    state,
    debugScreen: () => screenMemoryToASCII(state.screenMemory),
  });

  const inputManager = new InputManager();

  processes = [
    new Runner(state, inputManager).run(),

    new Timer(state).start(),
    inputManager.attachTo(document.body),
    new SoundManager(state).start(),
  ];
});

Object.assign(window, { logger });
