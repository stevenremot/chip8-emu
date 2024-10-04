import { describe, it } from "node:test";
import { State } from "../src/state.js";
import { Runner } from "../src/runner.js";
import { MockInputManager } from "./mocks/mock-input-manager.js";
import assert from "node:assert";

describe("Sound", () => {
  it("Should set sound timer to VX on 0xFX18", () => {
    const state = State.makeClearState();
    const runner = new Runner(state, new MockInputManager());

    state.registers.V[4] = 0x56;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0xf4, 0x18]),
    );

    runner.runOneInstruction();

    assert.strictEqual(state.registers.soundTimer, 0x56);
  });
});
