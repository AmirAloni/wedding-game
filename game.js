/* Wedding Chaos: Ofer vs Mushu (mobile-only canvas)
   No external assets. Touch only. Portrait-ish.
*/
'use strict';

// Local sticker asset (display only)
const oferStickerImg = new Image();
oferStickerImg.decoding = 'async';
oferStickerImg.loading = 'eager';
oferStickerImg.src = 'assets/ofer.webp';

const mushuStickerImg = new Image();
mushuStickerImg.decoding = 'async';
mushuStickerImg.loading = 'eager';
mushuStickerImg.src = 'assets/Mushu.webp';

const talStickerImg = new Image();
talStickerImg.decoding = 'async';
talStickerImg.loading = 'eager';
talStickerImg.src = 'assets/Tal.webp';

// Bride rage stickers (used during ChaosEvent.BRIDE_RAGE)
const brideRageOneImg = new Image();
brideRageOneImg.decoding = 'async';
brideRageOneImg.loading = 'eager';
brideRageOneImg.src = 'assets/bride-rage-one.webp';

const brideRageTwoImg = new Image();
brideRageTwoImg.decoding = 'async';
brideRageTwoImg.loading = 'eager';
brideRageTwoImg.src = 'assets/bride-rage-two.webp';

// Stage 1 (yard) props
const levelOneBgImg = new Image();
levelOneBgImg.decoding = 'async';
levelOneBgImg.loading = 'eager';
levelOneBgImg.src = 'assets/level-one-backgroung.jpg';
levelOneBgImg.addEventListener('load', () => { bgCache = null; }, { once: true });

const palmTreeImg = new Image();
palmTreeImg.decoding = 'async';
palmTreeImg.loading = 'eager';
palmTreeImg.src = 'assets/palm-tree.webp';

const treeImg = new Image();
treeImg.decoding = 'async';
treeImg.loading = 'eager';
treeImg.src = 'assets/tree.webp';

const pinkBushImg = new Image();
pinkBushImg.decoding = 'async';
pinkBushImg.loading = 'eager';
pinkBushImg.src = 'assets/pink-bush.webp';

const tableOutsideImg = new Image();
tableOutsideImg.decoding = 'async';
tableOutsideImg.loading = 'eager';
tableOutsideImg.src = 'assets/table-outside.webp';

// Stage 2 (hall) props
const barImg = new Image();
barImg.decoding = 'async';
barImg.loading = 'eager';
barImg.src = 'assets/bar.webp';

const indoorTableImg = new Image();
indoorTableImg.decoding = 'async';
indoorTableImg.loading = 'eager';
indoorTableImg.src = 'assets/indoor-table.webp';

const leftSpeakerImg = new Image();
leftSpeakerImg.decoding = 'async';
leftSpeakerImg.loading = 'eager';
leftSpeakerImg.src = 'assets/left-speaker.webp';

const rightSpeakerImg = new Image();
rightSpeakerImg.decoding = 'async';
rightSpeakerImg.loading = 'eager';
rightSpeakerImg.src = 'assets/right-speaker.webp';

// Stage 3 (chuppah) props
const levelThreeBgImg = new Image();
levelThreeBgImg.decoding = 'async';
levelThreeBgImg.loading = 'eager';
levelThreeBgImg.src = 'assets/level-three-backgroung.jpeg';
levelThreeBgImg.addEventListener('load', () => { bgCache = null; }, { once: true });

const hupaImg = new Image();
hupaImg.decoding = 'async';
hupaImg.loading = 'eager';
hupaImg.src = 'assets/hupa.png';

const fountainImg = new Image();
fountainImg.decoding = 'async';
fountainImg.loading = 'eager';
fountainImg.src = 'assets/fountain.png';

const whiteCarpetImg = new Image();
whiteCarpetImg.decoding = 'async';
whiteCarpetImg.loading = 'eager';
whiteCarpetImg.src = 'assets/white-carpet.jpg';

const whiteFlowersImg = new Image();
whiteFlowersImg.decoding = 'async';
whiteFlowersImg.loading = 'eager';
whiteFlowersImg.src = 'assets/white-flowers.png';

const whiteTreeImg = new Image();
whiteTreeImg.decoding = 'async';
whiteTreeImg.loading = 'eager';
whiteTreeImg.src = 'assets/white-tree.png';

const pinkTreeImg = new Image();
pinkTreeImg.decoding = 'async';
pinkTreeImg.loading = 'eager';
pinkTreeImg.src = 'assets/pink-tree.png';

const woodStageImg = new Image();
woodStageImg.decoding = 'async';
woodStageImg.loading = 'eager';
woodStageImg.src = 'assets/wood-stage.png';

const briksImg = new Image();
briksImg.decoding = 'async';
briksImg.loading = 'eager';
briksImg.src = 'assets/briks.png';

// =============================
// Constants (tweak here)
// =============================
const DEFAULT_GAME_DURATION = 30; // seconds (fallback)

// How to tweak chaos:
// - Change CHAOS_EVENT_MIN_MS / CHAOS_EVENT_MAX_MS to make chaos shorter/longer.
// - Change CHAOS_WEIGHTS to bias which events happen more.
const DEFAULT_CHAOS_EVENT_MIN_MS = 4000;
const DEFAULT_CHAOS_EVENT_MAX_MS = 4000;

// How to adjust difficulty:
// - Increase PLAYER_SPEED to make catching easier.
// - Increase MUSHU_BASE_SPEED to make Mushu harder.
// - Increase ARENA_MARGIN to reduce playable area (harder).
const DEFAULT_MUSHU_BASE_SPEED = 330;
const ARENA_MARGIN = 18;

// How to change text:
// - Edit OUTCOMES at the bottom for different absurd endings.

// =============================
// DOM / Canvas
// =============================
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d', { alpha: false });

// Cached background for the canvas (rebuilt on resize / stage change).
let bgCache = null;

const startUI = document.getElementById('startUI');
const endUI = document.getElementById('endUI');
const rotateUI = document.getElementById('rotateUI');
const stageUI = document.getElementById('stageUI');

const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

const timerEl = document.getElementById('timer');
const chaosEl = document.getElementById('chaos');
const instructionsEl = document.getElementById('instructions');
const quipEl = document.getElementById('quip');
const endTitleEl = document.getElementById('endTitle');
const endTextEl = document.getElementById('endText');
const stageTitleEl = document.getElementById('stageTitle');
const stageTextEl = document.getElementById('stageText');
const stageCountdownEl = document.getElementById('stageCountdown');
const stageTinyEl = document.getElementById('stageTiny');
const endScoreEl = document.getElementById('endScore');

// =============================
// State machine (MANDATORY)
// IDLE → PLAYING → END → PLAYING
// =============================
const GameState = Object.freeze({
  IDLE: 'IDLE',
  PLAYING: 'PLAYING',
  END: 'END',
});

let state = GameState.IDLE;
let rafId = 0;

// =============================
// Stage system (3 stages, sequential)
// =============================
const StageId = Object.freeze({
  STAGE_1: 0,
  STAGE_2: 1,
  STAGE_3: 2,
});

function stageNum(i){ return i + 1; }

const STAGES = [
  {
    name: 'מי נגע בטבעות?!',
    place: 'בחצר',
    punch: 'תוכיח שאתה לא רק חתן בתמונות.',
    howTo: [
      'גוררים אצבע = עופר 🤵 זז כמו מגנט על סקטבורד.',
      'המטרה: לתפוס את מושו 🐶 לפני שהטיימר נגמר.',
      'שולחנות/כיסאות/עצים/שיחים: לא עוברים דרכם. כן, זה אישי.',
    ].join('\n'),
    // Difficulty
    durationSec: 60,
    playerSpeed: 2800,
    mushuBaseSpeed: 290,
    chaosIntervalSec: 6.0,
    chaosEventMinMs: 3200,
    chaosEventMaxMs: 3600,
    chaosWeights: null, // filled after ChaosEvent declared
    mushuBoostRange: [1.35, 1.75],
    shakeIntensity: 0.65,
    brideRageEnabled: false,
    brideRageDurFactor: 0,
    talRage: {
      targetR: 24,
      alongK: 5.8,
      sideK: 9.5,
      maxAccel: 1500,
      wind: 220,
    },
  },
  {
    name: 'טל גילתה',
    place: 'באולם',
    punch: 'זה לא טריאתלון. זה אירוע.',
    intro: 'טל כבר רואה הכל. במיוחד זיעה.',
    durationSec: 40,
    playerSpeed: 2600,
    mushuBaseSpeed: 330,
    chaosIntervalSec: 5.0,
    chaosEventMinMs: 3800,
    chaosEventMaxMs: 4200,
    chaosWeights: null,
    mushuBoostRange: [1.55, 2.05],
    shakeIntensity: 1.0,
    brideRageEnabled: true,
    brideRageDurFactor: 0.8,
    talRage: {
      targetR: 28,
      alongK: 7.0,
      sideK: 12.0,
      blockAlongFrac: 0.12,
      maxAccel: 1800,
      wind: 280,
    },
  },
  {
    name: 'מושו נכנס למוד סופ״ש',
    place: 'בחופה',
    punch: 'כולם צועקים \"רק עוד תמונה\" והוא בורח.',
    intro: 'זה השלב שבו מושו נהיה קטן-חמוד-חסין-לחוקים.',
    durationSec: 30,
    playerSpeed: 2400,
    mushuBaseSpeed: 385,
    chaosIntervalSec: 4.5,
    chaosEventMinMs: 4200,
    chaosEventMaxMs: 4800,
    chaosWeights: null,
    mushuBoostRange: [1.75, 2.35],
    shakeIntensity: 0.85,
    brideRageEnabled: true,
    brideRageDurFactor: 1.05,
    talRage: {
      targetR: 32,
      alongK: 7.6,
      sideK: 13.8,
      blockAlongFrac: 0.10,
      maxAccel: 1950,
      wind: 340,
    },
  },
];

// Per-run scoring (faster catch => more points).
const runScore = {
  stages: Array.from({ length: STAGES.length }, () => ({
    points: null,
    timeSpentSec: null,
    durationSec: null,
  })),
  totalPoints: 0,
};

function recalcTotalPoints(){
  runScore.totalPoints = runScore.stages.reduce((acc, s) => acc + (s.points ?? 0), 0);
}

function resetScoreFromStage(stageIndex){
  for (let i = stageIndex; i < runScore.stages.length; i++){
    runScore.stages[i].points = null;
    runScore.stages[i].timeSpentSec = null;
    runScore.stages[i].durationSec = null;
  }
  recalcTotalPoints();
}

function awardCatchScore(stageIndex){
  const cfg = getStageCfg(stageIndex);
  const dur = (cfg?.durationSec ?? world.params?.durationSec ?? DEFAULT_GAME_DURATION);
  const remaining = clamp(world.timeLeft ?? 0, 0, dur);
  const points = Math.max(0, Math.round((remaining / dur) * 1000));
  const timeSpentSec = clamp(dur - remaining, 0, dur);
  runScore.stages[stageIndex].points = points;
  runScore.stages[stageIndex].timeSpentSec = timeSpentSec;
  runScore.stages[stageIndex].durationSec = dur;
  recalcTotalPoints();
  return points;
}

function renderEndScore(){
  if (!endScoreEl) return;
  const lines = runScore.stages.map((s, i) => {
    const label = `שלב ${i + 1}`;
    if (s.points == null) return `${label}: —`;
    return `${label}: ${s.points} נק׳ • ${s.timeSpentSec.toFixed(1)}ש׳`;
  });
  lines.push(`סה״כ: ${runScore.totalPoints} נק׳`);
  endScoreEl.textContent = lines.join('\n');
}

let hasShownStage1HowTo = false;
let pendingStageIndex = StageId.STAGE_1;
let stageStartAt = 0;
let countdownFromAt = 0;
let overlayMode = 'none'; // 'howto' | 'intro' | 'between' | 'none'

function getStageCfg(i){
  return STAGES[clamp(i, 0, STAGES.length - 1)];
}

function setQuip(text, ms){
  if (!quipEl) return;
  if (!text){
    quipEl.textContent = '';
    quipEl.classList.remove('isOn');
    return;
  }
  quipEl.textContent = text;
  quipEl.classList.add('isOn');
  const until = performance.now() + (ms ?? 1400);
  // Lightweight timeout; no state change outside DOM.
  setTimeout(() => {
    if (performance.now() >= until - 5) quipEl.classList.remove('isOn');
  }, (ms ?? 1400));
}

