// --- Web Audio API Cooking Synthesizer ---
class CookingSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.sizzleSource = null;
    this.steamSource = null;
    this.sizzleFilter = null;
    this.steamFilter = null;
    this.sizzleGain = null;
    this.steamGain = null;
    this.bubbleGain = null;
    this.masterGain = null;
  }

  init() {
    if (this.ctx) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContextClass();

    // Master Volume
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.6;
    this.masterGain.connect(this.ctx.destination);

    this.setupSizzle();
    this.setupSteam();
    this.setupBubbles();
  }

  setupSizzle() {
    // Generate white noise buffer
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    this.sizzleSource = this.ctx.createBufferSource();
    this.sizzleSource.buffer = noiseBuffer;
    this.sizzleSource.loop = true;

    // Highpass filter to isolate sizzling frequencies
    this.sizzleFilter = this.ctx.createBiquadFilter();
    this.sizzleFilter.type = 'highpass';
    this.sizzleFilter.frequency.value = 7500;

    this.sizzleGain = this.ctx.createGain();
    this.sizzleGain.gain.value = 0;

    this.sizzleSource.connect(this.sizzleFilter);
    this.sizzleFilter.connect(this.sizzleGain);
    this.sizzleGain.connect(this.masterGain);

    this.sizzleSource.start();
  }

  setupSteam() {
    // Pink noise approximation for steam sound
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    this.steamSource = this.ctx.createBufferSource();
    this.steamSource.buffer = noiseBuffer;
    this.steamSource.loop = true;

    // Bandpass filter for hiss
    this.steamFilter = this.ctx.createBiquadFilter();
    this.steamFilter.type = 'bandpass';
    this.steamFilter.frequency.value = 1100;
    this.steamFilter.Q.value = 0.8;

    this.steamGain = this.ctx.createGain();
    this.steamGain.gain.value = 0;

    this.steamSource.connect(this.steamFilter);
    this.steamFilter.connect(this.steamGain);
    this.steamGain.connect(this.masterGain);

    this.steamSource.start();
  }

  setupBubbles() {
    this.bubbleGain = this.ctx.createGain();
    this.bubbleGain.gain.value = 0;
    this.bubbleGain.connect(this.masterGain);

    this.scheduleBubbles();
  }

  scheduleBubbles() {
    if (!this.isPlaying) {
      setTimeout(() => this.scheduleBubbles(), 100);
      return;
    }

    // Interval between bubble pops (40ms to 250ms)
    const delay = 35 + Math.random() * 200;
    this.playBubbleSound();

    setTimeout(() => this.scheduleBubbles(), delay);
  }

  playBubbleSound() {
    if (!this.ctx || this.ctx.state === 'suspended') return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'sine';

    // Bubble pop: rapid pitch rising then falling
    const baseFreq = 70 + Math.random() * 150;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, now + 0.03);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.10);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.10);

    osc.connect(gainNode);
    gainNode.connect(this.bubbleGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  start() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;

    const now = this.ctx.currentTime;
    // Fast fade-in
    this.sizzleGain.gain.linearRampToValueAtTime(0.04, now + 0.3);
    this.steamGain.gain.linearRampToValueAtTime(0.08, now + 0.3);
    this.bubbleGain.gain.linearRampToValueAtTime(0.5, now + 0.3);
  }

  stop() {
    this.isPlaying = false;
    if (this.ctx) {
      const now = this.ctx.currentTime;
      this.sizzleGain.gain.linearRampToValueAtTime(0, now + 0.3);
      this.steamGain.gain.linearRampToValueAtTime(0, now + 0.3);
      this.bubbleGain.gain.linearRampToValueAtTime(0, now + 0.3);
    }
  }

  updateVolumeByProgress(progress) {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;

    // Stage audio levels:
    // 0.0 - 0.25 (Introduction): Light steam, quiet pops
    // 0.25 - 0.75 (Boiling & Cooking): Full steam, heavy bubbly cooking
    // 0.75 - 1.0 (Ready/Cooling): Low bubbles, soft sizzling and steam
    if (progress < 0.25) {
      const factor = progress / 0.25; // 0 to 1
      this.steamGain.gain.setTargetAtTime(0.02 + factor * 0.08, now, 0.1);
      this.sizzleGain.gain.setTargetAtTime(0.01 + factor * 0.03, now, 0.1);
      this.bubbleGain.gain.setTargetAtTime(factor * 0.3, now, 0.1);
    } else if (progress < 0.75) {
      this.steamGain.gain.setTargetAtTime(0.18, now, 0.1);
      this.sizzleGain.gain.setTargetAtTime(0.04, now, 0.1);
      this.bubbleGain.gain.setTargetAtTime(0.7, now, 0.1);
    } else {
      const factor = 1 - (progress - 0.75) / 0.25; // 1 to 0
      this.steamGain.gain.setTargetAtTime(0.08 + factor * 0.1, now, 0.1);
      this.sizzleGain.gain.setTargetAtTime(0.04 + (1 - factor) * 0.04, now, 0.1);
      this.bubbleGain.gain.setTargetAtTime(factor * 0.3, now, 0.1);
    }
  }
}

