export class AnimationFrameLoop {
  /**
   * @param {(deltaTime: number) => void} callback
   * @param {number} fps
   * @param {() => void} [onStop]
   */
  constructor(callback, fps, onStop) {
    this.callback = callback;
    this.fps = fps;
    this.animationFrameId = null;
    this.onStop = onStop;
  }

  start() {
    let lastTime = 0;
    let accumulatedTime = 0;
    const targetFPS = this.fps;
    const frameInterval = 1000 / targetFPS;

    const loop = (/** @type {number} */ currentTime) => {
      let deltaTime = currentTime - lastTime;
      if (deltaTime > 1000) {
        deltaTime = frameInterval;
      }

      lastTime = currentTime;
      accumulatedTime += deltaTime;

      while (accumulatedTime >= frameInterval) {
        this.callback(frameInterval);
        accumulatedTime -= frameInterval;
      }

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
    return this;
  }

  stop() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    this.onStop?.();

    return this;
  }
}