function showStageOverlay(cfg, mode){
  overlayMode = mode;
  setHidden(stageUI, false);
  stageTitleEl.textContent = `שלב ${stageNum(pendingStageIndex)} (${cfg.place || 'איפשהו'}): ${cfg.name}`;
  if (mode === 'howto'){
    stageTextEl.textContent = cfg.howTo;
    stageTinyEl.textContent = 'עוד רגע זה מתחיל. אל תנסה להתווכח עם כיסאות.';
  } else if (mode === 'between'){
    stageTextEl.textContent = `שלב ${stageNum(pendingStageIndex - 1)} הושלם.\n${cfg.intro || cfg.punch}`;
    stageTinyEl.textContent = 'נושמים. ממשיכים. לא מספרים לדוד.';
  } else {
    stageTextEl.textContent = `${cfg.intro || ''}\n${cfg.punch}`.trim();
    stageTinyEl.textContent = 'תזכור: לנצח זה אופציונלי. קומדיה זה חובה.';
  }
  stageCountdownEl.textContent = '';
}

function hideStageOverlay(){
  overlayMode = 'none';
  setHidden(stageUI, true);
  stageCountdownEl.textContent = '';
}

function startStageImmediately(stageIndex){
  // No stage overlay / countdown: start gameplay immediately.
  pendingStageIndex = stageIndex;
  stageStartAt = 0;
  countdownFromAt = 0;
  hideStageOverlay();
  resetGameToPlaying(stageIndex);
  world.playEnabled = true;
  if (stageIndex === 0) hasShownStage1HowTo = true;
}

function scheduleStageStart(stageIndex, { showHowTo }){
  pendingStageIndex = stageIndex;
  const cfg = getStageCfg(stageIndex);

  // Show overlay and schedule start.
  const t = nowSec();
  const totalDelay = showHowTo ? 5.0 : 3.0; // includes countdown
  stageStartAt = t + totalDelay;
  countdownFromAt = stageStartAt - 3.0;

  showStageOverlay(cfg, showHowTo ? 'howto' : 'intro');
  world.playEnabled = false;
  world.stageIndex = stageIndex;
  world.timeLeft = cfg.durationSec;
  world.chaosActive = false;
  world.chaosName = 'רגוע(בערך)';
  world.shakeUntil = 0;
  clearChaosEffects();
}

function scheduleNextStage(){
  const next = world.stageIndex + 1;
  if (next >= STAGES.length) return;
  pendingStageIndex = next;
  const cfg = getStageCfg(next);
  const t = nowSec();
  stageStartAt = t + 3.0;
  countdownFromAt = stageStartAt - 3.0;
  showStageOverlay(cfg, 'between');
  world.playEnabled = false;
  world.timeLeft = cfg.durationSec;
  clearChaosEffects();
}

function applyStageParams(cfg){
  world.params = {
    durationSec: cfg.durationSec ?? DEFAULT_GAME_DURATION,
    playerSpeed: cfg.playerSpeed ?? 2400,
    mushuBaseSpeed: cfg.mushuBaseSpeed ?? DEFAULT_MUSHU_BASE_SPEED,
    chaosIntervalSec: cfg.chaosIntervalSec ?? 5,
    chaosEventMinMs: cfg.chaosEventMinMs ?? DEFAULT_CHAOS_EVENT_MIN_MS,
    chaosEventMaxMs: cfg.chaosEventMaxMs ?? DEFAULT_CHAOS_EVENT_MAX_MS,
    chaosWeights: cfg.chaosWeights,
    mushuBoostRange: cfg.mushuBoostRange ?? [1.6, 2.3],
    shakeIntensity: cfg.shakeIntensity ?? 1.0,
    brideRageEnabled: !!cfg.brideRageEnabled,
    brideRageDurFactor: cfg.brideRageDurFactor ?? 1.0,
    talRage: cfg.talRage,
  };
}

// =============================
// Utility
// =============================
function clamp(v, lo, hi){ return Math.max(lo, Math.min(hi, v)); }
function lerp(a, b, t){ return a + (b - a) * t; }
function rand(min, max){ return min + Math.random() * (max - min); }
function randInt(min, maxInclusive){ return Math.floor(rand(min, maxInclusive + 1)); }
function dist2(ax, ay, bx, by){
  const dx = ax - bx, dy = ay - by;
  return dx * dx + dy * dy;
}

function nowSec(){ return performance.now() / 1000; }

