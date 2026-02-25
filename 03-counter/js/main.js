// ── Storage ──
const STORAGE_KEY = "dandan-counter";

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {}
  return null;
}

function saveState() {
  const state = {
    darkMode: isDarkMode,
    soundEnabled,
    loopEnabled,
    loopMax,
    count,
    loopRound,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getInitialDarkMode() {
  const state = loadState();
  if (state?.darkMode !== undefined) return state.darkMode;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// ── State ──
const savedState = loadState();
let count = savedState?.count ?? 1;
let isDarkMode = getInitialDarkMode();
let loopEnabled = savedState?.loopEnabled ?? false;
let loopMax = savedState?.loopMax ?? 10;
let loopRound = savedState?.loopRound ?? 0;
let soundEnabled = savedState?.soundEnabled ?? false;
let audioContext = null;

// ── Audio ──
function initAudioContext() {
  if (!audioContext) {
    audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();
  }
  return audioContext;
}

function playClickSound() {
  if (!soundEnabled) return;
  try {
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      ctx.currentTime + 0.1,
    );
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (e) {}
}

// 루프 한 세트 완료 시 차임 사운드 (상승 2음)
function playLoopCompleteSound() {
  if (!soundEnabled) return;
  try {
    const ctx = initAudioContext();
    const t = ctx.currentTime;

    // 첫 번째 음 (C5 - 523Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.frequency.value = 523;
    osc1.type = "sine";
    gain1.gain.setValueAtTime(0.3, t);
    gain1.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
    osc1.start(t);
    osc1.stop(t + 0.15);

    // 두 번째 음 (E5 - 659Hz, 약간 딜레이)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.value = 659;
    osc2.type = "sine";
    gain2.gain.setValueAtTime(0.01, t);
    gain2.gain.setValueAtTime(0.3, t + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
    osc2.start(t + 0.12);
    osc2.stop(t + 0.3);
  } catch (e) {}
}

function vibrate() {
  if (navigator.vibrate) navigator.vibrate(30);
}

// ── DOM ──
const app = document.getElementById("app");
const counterEl = document.getElementById("counter");
const darkModeBtn = document.getElementById("darkModeBtn");
const loopBtn = document.getElementById("loopBtn");
const loopMaxInput = document.getElementById("loopMaxInput");
const resetBtn = document.getElementById("resetBtn");
const soundBtn = document.getElementById("soundBtn");
const repeatIcon = loopBtn.querySelector(".repeat-icon");
const loopCountEl = document.getElementById("loopCount");

// ── Core Functions ──
function updateCounter() {
  counterEl.textContent = count;
  if (loopEnabled) {
    loopCountEl.textContent = `${loopRound}회 반복`;
    loopCountEl.classList.add("visible");
  } else {
    loopCountEl.classList.remove("visible");
  }
}

function incrementCount() {
  let loopCompleted = false;
  if (loopEnabled) {
    if (count >= loopMax) {
      count = 1;
      loopRound++;
      loopCompleted = true;
    } else {
      count++;
    }
  } else {
    count++;
  }
  updateCounter();
  saveState();
  counterEl.classList.remove("pulse");
  void counterEl.offsetWidth;
  counterEl.classList.add("pulse");
  vibrate();
  loopCompleted ? playLoopCompleteSound() : playClickSound();
}

function resetCount() {
  count = 1;
  loopRound = 0;
  updateCounter();
  saveState();
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.documentElement.classList.toggle("dark", isDarkMode);
  saveState();
}

function toggleLoop() {
  loopEnabled = !loopEnabled;
  repeatIcon.classList.toggle("active", loopEnabled);
  loopMaxInput.classList.toggle("hidden", !loopEnabled);
  if (!loopEnabled) {
    loopRound = 0;
  }
  updateCounter();
  saveState();
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  soundBtn.classList.toggle("sound-enabled", soundEnabled);
  saveState();
  if (soundEnabled) playClickSound();
}

function handleLoopMaxChange(e) {
  const value = parseInt(e.target.value);
  if (!isNaN(value) && value > 0) {
    loopMax = value;
    if (count > value) {
      count = 1;
      updateCounter();
    }
    saveState();
  }
}

// ── Event Listeners ──
app.addEventListener("click", (e) => {
  if (e.target.closest(".controls")) return;
  incrementCount();
});

darkModeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDarkMode();
});
loopBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleLoop();
});
loopMaxInput.addEventListener("click", (e) => {
  e.stopPropagation();
});
loopMaxInput.addEventListener("change", handleLoopMaxChange);
loopMaxInput.addEventListener("input", handleLoopMaxChange);
resetBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  resetCount();
});
soundBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleSound();
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    incrementCount();
  }
});

// ── Initialize ──
function init() {
  // 다크모드 적용
  document.documentElement.classList.toggle("dark", isDarkMode);

  // 소리 버튼 상태
  soundBtn.classList.toggle("sound-enabled", soundEnabled);

  // 루프 설정 복원
  if (loopEnabled) {
    repeatIcon.classList.add("active");
    loopMaxInput.classList.remove("hidden");
    loopMaxInput.value = loopMax;
  }

  // 카운터 표시
  updateCounter();
}

init();
