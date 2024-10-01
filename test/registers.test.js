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

  it("Should copy VY to VX on 0x8XY0", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[0] = 0xf0;
    state.registers.V[0xa] = 1;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x80, 0xa0]),
    );
    runner.runOneInstruction();

    assert.strictEqual(state.registers.V[0], 1);
  });

  it("Should perform VX=VX|VY on Ox8XY1", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[0] = 0xf0;
    state.registers.V[0xa] = 0x23;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x80, 0xa1]),
    );
    runner.runOneInstruction();

    assert.strictEqual(state.registers.V[0], 0xf3);
  });

  it("Should perform VX=VX&VY on Ox8XY2", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[0] = 0xf0;
    state.registers.V[0xa] = 0x23;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x80, 0xa2]),
    );
    runner.runOneInstruction();

    assert.strictEqual(state.registers.V[0], 0x20);
  });

  it("Should perform VX=VX^VY on Ox8XY3", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[0] = 0xf0;
    state.registers.V[0xa] = 0x23;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x80, 0xa3]),
    );
    runner.runOneInstruction();

    assert.strictEqual(state.registers.V[0], 0xd3);
  });

  it.todo("Should perform VX=VX+VY and set the carry in VF on Ox8XY4", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[0] = 0xf0;
    state.registers.V[0xa] = 1;
    state.registers.V[9] = 0xff;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x80, 0xa4, 0x80, 0x94]),
    );
    runner.runOneInstruction();

    assert.strictEqual(state.registers.V[0], 0xf1);
    assert.strictEqual(state.registers.V[0xf], 0);

    runner.runOneInstruction();
    assert.strictEqual(state.registers.V[0], 0xf0);
    assert.strictEqual(state.registers.V[0xf], 1);
  });

  it("Should perform VX=VX-VY and set the carry in VF on Ox8XY5", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[0] = 0xf0;
    state.registers.V[0xa] = 1;
    state.registers.V[9] = 0xff;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x80, 0xa5, 0x80, 0x95]),
    );
    runner.runOneInstruction();

    assert.strictEqual(state.registers.V[0], 0xef);
    assert.strictEqual(state.registers.V[0xf], 1);

    runner.runOneInstruction();
    assert.strictEqual(state.registers.V[0], 0xf0);
    assert.strictEqual(state.registers.V[0xf], 0);
  });

  it("Should perform VX=VY-VX and set the carry in VF on Ox8XY7", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[0] = 0xf0;
    state.registers.V[0xa] = 1;
    state.registers.V[9] = 0xff;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x80, 0x97, 0x80, 0xa7]),
    );
    runner.runOneInstruction();

    assert.strictEqual(state.registers.V[0], 0x0f);
    assert.strictEqual(state.registers.V[0xf], 1);

    runner.runOneInstruction();
    assert.strictEqual(state.registers.V[0], 0xf2);
    assert.strictEqual(state.registers.V[0xf], 0);
  });

  it("Should perform VX=VY>>1 and set the carry in VF on Ox8XY6", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[0] = 0xf0;
    state.registers.V[0xa] = 0xf9;
    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x80, 0xa6]),
    );
    runner.runOneInstruction();

    assert.strictEqual(state.registers.V[0], 0x7c);
    assert.strictEqual(state.registers.V[0xf], 1);
  });

  it("Should perform VX=VY<<1 and set the carry in VF on Ox8XYE", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[0] = 0xf0;
    state.registers.V[0xa] = 0xf9;
    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x80, 0xae]),
    );
    runner.runOneInstruction();

    assert.strictEqual(state.registers.V[0], 0xf2);
    assert.strictEqual(state.registers.V[0xf], 1);
  });

  it.todo("Add VX to I on 0xFX1E");
});