function isImgReady(img){
  return !!(img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
}

function imgContainDims(img, cx, cy, maxW, maxH, anchor){
  // Returns the exact draw rect that drawImgContain() will use.
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const s = Math.min(maxW / iw, maxH / ih);
  const w = iw * s;
  const h = ih * s;
  const x = cx - w / 2;
  const y = (anchor === 'bottom') ? (cy - h) : (cy - h / 2);
  return { x, y, w, h };
}

function drawImgContain(g, img, cx, cy, maxW, maxH, anchor){
  if (!isImgReady(img)) return false;
  const { x, y, w, h } = imgContainDims(img, cx, cy, maxW, maxH, anchor);
  g.drawImage(img, x, y, w, h);
  return true;
}

// Stage 1 tree hitbox tuning (images are not perfectly centered).
// Use a circular hitbox centered within the drawn tree image.
const STAGE1_TREE_HITBOX = Object.freeze({
  // Radius as fraction of drawn image MIN(w,h)
  r: 0.24,
  // Center Y as fraction of drawn image height from top (0=top, 1=bottom)
  cy: 0.56,
  // X offset as fraction of drawn image width (for trunk centering).
  palmX: -0.03,
  treeX: 0.03,
});

function setHidden(el, hidden){
  el.classList.toggle('isHidden', !!hidden);
}

function isLandscape(){
  const rect = canvas.getBoundingClientRect();
  // If layout isn't ready yet, fall back to the viewport.
  if (!rect.width || !rect.height) return window.innerWidth > window.innerHeight;
  return rect.width > rect.height;
}

function resizeCanvas(){
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const rect = canvas.getBoundingClientRect();
  const wCss = rect.width || window.innerWidth;
  const hCss = rect.height || window.innerHeight;
  const w = Math.floor(wCss * dpr);
  const h = Math.floor(hCss * dpr);
  canvas.width = w;
  canvas.height = h;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = true;
  buildBackgroundCache();
}

function buildBackgroundCache(){
  const w = canvas.width, h = canvas.height;
  if (!w || !h) return;

  const stage = clamp(world.stageIndex ?? 0, 0, STAGES.length - 1);

  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d', { alpha: false });

  function drawImageCover(img){
    // Draw with "cover" behavior: fill canvas, preserve aspect, crop overflow.
    if (!img || !img.naturalWidth || !img.naturalHeight) return false;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const s = Math.max(w / iw, h / ih);
    const dw = iw * s;
    const dh = ih * s;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;
    g.drawImage(img, dx, dy, dw, dh);
    return true;
  }

  if (stage === 1){
    // Indoor hall: keep the TOP clean, put the dance floor up top near the bar.
    const wall = g.createLinearGradient(0, 0, 0, h);
    wall.addColorStop(0, '#2b2a2f');
    wall.addColorStop(0.32, '#34333c');
    wall.addColorStop(0.62, '#1e1e24');
    wall.addColorStop(1, '#121216');
    g.fillStyle = wall;
    g.fillRect(0, 0, w, h);

    // Soft vignette for depth (clean, no extra decorations up top).
    const vig = g.createRadialGradient(w * 0.5, h * 0.45, Math.min(w, h) * 0.10, w * 0.5, h * 0.45, Math.max(w, h) * 0.95);
    vig.addColorStop(0, 'rgba(255,255,255,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.42)');
    g.fillStyle = vig;
    g.fillRect(0, 0, w, h);

    // Dance floor (checkered) near the top area.
    const dfX = clamp(w * 0.18, 20, w - 20);
    const dfY = clamp(h * 0.22, 20, h - 20);
    const dfW = clamp(w * 0.64, 220, w - dfX - 20);
    const dfH = clamp(h * 0.34, 220, h - dfY - 20);
    drawRoundedRect(g, dfX, dfY, dfW, dfH, 22, 'rgba(255,250,243,0.07)', 'rgba(255,123,184,0.24)');

    function hash2(ix, iy){
      // Deterministic tiny hash (no randomness in cached background).
      let n = (ix * 374761393) ^ (iy * 668265263);
      n = (n ^ (n >>> 13)) * 1274126177;
      return (n ^ (n >>> 16)) >>> 0;
    }

    const tile = clamp(Math.round(Math.min(w, h) * 0.075), 26, 46);
    const dfTile = clamp(Math.round(tile * 0.9), 22, 44);
    const palette = [
      'rgba(255,250,243,0.20)', // ivory
      'rgba(233,238,241,0.20)', // stone
      'rgba(255,210,231,0.18)', // blush
      'rgba(103,199,255,0.16)', // cyan
    ];
    for (let y = dfY + 8; y < dfY + dfH - 8; y += dfTile){
      for (let x = dfX + 8; x < dfX + dfW - 8; x += dfTile){
        const ix = ((x - dfX) / dfTile) | 0;
        const iy = ((y - dfY) / dfTile) | 0;
        const n = hash2(ix, iy);
        const odd = (ix + iy) % 2;
        const c0 = palette[n % palette.length];
        const c1 = odd ? 'rgba(255,123,184,0.12)' : 'rgba(103,199,255,0.10)';
        g.fillStyle = n % 5 === 0 ? c0 : c1;
        g.fillRect(x, y, dfTile - 1, dfTile - 1);
      }
    }

    // Glow on the dance floor edges.
    g.strokeStyle = 'rgba(255,233,190,0.18)';
    g.lineWidth = 4;
    g.strokeRect(dfX + 8, dfY + 8, dfW - 16, dfH - 16);

    // Warm spotlight center.
    const spot = g.createRadialGradient(w * 0.52, h * 0.34, Math.min(w, h) * 0.06, w * 0.52, h * 0.62, Math.max(w, h) * 0.82);
    spot.addColorStop(0, 'rgba(255,233,190,0.22)');
    spot.addColorStop(0.35, 'rgba(255,233,190,0.10)');
    spot.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = spot;
    g.fillRect(0, 0, w, h);
  } else if (stage === 2){
    // Stage 3: use provided background image, fallback to soft ivory gradient.
    const drew = drawImageCover(levelThreeBgImg);
    if (!drew){
      const cloth = g.createLinearGradient(0, 0, 0, h);
      cloth.addColorStop(0, '#fffaf3');
      cloth.addColorStop(0.50, '#ffd2e7');
      cloth.addColorStop(1, '#e9eef1');
      g.fillStyle = cloth;
      g.fillRect(0, 0, w, h);

      const vig = g.createRadialGradient(w * 0.5, h * 0.45, Math.min(w, h) * 0.16, w * 0.5, h * 0.55, Math.max(w, h) * 0.95);
      vig.addColorStop(0, 'rgba(255,255,255,0)');
      vig.addColorStop(1, 'rgba(18,49,28,0.14)');
      g.fillStyle = vig;
      g.fillRect(0, 0, w, h);
    }
  } else {
    // Yard (Stage 1): use provided background image, fallback to gradient if not loaded yet.
    const drew = drawImageCover(levelOneBgImg);
    if (!drew){
      const lawn = g.createRadialGradient(
        w * 0.52,
        h * 0.18,
        Math.min(w, h) * 0.08,
        w * 0.52,
        h * 0.55,
        Math.max(w, h) * 0.95
      );
      lawn.addColorStop(0, '#c3f07a');
      lawn.addColorStop(0.45, '#7bd77f');
      lawn.addColorStop(1, '#2f8d52');
      g.fillStyle = lawn;
      g.fillRect(0, 0, w, h);
    }

    // Soft vignette for depth.
    const vig = g.createRadialGradient(
      w * 0.5,
      h * 0.35,
      Math.min(w, h) * 0.2,
      w * 0.5,
      h * 0.35,
      Math.max(w, h) * 0.85
    );
    vig.addColorStop(0, 'rgba(255,255,255,0)');
    vig.addColorStop(1, 'rgba(18,49,28,0.18)');
    g.fillStyle = vig;
    g.fillRect(0, 0, w, h);
  }

  bgCache = { w, h, stage, c };
}

function drawRoundedRect(g, x, y, w, h, r, fill, stroke){
  const rr = Math.min(r, w / 2, h / 2);
  g.beginPath();
  g.moveTo(x + rr, y);
  g.arcTo(x + w, y, x + w, y + h, rr);
  g.arcTo(x + w, y + h, x, y + h, rr);
  g.arcTo(x, y + h, x, y, rr);
  g.arcTo(x, y, x + w, y, rr);
  g.closePath();
  if (fill){
    g.fillStyle = fill;
    g.fill();
  }
  if (stroke){
    g.strokeStyle = stroke;
    g.lineWidth = Math.max(1, Math.round(2 * (window.devicePixelRatio || 1)));
    g.stroke();
  }
}

function drawBed(g, cx, cy, rx, ry){
  // Base greenery.
  g.fillStyle = 'rgba(30,115,63,0.28)';
  g.beginPath();
  g.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  g.fill();

  // Blush flowers.
  for (let i = 0; i < 85; i++){
    const t = Math.random() * Math.PI * 2;
    const rr = Math.sqrt(Math.random());
    const x = cx + Math.cos(t) * rx * rr;
    const y = cy + Math.sin(t) * ry * rr;
    const r = Math.random() * 2.6 + 1.2;
    g.fillStyle = Math.random() < 0.25 ? 'rgba(255,123,184,0.32)' : 'rgba(255,210,231,0.32)';
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
}

function drawFountain(g, cx, cy, r){
  g.fillStyle = 'rgba(233,238,241,0.24)';
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.fill();

  g.strokeStyle = 'rgba(255,255,255,0.30)';
  g.lineWidth = Math.max(1, Math.round(2 * (window.devicePixelRatio || 1)));
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.stroke();

  const water = g.createRadialGradient(cx - r * 0.25, cy - r * 0.25, r * 0.15, cx, cy, r);
  water.addColorStop(0, 'rgba(255,255,255,0.28)');
  water.addColorStop(0.35, 'rgba(103,199,255,0.24)');
  water.addColorStop(1, 'rgba(103,199,255,0.10)');
  g.fillStyle = water;
  g.beginPath();
  g.arc(cx, cy, r * 0.72, 0, Math.PI * 2);
  g.fill();
}

function clampBodyToArena(body){
  const w = canvas.width, h = canvas.height;
  const m = ARENA_MARGIN;
  const minX = m + body.r;
  const maxX = w - m - body.r;
  const minY = m + body.r;
  const maxY = h - m - body.r;
  body.x = clamp(body.x, minX, maxX);
  body.y = clamp(body.y, minY, maxY);
}

function syncWorldToCanvasSize(){
  world.w = canvas.width;
  world.h = canvas.height;
  buildObstacles();
  clampBodyToArena(ofer);
  clampBodyToArena(mushu);
  clampBodyToArena(tal);
  nudgeBodiesOutOfObstacles();
}

// =============================
// Touch input (drag to steer)
// =============================
const input = {
  active: false,
  id: null,
  x: 0,
  y: 0,
  prevX: 0,
  prevY: 0,
  dx: 0,
  dy: 0,
  justDown: false,
};

function canvasPointFromTouch(t){
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  return {
    x: (t.clientX - rect.left) * dpr,
    y: (t.clientY - rect.top) * dpr,
  };
}

function onTouchStart(e){
  if (state === GameState.IDLE) return; // ignore; UI handles start
  if (state === GameState.END) return;  // overlay handles restart
  if (!world.playEnabled) return;       // stage intro / between stages
  const t = e.changedTouches[0];
  input.active = true;
  input.id = t.identifier;
  const p = canvasPointFromTouch(t);
  input.x = input.prevX = p.x;
  input.y = input.prevY = p.y;
  input.dx = input.dy = 0;
  input.justDown = true;
}

function onTouchMove(e){
  if (!input.active) return;
  for (let i = 0; i < e.changedTouches.length; i++){
    const t = e.changedTouches[i];
    if (t.identifier !== input.id) continue;
    const p = canvasPointFromTouch(t);
    input.prevX = input.x; input.prevY = input.y;
    input.x = p.x; input.y = p.y;
    input.dx = input.x - input.prevX;
    input.dy = input.y - input.prevY;
    break;
  }
}

function onTouchEnd(e){
  if (!input.active) return;
  for (let i = 0; i < e.changedTouches.length; i++){
    if (e.changedTouches[i].identifier !== input.id) continue;
    input.active = false;
    input.id = null;
    input.dx = input.dy = 0;
    break;
  }
}

canvas.addEventListener('touchstart', onTouchStart, { passive: true });
canvas.addEventListener('touchmove', onTouchMove, { passive: true });
canvas.addEventListener('touchend', onTouchEnd, { passive: true });
canvas.addEventListener('touchcancel', onTouchEnd, { passive: true });

// =============================
// Web Audio (unlocked on user tap)
// =============================
let audio = null;
function makeAudio(){
  const AC = window.AudioContext || window.webkitAudioContext;
  const ac = new AC();

  const master = ac.createGain();
  master.gain.value = 0.22;
  master.connect(ac.destination);

  const noiseBuf = ac.createBuffer(1, ac.sampleRate * 0.25, ac.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < data.length; i++){
    // slightly crunchy noise (no external assets)
    data[i] = (Math.random() * 2 - 1) * (0.55 + 0.45 * Math.sin(i * 0.035));
  }

  function beep(freq, dur, type, gain){
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type || 'sine';
    o.frequency.value = freq;
    g.gain.value = 0.0001;
    o.connect(g);
    g.connect(master);
    const t0 = ac.currentTime;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain ?? 0.55, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  }

  function fizz(dur, gain){
    const src = ac.createBufferSource();
    src.buffer = noiseBuf;
    const g = ac.createGain();
    g.gain.value = 0.0001;
    src.connect(g);
    g.connect(master);
    const t0 = ac.currentTime;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain ?? 0.65, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.start(t0);
    src.stop(t0 + dur + 0.03);
  }

  return {
    ac,
    master,
    resume: async () => {
      if (ac.state !== 'running') await ac.resume();
    },
    sfx: {
      start: () => { beep(180, 0.12, 'square', 0.45); beep(420, 0.08, 'triangle', 0.4); },
      chaos: () => { beep(rand(260, 520), 0.09, 'sawtooth', 0.35); fizz(0.12, 0.22); },
      win: () => { beep(740, 0.10, 'triangle', 0.55); beep(980, 0.12, 'square', 0.5); fizz(0.18, 0.25); },
      fail: () => { beep(210, 0.18, 'sawtooth', 0.35); beep(140, 0.22, 'square', 0.28); },
      bonk: () => { beep(120, 0.05, 'square', 0.25); },
    },
  };
}

async function ensureAudioUnlocked(){
  if (!audio) audio = makeAudio();
  await audio.resume();
}

// =============================
// Game objects / simulation
// =============================
const world = {
  t: 0,
  lastT: 0,
  dt: 0,
  w: 0,
  h: 0,

  stageIndex: StageId.STAGE_1,
  params: null,
  playEnabled: false,

  timeLeft: DEFAULT_GAME_DURATION,
  chaosCountdown: 5,
  chaosActive: false,
  chaosName: 'רגוע(בערך)',
  chaosUntil: 0,
  instructionsUntil: 0,
  shakeUntil: 0,

  mushuBoost: 1,
  brideRage: false,
  fireTrailAcc: 0,

  caught: false,
  endReason: '',
};

const ofer = {
  x: 0, y: 0,
  vx: 0, vy: 0,
  r: 22,
  renderScale: 1.3,
  color: '#3cffb0',
  label: 'עופר 🤵',
};

const mushu = {
  x: 0, y: 0,
  vx: 0, vy: 0,
  r: 18,
  renderScale: 1.3,
  color: '#ff4fd8',
  label: 'מושו 🐶',
  hasRings: true,
  mood: 0,
  zigUntil: 0,
};

const tal = {
  x: 0, y: 0,
  vx: 0, vy: 0,
  r: 20,
  renderScale: 1.3,
  color: '#ffd36b',
  label: 'טל 👰',
  visible: true,
};

// =============================
// Obstacles (wedding props)
// =============================
const obstacles = [];

function buildObstacles(){
  obstacles.length = 0;
  const w = world.w || canvas.width;
  const h = world.h || canvas.height;
  if (!w || !h) return;

  const m = ARENA_MARGIN + 10;
  const left = m;
  const right = w - m;
  const top = m;
  const bottom = h - m;

  const stage = clamp(world.stageIndex ?? 0, 0, STAGES.length - 1);

  const tableR = clamp(Math.min(w, h) * 0.055, 34, 52);
  const chairR = clamp(tableR * 0.42, 14, 22);

  function addChuppah(nx, ny, nW, nH){
    const chW = clamp(w * nW, 170, 300);
    const chH = clamp(h * nH, 78, 138);
    const chX = clamp(w * nx - chW / 2, left, right - chW);
    const chY = clamp(top + h * ny, top, bottom - chH);
    obstacles.push({ kind: 'rect', type: 'chuppah', x: chX, y: chY, w: chW, h: chH, r: 16 });
    return { chH, chY };
  }

  function addTableWithChairs(x, y, chairCount){
    obstacles.push({ kind: 'circle', type: 'table', x, y, r: tableR });
    if (!chairCount || chairCount <= 0) return;
    const ring = tableR + chairR + 10;
    const angles = [];
    for (let i = 0; i < chairCount; i++){
      angles.push((i / chairCount) * Math.PI * 2);
    }
    for (const a of angles){
      const cx = x + Math.cos(a) * ring;
      const cy = y + Math.sin(a) * ring;
      if (cx < left + chairR || cx > right - chairR || cy < top + chairR || cy > bottom - chairR) continue;
      obstacles.push({ kind: 'circle', type: 'chair', x: cx, y: cy, r: chairR });
    }
  }

  function addFountain(nx, ny){
    const r = clamp(Math.min(w, h) * 0.065, 36, 62);
    const x = clamp(w * nx, left + r, right - r);
    const y = clamp(h * ny, top + r, bottom - r);
    obstacles.push({ kind: 'circle', type: 'fountain', x, y, r });
  }

  function addFlowerBed(nx, ny){
    const r = clamp(Math.min(w, h) * 0.055, 30, 54);
    const x = clamp(w * nx, left + r, right - r);
    const y = clamp(h * ny, top + r, bottom - r);
    obstacles.push({ kind: 'circle', type: 'bed', x, y, r });
  }

  function addTree(nx, ny, nr){
    // Stage 1 uses trees heavily; allow a bit larger max radius for clearer readability.
    const r = clamp(Math.min(w, h) * nr, 24, 60);
    const x = clamp(w * nx, left + r, right - r);
    const y = clamp(h * ny, top + r, bottom - r);
    obstacles.push({ kind: 'circle', type: 'tree', x, y, r });
  }

  function addBush(nx, ny, nr){
    const r = clamp(Math.min(w, h) * nr, 18, 36);
    const x = clamp(w * nx, left + r, right - r);
    const y = clamp(h * ny, top + r, bottom - r);
    obstacles.push({ kind: 'circle', type: 'bush', x, y, r });
  }

  function addFlowerPatch(nx, ny, nr){
    const r = clamp(Math.min(w, h) * nr, 14, 28);
    const x = clamp(w * nx, left + r, right - r);
    const y = clamp(h * ny, top + r, bottom - r);
    // Decorative only: drawn but NOT a collision obstacle.
    obstacles.push({ kind: 'circle', type: 'flowers', x, y, r, solid: false });
  }

  function addBuffet(nx, ny, nW, nH){
    const bw = clamp(w * nW, 160, 320);
    const bh = clamp(h * nH, 58, 110);
    const x = clamp(w * nx - bw / 2, left, right - bw);
    const y = clamp(h * ny, top, bottom - bh);
    obstacles.push({ kind: 'rect', type: 'buffet', x, y, w: bw, h: bh, r: 18 });
  }

  function addBar(nx, ny, nW, nH){
    // Wider/taller collision than before (hall bar should feel "solid").
    const bw = clamp(w * nW, 180, 520);
    const bh = clamp(h * nH, 62, 160);
    const x = clamp(w * nx - bw / 2, left, right - bw);
    const y = clamp(h * ny, top, bottom - bh);
    obstacles.push({ kind: 'rect', type: 'bar', x, y, w: bw, h: bh, r: 18 });
  }

  function addSpeaker(nx, ny, nW, nH){
    const sw = clamp(w * nW, 48, 86);
    const sh = clamp(h * nH, 86, 132);
    const x = clamp(w * nx - sw / 2, left, right - sw);
    const y = clamp(h * ny - sh / 2, top, bottom - sh);
    obstacles.push({ kind: 'rect', type: 'speaker', x, y, w: sw, h: sh, r: 16 });
  }

  function addPole(nx, ny){
    const r = clamp(Math.min(w, h) * 0.026, 12, 18);
    const x = clamp(w * nx, left + r, right - r);
    const y = clamp(h * ny, top + r, bottom - r);
    obstacles.push({ kind: 'circle', type: 'pole', x, y, r });
  }

  function addCarpet(nx, y, nW, nH){
    const cw = clamp(w * nW, 110, 200);
    const ch = clamp(h * nH, 220, h);
    const x = clamp(w * nx - cw / 2, left, right - cw);
    const yy = clamp(y, top, bottom - ch);
    obstacles.push({ kind: 'rect', type: 'carpet', x, y: yy, w: cw, h: ch, r: 18, solid: false });
    return { x, y: yy, w: cw, h: ch };
  }

  function addRect(type, nx, ny, nW, nH, { solid } = {}){
    const rw = clamp(w * nW, 120, 360);
    const rh = clamp(h * nH, 70, 320);
    const x = clamp(w * nx - rw / 2, left, right - rw);
    const y = clamp(h * ny - rh / 2, top, bottom - rh);
    obstacles.push({ kind: 'rect', type, x, y, w: rw, h: rh, r: 18, solid: solid !== false });
    return { x, y, w: rw, h: rh };
  }

  function addImgCircle(type, nx, ny, nr, { solid } = {}){
    const r = clamp(Math.min(w, h) * nr, 18, 68);
    const x = clamp(w * nx, left + r, right - r);
    const y = clamp(h * ny, top + r, bottom - r);
    obstacles.push({ kind: 'circle', type, x, y, r, solid: solid !== false });
    return { x, y, r };
  }

  // Stage-specific layouts (yard / hall / under the chuppah)
  if (stage === 0){
    // Yard: no chuppah, no bed. Add garden props.
    const yardTableR = clamp(tableR * 1.28, 42, 74);
    function addYardTable(nx, ny){
      const x = clamp(w * nx, left + yardTableR + 18, right - yardTableR - 18);
      const y = clamp(h * ny, top + 150, bottom - yardTableR - 28);
      obstacles.push({ kind: 'circle', type: 'table', x, y, r: yardTableR });
    }
    // Space out the tables (avoid overlaps with larger radius).
    addYardTable(0.18, 0.91);
    addYardTable(0.50, 0.81);
    addYardTable(0.82, 0.91);

    // Trees & bushes are solid (obstacles).
    // Stage 1 tweak: move trees slightly upward + make them larger.
    // Collision is a circle centered in the image, synced during render.
    function addYardTree(nx, ny, nCollisionR, nRenderScale, variant){
      const r = clamp(Math.min(w, h) * nCollisionR, 24, 60);
      const x = clamp(w * nx, left + r, right - r);
      const y = clamp(h * ny, top + r, bottom - r);
      const renderR = r * nRenderScale;
      const maxW = renderR * 4.40;
      const maxH = renderR * 6.35;
      const cx = clamp(x, left + maxW / 2, right - maxW / 2);
      const by = y + r; // bottom aligned to the collision bottom
      // Approx until assets are ready; render() will sync based on actual image rect.
      const xOff = (variant === 'palm') ? STAGE1_TREE_HITBOX.palmX : STAGE1_TREE_HITBOX.treeX;
      const colCx = cx + maxW * xOff;
      const colCy = (by - maxH) + maxH * STAGE1_TREE_HITBOX.cy;
      const colR = Math.min(maxW, maxH) * STAGE1_TREE_HITBOX.r;
      obstacles.push({
        kind: 'circle',
        type: 'tree',
        // Collision circle (center-ish)
        x: colCx,
        y: colCy,
        r: colR,
        // Draw config
        drawCx: cx,
        drawBy: by,
        drawMaxW: maxW,
        drawMaxH: maxH,
        variant,
      });
    }
    addYardTree(0.14, 0.22, 0.066, 1.35, 'tree');
    addYardTree(0.86, 0.22, 0.060, 1.35, 'tree');
    // Bottom two: move further upward.
    addYardTree(0.12, 0.66, 0.066, 1.35, 'palm');
    addYardTree(0.88, 0.64, 0.060, 1.35, 'palm');

    // Move bushes upward a bit.
    addBush(0.28, 0.30, 0.040);
    addBush(0.72, 0.28, 0.040);
    addBush(0.18, 0.44, 0.036);
    addBush(0.82, 0.42, 0.036);
  } else if (stage === 1){
    // Hall: clean top area; bar + speakers + dance floor are up top.
    addBar(0.50, 0.07, 0.62, 0.11);
    addSpeaker(0.10, 0.30, 0.16, 0.22);
    addSpeaker(0.90, 0.30, 0.16, 0.22);

    // Tables symmetric: two rows, left/right mirror (same y per row, same distance from center).
    const row1Y = clamp(h * 0.68, top + 190, bottom - tableR - 18);
    const row2Y = clamp(h * 0.84, top + 260, bottom - tableR - 18);
    addTableWithChairs(clamp(w * 0.22, left + tableR + 18, right - tableR - 18), row1Y, 6);
    addTableWithChairs(clamp(w * 0.78, left + tableR + 18, right - tableR - 18), row1Y, 6);
    addTableWithChairs(clamp(w * 0.26, left + tableR + 18, right - tableR - 18), row2Y, 5);
    addTableWithChairs(clamp(w * 0.74, left + tableR + 18, right - tableR - 18), row2Y, 5);
  } else {
    // Stage 3 (chuppah): hupa + fountains at top, carpet path (passable), everything else blocks.
    const S3 = 0.81; // global 19% scale for ALL stage-3 props (not characters)
    const hupaDraw = addRect('hupa', 0.50, 0.22, 0.44 * S3, 0.22 * S3);
    // Shrink collision a bit so it "feels" like the legs/area, not the whole transparent PNG.
    const ho = obstacles[obstacles.length - 1];
    ho.drawX = hupaDraw.x;
    ho.drawY = hupaDraw.y;
    ho.drawW = hupaDraw.w;
    ho.drawH = hupaDraw.h;
    ho.x += ho.w * 0.10;
    ho.w *= 0.80;
    ho.y += ho.h * 0.30;
    ho.h *= 0.66;
    // Chuppah is visual-only: pass-through.
    ho.solid = false;

    function tuneStage3CircleCollision(o, { mul, yShiftFrac }){
      // Keep drawing anchored to original position/size, but collision uses adjusted circle.
      o.drawX = o.x;
      o.drawY = o.y;
      o.drawR = o.r;
      o.r *= (mul ?? 1);
      if (yShiftFrac) o.y += o.r * yShiftFrac;
    }

    // Place fountains flanking the hupa.
    addImgCircle('fountain', 0.50 - 0.30, 0.25, 0.055 * S3);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.90, yShiftFrac: 0 });
    addImgCircle('fountain', 0.50 + 0.30, 0.25, 0.055 * S3);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.90, yShiftFrac: 0 });

    // Carpet continues down from the hupa area (PASSABLE).
    const hupaBottomY = (ho.drawY ?? ho.y) + (ho.drawH ?? ho.h);
    const carpetGap = 0; // carpet should be flush with the chuppah
    // Allow the carpet to start as high as needed; add a tiny overlap to avoid a visible seam.
    const seamFix = Math.max(1, Math.round((window.devicePixelRatio || 1) * 2));
    const carpetTop = clamp((hupaBottomY + carpetGap) - seamFix, top, bottom - 220);
    const carpet = addCarpet(0.50, carpetTop, 0.22 * S3, 0.78 * S3);

    // Big blockers on the sides to frame the carpet.
    addImgCircle('palmTree', 0.14, 0.14, 0.095 * S3);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.85, yShiftFrac: 0.00 });
    addImgCircle('palmTree', 0.86, 0.14, 0.095 * S3);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.85, yShiftFrac: 0.00 });

    // Pink trees: draw them slightly OUTSIDE the screen edges (visual), keep collision inside bounds.
    addImgCircle('pinkTree', 0.08, 0.60, 0.110 * S3);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.75, yShiftFrac: 0.00 });
    obstacles[obstacles.length - 1].drawX = w * -0.01;
    addImgCircle('pinkTree', 0.92, 0.58, 0.110 * S3);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.75, yShiftFrac: 0.00 });
    obstacles[obstacles.length - 1].drawX = w * 1.01;

    // Symmetric bushes along the carpet: two columns, white–pink–white.
    const colGap = clamp(Math.min(w, h) * 0.085, 34, 64);
    const colPad = 22;
    const leftColX = clamp(carpet.x - colGap, left + colPad, right - colPad);
    const rightColX = clamp(carpet.x + carpet.w + colGap, left + colPad, right - colPad);
    // Keep them closer together along the carpet.
    const y0 = carpet.y + carpet.h * 0.34;
    const y1 = carpet.y + carpet.h * 0.50;
    const y2 = carpet.y + carpet.h * 0.66;
    const rWhite = clamp(Math.min(w, h) * 0.050, 18, 40) * S3;
    const rPink = clamp(Math.min(w, h) * 0.055, 18, 42) * S3;
    for (const x of [leftColX, rightColX]){
      obstacles.push({ kind: 'circle', type: 'whiteFlowers', x, y: y0, r: rWhite });
      tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.25, yShiftFrac: 0.00 });
      obstacles.push({ kind: 'circle', type: 'bush', x, y: y1, r: rPink });
      tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.30, yShiftFrac: 0.00 });
      obstacles.push({ kind: 'circle', type: 'whiteFlowers', x, y: y2, r: rWhite });
      tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.25, yShiftFrac: 0.00 });
    }

    // Wooden stage + briks: bottom corners as solid scenery.
    addRect('woodStage', 0.22, 0.86, 0.30 * S3, 0.23 * S3);
    addImgCircle('briks', 0.82, 0.86, 0.120 * S3, { solid: false });
  }
}