// --- App State ---
const frameCount = 240;
const images = [];
let loadedCount = 0;
let appMode = 'scroll'; // 'scroll' or 'auto'
const synth = new CookingSynth();

const smoothFrame = {
  target: 1,
  current: 1,
  speed: 0.08 // Lower = smoother interpolation, higher = faster response
};

// --- Preload Images ---
const getFrameUrl = index => `/Images/ezgif-frame-${index.toString().padStart(3, '0')}.png`;

function initPreloader() {
  const loaderBar = document.getElementById('loader-bar');
  const loaderText = document.getElementById('loader-text');

  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = getFrameUrl(i);
    
    img.onload = () => {
      handleImageProgress();
    };

    img.onerror = () => {
      console.warn(`Failed to load frame ${i}`);
      handleImageProgress(); // continue loading anyway
    };

    images.push(img);
  }

  function handleImageProgress() {
    loadedCount++;
    const progress = Math.round((loadedCount / frameCount) * 100);
    
    if (loaderBar) loaderBar.style.width = `${progress}%`;
    if (loaderText) loaderText.innerText = `Preparing Tastemaker... ${progress}%`;

    if (loadedCount === frameCount) {
      setTimeout(onAssetsLoaded, 600); // Small aesthetic hold
    }
  }
}

function onAssetsLoaded() {
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.classList.add('loaded');

  // Trigger sizing and canvas setup
  resizeCanvas();

  // Start Animation Loops
  requestAnimationFrame(updateAnimationLoop);
  requestAnimationFrame(calculateFpsLoop);
  requestAnimationFrame(runAutoplayLoop);
}

