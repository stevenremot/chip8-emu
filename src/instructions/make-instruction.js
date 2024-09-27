import { ClearScreen } from "./clear-screen.js";
import { DrawSprite } from "./draw-sprite.js";

const instructions = [ClearScreen, DrawSprite];

/**
 *
 * @param {number} opcode
 */
export function makeInstruction(opcode) {
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    if ((instruction.opcode & opcode) === instruction.opcode) {
      return new instructions[i](opcode);
    }
  }

  return;
}