function resolveCircleVsCircleObstacle(body, o){
  const rr = body.r + o.r;
  const d2 = dist2(body.x, body.y, o.x, o.y);
  if (d2 >= rr * rr) return false;

  const d = Math.sqrt(d2) || 0.0001;
  const nx = (body.x - o.x) / d;
  const ny = (body.y - o.y) / d;
  const overlap = rr - d;

  body.x += nx * overlap;
  body.y += ny * overlap;

  const vn = body.vx * nx + body.vy * ny;
  if (vn < 0){
    const restitution = 0.18;
    body.vx -= (1 + restitution) * vn * nx;
    body.vy -= (1 + restitution) * vn * ny;
  }

  return true;
}

function resolveCircleVsRectObstacle(body, o){
  const x1 = o.x;
  const y1 = o.y;
  const x2 = o.x + o.w;
  const y2 = o.y + o.h;

  const cx = clamp(body.x, x1, x2);
  const cy = clamp(body.y, y1, y2);

  let dx = body.x - cx;
  let dy = body.y - cy;
  let d2 = dx * dx + dy * dy;

  // Circle center inside rect: push out in one step (nearest side).
  if (d2 === 0){
    const distL = body.x - x1;
    const distR = x2 - body.x;
    const distT = body.y - y1;
    const distB = y2 - body.y;

    const pushL = body.r + distL;
    const pushR = body.r + distR;
    const pushT = body.r + distT;
    const pushB = body.r + distB;

    const minPush = Math.min(pushL, pushR, pushT, pushB);
    let nx = 0, ny = 0;
    if (minPush === pushL){ nx = -1; ny = 0; }
    else if (minPush === pushR){ nx = 1; ny = 0; }
    else if (minPush === pushT){ nx = 0; ny = -1; }
    else { nx = 0; ny = 1; }

    body.x += nx * minPush;
    body.y += ny * minPush;

    const vn = body.vx * nx + body.vy * ny;
    if (vn < 0){
      const restitution = 0.14;
      body.vx -= (1 + restitution) * vn * nx;
      body.vy -= (1 + restitution) * vn * ny;
    }

    return true;
  }

  if (d2 >= body.r * body.r) return false;

  const d = Math.sqrt(d2) || 0.0001;
  const nx = dx / d;
  const ny = dy / d;
  const overlap = body.r - d;

  body.x += nx * overlap;
  body.y += ny * overlap;

  const vn = body.vx * nx + body.vy * ny;
  if (vn < 0){
    const restitution = 0.14;
    body.vx -= (1 + restitution) * vn * nx;
    body.vy -= (1 + restitution) * vn * ny;
  }

  return true;
}

function resolveBodyVsObstacles(body){
  let hit = false;
  for (const o of obstacles){
    if (o.solid === false) continue;
    if (o.kind === 'circle') hit = resolveCircleVsCircleObstacle(body, o) || hit;
    else hit = resolveCircleVsRectObstacle(body, o) || hit;
  }
  return hit;
}

function nudgeBodiesOutOfObstacles(){
  // A few iterations to prevent spawning inside props on resize.
  for (let i = 0; i < 6; i++){
    let any = false;
    any = resolveBodyVsObstacles(ofer) || any;
    any = resolveBodyVsObstacles(mushu) || any;
    any = (tal.visible && resolveBodyVsObstacles(tal)) || any;
    if (!any) break;
  }
}

