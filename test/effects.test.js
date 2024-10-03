import { describe, it } from "node:test";
import { State } from "../src/state.js";
import { Runner } from "../src/runner.js";
import { MockInputManager } from "./mocks/mock-input-manager.js";
import assert from "node:assert";

describe("Effects", () => {
  it("Should do VX=RND&KK on 0xCXKK", (test) => {
    const state = State.makeClearState();
    const runner = new Runner(state, new MockInputManager());

    test.mock.method(Math, "random", () => 0.7);

    state.mainMemory.writeRange(
      state.registers.PC,
      new Uint8Array([0xc5, 0x0f]),
    );

    runner.runOneInstruction();

    assert.strictEqual(state.registers.V[0x5], 0x03);
  });

  it.todo("should initialize timer to VX on 0xFX15");

  it.todo("Should save current timer value in VX on 0xfX07");
});
