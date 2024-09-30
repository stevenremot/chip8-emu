import { describe, it } from "node:test";
import assert from "node:assert";
import { State } from "../src/state.js";
import { Runner } from "../src/runner.js";
import { ScreenMemory } from "../src/screen-memory.js";
import { screenMemoryToASCII } from "../src/utils/screen-memory-to-ascii.js";

const makeTestInstance = () => {
  const state = State.makeClearState();
  const runner = new Runner(state);

  return { state, runner };
};

/**
 * @param {ScreenMemory} screenMemory
 * @param {[[number, number], [number, number]]} range
 * @param {string} expected
 */
const assertScreenEquals = (screenMemory, range, expected) => {
  const asciiScreen = screenMemoryToASCII(screenMemory, range);
  assert.strictEqual(
    asciiScreen,
    expected
      .trim()
      .split("\n")
      .map((row) => row.trim())
      .join("\n"),
  );
};

describe("Graphics", () => {
  it("should draw a sprite on the screen", () => {
    const { state, runner } = makeTestInstance();

    state.registers.I = 0x500;
    state.registers.V[0] = 0x03;
    state.registers.V[1] = 0x0f;

    state.mainMemory.writeRange(
      state.registers.I,
      new Uint8Array([0xf0, 0xf0, 0x0f, 0x0f]),
    );
    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0xd0, 0x14]),
    );

    runner.runOneInstruction();

    assertScreenEquals(
      state.screenMemory,
      [
        [0x2, 10],
        [0xe, 6],
      ],
      `
    ..........
    .####.....
    .####.....
    .....####.
    .....####.
    ..........`,
    );
  });

  it("It should tell when a pixel has been erased after drawing", () => {
    const { state, runner } = makeTestInstance();

    state.registers.I = 0x500;
    state.registers.V[0] = 0x03;
    state.registers.V[1] = 0x0f;

    state.mainMemory.writeRange(
      state.registers.I,
      new Uint8Array([0xf0, 0xf0, 0x0f, 0x0f]),
    );
    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0xd0, 0x14, 0xd0, 0x14]),
    );

    runner.runOneInstruction();
    assert.strictEqual(state.registers.V[0x0f], 0);

    runner.runOneInstruction();
    assert.strictEqual(state.registers.V[0x0f], 1);
  });

  it("Should apply a module on the starting draw coordinates", () => {
    const { state, runner } = makeTestInstance();

    state.registers.I = 0x500;
    state.registers.V[0] = 0x03 + 64;
    state.registers.V[1] = 0x0f + 32;

    state.mainMemory.writeRange(
      state.registers.I,
      new Uint8Array([0xf0, 0xf0, 0x0f, 0x0f]),
    );
    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0xd0, 0x14]),
    );

    runner.runOneInstruction();

    assertScreenEquals(
      state.screenMemory,
      [
        [0x2, 10],
        [0xe, 6],
      ],
      `
      ..........
      .####.....
      .####.....
      .....####.
      .....####.
      ..........`,
    );
  });

  it("Should clip the sprite when it reaches the screen boundaries", () => {
    const { state, runner } = makeTestInstance();

    state.registers.I = 0x500;
    state.registers.V[0] = 60;
    state.registers.V[1] = 30;

    state.mainMemory.writeRange(
      state.registers.I,
      new Uint8Array([0xf0, 0xf0, 0x0f, 0x0f]),
    );
    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0xd0, 0x14]),
    );

    runner.runOneInstruction();

    assertScreenEquals(
      state.screenMemory,
      [
        [60, 4],
        [30, 2],
      ],
      `
      ####
      ####`,
    );
  });

  it("Should clear the screen", () => {
    const { state, runner } = makeTestInstance();

    state.screenMemory.applySprite(0, 0, new Uint8Array([0xff]));

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0x00, 0xe0]),
    );

    runner.runOneInstruction();

    assertScreenEquals(
      state.screenMemory,
      [
        [0, 64],
        [0, 32],
      ],
      `
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................`,
    );
  });
});