// --- Canvas Renderer ---
function resizeCanvas() {
  const canvas = document.getElementById('animation-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const scale = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * scale;
  canvas.height = window.innerHeight * scale;
  ctx.scale(scale, scale);

  // Redraw
  drawFrame(Math.round(smoothFrame.current));
}

function drawFrame(frameIndex) {
  const canvas = document.getElementById('animation-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Fallback to closest complete frame if target is not loaded
  let img = images[frameIndex - 1];
  if (!img || !img.complete) {
    // Search backwards first
    for (let i = frameIndex - 2; i >= 0; i--) {
      if (images[i] && images[i].complete) {
        img = images[i];
        break;
      }
    }
  }
  // Search forwards if still not found
  if (!img || !img.complete) {
    for (let i = frameIndex; i < images.length; i++) {
      if (images[i] && images[i].complete) {
        img = images[i];
        break;
      }
    }
  }

  // If no frame is complete yet, return to avoid blank canvas clears
  if (!img || !img.complete) return;

  const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
  const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Aspect ratio math for Cover scaling
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;
  const imgRatio = imgWidth / imgHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth, drawHeight, drawX, drawY;

  if (canvasRatio > imgRatio) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    drawX = 0;
    drawY = (canvasHeight - drawHeight) / 2;
  } else {
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imgRatio;
    drawX = (canvasWidth - drawWidth) / 2;
    drawY = 0;
  }

  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
}

// --- Animation & Physics Loops ---
let statsUpdateTimer = 0;

function updateAnimationLoop() {
  const diff = smoothFrame.target - smoothFrame.current;

  // Render when changes occur
  if (Math.abs(diff) > 0.02) {
    smoothFrame.current += diff * smoothFrame.speed;
    drawFrame(Math.round(smoothFrame.current));

    // Update stats occasionally (throttled)
    if (Date.now() - statsUpdateTimer > 50) {
      updateStats();
      statsUpdateTimer = Date.now();
    }
  }

  requestAnimationFrame(updateAnimationLoop);
}

// Map scroll progress to narrative cards & scroll prompt opacity
function updateNarrativeOverlays(progress) {
  const c1 = document.getElementById('card-1');
  const c2 = document.getElementById('card-2');
  const c3 = document.getElementById('card-3');
  const c4 = document.getElementById('card-4');
  const prompt = document.getElementById('scroll-prompt');

  // Activate narrative cards based on thresholds
  if (c1) c1.classList.toggle('active', progress >= 0.0 && progress < 0.22);
  if (c2) c2.classList.toggle('active', progress >= 0.25 && progress < 0.48);
  if (c3) c3.classList.toggle('active', progress >= 0.51 && progress < 0.73);
  if (c4) c4.classList.toggle('active', progress >= 0.76 && progress <= 1.0);

  // Hide scroll prompt arrow if user scrolled down
  if (prompt) {
    if (progress > 0.04) {
      prompt.style.opacity = '0';
      prompt.style.pointerEvents = 'none';
    } else {
      prompt.style.opacity = '1';
    }
  }
}

// Scroll Event Handler
window.addEventListener('scroll', () => {
  if (appMode !== 'scroll') return;

  const scrollContainer = document.getElementById('journey-scroll');
  if (!scrollContainer) return;

  const rect = scrollContainer.getBoundingClientRect();
  const containerTop = window.scrollY + rect.top;
  const totalScrollable = scrollContainer.scrollHeight - window.innerHeight;

  // Calculate scrolled progress relative to the container's sticky range
  const relativeScroll = window.scrollY - containerTop;
  let progress = relativeScroll / totalScrollable;
  progress = Math.max(0, Math.min(1, progress)); // clamp 0-1

  smoothFrame.target = 1 + progress * (frameCount - 1);

  // Synthesizer update
  synth.updateVolumeByProgress(progress);
  updateNarrativeOverlays(progress);
});

// Autoplay Programmatic Scroll Loop
let lastAutoplayTime = 0;

function runAutoplayLoop(timestamp) {
  if (appMode === 'auto') {
    const delta = timestamp - lastAutoplayTime;
    lastAutoplayTime = timestamp;

    const speedSlider = document.getElementById('autoplay-speed');
    const speed = speedSlider ? parseFloat(speedSlider.value) : 1.0;

    const scrollContainer = document.getElementById('journey-scroll');
    if (scrollContainer) {
      const rect = scrollContainer.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const totalScrollable = scrollContainer.scrollHeight - window.innerHeight;
      
      // Step scroll rate based on autoplay speed
      const scrollStep = (speed * (totalScrollable / 1400)) * (delta / 16.66); // scale with delta time (~60fps)
      let newScroll = window.scrollY + scrollStep;

      // Loop back to start if reached bottom of container
      if (newScroll >= containerTop + totalScrollable - 5) {
        newScroll = containerTop;
      }

      window.scrollTo(0, newScroll);

      // Scroll trigger manually updates targets
      const progress = (newScroll - containerTop) / totalScrollable;
      smoothFrame.target = 1 + progress * (frameCount - 1);
      
      synth.updateVolumeByProgress(progress);
      updateNarrativeOverlays(progress);
    }
  } else {
    lastAutoplayTime = timestamp;
  }
  requestAnimationFrame(runAutoplayLoop);
}

// --- FPS Calculator ---
let lastFpsTime = 0;
let frameCountFps = 0;
let fpsVal = 0;

function calculateFpsLoop(timestamp) {
  frameCountFps++;
  if (timestamp > lastFpsTime + 1000) {
    fpsVal = Math.round((frameCountFps * 1000) / (timestamp - lastFpsTime));
    const fpsEl = document.getElementById('stat-fps');
    if (fpsEl) fpsEl.innerText = `${fpsVal} FPS`;
    frameCountFps = 0;
    lastFpsTime = timestamp;
  }
  requestAnimationFrame(calculateFpsLoop);
}

// --- Update UI Stats Panel ---
function updateStats() {
  const currentF = Math.round(smoothFrame.current);
  const progressPercent = Math.round(((currentF - 1) / (frameCount - 1)) * 100);

  const frameEl = document.getElementById('stat-frame');
  const progressEl = document.getElementById('stat-progress');
  const stateEl = document.getElementById('stat-state');

  if (frameEl) frameEl.innerText = `${currentF} / ${frameCount}`;
  if (progressEl) progressEl.innerText = `${progressPercent}%`;
  
  if (stateEl) {
    if (appMode === 'auto') {
      stateEl.innerText = 'Autoplay';
      stateEl.style.color = 'var(--accent-color)';
    } else {
      const diff = Math.abs(smoothFrame.target - smoothFrame.current);
      if (diff > 0.5) {
        stateEl.innerText = 'Scrolling...';
        stateEl.style.color = 'var(--accent-color)';
      } else {
        stateEl.innerText = 'Idle';
        stateEl.style.color = 'var(--text-secondary)';
      }
    }
  }
}

// --- Widget UI Control Event Listeners ---
function initControls() {
  const controlPanel = document.getElementById('control-panel');
  const panelHeader = document.getElementById('panel-header');
  const toggleBtn = document.getElementById('panel-toggle-btn');

  // Minimize toggle
  if (panelHeader && controlPanel) {
    panelHeader.addEventListener('click', () => {
      controlPanel.classList.toggle('minimized');
      if (toggleBtn) {
        toggleBtn.innerText = controlPanel.classList.contains('minimized') ? '▲' : '▼';
      }
    });
  }

  // Animation Mode
  const modeScrollBtn = document.getElementById('mode-scroll');
  const modeAutoBtn = document.getElementById('mode-auto');
  const speedGroup = document.getElementById('speed-group');
  const modeVal = document.getElementById('mode-val');

  if (modeScrollBtn && modeAutoBtn) {
    modeScrollBtn.addEventListener('click', () => {
      appMode = 'scroll';
      modeScrollBtn.classList.add('active');
      modeAutoBtn.classList.remove('active');
      if (speedGroup) speedGroup.style.display = 'none';
      if (modeVal) modeVal.innerText = 'Scroll';
    });

    modeAutoBtn.addEventListener('click', () => {
      appMode = 'auto';
      modeAutoBtn.classList.add('active');
      modeScrollBtn.classList.remove('active');
      if (speedGroup) speedGroup.style.display = 'block';
      if (modeVal) modeVal.innerText = 'Autoplay';
    });
  }

  // Speed slider
  const speedSlider = document.getElementById('autoplay-speed');
  const speedVal = document.getElementById('speed-val');
  if (speedSlider && speedVal) {
    speedSlider.addEventListener('input', () => {
      speedVal.innerText = `${parseFloat(speedSlider.value).toFixed(1)}x`;
    });
  }

  // Audio Toggle
  const audioOffBtn = document.getElementById('audio-off');
  const audioOnBtn = document.getElementById('audio-on');
  const audioVal = document.getElementById('audio-val');

  if (audioOffBtn && audioOnBtn) {
    audioOffBtn.addEventListener('click', () => {
      synth.stop();
      audioOffBtn.classList.add('active');
      audioOnBtn.classList.remove('active');
      if (audioVal) audioVal.innerText = 'Muted';
    });

    audioOnBtn.addEventListener('click', () => {
      synth.start();
      audioOnBtn.classList.add('active');
      audioOffBtn.classList.remove('active');
      if (audioVal) audioVal.innerText = 'Active';
    });
  }

  // Theme selector
  const themeBtns = document.querySelectorAll('.theme-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const theme = btn.dataset.theme;
      if (theme === 'classic') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
    });
  });

  // Nav scroll links
  const navStory = document.getElementById('nav-story');
  const navControls = document.getElementById('nav-controls');
  if (navStory) {
    navStory.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  if (navControls) {
    navControls.addEventListener('click', (e) => {
      e.preventDefault();
      if (controlPanel) {
        controlPanel.classList.remove('minimized');
        if (toggleBtn) toggleBtn.innerText = '▼';
        controlPanel.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });
  }
}

// --- Initialize ---
window.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initControls();
});

window.addEventListener('resize', resizeCanvas);
