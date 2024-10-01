export class Noop {
  static mask = 0xffff;
  static opcode = 0x0000;

  execute() {
    console.info("Noop instruction reached; do nothing");
  }
}