const particles = [];
function spawnConfetti(n, x, y, strength){
  for (let i = 0; i < n; i++){
    particles.push({
      x, y,
      vx: rand(-1, 1) * strength * rand(0.4, 1.2),
      vy: rand(-1.2, 0.2) * strength * rand(0.4, 1.2),
      life: rand(0.5, 1.1),
      maxLife: 0,
      hue: randInt(0, 360),
      size: rand(2, 5),
      spin: rand(-10, 10),
    });
    particles[particles.length - 1].maxLife = particles[particles.length - 1].life;
  }
}

function spawnFire(x, y, dirX, dirY, baseSpeed){
  // Fire particle used for Mushu turbo trail.
  const sp = baseSpeed ?? rand(40, 140);
  const px = -dirY, py = dirX; // perpendicular jitter
  const life = rand(0.16, 0.32);
  particles.push({
    type: 'fire',
    x: x + rand(-2, 2),
    y: y + rand(-2, 2),
    vx: (dirX * sp + px * rand(-45, 45)) * rand(0.7, 1.15),
    vy: (dirY * sp + py * rand(-45, 45) - rand(15, 55)) * rand(0.7, 1.15),
    life,
    maxLife: life,
    hue: randInt(18, 55), // orange→yellow
    size: rand(5, 11),
    spin: rand(-6, 6),
  });
}

function resetGameToPlaying(stageIndex){
  world.stageIndex = clamp(stageIndex ?? world.stageIndex ?? 0, 0, STAGES.length - 1);
  resetScoreFromStage(world.stageIndex);
  const cfg = getStageCfg(world.stageIndex);
  applyStageParams(cfg);
  resizeCanvas();
  syncWorldToCanvasSize();
  const w = world.w, h = world.h;
  world.t = nowSec();
  world.lastT = world.t;
  world.dt = 0;
  world.timeLeft = world.params?.durationSec ?? (cfg.durationSec ?? DEFAULT_GAME_DURATION);
  world.chaosCountdown = world.params?.chaosIntervalSec ?? 5;
  world.chaosActive = false;
  world.chaosName = 'רגוע(בערך)';
  world.chaosUntil = 0;
  world.instructionsUntil = world.t + (world.stageIndex === 0 ? 6 : 4);
  world.shakeUntil = 0;
  world.mushuBoost = 1;
  world.brideRage = false;
  world.fireTrailAcc = 0;
  world.caught = false;
  world.endReason = '';

  // Start positions (portrait-ish)
  // Keep initial action closer to screen center (less "spawn at bottom / ceiling").
  if (world.stageIndex === 0){
    ofer.x = w * 0.48; ofer.y = h * 0.74;
  } else if (world.stageIndex === 1){
    ofer.x = w * 0.50; ofer.y = h * 0.70;
  } else {
    ofer.x = w * 0.62; ofer.y = h * 0.76;
  }
  ofer.vx = 0; ofer.vy = 0;

  if (world.stageIndex === 0){
    mushu.x = w * 0.52; mushu.y = h * 0.44;
  } else if (world.stageIndex === 1){
    mushu.x = w * 0.50; mushu.y = h * 0.40;
  } else {
    mushu.x = w * 0.34; mushu.y = h * 0.36;
  }
  mushu.vx = rand(-120, 120); mushu.vy = rand(-60, 60);
  mushu.hasRings = true;
  mushu.mood = rand(0, 1000);
  mushu.zigUntil = 0;

  // Stage 1 should be Tal-free (no visual, no collisions).
  tal.visible = (world.stageIndex !== 0);
  if (world.stageIndex === 0){
    tal.x = w * 0.14; tal.y = h * 0.20;
  } else if (world.stageIndex === 1){
    tal.x = w * 0.16; tal.y = h * 0.18;
  } else {
    tal.x = w * 0.84; tal.y = h * 0.22;
  }
  tal.vx = 110; tal.vy = 30;

  // Ensure spawns are always inside the playable arena (important after mobile viewport resizes).
  clampBodyToArena(ofer);
  clampBodyToArena(mushu);
  clampBodyToArena(tal);
  nudgeBodiesOutOfObstacles();

  particles.length = 0;

  input.active = false;
  input.id = null;
  input.dx = input.dy = 0;
  input.justDown = false;

  state = GameState.PLAYING;
  setHidden(endUI, true);
  setHidden(startUI, true);
  setHidden(stageUI, true);
}

function enterEnd(reason){
  state = GameState.END;
  world.playEnabled = false;
  world.endReason = reason;
  setHidden(endUI, false);
  setHidden(startUI, true);
  setHidden(stageUI, true);
  if (instructionsEl) instructionsEl.style.opacity = '0';
  // Keep the last frame behind the overlay (no more simulation needed).
  // We still render one more time for "freeze-frame drama".
  render();
}

// =============================
// Chaos system (MANDATORY)
// Every 5 seconds, pick 1 event for ~4 seconds.
// =============================
const ChaosEvent = Object.freeze({
  MUSHU_BOOST: 'מושו: בוסט מהירות',
  SCREEN_SHAKE: 'רעידת מסך',
  BRIDE_RAGE: 'מצב: טל עצבנית',
});

function chaosBannerText(name){
  // Keep it short; shown at top-of-screen only while chaos is active.
  if (name === ChaosEvent.BRIDE_RAGE) return 'הכלה זועמת!';
  if (name === ChaosEvent.MUSHU_BOOST) return 'מושו בטורבו!';
  if (name === ChaosEvent.SCREEN_SHAKE) return 'רעידת באס!';
  return String(name || '');
}

// Bias: more goofy camera + controls.
const DEFAULT_CHAOS_WEIGHTS = [
  [ChaosEvent.MUSHU_BOOST, 1.1],
  [ChaosEvent.SCREEN_SHAKE, 1.25],
  [ChaosEvent.BRIDE_RAGE, 1.15],
];

// Fill stage weights now that ChaosEvent exists.
// Stage 1 (yard): no chaos at all.
STAGES[0].chaosWeights = [];
STAGES[1].chaosWeights = [
  [ChaosEvent.SCREEN_SHAKE, 1.0],
  [ChaosEvent.BRIDE_RAGE, 1.05],
];
STAGES[2].chaosWeights = [
  [ChaosEvent.MUSHU_BOOST, 1.35],
  [ChaosEvent.BRIDE_RAGE, 1.25],
];

function pickWeighted(weights){
  let total = 0;
  for (const [, w] of weights) total += w;
  let r = Math.random() * total;
  for (const [v, w] of weights){
    r -= w;
    if (r <= 0) return v;
  }
  return weights[weights.length - 1][0];
}

function clearChaosEffects(){
  world.chaosActive = false;
  world.chaosName = 'רגוע(בערך)';
  world.mushuBoost = 1;
  world.brideRage = false;
  world.shakeUntil = 0;
}

function startChaosEvent(name){
  const t = world.t;
  const p = world.params || {};
  const durBase = rand(p.chaosEventMinMs ?? DEFAULT_CHAOS_EVENT_MIN_MS, p.chaosEventMaxMs ?? DEFAULT_CHAOS_EVENT_MAX_MS) / 1000;
  const dur = (name === ChaosEvent.BRIDE_RAGE) ? (durBase * (p.brideRageDurFactor ?? 1.0)) : durBase;
  world.chaosActive = true;
  world.chaosName = name;
  world.chaosUntil = t + dur;

  // Reset all chaos effects, then apply exactly one.
  clearChaosEffects();
  world.chaosActive = true;
  world.chaosName = name;
  world.chaosUntil = t + dur;

  switch (name){
    case ChaosEvent.MUSHU_BOOST:
      {
        const r0 = (p.mushuBoostRange?.[0] ?? 1.6);
        const r1 = (p.mushuBoostRange?.[1] ?? 2.3);
        world.mushuBoost = rand(Math.min(r0, r1), Math.max(r0, r1));
      }
      mushu.vx *= rand(1.05, 1.25);
      mushu.vy *= rand(1.05, 1.25);
      break;
    case ChaosEvent.SCREEN_SHAKE:
      world.shakeUntil = t + dur;
      break;
    case ChaosEvent.BRIDE_RAGE:
      if (p.brideRageEnabled){
        world.brideRage = true;
      } else {
        // If bride rage is disabled for this stage, fall back to a harmless shake.
        world.shakeUntil = t + dur * 0.7;
      }
      // Tal becomes the rule engine: she injects wind + random bonks.
      tal.vx *= 1.25;
      tal.vy *= 1.1;
      break;
  }

  if (audio) audio.sfx.chaos();

  // During chaos: show only the chaos banner (no extra quip text).
  setQuip('');
}

function updateChaos(dt){
  if (world.chaosActive && world.t >= world.chaosUntil){
    clearChaosEffects();
  }

  world.chaosCountdown -= dt;
  if (world.chaosCountdown <= 0){
    const p = world.params || {};
    world.chaosCountdown = p.chaosIntervalSec ?? 5;
    const weights = p.chaosWeights || DEFAULT_CHAOS_WEIGHTS;
    if (weights.length === 0) return; // Stage 1: no chaos
    const ev = pickWeighted(weights);
    startChaosEvent(ev);
  }
}

// =============================
// Simulation
// =============================
function boundsBounce(body, gainy){
  // "Intentionally slightly wrong": bounciness varies and sometimes gains energy.
  const w = world.w, h = world.h;
  const m = ARENA_MARGIN;
  const minX = m + body.r;
  const maxX = w - m - body.r;
  const minY = m + body.r;
  const maxY = h - m - body.r;

  const bounce = gainy ? rand(0.92, 1.12) : rand(0.86, 1.06);
  const squish = rand(0.985, 1.015);

  if (body.x < minX){ body.x = minX; body.vx = Math.abs(body.vx) * bounce; body.vy *= squish; }
  if (body.x > maxX){ body.x = maxX; body.vx = -Math.abs(body.vx) * bounce; body.vy *= squish; }
  if (body.y < minY){ body.y = minY; body.vy = Math.abs(body.vy) * bounce; body.vx *= squish; }
  if (body.y > maxY){ body.y = maxY; body.vy = -Math.abs(body.vy) * bounce; body.vx *= squish; }
}

function applyDrag(body, dt, base){
  // Slightly wrong friction (dt^ish), for chaotic feel.
  const b = base ?? 0.92;
  const f = Math.pow(b, dt * 60);
  body.vx *= f;
  body.vy *= f;
}

function steerOfer(dt){
  if (!input.active) return;
  // Drag steering: Ofer follows your finger like a magnet on a skateboard.
  const tx = input.x;
  const ty = input.y;
  const dx = (tx - ofer.x);
  const dy = (ty - ofer.y);

  // Spring acceleration + a little "finger impulse" from drag delta.
  const ax = (dx * 5.5 + input.dx * 18);
  const ay = (dy * 5.5 + input.dy * 18);

  const accel = (world.params?.playerSpeed ?? 2400);
  ofer.vx += clamp(ax, -accel, accel) * dt;
  ofer.vy += clamp(ay, -accel, accel) * dt;
}

function updateMushuAI(dt){
  // Mushu: tries to flee Ofer, but occasionally does a dumb zig-zag.
  mushu.mood += dt;
  const t = world.t;

  // Zig windows
  if (t > mushu.zigUntil && Math.random() < 0.012){
    mushu.zigUntil = t + rand(0.35, 0.85);
  }

  const flee = 1;
  const avoidTal = world.brideRage ? 1.6 : 0.6;

  // Desired direction away from Ofer
  let vx = mushu.x - ofer.x;
  let vy = mushu.y - ofer.y;
  const mag = Math.hypot(vx, vy) || 1;
  vx /= mag; vy /= mag;

  // Add random zig
  if (t < mushu.zigUntil){
    const zig = Math.sin((t * 13.0) + mushu.mood * 5) * 0.9;
    const zag = Math.cos((t * 9.0) + mushu.mood * 3) * 0.6;
    vx = vx * 0.5 + zig;
    vy = vy * 0.5 + zag;
  }

  // Avoid Tal during Bride Rage
  if (world.brideRage){
    let tx = mushu.x - tal.x;
    let ty = mushu.y - tal.y;
    const tm = Math.hypot(tx, ty) || 1;
    tx /= tm; ty /= tm;
    vx = vx * flee + tx * avoidTal;
    vy = vy * flee + ty * avoidTal;
  }

  // Normalize
  const m2 = Math.hypot(vx, vy) || 1;
  vx /= m2; vy /= m2;

  // Tiny continuous wobble so movement feels "alive" even without zig.
  const wob = Math.sin((t * 6.2) + mushu.mood * 2.7) * 0.22;
  const wob2 = Math.cos((t * 5.1) + mushu.mood * 2.1) * 0.18;
  vx += wob; vy += wob2;

  // Re-normalize after wobble.
  const m3 = Math.hypot(vx, vy) || 1;
  vx /= m3; vy /= m3;

  // Soft bias away from the very top of the arena so Mushu doesn't "live" up there.
  // (This keeps gameplay visually centered without making him easier to catch.)
  if (mushu.y < world.h * 0.26){
    const push = clamp((world.h * 0.26 - mushu.y) / (world.h * 0.26), 0, 1);
    vy = vy * 0.7 + 0.9 * push;
  }

  // Base speed + chaos boost
  const base = (world.params?.mushuBaseSpeed ?? DEFAULT_MUSHU_BASE_SPEED);
  const speed = (base + 110 * Math.sin(mushu.mood * 2.1)) * world.mushuBoost;
  // Intentionally "wrong": dt scaling is slightly off for comedic slipperiness.
  mushu.vx += vx * speed * dt * rand(0.92, 1.08);
  mushu.vy += vy * speed * dt * rand(0.92, 1.08);

  // If he ever slows down too much, give him a small kick.
  const v = Math.hypot(mushu.vx, mushu.vy);
  if (v < 120){
    const a = rand(0, Math.PI * 2);
    mushu.vx += Math.cos(a) * 110;
    mushu.vy += Math.sin(a) * 110;
  }
}

