---
layout: blog
list_title: "The Shape of Montreal: A Local Study of Motion"
permalink: /cs/shape
---
<p style="text-align: center;">
<i>Summer, 2026</i>
</p>

<p> While preparing to move away from Montreal, I collected a set of short videos depicting a subset of my life in Montreal, including Iconoglace ice cream and trees on Mont Royal. To these image sequences I applied the computer perception algorithm I had been developing as a summer researcher in Dr. Kaleem Siddiqi's <a href="https://cim.mcgill.ca/~shape/">Shape Analysis Group</a>. 
</p>

<div class="motion-comparison" id="camo2">
  <div class="motion-pair">
    <!-- Left animation -->
    <div class="motion-panel">
      <div class="motion-frame">
        <img data-motion-image="left"
             src="{{ '/images/camo2/overlay/00001_00002.png' | relative_url }}"
             alt="First motion sequence">
      </div>
      <p class="motion-caption">Pixel Motion</p>
    </div>

    <!-- Right animation -->
    <div class="motion-panel">
      <div class="motion-frame">
        <img data-motion-image="right"
             src="{{ '/images/camo2/vectors/00001_00002.png' | relative_url }}"
             alt="Second motion sequence">
      </div>
      <p class="motion-caption">Motion Edges (white)</p>
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

