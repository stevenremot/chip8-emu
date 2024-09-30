import { describe, it } from "node:test";
import { State } from "../src/state.js";
import { Runner } from "../src/runner.js";
import assert from "node:assert";

describe("Program flow", () => {
  it("Should jump at address MMM on 0x1MMM", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x13, 0x36]),
    );

    runner.runOneInstruction();

    assert.strictEqual(state.registers.PC, 0x336);
  });
});
