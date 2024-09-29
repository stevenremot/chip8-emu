import { CanvasRenderer } from "./canvas-renderer.js";
import { Runner } from "./runner.js";
import { State } from "./state.js";

function start() {
  const state = State.makeClearState();

  state.registers.I = 0x500;
  state.registers.V[0] = 0x03 + 64;
  state.registers.V[1] = 0x0f + 32;

  state.mainMemory.writeRange(
    state.registers.I,
    new Uint8Array([0xf0, 0xf0, 0x0f, 0x0f]),
  );
  state.mainMemory.writeRange(state.registers.PC, new Uint8Array([0xd0, 0x14]));

  const canvas = document.getElementById("canvas");

  if (!canvas) {
    throw new Error("Could not find canvas element");
  }

  const canvasRenderer = new CanvasRenderer(
    /** @type {HTMLCanvasElement} */ (canvas),
    state.screenMemory,
  );
  const runner = new Runner(state);

  canvasRenderer.startRenderLoop();
  runner.runOneInstruction();

  Object.assign(window, { state });
}

document.addEventListener("DOMContentLoaded", start);