.motion-caption {
  text-align: center;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
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
document.querySelectorAll("#camo2").forEach((container) => {
  const leftImg = container.querySelector('[data-motion-image="left"]');
  const rightImg = container.querySelector('[data-motion-image="right"]');
  const playButton = container.querySelector("[data-play]");
  const resetButton = container.querySelector("[data-reset]");
  const speedSelect = container.querySelector("[data-speed]");
  const slider = container.querySelector("[data-frame-slider]");
  const counter = container.querySelector("[data-frame-count]");

  const totalFrames = 32;

  const leftBase = "{{ '/images/camo2/vectors/' | relative_url }}";
  const rightBase = "{{ '/images/camo2/overlay/' | relative_url }}";

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

The idea is that moving objects move differently than their backgrounds.
The algorithm detects the outlines of moving objects in a video essentially by locating the pixels whose motion differs from that of their neighbours. Using elementary graph-theoretic techniques applied to the image raster, these thick bands of "discontinuities" are thinned to nice, one-pixel thin edges.

<div class="motion-comparison" id="icecream">

  <div class="motion-pair">
    <!-- Left animation -->
    <div class="motion-panel">
      <div class="motion-frame">
        <img data-motion-image="left"
             src="{{ '/images/icecream/overlay/00001_00002.png' | relative_url }}"
             alt="First motion sequence">
      </div>
      <p class="motion-caption">Pixel Motion</p>
    </div>

    <!-- Right animation -->
    <div class="motion-panel">
      <div class="motion-frame">
        <img data-motion-image="right"
             src="{{ '/images/icecream/vectors/00001_00002.png' | relative_url }}"
             alt="Second motion sequence">
      </div>
      <p class="motion-caption">Motion Edges (white)</p>
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
         max="14"
         value="1"
         step="1"
         aria-label="Choose shared animation frame">

  <p class="motion-status">
    Frame <span data-frame-count>1</span> / 14
  </p>
</div>

<style>
.motion-comparison {
  max-width: 900px;
  margin: 2rem auto;
}

.motion-caption {
  text-align: center;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
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
document.querySelectorAll("#icecream").forEach((container) => {
  const leftImg = container.querySelector('[data-motion-image="left"]');
  const rightImg = container.querySelector('[data-motion-image="right"]');
  const playButton = container.querySelector("[data-play]");
  const resetButton = container.querySelector("[data-reset]");
  const speedSelect = container.querySelector("[data-speed]");
  const slider = container.querySelector("[data-frame-slider]");
  const counter = container.querySelector("[data-frame-count]");

  const totalFrames = 14;

  const leftBase = "{{ '/images/icecream/vectors/' | relative_url }}";
  const rightBase = "{{ '/images/icecream/overlay/' | relative_url }}";

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

The method provides a simpler outline-detection procedure compared to state-of-the-art image segmentation methods (read: "segmenting" an image into its constituent parts). As well, the method detects only those edges which separate a figure from its ground, in contrast to classic edge detectors like Canny. However, the method requires a sequence of at least two images.

<div class="motion-comparison" id="bike">

  <div class="motion-pair">
    <!-- Left animation -->
    <div class="motion-panel">
      <div class="motion-frame">
        <img data-motion-image="left"
             src="{{ '/images/bike/overlay/00001_00002.png' | relative_url }}"
             alt="First motion sequence">
      </div>
      <p class="motion-caption">Pixel Motion</p>
    </div>

    <!-- Right animation -->
    <div class="motion-panel">
      <div class="motion-frame">
        <img data-motion-image="right"
             src="{{ '/images/bike/vectors/00001_00002.png' | relative_url }}"
             alt="Second motion sequence">
      </div>
      <p class="motion-caption">Motion Edges (white)</p>
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
         max="26"
         value="1"
         step="1"
         aria-label="Choose shared animation frame">

  <p class="motion-status">
    Frame <span data-frame-count>1</span> / 26
  </p>
</div>

<style>
.motion-comparison {
  max-width: 900px;
  margin: 2rem auto;
}

.motion-caption {
  text-align: center;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
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
document.querySelectorAll("#bike").forEach((container) => {
  const leftImg = container.querySelector('[data-motion-image="left"]');
  const rightImg = container.querySelector('[data-motion-image="right"]');
  const playButton = container.querySelector("[data-play]");
  const resetButton = container.querySelector("[data-reset]");
  const speedSelect = container.querySelector("[data-speed]");
  const slider = container.querySelector("[data-frame-slider]");
  const counter = container.querySelector("[data-frame-count]");

  const totalFrames = 26;

  const leftBase = "{{ '/images/bike/vectors/' | relative_url }}";
  const rightBase = "{{ '/images/bike/overlay/' | relative_url }}";

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


<div class="motion-comparison" id="hike">

  <div class="motion-pair">
    <!-- Left animation -->
    <div class="motion-panel">
      <div class="motion-frame">
        <img data-motion-image="left"
             src="{{ '/images/hike/overlay/00001_00002.png' | relative_url }}"
             alt="First motion sequence">
      </div>
      <p class="motion-caption">Pixel Motion</p>
    </div>

    <!-- Right animation -->
    <div class="motion-panel">
      <div class="motion-frame">
        <img data-motion-image="right"
             src="{{ '/images/hike/vectors/00001_00002.png' | relative_url }}"
             alt="Second motion sequence">
      </div>
      <p class="motion-caption">Motion Edges (white)</p>
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
         max="13"
         value="1"
         step="1"
         aria-label="Choose shared animation frame">

  <p class="motion-status">
    Frame <span data-frame-count>1</span> / 13
  </p>
</div>

<style>

#hike {
  max-width: 600px; /* adjust as desired */
}

.motion-comparison {
  max-width: 900px;
  margin: 2rem auto;
}

.motion-caption {
  text-align: center;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
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
    gap: 28px;
  }
}
</style>

<script>
document.querySelectorAll("#hike").forEach((container) => {
  const leftImg = container.querySelector('[data-motion-image="left"]');
  const rightImg = container.querySelector('[data-motion-image="right"]');
  const playButton = container.querySelector("[data-play]");
  const resetButton = container.querySelector("[data-reset]");
  const speedSelect = container.querySelector("[data-speed]");
  const slider = container.querySelector("[data-frame-slider]");
  const counter = container.querySelector("[data-frame-count]");

  const totalFrames = 13;

  const leftBase = "{{ '/images/hike/vectors/' | relative_url }}";
  const rightBase = "{{ '/images/hike/overlay/' | relative_url }}";

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
