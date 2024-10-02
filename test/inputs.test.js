import { describe, it } from "node:test";
import { MockInputManager } from "./mocks/mock-input-manager.js";
import { State } from "../src/state.js";
import assert from "node:assert";
import { Runner } from "../src/runner.js";

describe("Inputs", () => {
  it.todo("Should skip if keydown = VX on 0xEX9E");

  it.todo("Should skip if keydown != VX on 0xEXA1");

  it("Should wait for next key press and save code to VX on 0xFX0A", () => {
    const state = State.makeClearState();
    const inputManager = new MockInputManager();
    const runner = new Runner(state, inputManager);

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0xf2, 0x0a]),
    );

    runner.runOneInstruction();

    assert.strictEqual(runner.isRunning, false);

    inputManager.mockPressKey(0xa);

    assert.strictEqual(runner.isRunning, true);
    assert.strictEqual(state.registers.V[2], 0xa);
  });
});
