import { describe, it } from "node:test";
import { State } from "../src/state.js";
import { Runner } from "../src/runner.js";
import assert from "node:assert";

describe("Program flow", () => {
  it.todo("Should do nothing but print a warning on 0x0000");

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

  it.todo("Should jump and return from subroutines on 0x2MMM and 0x1MMM");

  it.todo("Should skip next instruction if VX=KK on 0x3XKK");

  it.todo("Should skip next instruction if VX!=KK on 0x4XKK");

  it.todo("Should skip next instruction if VX=VY on 0x5XY0");

  it.todo("Should skip next instruction if VX!=VY on 0x9XY0");

  it.todo("Should jump to MMM + V0 on 0xBMMM");
});