function updateTal(dt){
  if (!tal.visible) return;

  // Tal floats around and causes chaos events indirectly by bonking physics in Bride Rage.
  const w = world.w, h = world.h;
  const t = world.t;

  // Grow a bit during Bride Rage so she can actually block the path.
  const rage = world.params?.talRage;
  const targetR = world.brideRage ? (rage?.targetR ?? 30) : 20;
  tal.r = lerp(tal.r, targetR, clamp(dt * 10, 0, 1));
  clampBodyToArena(tal);

  // Gentle drift
  tal.vx += Math.sin(t * 0.9) * 20 * dt;
  tal.vy += Math.cos(t * 0.7) * 18 * dt;

  if (world.brideRage){
    // She becomes laser-focused on "NO ONE RUNS AT MY WEDDING":
    // stay BETWEEN Ofer and Mushu (on their line), acting as a blocker.
    let dx = mushu.x - ofer.x;
    let dy = mushu.y - ofer.y;
    const d = Math.hypot(dx, dy) || 1;
    dx /= d; dy /= d;
    const px = -dy, py = dx; // perpendicular

    // Desired point along the segment Ofer→Mushu (very close to Ofer to physically block him).
    const minAlong = ofer.r + tal.r + 12;
    const maxAlong = d - (mushu.r + tal.r + 12);
    const frac = clamp(rage?.blockAlongFrac ?? 0.12, 0, 1);
    const desiredAlong = minAlong + (Math.max(minAlong, maxAlong) - minAlong) * frac;

    // Express Tal position in (along, side) relative to Ofer→Mushu line.
    const rx = tal.x - ofer.x;
    const ry = tal.y - ofer.y;
    const along = rx * dx + ry * dy;
    const side = rx * px + ry * py;

    // Strongly correct both along + side errors so Tal sticks "between" them.
    const errAlong = desiredAlong - along;
    const errSide = -side;
    const alongK = rage?.alongK ?? 7.0;
    const sideK = rage?.sideK ?? 12.0;
    const maxA = rage?.maxAccel ?? 1800;
    const ax = (dx * errAlong * alongK) + (px * errSide * sideK);
    const ay = (dy * errAlong * alongK) + (py * errSide * sideK);
    tal.vx += clamp(ax, -maxA, maxA) * dt;
    tal.vy += clamp(ay, -maxA, maxA) * dt;

    // Wind field (slightly wrong): pushes everyone sideways.
    const windBase = rage?.wind ?? 280;
    const wind = Math.sin(t * 9.5) * windBase;
    ofer.vx += wind * dt * 0.15;
    mushu.vx += wind * dt * 0.22;
  }

  tal.x += tal.vx * dt;
  tal.y += tal.vy * dt;
  applyDrag(tal, dt, world.brideRage ? 0.965 : 0.94);
  boundsBounce(tal, true);
}

function resolveSoftCollision(a, b){
  const rr = a.r + b.r;
  const d2 = dist2(a.x, a.y, b.x, b.y);
  if (d2 >= rr * rr) return false;
  const d = Math.sqrt(d2) || 0.0001;
  const nx = (a.x - b.x) / d;
  const ny = (a.y - b.y) / d;
  const overlap = rr - d;

  // Push apart (intentionally uneven)
  a.x += nx * overlap * 0.62;
  a.y += ny * overlap * 0.62;
  b.x -= nx * overlap * 0.38;
  b.y -= ny * overlap * 0.38;

  // Velocity kick
  a.vx += nx * 70;
  a.vy += ny * 70;
  b.vx -= nx * 55;
  b.vy -= ny * 55;
  return true;
}

function updateParticles(dt){
  for (let i = particles.length - 1; i >= 0; i--){
    const p = particles[i];
    p.life -= dt;
    if (p.life <= 0){ particles.splice(i, 1); continue; }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    const damp = (p.type === 'fire') ? 0.86 : 0.92;
    p.vx *= Math.pow(damp, dt * 60);
    p.vy *= Math.pow(damp, dt * 60);
  }
}

function update(dt){
  // Update timer
  world.timeLeft -= dt;
  if (world.timeLeft <= 0){
    world.timeLeft = 0;
    if (audio) audio.sfx.fail();
    spawnConfetti(40, mushu.x, mushu.y, 220);
    enterEnd('TIME');
    return;
  }

  // Chaos timers (non-blocking)
  updateChaos(dt);

  // Ofer controls
  steerOfer(dt);

  // AI + Tal
  updateMushuAI(dt);
  updateTal(dt);

  // Integrate
  ofer.x += ofer.vx * dt;
  ofer.y += ofer.vy * dt;
  mushu.x += mushu.vx * dt;
  mushu.y += mushu.vy * dt;

  // Drag + bounce
  applyDrag(ofer, dt, 0.92);
  const isMushuTurbo = world.chaosActive && world.chaosName === ChaosEvent.MUSHU_BOOST;
  // Turbo should *feel* faster: keep more momentum (less damping).
  applyDrag(mushu, dt, isMushuTurbo ? 0.975 : 0.955);
  boundsBounce(ofer, true);
  boundsBounce(mushu, false);

  // Mushu turbo fire trail (visual only)
  if (isMushuTurbo){
    world.fireTrailAcc += dt * 110; // particles/sec
    const v = Math.hypot(mushu.vx, mushu.vy);
    const inv = 1 / (v || 1);
    const dirX = -(mushu.vx * inv);
    const dirY = -(mushu.vy * inv);
    const tailX = mushu.x + dirX * (mushu.r * 0.65);
    const tailY = mushu.y + dirY * (mushu.r * 0.65);
    while (world.fireTrailAcc >= 1){
      world.fireTrailAcc -= 1;
      spawnFire(tailX, tailY, dirX, dirY, rand(60, 170) + v * 0.08);
    }
  } else {
    world.fireTrailAcc = 0;
  }

  // Tal bonks (especially in rage)
  if (tal.visible){
    const bonked1 = resolveSoftCollision(ofer, tal);
    const bonked2 = resolveSoftCollision(mushu, tal);
    if ((bonked1 || bonked2) && audio) audio.sfx.bonk();
  }

  // Wedding props collisions (tables/chairs/chuppah): nobody passes through.
  resolveBodyVsObstacles(ofer);
  resolveBodyVsObstacles(mushu);
  if (tal.visible) resolveBodyVsObstacles(tal);

  // Catch check
  const rr = ofer.r + mushu.r;
  if (dist2(ofer.x, ofer.y, mushu.x, mushu.y) <= rr * rr){
    world.caught = true;
    mushu.hasRings = false;
    if (audio) audio.sfx.win();
    const pts = awardCatchScore(world.stageIndex);

    // Exaggerated win animation: confetti + overpowered bounce.
    spawnConfetti(90, mushu.x, mushu.y, 520);
    ofer.vx *= -1.2; ofer.vy = -Math.abs(ofer.vy) * 1.35;
    mushu.vx *= 0.15; mushu.vy *= 0.15;

    // Stage progression: stage 1/2 auto-advance, stage 3 ends run.
    if (world.stageIndex < STAGES.length - 1){
      // Freeze moment, then start next stage (no overlay / countdown).
      world.playEnabled = false;
      pendingStageIndex = world.stageIndex + 1;
      stageStartAt = world.t + 0.7;
      countdownFromAt = 0;
      hideStageOverlay();
      setQuip(`תפיסה הירואית (+${pts} נק׳). מושו: \"זה היה חימום\".`, 1900);
    } else {
      enterEnd('ALL_CLEAR');
    }
    return;
  }

  updateParticles(dt);
}

