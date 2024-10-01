import { describe, it } from "node:test";
import { State } from "../src/state.js";
import { Runner } from "../src/runner.js";
import assert from "node:assert";

describe("Program flow", () => {
  it("Should do nothing but print a log message on 0x0000", ({ mock }) => {
    const mockedWarn = mock.method(console, "info");
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x00, 0x00]),
    );

    runner.runOneInstruction();

    assert.strictEqual(state.registers.PC, 0x0202);
    assert.strictEqual(mockedWarn.mock.callCount(), 1);
    assert.deepStrictEqual(mockedWarn.mock.calls[0].arguments, [
      "Noop instruction reached; do nothing",
    ]);
  });

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

  it("Should jump and return from subroutines on 0x2MMM and 0x00EE", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x22, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0xee]),
    );

    runner.runOneInstruction();
    assert.strictEqual(state.registers.PC, 0x206);

    runner.runOneInstruction();
    assert.strictEqual(state.registers.PC, 0x202);
  });

  it("Should skip next instruction if VX=KK on 0x3XKK", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[5] = 0x12;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x35, 0x12, 0x00, 0x00, 0x35, 0x13, 0x00, 0x00]),
    );

    runner.runOneInstruction();
    assert.strictEqual(state.registers.PC, 0x204);

    runner.runOneInstruction();
    assert.strictEqual(state.registers.PC, 0x206);
  });

  it("Should skip next instruction if VX!=KK on 0x4XKK", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[2] = 0xf2;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x42, 0x12, 0x00, 0x00, 0x42, 0xf2, 0x00, 0x00]),
    );

    runner.runOneInstruction();
    assert.strictEqual(state.registers.PC, 0x204);

    runner.runOneInstruction();
    assert.strictEqual(state.registers.PC, 0x206);
  });

  it("Should skip next instruction if VX=VY on 0x5XY0", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[2] = 0xf2;
    state.registers.V[3] = 0xf2;
    state.registers.V[4] = 0x56;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x52, 0x30, 0x00, 0x00, 0x52, 0x40, 0x00, 0x00]),
    );

    runner.runOneInstruction();
    assert.strictEqual(state.registers.PC, 0x204);

    runner.runOneInstruction();
    assert.strictEqual(state.registers.PC, 0x206);
  });

  it("Should skip next instruction if VX!=VY on 0x9XY0", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[2] = 0xf2;
    state.registers.V[3] = 0x56;
    state.registers.V[4] = 0xf2;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x92, 0x30, 0x00, 0x00, 0x92, 0x40, 0x00, 0x00]),
    );

    runner.runOneInstruction();
    assert.strictEqual(state.registers.PC, 0x204);

    runner.runOneInstruction();
    assert.strictEqual(state.registers.PC, 0x206);
  });

  it.todo("Should jump to MMM + V0 on 0xBMMM");
});
