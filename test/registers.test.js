import { describe, it } from "node:test";
import { State } from "../src/state.js";
import { Runner } from "../src/runner.js";
import assert from "node:assert";

describe("Registers", () => {
  it("Should set the index pointer in OxaXXX", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0xa2, 0x5d]),
    );
    runner.runOneInstruction();

    assert.strictEqual(state.registers.I, 0x025d);
  });

  it("Should set the register VK value in 0x6XKK", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x62, 0x5d]),
    );
    runner.runOneInstruction();

    assert.strictEqual(state.registers.V[2], 0x05d);
  });

  it("Should add KK to register VX on 0x7XKK", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x72, 0x5d, 0x72, 0x01]),
    );
    runner.runOneInstruction();
    runner.runOneInstruction();

    assert.strictEqual(state.registers.V[2], 0x5e);
  });

  it.todo("Should copy VY to VX on 0x8XY0");

  it.todo("Should perform VX=VX|VY on Ox8XY1");

  it.todo("Should perform VX=VX&VY on Ox8XY2");

  it.todo("Should perform VX=VX^VY on Ox8XY3");

  it.todo("Should perform VX=VX+VY on Ox8XY4");

  it.todo("Should perform VX=VX-VY on Ox8XY5");

  it.todo("Add VX to I on 0xFX1E");
});