// =============================
// Render
// =============================
function drawLabel(text, x, y){
  ctx.font = '800 15px ui-rounded, system-ui, -apple-system, Segoe UI, Roboto, Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';

  const padX = 10, padY = 6;
  const w = ctx.measureText(text).width + padX * 2;
  const h = 24;
  const rx = x - w / 2;
  const ry = y - h - 6;

  ctx.fillStyle = 'rgba(255,250,243,.70)';
  roundRect(rx, ry, w, h, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(18,49,28,.14)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = 'rgba(18,49,28,.92)';
  ctx.fillText(text, x, y - 8);
}

function roundRect(x, y, w, h, r){
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function render(){
  const w = canvas.width, h = canvas.height;
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Screen shake chaos
  if (world.shakeUntil > world.t){
    const intensity = (world.params?.shakeIntensity ?? 1.0);
    const s = rand(0.8, 1.6) * intensity * (window.devicePixelRatio || 1);
    ctx.translate(rand(-1, 1) * s * 6, rand(-1, 1) * s * 6);
  }

  // Background (changes per stage: yard / hall / chuppah).
  if (!bgCache || bgCache.w !== w || bgCache.h !== h || bgCache.stage !== (world.stageIndex ?? 0)) buildBackgroundCache();
  if (bgCache) ctx.drawImage(bgCache.c, 0, 0);
  else {
    ctx.fillStyle = '#7bd77f';
    ctx.fillRect(0, 0, w, h);
  }

  // Wedding props (obstacles)
  if (!obstacles.length) buildObstacles();
  const stageIndex = (world.stageIndex ?? 0);
  for (let i = 0; i < obstacles.length; i++){
    const o = obstacles[i];
    // Stage 1 (yard): swap props to provided webp assets.
    if (stageIndex === 0){
      if (o.type === 'table'){
        // Slightly larger than collision radius for readability.
        if (drawImgContain(ctx, tableOutsideImg, o.x, o.y, o.r * 3.35, o.r * 3.35, 'center')) continue;
      } else if (o.type === 'bush'){
        // Slightly bottom-anchored so it "sits" on the lawn.
        if (drawImgContain(ctx, pinkBushImg, o.x, o.y + o.r * 1.05, o.r * 2.65, o.r * 2.35, 'bottom')) continue;
      } else if (o.type === 'tree'){
        const img = (o.variant === 'palm') ? palmTreeImg : treeImg;
        const cx = o.drawCx ?? o.cx ?? (o.x + o.w / 2);
        const by = o.drawBy ?? o.by ?? (o.y + o.h);
        const maxW = o.drawMaxW ?? o.maxW ?? (o.w || 0);
        const maxH = o.drawMaxH ?? o.maxH ?? (o.h || 0);
        if (isImgReady(img)){
          const d = imgContainDims(img, cx, by, maxW, maxH, 'bottom');
          ctx.drawImage(img, d.x, d.y, d.w, d.h);
          // Sync collision circle to the (tunable) center of the drawn image.
          const xOff = (o.variant === 'palm') ? STAGE1_TREE_HITBOX.palmX : STAGE1_TREE_HITBOX.treeX;
          const colCx = (d.x + d.w * 0.5) + d.w * xOff;
          const colCy = d.y + d.h * STAGE1_TREE_HITBOX.cy;
          const colR = Math.min(d.w, d.h) * STAGE1_TREE_HITBOX.r;
          o.kind = 'circle';
          o.x = colCx;
          o.y = colCy;
          o.r = colR;
          continue;
        }
        // Fallback: draw with the approximate max rect.
        if (drawImgContain(ctx, img, cx, by, maxW, maxH, 'bottom')) continue;
      }
    }

    // Stage 2 (hall): bar, indoor tables, left/right speakers from assets.
    if (stageIndex === 1){
      if (o.type === 'table'){
        drawImgContain(ctx, indoorTableImg, o.x, o.y, o.r * 4.4, o.r * 4.4, 'center');
        continue;
      } else if (o.type === 'bar'){
        const cx = o.x + o.w / 2;
        const cy = o.y + o.h / 2;
        if (drawImgContain(ctx, barImg, cx, cy, o.w * 3.3, o.h * 3.3, 'center')) continue;
      } else if (o.type === 'speaker'){
        const isLeft = o.x < w / 2;
        const img = isLeft ? leftSpeakerImg : rightSpeakerImg;
        const cx = o.x + o.w / 2;
        const cy = o.y + o.h / 2;
        if (drawImgContain(ctx, img, cx, cy, o.w * 1.5, o.h * 1.5, 'center')) continue;
      }
    }

    // Stage 3 (chuppah): render prop images. (Only the carpet is passable; everything else is solid.)
    if (stageIndex === 2){
      if (o.type === 'carpet'){
        // Draw as a tall strip, centered in its rect.
        const cx = o.x + o.w / 2;
        const cy = o.y + o.h / 2;
        ctx.save();
        ctx.globalAlpha = 0.92;
        // Draw exactly to the rect to keep it flush to the chuppah.
        if (drawImgContain(ctx, whiteCarpetImg, cx, cy, o.w, o.h, 'center')){ ctx.restore(); continue; }
        ctx.restore();
      } else if (o.type === 'hupa'){
        const dx = (o.drawX ?? o.x);
        const dy = (o.drawY ?? o.y);
        const dw = (o.drawW ?? o.w);
        const dh = (o.drawH ?? o.h);
        const cx = dx + dw / 2;
        const by = dy + dh;
        if (drawImgContain(ctx, hupaImg, cx, by, dw * 1.25, dh * 1.25, 'bottom')) continue;
      } else if (o.type === 'fountain'){
        const dx = (o.drawX ?? o.x);
        const dy = (o.drawY ?? o.y);
        const dr = (o.drawR ?? o.r);
        if (drawImgContain(ctx, fountainImg, dx, dy, dr * 4.2, dr * 4.2, 'center')) continue;
      } else if (o.type === 'whiteTree'){
        const dx = (o.drawX ?? o.x);
        const dy = (o.drawY ?? o.y);
        const dr = (o.drawR ?? o.r);
        if (drawImgContain(ctx, whiteTreeImg, dx, dy, dr * 5.0, dr * 6.3, 'center')) continue;
      } else if (o.type === 'palmTree'){
        const dx = (o.drawX ?? o.x);
        const dy = (o.drawY ?? o.y);
        const dr = (o.drawR ?? o.r);
        if (drawImgContain(ctx, palmTreeImg, dx, dy, dr * 5.2, dr * 6.8, 'center')) continue;
      } else if (o.type === 'pinkTree'){
        const dx = (o.drawX ?? o.x);
        const dy = (o.drawY ?? o.y);
        const dr = (o.drawR ?? o.r);
        if (drawImgContain(ctx, pinkTreeImg, dx, dy, dr * 5.2, dr * 6.6, 'center')) continue;
      } else if (o.type === 'bush'){
        const dx = (o.drawX ?? o.x);
        const dy = (o.drawY ?? o.y);
        const dr = (o.drawR ?? o.r);
        if (drawImgContain(ctx, pinkBushImg, dx, dy, dr * 2.8, dr * 2.55, 'center')) continue;
      } else if (o.type === 'whiteFlowers'){
        const dx = (o.drawX ?? o.x);
        const dy = (o.drawY ?? o.y);
        const dr = (o.drawR ?? o.r);
        if (drawImgContain(ctx, whiteFlowersImg, dx, dy, dr * 3.4, dr * 2.9, 'center')) continue;
      } else if (o.type === 'woodStage'){
        const cx = o.x + o.w / 2;
        const cy = o.y + o.h / 2;
        if (drawImgContain(ctx, woodStageImg, cx, cy, o.w * 1.35, o.h * 1.35, 'center')) continue;
      } else if (o.type === 'briks'){
        if (drawImgContain(ctx, briksImg, o.x, o.y, o.r * 4.0, o.r * 4.0, 'center')) continue;
      }
    }

    if (o.type === 'table'){
      if (stageIndex === 1) continue;
      // Table cloth
      ctx.fillStyle = 'rgba(255,250,243,.86)';
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();

      // Rim
      ctx.strokeStyle = 'rgba(18,49,28,.16)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.stroke();

      // "Flower ring" decoration (disabled in stage 1 / yard).
      if ((world.stageIndex ?? 0) !== 0){
        ctx.strokeStyle = 'rgba(255,123,184,.26)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r * 0.72, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else if (o.type === 'chair'){
      if (stageIndex === 1) continue;
      // Simple chair blob
      ctx.fillStyle = 'rgba(233,238,241,.78)';
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(18,49,28,.12)';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (o.type === 'tree'){
      // Tree: trunk + canopy
      const trunkW = Math.max(6, o.r * 0.35);
      const trunkH = Math.max(14, o.r * 0.70);
      ctx.fillStyle = 'rgba(92,56,28,.60)';
      drawRoundedRect(ctx, o.x - trunkW / 2, o.y + o.r * 0.10, trunkW, trunkH, 6, 'rgba(92,56,28,.62)', 'rgba(18,49,28,.10)');

      const canopy = ctx.createRadialGradient(o.x - o.r * 0.25, o.y - o.r * 0.25, 2, o.x, o.y, o.r * 1.25);
      canopy.addColorStop(0, 'rgba(255,255,255,.10)');
      canopy.addColorStop(0.25, 'rgba(63,168,95,.62)');
      canopy.addColorStop(1, 'rgba(18,49,28,.26)');
      ctx.fillStyle = canopy;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.14)';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (o.type === 'bush'){
      // Bush: soft blob
      const g = ctx.createRadialGradient(o.x - o.r * 0.25, o.y - o.r * 0.35, 2, o.x, o.y, o.r * 1.25);
      g.addColorStop(0, 'rgba(255,255,255,.10)');
      g.addColorStop(0.30, 'rgba(36,150,82,.54)');
      g.addColorStop(1, 'rgba(18,49,28,.22)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(18,49,28,.12)';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (o.type === 'flowers'){
      // Decorative flowers patch (non-solid).
      const rx = o.r * 1.15;
      const ry = o.r * 0.85;
      ctx.fillStyle = 'rgba(30,115,63,0.18)';
      ctx.beginPath();
      ctx.ellipse(o.x, o.y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();

      const n = 40;
      for (let i = 0; i < n; i++){
        const t = Math.random() * Math.PI * 2;
        const rr = Math.sqrt(Math.random());
        const x = o.x + Math.cos(t) * rx * rr;
        const y = o.y + Math.sin(t) * ry * rr;
        const r = Math.random() * 2.2 + 1.0;
        ctx.fillStyle = Math.random() < 0.22 ? 'rgba(255,123,184,0.36)' : 'rgba(255,210,231,0.34)';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (o.type === 'fountain'){
      drawFountain(ctx, o.x, o.y, o.r);
    } else if (o.type === 'bed'){
      // Flower bed (drawn as ellipse but collides as circle).
      drawBed(ctx, o.x, o.y, o.r * 1.35, o.r * 0.85);
    } else if (o.type === 'pole'){
      // Chuppah pole
      ctx.fillStyle = 'rgba(18,49,28,.24)';
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.20)';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (o.type === 'buffet'){
      // Buffet table (hall)
      drawRoundedRect(ctx, o.x, o.y, o.w, o.h, o.r, 'rgba(255,250,243,.80)', 'rgba(18,49,28,.14)');
      ctx.fillStyle = 'rgba(103,199,255,.10)';
      ctx.fillRect(o.x + 10, o.y + 10, o.w - 20, Math.max(10, o.h * 0.22));
      // Plates
      ctx.fillStyle = 'rgba(233,238,241,.65)';
      const n = 7;
      for (let i = 0; i < n; i++){
        const px = o.x + (o.w * (0.12 + i * (0.76 / (n - 1))));
        const py = o.y + o.h * 0.66 + Math.sin(i * 1.3) * 2;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (o.type === 'bar'){
      // Bar (solid obstacle)
      drawRoundedRect(ctx, o.x, o.y, o.w, o.h, o.r, 'rgba(55,32,18,.82)', 'rgba(255,255,255,.12)');
      // Counter top
      drawRoundedRect(ctx, o.x + 6, o.y + 6, o.w - 12, Math.max(14, o.h * 0.34), 14, 'rgba(255,250,243,.18)', 'rgba(18,49,28,.10)');
      // Bottles
      for (let i = 0; i < 8; i++){
        const bx = o.x + o.w * (0.14 + i * 0.10);
        const by = o.y + o.h * 0.62 + Math.sin(i * 1.1) * 2;
        const bw = 6;
        const bh = 14 + (i % 3) * 2;
        const col = (i % 2 === 0) ? 'rgba(103,199,255,.22)' : 'rgba(255,210,231,.20)';
        drawRoundedRect(ctx, bx - bw / 2, by - bh, bw, bh, 3, col, 'rgba(255,255,255,.10)');
      }
      // Label
      ctx.font = '900 14px ui-rounded, system-ui, -apple-system, Segoe UI, Roboto, Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255,250,243,.72)';
      ctx.fillText('בר', o.x + o.w * 0.5, o.y + o.h * 0.28);
    } else if (o.type === 'speaker'){
      // Speaker (solid obstacle)
      drawRoundedRect(ctx, o.x, o.y, o.w, o.h, o.r, 'rgba(18,18,22,.90)', 'rgba(255,255,255,.10)');
      ctx.fillStyle = 'rgba(255,250,243,.06)';
      ctx.fillRect(o.x + 8, o.y + 8, o.w - 16, 8);
      // Woofers
      const cx = o.x + o.w * 0.5;
      const topCy = o.y + o.h * 0.46;
      const botCy = o.y + o.h * 0.74;
      const r0 = Math.min(o.w, o.h) * 0.20;
      const r1 = Math.min(o.w, o.h) * 0.14;
      ctx.fillStyle = 'rgba(0,0,0,.35)';
      ctx.beginPath(); ctx.arc(cx, topCy, r0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx, botCy, r0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,233,190,.10)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, topCy, r1, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, botCy, r1, 0, Math.PI * 2); ctx.stroke();
    } else if (o.type === 'chuppah'){
      // Canopy + poles
      const pad = 10;
      const canopyH = Math.max(20, o.h * 0.42);
      drawRoundedRect(ctx, o.x, o.y, o.w, canopyH, o.r, 'rgba(255,210,231,.55)', 'rgba(18,49,28,.14)');

      // Poles
      const poleW = Math.max(6, Math.round(o.w * 0.035));
      const poleH = o.h - canopyH + pad;
      ctx.fillStyle = 'rgba(18,49,28,.22)';
      ctx.fillRect(o.x + pad, o.y + canopyH - 2, poleW, poleH);
      ctx.fillRect(o.x + o.w - pad - poleW, o.y + canopyH - 2, poleW, poleH);

      // Little flowers on the canopy
      ctx.fillStyle = 'rgba(255,123,184,.38)';
      for (let i = 0; i < 8; i++){
        const fx = o.x + (o.w * (0.12 + i * 0.11));
        const fy = o.y + canopyH * 0.35 + Math.sin(i * 1.7) * 3;
        ctx.beginPath();
        ctx.arc(fx, fy, 3.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Ring aura around Mushu if he has rings
  if (mushu.hasRings){
    const mushuVr = mushu.r * (mushu.renderScale ?? 1);
    const pulse = 0.5 + 0.5 * Math.sin(world.t * 9);
    ctx.strokeStyle = `rgba(255,215,140,${0.18 + 0.18 * pulse})`;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(mushu.x, mushu.y, mushuVr + 10 + pulse * 4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = '800 18px system-ui, -apple-system, Segoe UI, Roboto, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,235,190,.95)';
    ctx.fillText('💍💍', mushu.x, mushu.y - mushuVr - 16);
  }

  // Characters
  drawBody(ofer);
  drawBody(mushu);
  if (tal.visible) drawBody(tal);

  // Particles on top
  for (const p of particles){
    const life0 = (p.maxLife ?? 1) || 1;
    const k = clamp(p.life / life0, 0, 1);
    if (p.type === 'fire'){
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.translate(p.x, p.y);
      ctx.rotate((p.spin ?? 0) * (1 - k));
      // Outer glow
      ctx.fillStyle = `hsla(${p.hue ?? 35}, 98%, 55%, ${0.30 * k})`;
      ctx.beginPath();
      ctx.arc(0, 0, (p.size ?? 8) * (1.0 + (1 - k) * 0.45), 0, Math.PI * 2);
      ctx.fill();
      // Hot core
      ctx.fillStyle = `hsla(${(p.hue ?? 35) + 10}, 98%, 75%, ${0.55 * k})`;
      ctx.beginPath();
      ctx.arc(0, 0, (p.size ?? 8) * 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.spin ?? 0) * (1 - k));
      ctx.fillStyle = `hsla(${p.hue ?? 0}, 90%, 65%, ${k})`;
      ctx.fillRect(-(p.size ?? 3) / 2, -(p.size ?? 3) / 2, (p.size ?? 3), (p.size ?? 3) * 0.8);
      ctx.restore();
    }
  }

  // HUD text updates (DOM overlay)
  timerEl.textContent = `${world.timeLeft.toFixed(1)}ש׳`;
  if (world.chaosActive){
    chaosEl.textContent = chaosBannerText(world.chaosName);
    setHidden(chaosEl, false);
  } else {
    setHidden(chaosEl, true);
  }

  // Instructions fade out after 5 seconds (non-blocking)
  if (state === GameState.PLAYING && instructionsEl){
    const remain = world.instructionsUntil - world.t;
    const alpha = clamp(remain / 1.0, 0, 1);
    instructionsEl.style.opacity = String(alpha);
  }

  // Stage overlay countdown (DOM overlay)
  if (!stageUI.classList.contains('isHidden') && stageStartAt > 0){
    const t = world.t;
    if (t >= countdownFromAt && t < stageStartAt){
      const n = Math.ceil(stageStartAt - t);
      stageCountdownEl.textContent = `מתחילים בעוד ${n}…`;
    } else if (t < countdownFromAt){
      stageCountdownEl.textContent = '';
    } else if (t >= stageStartAt){
      stageCountdownEl.textContent = '';
    }
  }
}

function drawBody(b){
  const vr = b.r * (b.renderScale ?? 1);
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,.28)';
  ctx.beginPath();
  ctx.ellipse(b.x, b.y + vr * 0.85, vr * 0.95, vr * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body (special case: characters use local sticker images for display only)
  const imgReady = (img) => !!img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
  let stickerImg = null;
  if (b === ofer) stickerImg = oferStickerImg;
  else if (b === mushu) stickerImg = mushuStickerImg;
  else if (b === tal){
    // Swap Tal sticker during "Bride Rage" chaos.
    const stageIndex = (world?.stageIndex ?? 0);
    const preferred = (world?.brideRage && stageIndex === 1) ? brideRageOneImg
      : (world?.brideRage && stageIndex === 2) ? brideRageTwoImg
        : talStickerImg;
    stickerImg = imgReady(preferred) ? preferred : talStickerImg;
  }

  const stickerReady = imgReady(stickerImg);
  if (stickerReady){
    ctx.save();
    // Scale sticker relative to body radius, preserve aspect ratio.
    const targetW = vr * 3.0;
    const scale = targetW / stickerImg.naturalWidth;
    const dw = stickerImg.naturalWidth * scale;
    const dh = stickerImg.naturalHeight * scale;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(stickerImg, b.x - dw / 2, b.y - dh / 2, dw, dh);
    ctx.restore();
  } else {
    const g = ctx.createRadialGradient(b.x - vr * 0.35, b.y - vr * 0.35, 2, b.x, b.y, vr * 1.2);
    g.addColorStop(0, 'rgba(255,255,255,.18)');
    g.addColorStop(0.25, b.color);
    g.addColorStop(1, 'rgba(0,0,0,.2)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(b.x, b.y, vr, 0, Math.PI * 2);
    ctx.fill();

    // Outline
    ctx.strokeStyle = 'rgba(255,255,255,.16)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Stolen ring overlay: make it obvious Mushu has the rings.
  if (b === mushu && mushu.hasRings){
    drawStolenRingOnMushu(b, vr);
  }

  // Label
  drawLabel(b.label, b.x, b.y - vr - 2);
}

function drawStolenRingOnMushu(b, vr){
  // Designed to sit near Mushu's mouth/paw regardless of sticker aspect.
  const t = world.t || 0;
  const bob = Math.sin(t * 10.5) * (vr * 0.04);
  // Bottom-left placement (looks like it's "held"/dragged).
  const x = b.x - vr * 0.66;
  const y = b.y + vr * 0.78 + bob;
  const size = Math.max(8, vr * 0.46);
  const ang = 0.75 + Math.sin(t * 7.0) * 0.10;
  drawRingIcon(x, y, size, ang);
}

function drawRingIcon(x, y, r, ang){
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(ang);

  // Base ring (gold stroke)
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = Math.max(2, r * 0.34);
  ctx.strokeStyle = 'rgba(255,205,92,.98)';
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();

  // Inner shadow to fake thickness
  ctx.lineWidth = Math.max(1.5, r * 0.20);
  ctx.strokeStyle = 'rgba(160,106,26,.30)';
  ctx.beginPath();
  ctx.arc(r * 0.08, r * 0.12, r * 0.82, 0, Math.PI * 2);
  ctx.stroke();

  // Highlight
  ctx.strokeStyle = 'rgba(255,255,255,.35)';
  ctx.lineWidth = Math.max(1.2, r * 0.16);
  ctx.beginPath();
  ctx.arc(-r * 0.18, -r * 0.22, r * 0.86, -0.15 * Math.PI, 0.55 * Math.PI);
  ctx.stroke();

  // Simple "gem" on top
  const gx = 0;
  const gy = -r * 1.10;
  ctx.fillStyle = 'rgba(255,210,231,.92)';
  ctx.strokeStyle = 'rgba(255,250,243,.70)';
  ctx.lineWidth = Math.max(1, r * 0.12);
  ctx.beginPath();
  ctx.moveTo(gx, gy - r * 0.24);
  ctx.lineTo(gx + r * 0.26, gy);
  ctx.lineTo(gx, gy + r * 0.24);
  ctx.lineTo(gx - r * 0.26, gy);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Tiny sparkle
  ctx.strokeStyle = 'rgba(255,245,220,.75)';
  ctx.lineWidth = Math.max(1, r * 0.10);
  ctx.beginPath();
  ctx.moveTo(r * 1.35, -r * 0.25);
  ctx.lineTo(r * 1.55, -r * 0.45);
  ctx.moveTo(r * 1.35, -r * 0.45);
  ctx.lineTo(r * 1.55, -r * 0.25);
  ctx.stroke();

  ctx.restore();
}

// =============================
// Main loop (requestAnimationFrame) - MANDATORY
// =============================
function loop(){
  if (state === GameState.IDLE){
    rafId = 0;
    return; // no animation in IDLE (MANDATORY)
  }

  const t = nowSec();
  world.t = t;
  const rawDt = t - world.lastT;
  world.lastT = t;

  // Clamp dt (mobile tab switching / hitch safety)
  const dt = clamp(rawDt, 0, 1 / 20);
  world.dt = dt;

  // Rotate overlay
  const landscape = isLandscape();
  if (landscape){
    setHidden(rotateUI, false);
  } else {
    setHidden(rotateUI, true);
  }

  if (state === GameState.PLAYING && !landscape){
    // Stage start scheduling (uses world clock)
    if (!world.playEnabled && stageStartAt > 0 && world.t >= stageStartAt){
      const cfg = getStageCfg(pendingStageIndex);
      applyStageParams(cfg);
      resetGameToPlaying(pendingStageIndex);
      world.playEnabled = true;
      hideStageOverlay();
      stageStartAt = 0;
      countdownFromAt = 0;
      if (pendingStageIndex === 0) hasShownStage1HowTo = true;
    }

    if (world.playEnabled) update(dt);
  }

  // Render (even if landscape, draw frozen background)
  render();

  rafId = requestAnimationFrame(loop);
}

function startLoopIfNeeded(){
  if (!rafId) rafId = requestAnimationFrame(loop);
}

// =============================
// Endings (no real lose state, only funny outcomes)
// =============================
const OUTCOMES = {
  CAUGHT: [
    {
      title: 'הטבעות ניצלו',
      text: 'עופר תופס את מושו (בערך בעדינות). הטבעות נשמרות. מושו טוען שזה היה אימון. טל צועקת: "למה אתה מזיע?!"',
    },
    {
      title: 'תפיסה הירואית',
      text: 'תפסתם את מושו באמצע זום. הוא מפיל את הטבעות ומיד דורש חטיפים כפיצוי חוקי.',
    },
    {
      title: 'הכלב מקבל תבוסה',
      text: 'מושו נכנע… בכך שהוא נהיה "לחמנייה". הטבעות אצלכם. הכאוס נשאר.',
    },
  ],
  TIME: [
    {
      title: 'הטבעות: נעלמו',
      text: 'הזמן נגמר. מושו קבר את הטבעות "לשמירה" (איפשהו בין ממדים). החתונה ממשיכה עם שתי טבעות בצל.',
    },
    {
      title: 'ספידראן חתונה נכשל',
      text: 'הטיימר מגיע לאפס. טל מכריזה שהטבעות "לא חובה רגשית". מושו עורך את הטקס. כולם מוחאים כפיים מפחד.',
    },
    {
      title: 'פשע כפות קוסמי',
      text: 'מושו בורח מהזירה. הטבעות הופכות למשימת צד. עופר מקבל זר ניחומים ולחיצת יד תקיפה.',
    },
  ],
  ALL_CLEAR: [
    {
      title: 'החתונה ניצלה (בערך)',
      text: 'תפסתם את מושו בשלב 3. הטבעות חזרו. טל אומרת \"סבבה\"—ואז עושה פרצוף של \"לא באמת\".',
    },
    {
      title: 'סוף טוב, כאוס נשאר',
      text: 'מושו נתפס. הכאוס נשמר לשימוש עתידי. עופר מקבל מדליה לא רשמית: \"חתן עם סיבולת\".',
    },
    {
      title: 'מושו: הובס, זמנית',
      text: 'הטבעות אצלכם. מושו כבר מתכנן DLC. טל דורשת שכולם יחזרו לרקוד כאילו כלום.',
    },
  ],
};

function pickOutcome(reason){
  const arr = OUTCOMES[reason] || OUTCOMES.TIME;
  return arr[randInt(0, arr.length - 1)];
}

function showOutcome(reason){
  const o = pickOutcome(reason);
  const stageLabel = `שלב ${stageNum(world.stageIndex)} מתוך ${STAGES.length}`;
  endTitleEl.textContent = reason === 'ALL_CLEAR' ? o.title : `${o.title} • ${stageLabel}`;
  endTextEl.textContent = o.text;
  renderEndScore();
}

// =============================
// UI wiring
// =============================
function enterIdle(){
  state = GameState.IDLE;
  setHidden(startUI, false);
  setHidden(endUI, true);
  setHidden(rotateUI, true);
  setHidden(stageUI, true);
  setQuip('');
  if (instructionsEl) instructionsEl.style.opacity = '0';
  chaosEl.textContent = '';
  setHidden(chaosEl, true);
  const idleDur = (getStageCfg(StageId.STAGE_1)?.durationSec ?? DEFAULT_GAME_DURATION);
  timerEl.textContent = `${idleDur.toFixed(1)}ש׳`;
  world.playEnabled = false;
  world.stageIndex = StageId.STAGE_1;
  applyStageParams(getStageCfg(StageId.STAGE_1));
}

startBtn.addEventListener('click', async () => {
  // Unlock audio ONLY after user interaction (MANDATORY).
  await ensureAudioUnlocked();
  audio.sfx.start();

  // Start immediately (no how-to overlay, no countdown).
  state = GameState.PLAYING;
  setHidden(startUI, true);
  hasShownStage1HowTo = true;
  startStageImmediately(StageId.STAGE_1);
  startLoopIfNeeded();
}, { passive: true });

restartBtn.addEventListener('click', async () => {
  await ensureAudioUnlocked();
  audio.sfx.start();

  // Retry same stage on TIME. After full clear, restart from stage 1.
  const retryStage = world.endReason === 'TIME' ? world.stageIndex : StageId.STAGE_1;
  state = GameState.PLAYING;
  setHidden(endUI, true);
  startStageImmediately(retryStage);
  startLoopIfNeeded();
}, { passive: true });

window.addEventListener('resize', () => {
  if (state !== GameState.IDLE){
    resizeCanvas();
    syncWorldToCanvasSize();
  }
}, { passive: true });

// =============================
// Boot
// =============================
enterIdle();

// When ending, populate text right away.
const _origEnterEnd = enterEnd;
enterEnd = function(reason){
  showOutcome(reason);
  _origEnterEnd(reason);
};

// Application Security Requirement: no network calls, only local assets, touch-only input handled locally.
