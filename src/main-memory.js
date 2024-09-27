export class MainMemory {
  constructor() {
    this.memory = new Uint8Array(0x1000);
  }

  /**
   * @param {number} address
   * @param {Uint8Array} value
   */
  writeRange(address, value) {
    this.memory.set(value, address);
  }

  /**
   * @param {number} address
   * @param {number} length
   */
  readRange(address, length) {
    return this.memory.slice(address, address + length);
  }

  /**
   * @param {number} address
   * @param {number} length
   *
   * @returns {number}
   */
  readNumber(address, length) {
    let value = 0;
    for (let i = 0; i < length; i++) {
      value = (value << 8) | this.memory[address + i];
    }
    return value;
  }
}
