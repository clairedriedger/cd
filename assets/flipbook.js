
document.querySelectorAll("[data-flipbook]").forEach((book) => {
  const image = book.querySelector("[data-flipbook-image]");
  const playButton = book.querySelector("[data-play]");
  const resetButton = book.querySelector("[data-reset]");
  const speedSelect = book.querySelector("[data-speed]");
  const slider = book.querySelector("[data-frame-slider]");
  const counter = book.querySelector("[data-frame-count]");

  const totalFrames = Number(book.dataset.frames) || 32;
  const folder = book.dataset.folder;

  function makeFilenames() {
    return Array.from({ length: totalFrames }, (_, index) => {
      const first = String(index + 1).padStart(5, "0");
      const second = String(index + 2).padStart(5, "0");
      return `${folder}${first}_${second}.png`;
    });
  }

  const files = makeFilenames();

  // Preload frames.
  files.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  let frame = 0;
  let timer = null;

  function showFrame(index) {
    frame = Math.max(0, Math.min(index, totalFrames - 1));
    image.src = files[frame];
    slider.value = String(frame + 1);
    counter.textContent = String(frame + 1);
  }

  function stop() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    playButton.textContent = "Play";
  }

  function start() {
    if (timer !== null) {
      stop();
      return;
    }

    playButton.textContent = "Pause";
    timer = setInterval(() => {
      showFrame((frame + 1) % totalFrames);
    }, Number(speedSelect.value));
  }

  playButton.addEventListener("click", start);

  resetButton.addEventListener("click", () => {
    stop();
    showFrame(0);
  });

  slider.addEventListener("input", () => {
    stop();
    showFrame(Number(slider.value) - 1);
  });

  speedSelect.addEventListener("change", () => {
    if (timer !== null) {
      stop();
      start();
    }
  });

  showFrame(0);
});