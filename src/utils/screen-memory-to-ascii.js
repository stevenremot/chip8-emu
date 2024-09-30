import { ScreenMemory } from "../screen-memory.js";

/**
 * @param {ScreenMemory} screenMemory
 */
export function screenMemoryToASCII(
  screenMemory,
  [[xStart, width], [yStart, height]] = [
    [0, 64],
    [0, 32],
  ],
) {
  const asciiScreen = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => " "),
  );

  screenMemory.forEachPixel((x, y, isLit) => {
    if (x < xStart || x >= xStart + width) {
      return;
    }

    if (y < yStart || y >= yStart + height) {
      return;
    }

    asciiScreen[y - yStart][x - xStart] = isLit ? "#" : ".";
  });

  return asciiScreen.map((row) => row.join("")).join("\n");
}
