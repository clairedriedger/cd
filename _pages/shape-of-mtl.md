---
layout: blog
list_title: "The Shape of Montreal: A Local Study of Motion"
permalink: /cs/shape
---
<p style="text-align: center;">
<i>Summer, 2026</i>
</p>

<p> While preparing to move away from Montreal, I collected a small dataset of short videos which depicted objects which, to me, embodied the essense of life in Montreal, including Iconoglace ice cream, Mont Royal, and cats. To these image sequences I applied the computer vision/perception algorithm I had been developing as a summer researcher in Dr. Kaleem Siddiqi's Shape Analysis Group. 
</p>

<div class="motion-comparison" data-motion-comparison>

  <div class="motion-pair">
    <!-- Left animation -->
    <div class="motion-panel">
      <div class="motion-frame">
        <img data-motion-image="left"
             src="{{ '/images/camo2/overlay/00001_00002.png' | relative_url }}"
             alt="First motion sequence">
      </div>
    </div>

    <!-- Right animation -->
    <div class="motion-panel">
      <div class="motion-frame">
        <img data-motion-image="right"
             src="{{ '/images/camo2/vectors/00001_00002.png' | relative_url }}"
             alt="Second motion sequence">
      </div>
    </div>
  </div>

  <!-- Shared controls -->
  <div class="shared-controls">
    <button type="button" data-play>Play</button>
    <button type="button" data-reset>Reset</button>

    <label>
      Speed
      <select data-speed>
        <option value="200">Slow</option>
        <option value="100" selected>Normal</option>
        <option value="50">Fast</option>
      </select>
    </label>
  </div>

  <!-- One slider controls both animations -->
  <input data-frame-slider
         type="range"
         min="1"
         max="32"
         value="1"
         step="1"
         aria-label="Choose shared animation frame">

  <p class="motion-status">
    Frame <span data-frame-count>1</span> / 32
  </p>
</div>

<style>
.motion-comparison {
  max-width: 900px;
  margin: 2rem auto;
}

.motion-pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.motion-panel h3 {
  text-align: center;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.motion-frame {
  width: 100%;
  overflow: hidden;
  background: transparent;
  aspect-ratio: auto;
}

.motion-frame img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.shared-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.motion-comparison input[type="range"] {
  display: block;
  width: 100%;
  margin-top: 1rem;
}

.motion-status {
  text-align: center;
  font-size: 0.9rem;
}

@media (max-width: 500px) {
  .motion-pair {
    gap: 8px;
  }
}
</style>

<script>
document.querySelectorAll("[data-motion-comparison]").forEach((container) => {
  const leftImg = container.querySelector('[data-motion-image="left"]');
  const rightImg = container.querySelector('[data-motion-image="right"]');
  const playButton = container.querySelector("[data-play]");
  const resetButton = container.querySelector("[data-reset]");
  const speedSelect = container.querySelector("[data-speed]");
  const slider = container.querySelector("[data-frame-slider]");
  const counter = container.querySelector("[data-frame-count]");

  const totalFrames = 32;

  const leftBase = "{{ '/images/camo2/overlay/' | relative_url }}";
  const rightBase = "{{ '/images/camo2/vectors/' | relative_url }}";

  function makeFilenames(base) {
    return Array.from({ length: totalFrames }, (_, index) => {
      const first = String(index + 1).padStart(5, "0");
      const second = String(index + 2).padStart(5, "0");
      return `${base}${first}_${second}.png`;
    });
  }

  const leftFiles = makeFilenames(leftBase);
  const rightFiles = makeFilenames(rightBase);

  // Preload frames for smoother playback.
  [...leftFiles, ...rightFiles].forEach((src) => {
    const image = new Image();
    image.src = src;
  });

  let frame = 0;
  let timer = null;

  function showFrame(index) {
    frame = Math.max(0, Math.min(index, totalFrames - 1));

    leftImg.src = leftFiles[frame];
    rightImg.src = rightFiles[frame];

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
      // Loop both sequences in sync.
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
</script>
