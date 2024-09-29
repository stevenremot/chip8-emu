export class AnimationFrameLoop {
  /**
   * @param {(deltaTime: number) => void} callback
   * @param {number} fps
   */
  constructor(callback, fps) {
    this.callback = callback;
    this.fps = fps;
  }

  start() {
    let lastTime = 0;
    let accumulatedTime = 0;
    const targetFPS = this.fps;
    const frameInterval = 1000 / targetFPS;

    const loop = (/** @type {number} */ currentTime) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      accumulatedTime += deltaTime;

      while (accumulatedTime >= frameInterval) {
        this.callback(frameInterval);
        accumulatedTime -= frameInterval;
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}
