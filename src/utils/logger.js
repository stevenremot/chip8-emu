let isLoggerEnabled = false;

export const logger = {
  enable() {
    isLoggerEnabled = true;
  },
  disable() {
    isLoggerEnabled = false;
  },

  /**
   * @param {any[]} args
   */
  log(...args) {
    if (isLoggerEnabled) {
      console.info(...args);
    }
  },
};
