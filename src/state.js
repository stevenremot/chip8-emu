import { FontLoader } from "./font-loader.js";
import { MainMemory } from "./main-memory.js";
import { Registers } from "./registers.js";
import { ScreenMemory } from "./screen-memory.js";

export class State {
  static makeClearState() {
    const mainMemory = new MainMemory();
    const screenMemory = new ScreenMemory();
    const registers = new Registers();

    FontLoader.loadFont(mainMemory);

    return new State(mainMemory, screenMemory, registers);
  }

  /**
   *
   * @param {MainMemory} mainMemory
   * @param {ScreenMemory} screenMemory
   * @param {Registers} registers
   */
  constructor(mainMemory, screenMemory, registers) {
    this.mainMemory = mainMemory;
    this.screenMemory = screenMemory;
    this.registers = registers;
  }
}
