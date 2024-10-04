import { describe, it } from "node:test";
import { MockInputManager } from "./mocks/mock-input-manager.js";
import { State } from "../src/state.js";
import assert from "node:assert";
import { Runner } from "../src/runner.js";

describe("Inputs", () => {
  it("Should skip if keydown = VX on 0xEX9E", () => {
    const state = State.makeClearState();
    const inputManager = new MockInputManager();
    const runner = new Runner(state, inputManager);

    state.registers.V[0] = 2;
    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([
        0xe0, 0x9e, 0x00, 0x00, 0xe0, 0x9e, 0x00, 0x00, 0xe0, 0x9e, 0x00, 0x00,
      ]),
    );

    // No key pressed
    runner.runOneInstruction();

    assert.strictEqual(state.registers.PC, 0x202);
    runner.runOneInstruction();

    // Check the runner has not been blocked
    assert.strictEqual(runner.isRunning, true);

    // Wrong key pressed
    inputManager.mockPressKey(9);

    runner.runOneInstruction();

    assert.strictEqual(state.registers.PC, 0x206);
    runner.runOneInstruction();

    // Right key pressed
    inputManager.mockPressKey(2);

    runner.runOneInstruction();

    assert.strictEqual(state.registers.PC, 0x20c);
  });

  it("Should skip if keydown != VX on 0xEXA1", () => {
    const state = State.makeClearState();
    const inputManager = new MockInputManager();
    const runner = new Runner(state, inputManager);

    state.registers.V[0] = 2;
    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([
        0xe0, 0xa1, 0x00, 0x00, 0xe0, 0xa1, 0x00, 0x00, 0xe0, 0xa1, 0x00, 0x00,
      ]),
    );

    // No key pressed
    runner.runOneInstruction();

    assert.strictEqual(state.registers.PC, 0x204);

    // Check the runner has not been blocked
    assert.strictEqual(runner.isRunning, true);

    // Wrong key pressed
    inputManager.mockPressKey(9);

    runner.runOneInstruction();

    assert.strictEqual(state.registers.PC, 0x208);

    // Right key pressed
    inputManager.mockPressKey(2);

    runner.runOneInstruction();

    assert.strictEqual(state.registers.PC, 0x20a);
  });

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
