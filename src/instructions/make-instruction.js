import { AddToVRegister } from "./add-to-v-register.js";
import { CallSubroutine } from "./call-subroutine.js";
import { ClearScreen } from "./clear-screen.js";
import { DoArithmeticInVRegister } from "./do-arithmetic-in-v-register.js";
import { DrawSprite } from "./draw-sprite.js";
import { Jump } from "./jump.js";
import { LoadFont } from "./load-font.js";
import { LoadVRegistersFromMemory } from "./load-v-registers-from-memory.js";
import { Noop } from "./noop.js";
import { ReturnFromSubroutine } from "./return-from-subroutine.js";
import { SetIndexPointer } from "./set-index-pointer.js";
import { SetVRegister } from "./set-v-register.js";
import { SkipOnVRegisterValueEquals } from "./skip-on-v-register-value-equals.js";
import { SkipOnVRegisterValueNotEquals } from "./skip-on-v-register-value-not-equals.js";
import { SkipOnVRegistersValuesEquals } from "./skip-on-v-registers-values-equals.js";
import { SkipOnVRegistersValuesNotEquals } from "./skip-on-v-registers-values-not-equals.js";
import { StoreBinaryCodedDecimal } from "./store-binary-coded-decimal.js";
import { StoreVRegisterToMemory } from "./store-v-register-to-memory.js";

const instructions = [
  Noop,
  ClearScreen,
  DrawSprite,
  LoadFont,
  SetIndexPointer,
  SetVRegister,
  AddToVRegister,
  Jump,
  CallSubroutine,
  ReturnFromSubroutine,
  SkipOnVRegisterValueEquals,
  SkipOnVRegisterValueNotEquals,
  SkipOnVRegistersValuesEquals,
  SkipOnVRegistersValuesNotEquals,
  DoArithmeticInVRegister,
  StoreVRegisterToMemory,
  LoadVRegistersFromMemory,
  StoreBinaryCodedDecimal,
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
