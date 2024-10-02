import { describe, it } from "node:test";
import { State } from "../src/state.js";
import { Runner } from "../src/runner.js";
import assert from "node:assert";

describe("Memory", () => {
  it("Should store the 3-digit decimals of VX at the address I on 0xFX33", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[1] = 123;
    state.registers.I = 0xf33;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0xf1, 0x33]),
    );

    runner.runOneInstruction();

    assert.deepStrictEqual(
      state.mainMemory.readRange(0xf33, 3),
      new Uint8Array([1, 2, 3]),
    );
  });

  it("Should store V0 to VX at I on 0xFX55 (modern behaviour without I being changed", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.V[0] = 0x12;
    state.registers.V[1] = 0x34;
    state.registers.V[2] = 0x56;
    state.registers.I = 0xf55;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0xf2, 0x55]),
    );

    runner.runOneInstruction();

    assert.strictEqual(state.registers.I, 0xf55);
    assert.deepStrictEqual(
      state.mainMemory.readRange(0xf55, 3),
      new Uint8Array([0x12, 0x34, 0x56]),
    );
  });

  it("Should load V0 through VX at I on 0xFX65 (modern behaviour withtout I being changed", () => {
    const state = State.makeClearState();
    const runner = new Runner(state);

    state.registers.I = 0xf55;

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0xf2, 0x65]),
    );

    state.mainMemory.writeRange(0xf55, new Uint8Array([0x12, 0x34, 0x56]));

    runner.runOneInstruction();

    assert.strictEqual(state.registers.I, 0xf55);
    assert.deepStrictEqual(
      state.registers.V,
      [0x12, 0x34, 0x56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    );
  });
});
