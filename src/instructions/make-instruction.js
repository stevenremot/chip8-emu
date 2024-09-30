import { AddToVRegister } from "./add-to-v-register.js";
import { ClearScreen } from "./clear-screen.js";
import { DrawSprite } from "./draw-sprite.js";
import { Jump } from "./jump.js";
import { SetIndexPointer } from "./set-index-pointer.js";
import { SetVRegister } from "./set-v-register.js";

const instructions = [
  ClearScreen,
  DrawSprite,
  SetIndexPointer,
  SetVRegister,
  AddToVRegister,
  Jump,
];

/**
 *
 * @param {number} opcode
 */
export function makeInstruction(opcode) {
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    if ((instruction.mask & opcode) === instruction.opcode) {
      return new instructions[i](opcode);
    }
  }

  return;
}
