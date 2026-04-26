/* Wedding Chaos: Ofer vs Mushu (mobile-only canvas)
   Local project assets. Touch only. Portrait-ish.
*/
'use strict';

// Set to true to show dev navigation buttons (stage/scene shortcuts + back-to-start).
const DEV_MODE = false;

// Local sticker asset (display only)
const oferStickerImg = new Image();
oferStickerImg.decoding = 'async';
oferStickerImg.loading = 'eager';
oferStickerImg.src = 'assets/characters/ofer.webp';

const mushuStickerImg = new Image();
mushuStickerImg.decoding = 'async';
mushuStickerImg.loading = 'eager';
mushuStickerImg.src = 'assets/characters/mushu.webp';

const talStickerImg = new Image();
talStickerImg.decoding = 'async';
talStickerImg.loading = 'eager';
talStickerImg.src = 'assets/characters/tal.webp';

// Bride rage stickers (used during ChaosEvent.BRIDE_RAGE)
const brideRageOneImg = new Image();
brideRageOneImg.decoding = 'async';
brideRageOneImg.loading = 'eager';
brideRageOneImg.src = 'assets/events/bride-rage-one.webp';

const brideRageTwoImg = new Image();
brideRageTwoImg.decoding = 'async';
brideRageTwoImg.loading = 'eager';
brideRageTwoImg.src = 'assets/events/bride-rage-two.webp';

// Stage 1 (yard) props
const levelOneBgImg = new Image();
levelOneBgImg.decoding = 'async';
levelOneBgImg.loading = 'eager';
levelOneBgImg.src = 'assets/stages/stage-1/background.jpg';
levelOneBgImg.addEventListener('load', () => { bgCache = null; }, { once: true });

const palmTreeImg = new Image();
palmTreeImg.decoding = 'async';
palmTreeImg.loading = 'eager';
palmTreeImg.src = 'assets/stages/stage-1/props/palm-tree.webp';

const treeImg = new Image();
treeImg.decoding = 'async';
treeImg.loading = 'eager';
treeImg.src = 'assets/stages/stage-1/props/tree.webp';

const pinkBushImg = new Image();
pinkBushImg.decoding = 'async';
pinkBushImg.loading = 'eager';
pinkBushImg.src = 'assets/stages/stage-1/props/pink-bush.webp';

const tableOutsideImg = new Image();
tableOutsideImg.decoding = 'async';
tableOutsideImg.loading = 'eager';
tableOutsideImg.src = 'assets/stages/stage-1/props/table-outside.webp';

// Stage 2 (hall) props
const barImg = new Image();
barImg.decoding = 'async';
barImg.loading = 'eager';
barImg.src = 'assets/stages/stage-2/props/bar.webp';

const indoorTableImg = new Image();
indoorTableImg.decoding = 'async';
indoorTableImg.loading = 'eager';
indoorTableImg.src = 'assets/stages/stage-2/props/indoor-table.webp';

const leftSpeakerImg = new Image();
leftSpeakerImg.decoding = 'async';
leftSpeakerImg.loading = 'eager';
leftSpeakerImg.src = 'assets/stages/stage-2/props/left-speaker.webp';

const rightSpeakerImg = new Image();
rightSpeakerImg.decoding = 'async';
rightSpeakerImg.loading = 'eager';
rightSpeakerImg.src = 'assets/stages/stage-2/props/right-speaker.webp';

const levelTwoBgImg = new Image();
levelTwoBgImg.decoding = 'async';
levelTwoBgImg.loading = 'eager';
levelTwoBgImg.src = 'assets/stages/stage-2/background.jpg';
levelTwoBgImg.addEventListener('load', () => { bgCache = null; }, { once: true });

// Stage 3 (chuppah) props
const levelThreeBgImg = new Image();
levelThreeBgImg.decoding = 'async';
levelThreeBgImg.loading = 'eager';
levelThreeBgImg.src = 'assets/stages/stage-3/background.jpeg';
levelThreeBgImg.addEventListener('load', () => { bgCache = null; }, { once: true });

const hupaImg = new Image();
hupaImg.decoding = 'async';
hupaImg.loading = 'eager';
hupaImg.src = 'assets/stages/stage-3/props/hupa.png';

const fountainImg = new Image();
fountainImg.decoding = 'async';
fountainImg.loading = 'eager';
fountainImg.src = 'assets/stages/stage-3/props/fountain.png';

const whiteFlowersImg = new Image();
whiteFlowersImg.decoding = 'async';
whiteFlowersImg.loading = 'eager';
whiteFlowersImg.src = 'assets/stages/stage-3/props/white-flowers.png';

const whiteTreeImg = new Image();
whiteTreeImg.decoding = 'async';
whiteTreeImg.loading = 'eager';
whiteTreeImg.src = 'assets/stages/stage-3/props/white-tree.png';

const pinkTreeImg = new Image();
pinkTreeImg.decoding = 'async';
pinkTreeImg.loading = 'eager';
pinkTreeImg.src = 'assets/stages/stage-3/props/pink-tree.png';

const woodStageImg = new Image();
woodStageImg.decoding = 'async';
woodStageImg.loading = 'eager';
woodStageImg.src = 'assets/stages/stage-3/props/wood-stage.png';

const bottleAcaiImg = new Image();
bottleAcaiImg.decoding = 'async';
bottleAcaiImg.loading = 'eager';
bottleAcaiImg.src = 'assets/stages/stage-3/props/bottles/Acai.webp';

const bottleArakImg = new Image();
bottleArakImg.decoding = 'async';
bottleArakImg.loading = 'eager';
bottleArakImg.src = 'assets/stages/stage-3/props/bottles/Arak.webp';

const bottleGinImg = new Image();
bottleGinImg.decoding = 'async';
bottleGinImg.loading = 'eager';
bottleGinImg.src = 'assets/stages/stage-3/props/bottles/Gin.webp';

const bottleTubiImg = new Image();
bottleTubiImg.decoding = 'async';
bottleTubiImg.loading = 'eager';
bottleTubiImg.src = 'assets/stages/stage-3/props/bottles/Tubi60.webp';

// =============================
// Constants (tweak here)
// =============================
const DEFAULT_GAME_DURATION = 30; // seconds (fallback)

// How to tweak chaos:
// - Change CHAOS_EVENT_MIN_MS / CHAOS_EVENT_MAX_MS to make chaos shorter/longer.
// - Change CHAOS_WEIGHTS to bias which events happen more.
const DEFAULT_CHAOS_EVENT_MIN_MS = 4000;
const DEFAULT_CHAOS_EVENT_MAX_MS = 4000;
/** Seconds of calm between the end of one chaos and the start of the next. */
const CHAOS_BREAK_SEC = 3;
/** HUD chaos label: blink duration, then hide (matches CSS animation length). */
const CHAOS_BANNER_VISIBLE_SEC = 3;
/** After catching Mushu: quip duration and wait before next stage / celebration (same beat, world clock). */
const POST_CATCH_QUIP_MS = 4200;
const POST_CATCH_BEAT_SEC = POST_CATCH_QUIP_MS / 1000;

// How to adjust difficulty:
// - Increase PLAYER_SPEED to make catching easier.
// - Increase MUSHU_BASE_SPEED to make Mushu harder.
// - Increase ARENA_MARGIN to reduce playable area (harder).
const DEFAULT_MUSHU_BASE_SPEED = 330;
const ARENA_MARGIN = 18;

// Celebration after full clear: interactive hall party with clickable bar bottles.
const CELEBRATION_DRINK_SEC = 1.7;
const CELEBRATION_CONFETTI_INTERVAL_SEC = 1.1;
const CELEBRATION_WALK_SPEED = 720;
const CELEBRATION_STEAL_EVERY_CLICKS = 4;
const CELEBRATION_STOLEN_BOTTLE_RETURN_SEC = 4.2;
const CELEBRATION_MUSHU_STEAL_SPEED = 500;
const STAGE1_INTRO_SCENE_DURATION = 13;
const STAGE2_INTRO_SCENE_DURATION = 16;
const STAGE3_INTRO_SCENE_DURATION = 18;

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
const startUIDemoPanel = document.getElementById('startUI-demoPanel');
const startUIDemoViewport = document.getElementById('startUI-demoViewport');
const startUITimerWrap = document.getElementById('startUI-timerWrap');
const hudRow = document.getElementById('hudRow');
const endUI = document.getElementById('endUI');
const rotateUI = document.getElementById('rotateUI');
const stageUI = document.getElementById('stageUI');
const cutsceneUI = document.getElementById('cutsceneUI');
const cutsceneTextEl = document.getElementById('cutsceneText');

const startBtn = document.getElementById('startBtn');
const introSceneBtn = document.getElementById('introSceneBtn');
const introScene2Btn = document.getElementById('introScene2Btn');
const introScene3Btn = document.getElementById('introScene3Btn');
const restartBtn = document.getElementById('restartBtn');
const devStage1Btn = document.getElementById('devStage1');
const devStage2Btn = document.getElementById('devStage2');
const devStage3Btn = document.getElementById('devStage3');
const devCelebrationBtn = document.getElementById('devCelebration');
let devBackToStartBtn = document.getElementById('devBackToStart');

if (!DEV_MODE){
  const devNavEl = document.getElementById('devNav');
  if (devNavEl) devNavEl.style.display = 'none';
  if (devBackToStartBtn) devBackToStartBtn.style.display = 'none';
  devBackToStartBtn = null;
}

const timerEl = document.getElementById('timer');
const chaosEl = document.getElementById('chaos');
let hudPrevChaosActive = false;
const instructionsEl = document.getElementById('instructions');
const quipEl = document.getElementById('quip');
const endTitleEl = document.getElementById('endTitle');
const endTextEl = document.getElementById('endText');
const stageTitleEl = document.getElementById('stageTitle');
const stageTextEl = document.getElementById('stageText');
const stageCountdownEl = document.getElementById('stageCountdown');
const stageTinyEl = document.getElementById('stageTiny');
const endScoreEl = document.getElementById('endScore');
const celebrationUI = document.getElementById('celebrationUI');
const celebrationResultDockEl = document.getElementById('celebrationResultDock');
const celebrationResultDrawerEl = document.getElementById('celebrationResultDrawer');
const celebrationResultBtn = document.getElementById('celebrationResultBtn');
const celebrationResultBadgeEl = document.getElementById('celebrationResultBadge');
const celebrationResultTitleEl = document.getElementById('celebrationResultTitle');
const celebrationResultSummaryEl = document.getElementById('celebrationResultSummary');
const celebrationScoreEl = document.getElementById('celebrationScore');
const celebrationRestartBtn = document.getElementById('celebrationRestartBtn');
const celebrationBottomStackEl = document.querySelector('.celebrationBottomStack');

// On-screen joystick (movement)
const joystickEl = document.getElementById('joystick');
const joystickBaseEl = document.getElementById('joystickBase');
const joystickKnobEl = document.getElementById('joystickKnob');

// =============================
// State machine (MANDATORY)
// IDLE → PLAYING → END → PLAYING
// =============================
const GameState = Object.freeze({
  IDLE: 'IDLE',
  CUTSCENE: 'CUTSCENE',
  PLAYING: 'PLAYING',
  END: 'END',
});

let state = GameState.IDLE;
let rafId = 0;
let demoRafId = 0;

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
      'מזיזים את הג׳ויסטיק = עופר 🤵 זז כמו מגנט על סקטבורד.',
      'המטרה: לתפוס את מושו 🐶 לפני שהטיימר נגמר.',
      'שולחנות/כיסאות/עצים/שיחים: לא עוברים דרכם. כן, זה אישי.',
    ].join('\n'),
    // Difficulty
    durationSec: 60,
    playerSpeed: 2800,
    mushuBaseSpeed: 380,
    chaosIntervalSec: 6.0,
    chaosEventMinMs: 3200,
    chaosEventMaxMs: 3600,
    chaosWeights: null, // filled after ChaosEvent declared
    mushuBoostRange: [1.35, 1.75],
    shakeIntensity: 0.45,
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
    mushuBaseSpeed: 520,
    chaosIntervalSec: 5.0,
    chaosInitialDelaySec: 3,
    chaosEventMinMs: 3800,
    chaosEventMaxMs: 4200,
    chaosWeights: null,
    mushuBoostRange: [1.55, 2.05],
    shakeIntensity: 0.7,
    brideRageEnabled: true,
    brideRageDurFactor: 1.5,
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
    mushuBaseSpeed: 580,
    chaosIntervalSec: 4.5,
    chaosInitialDelaySec: 3,
    chaosEventMinMs: 4200,
    chaosEventMaxMs: 4800,
    chaosWeights: null,
    mushuBoostRange: [2.8, 3.6],
    shakeIntensity: 0.6,
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
  const points = Math.max(0, Math.round((remaining / dur) * 100));
  const timeSpentSec = clamp(dur - remaining, 0, dur);
  runScore.stages[stageIndex].points = points;
  runScore.stages[stageIndex].timeSpentSec = timeSpentSec;
  runScore.stages[stageIndex].durationSec = dur;
  recalcTotalPoints();
  return points;
}

function renderEndScore(){
  const lines = runScore.stages.map((s, i) => {
    const label = `שלב ${i + 1}`;
    if (s.points == null) return `${label}: —`;
    return `${label}: ${s.points} נק׳ • ${s.timeSpentSec.toFixed(1)}`;
  });
  lines.push(`סה״כ: ${runScore.totalPoints} נק׳`);
  const scoreText = lines.join('\n');
  if (endScoreEl) endScoreEl.textContent = scoreText;
  if (celebrationScoreEl) celebrationScoreEl.textContent = scoreText;
  if (celebrationResultBadgeEl) celebrationResultBadgeEl.textContent = `${runScore.totalPoints} נק׳`;
}

let hasShownStage1HowTo = false;
let pendingStageIndex = StageId.STAGE_1;
let stageStartAt = 0;
let countdownFromAt = 0;
let celebrationStartAt = 0;
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
  setJoystickHidden(true);
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
  celebrationStartAt = 0;
  hideStageOverlay();
  resetGameToPlaying(stageIndex);
  world.playEnabled = true;
  if (stageIndex === 0) hasShownStage1HowTo = true;
}

function hideCutsceneOverlay(){
  if (cutsceneTextEl) cutsceneTextEl.textContent = '';
  if (cutsceneUI) setHidden(cutsceneUI, true);
}

function setCutsceneOverlay(text){
  if (cutsceneTextEl) cutsceneTextEl.textContent = text || '';
  if (cutsceneUI) setHidden(cutsceneUI, !text);
}

function cutsceneBeatLabel(t0, t1, headline){
  const fmt = (t) => String(Math.max(0, t).toFixed(1)).replace('.', ',');
  return `${fmt(t0)}–${fmt(t1)} שנ׳ · ${headline}`;
}

function mountGameIntoAppShell(){
  const appEl = document.getElementById('app');
  if (canvas && startUIDemoViewport && canvas.parentNode === startUIDemoViewport && appEl) {
    appEl.insertBefore(canvas, appEl.firstChild);
  }
  if (joystickEl && appEl) appEl.appendChild(joystickEl);
  if (timerEl && hudRow) hudRow.appendChild(timerEl);
}

const stageOneIntroScene = {
  active: false,
  startedAt: 0,
  durationSec: STAGE1_INTRO_SCENE_DURATION,
  ringX: 0,
  ringY: 0,
  ringAngle: 0,
  ringVisible: false,
  captionIndex: -1,
};

const stageTwoIntroScene = {
  active: false,
  startedAt: 0,
  durationSec: STAGE2_INTRO_SCENE_DURATION,
  tableTx: 0,
  tableTy: 0,
  tableTr: 40,
  /** Ofer's X at cutscene start: beside the table (not off-screen). */
  oferWalkFromX: 0,
  ringX: 0,
  ringY: 0,
  ringAngle: 0,
  ringVisible: false,
  captionIndex: -1,
  ringStolen: false,
  stealMushuX: null,
  stealMushuY: null,
};

function findFirstHallTable(){
  for (let i = 0; i < obstacles.length; i++){
    const o = obstacles[i];
    if (o.type === 'table') return o;
  }
  return null;
}

const stageThreeIntroScene = {
  active: false,
  startedAt: 0,
  fireStartAt: 0,
  durationSec: STAGE3_INTRO_SCENE_DURATION,
  captionIndex: -1,
  talAngry: false,
  talFireSpitUntil: 0,
  fireAcc: 0,
  impactAcc: 0,
};

function getStageOneIntroRingAnchor(){
  const vr = ofer.r * (ofer.renderScale ?? 1);
  return {
    x: ofer.x + vr * 0.52,
    y: ofer.y - vr * 0.78,
  };
}

function startStageOneIntroScene(){
  stageTwoIntroScene.active = false;
  stageThreeIntroScene.active = false;
  if (demoRafId) {
    cancelAnimationFrame(demoRafId);
    demoRafId = 0;
  }

  if (joystickEl) joystickEl.classList.remove('joystick--onStart');
  mountGameIntoAppShell();
  resetJoystickVisual();
  setJoystickHidden(true);
  setHidden(startUI, true);
  setHidden(endUI, true);
  setHidden(stageUI, true);
  setHidden(chaosEl, true);
  setHidden(hudRow, true);
  setQuip('');
  if (devBackToStartBtn) setHidden(devBackToStartBtn, false);

  world.celebrationMode = false;
  world.playEnabled = false;
  world.endReason = '';
  world.stageIndex = StageId.STAGE_1;
  applyStageParams(getStageCfg(StageId.STAGE_1));
  bgCache = null;
  obstacles.length = 0;
  particles.length = 0;
  resizeCanvas();
  syncWorldToCanvasSize();

  const now = nowSec();
  const w = world.w || canvas.width;
  const h = world.h || canvas.height;
  world.t = now;
  world.lastT = now;
  world.dt = 0;

  ofer.x = w * 0.14;
  ofer.y = h * 0.77;
  ofer.vx = 0;
  ofer.vy = 0;

  mushu.x = w * 1.08;
  mushu.y = h * 0.86;
  mushu.vx = 0;
  mushu.vy = 0;
  mushu.hasRings = false;
  mushu.mood = 0;
  mushu.zigUntil = 0;
  mushu.wanderUntil = 0;

  tal.visible = false;

  stageOneIntroScene.active = true;
  stageOneIntroScene.startedAt = now;
  stageOneIntroScene.durationSec = STAGE1_INTRO_SCENE_DURATION;
  stageOneIntroScene.captionIndex = -1;
  stageOneIntroScene.ringVisible = true;
  const anchor = getStageOneIntroRingAnchor();
  stageOneIntroScene.ringX = anchor.x;
  stageOneIntroScene.ringY = anchor.y;
  stageOneIntroScene.ringAngle = 0.25;

  state = GameState.CUTSCENE;
  stopStagePlayMusic();
  void ensureAudioUnlocked().then(() => { startIntroSceneMusic(); });
  updateStageOneIntroScene();
  startLoopIfNeeded();
}

function finishStageOneIntroScene(){
  stageOneIntroScene.active = false;
  stageOneIntroScene.ringVisible = false;
  hideCutsceneOverlay();
  setHidden(hudRow, false);
  startStageImmediately(StageId.STAGE_1);
}

function updateStageOneIntroScene(){
  if (!stageOneIntroScene.active) return;

  const elapsed = clamp(world.t - stageOneIntroScene.startedAt, 0, stageOneIntroScene.durationSec);
  const w = world.w || canvas.width;
  const h = world.h || canvas.height;
  const floorX = w * 0.59;
  const floorY = h * 0.815;
  const walkBob = Math.sin(elapsed * 7.4) * 3.5;

  if (elapsed < 3.2){
    const k = elapsed / 3.2;
    ofer.x = lerp(w * 0.14, w * 0.54, k);
    ofer.y = h * 0.77 + walkBob;
    mushu.x = w * 1.08;
    mushu.y = h * 0.86;
    mushu.hasRings = false;
    const anchor = getStageOneIntroRingAnchor();
    stageOneIntroScene.ringVisible = true;
    stageOneIntroScene.ringX = anchor.x;
    stageOneIntroScene.ringY = anchor.y;
    stageOneIntroScene.ringAngle = 0.2 + Math.sin(elapsed * 4.6) * 0.12;
  } else if (elapsed < 5.2){
    const k = (elapsed - 3.2) / 2.0;
    ofer.x = lerp(w * 0.54, w * 0.62, k);
    ofer.y = h * 0.77 + walkBob * 0.8;
    mushu.x = w * 1.08;
    mushu.y = h * 0.86;
    mushu.hasRings = false;
    const anchor = getStageOneIntroRingAnchor();
    stageOneIntroScene.ringVisible = true;
    stageOneIntroScene.ringX = lerp(anchor.x, floorX, k);
    stageOneIntroScene.ringY = lerp(anchor.y, floorY, k) - Math.abs(Math.sin(k * Math.PI * 2.4)) * (1 - k) * 32;
    stageOneIntroScene.ringAngle = 0.2 + k * 3.4;
  } else if (elapsed < 7.8){
    const k = (elapsed - 5.2) / 2.6;
    ofer.x = lerp(w * 0.62, w * 0.72, k);
    ofer.y = h * 0.77 + walkBob * 0.55;
    mushu.x = lerp(w * 1.08, floorX + 10, k);
    mushu.y = lerp(h * 0.86, floorY + 6, k) - Math.sin(k * Math.PI) * 18;
    mushu.hasRings = false;
    stageOneIntroScene.ringVisible = true;
    stageOneIntroScene.ringX = floorX;
    stageOneIntroScene.ringY = floorY + Math.sin(elapsed * 10.5) * 1.5;
    stageOneIntroScene.ringAngle = 3.6;
  } else if (elapsed < 9.2){
    const k = (elapsed - 7.8) / 1.4;
    ofer.x = lerp(w * 0.72, w * 0.68, k);
    ofer.y = h * 0.77 + Math.sin(elapsed * 6.5) * 1.8;
    mushu.x = lerp(floorX + 10, w * 0.52, k);
    mushu.y = lerp(floorY + 6, h * 0.44, k);
    mushu.hasRings = true;
    stageOneIntroScene.ringVisible = false;
  } else {
    ofer.x = w * 0.66;
    ofer.y = h * 0.77;
    mushu.x = w * 0.52;
    mushu.y = h * 0.44;
    mushu.hasRings = true;
    stageOneIntroScene.ringVisible = false;
  }

  ofer.vx = 0;
  ofer.vy = 0;
  mushu.vx = 0;
  mushu.vy = 0;

  let captionIndex = 0;
  if (elapsed >= 9.2) captionIndex = 4;
  else if (elapsed >= 8.0) captionIndex = 3;
  else if (elapsed >= 5.2) captionIndex = 2;
  else if (elapsed >= 3.2) captionIndex = 1;
  if (captionIndex !== stageOneIntroScene.captionIndex){
    stageOneIntroScene.captionIndex = captionIndex;
    if (captionIndex === 0){
      setCutsceneOverlay('עופר נכנס לחצר עם הטבעת, בטוח שהכל בשליטה.');
    } else if (captionIndex === 1){
      setCutsceneOverlay('הטבעת מחליקה לו לרצפה...');
    } else if (captionIndex === 2){
      setCutsceneOverlay('מושו זיהה הזדמנות ');
    } else if (captionIndex === 3){
      setCutsceneOverlay('חטיפה!');
    } else {
      setCutsceneOverlay('יאללה, כדאי לתפוס את מושו לפני שטל תדע מזה.');
    }
  }

  if (elapsed >= stageOneIntroScene.durationSec){
    finishStageOneIntroScene();
  }
}

function startStageTwoIntroScene(){
  stageOneIntroScene.active = false;
  stageThreeIntroScene.active = false;
  if (demoRafId) {
    cancelAnimationFrame(demoRafId);
    demoRafId = 0;
  }

  if (joystickEl) joystickEl.classList.remove('joystick--onStart');
  mountGameIntoAppShell();
  resetJoystickVisual();
  setJoystickHidden(true);
  setHidden(startUI, true);
  setHidden(endUI, true);
  setHidden(stageUI, true);
  setHidden(chaosEl, true);
  setHidden(hudRow, true);
  setQuip('');
  if (devBackToStartBtn) setHidden(devBackToStartBtn, false);

  world.celebrationMode = false;
  world.playEnabled = false;
  world.endReason = '';
  world.stageIndex = StageId.STAGE_2;
  applyStageParams(getStageCfg(StageId.STAGE_2));
  bgCache = null;
  obstacles.length = 0;
  particles.length = 0;
  resizeCanvas();
  syncWorldToCanvasSize();

  const tbl = findFirstHallTable();
  const w = world.w || canvas.width;
  const h = world.h || canvas.height;
  const tx = tbl ? tbl.x : w * 0.28;
  const ty = tbl ? tbl.y : h * 0.68;
  const tr = tbl ? tbl.r : clamp(Math.min(w, h) * 0.055, 34, 52);

  stageTwoIntroScene.tableTx = tx;
  stageTwoIntroScene.tableTy = ty;
  stageTwoIntroScene.tableTr = tr;

  const now = nowSec();
  world.t = now;
  world.lastT = now;
  world.dt = 0;

  ofer.x = w * -0.06;
  ofer.y = ty - tr * 0.42;
  ofer.vx = 0;
  ofer.vy = 0;

  tal.visible = false;
  tal.x = w * 1.12;
  tal.y = ty - tr * 0.42;
  tal.vx = 0;
  tal.vy = 0;

  mushu.x = w * 0.5;
  mushu.y = h * 1.22;
  mushu.vx = 0;
  mushu.vy = 0;
  mushu.hasRings = false;

  stageTwoIntroScene.active = true;
  stageTwoIntroScene.startedAt = now;
  stageTwoIntroScene.durationSec = STAGE2_INTRO_SCENE_DURATION;
  stageTwoIntroScene.captionIndex = -1;
  stageTwoIntroScene.ringVisible = false;
  stageTwoIntroScene.ringStolen = false;
  stageTwoIntroScene.stealMushuX = null;
  stageTwoIntroScene.stealMushuY = null;
  stageTwoIntroScene.ringX = tx;
  stageTwoIntroScene.ringY = ty - tr * 0.28;
  stageTwoIntroScene.ringAngle = 0.15;

  state = GameState.CUTSCENE;
  stopStagePlayMusic();
  void ensureAudioUnlocked().then(() => { startIntroSceneMusic(); });
  updateStageTwoIntroScene();
  startLoopIfNeeded();
}

function finishStageTwoIntroScene(){
  stageTwoIntroScene.active = false;
  stageTwoIntroScene.ringVisible = false;
  stageTwoIntroScene.ringStolen = false;
  stageTwoIntroScene.stealMushuX = null;
  stageTwoIntroScene.stealMushuY = null;
  hideCutsceneOverlay();
  setHidden(hudRow, false);
  startStageImmediately(StageId.STAGE_2);
}

function updateStageTwoIntroScene(){
  if (!stageTwoIntroScene.active) return;

  const elapsed = clamp(world.t - stageTwoIntroScene.startedAt, 0, stageTwoIntroScene.durationSec);
  const w = world.w || canvas.width;
  const h = world.h || canvas.height;
  const tx = stageTwoIntroScene.tableTx;
  const ty = stageTwoIntroScene.tableTy;
  const tr = stageTwoIntroScene.tableTr;

  const T1 = 2.4;
  const T2 = 4.0;
  const T3 = 5.9;
  /** After Tal sits: first line only (no ring on table yet). */
  const T_A = 8.0;
  /** End of Ofer placing ring on table (during "הוצאתי את הטבעת…"). */
  const T_PLACE_END = 10.2;
  /** Brief beat: ring sits on table before Mushu snatches at line end. */
  const T_STEAL_START = 10.48;
  const T_STEAL_END = 11.85;
  const TEND = stageTwoIntroScene.durationSec;

  const seatSpread = tr * 1.38 + 30;
  const oferSitX = tx - seatSpread;
  const oferSitY = ty - tr * 1.05;
  const talSitX = tx + seatSpread;
  const talSitY = ty - tr * 1.05;

  const ringCx = tx;
  const ringCy = ty - tr * 0.32;
  const stealDist = tr * 0.48;

  if (elapsed < T1){
    const k = elapsed / T1;
    ofer.x = lerp(w * -0.06, oferSitX - tr * 0.42, k);
    ofer.y = oferSitY + Math.sin(elapsed * 6.8) * 2.2;
    tal.visible = false;
    tal.x = w * 1.12;
    tal.y = talSitY;
    mushu.x = w * 0.5;
    mushu.y = h * 1.22;
    mushu.hasRings = false;
    stageTwoIntroScene.ringVisible = false;
    stageTwoIntroScene.ringStolen = false;
  } else if (elapsed < T2){
    const k = (elapsed - T1) / (T2 - T1);
    ofer.x = lerp(oferSitX - tr * 0.42, oferSitX, k);
    ofer.y = oferSitY + Math.sin(elapsed * 5.5) * 1.4;
    tal.visible = true;
    tal.x = lerp(w * 1.12, talSitX + tr * 0.42, k);
    tal.y = talSitY + Math.sin(elapsed * 5.2) * 1.6;
    mushu.x = w * 0.5;
    mushu.y = h * 1.22;
    mushu.hasRings = false;
    stageTwoIntroScene.ringVisible = false;
  } else if (elapsed < T3){
    const k = (elapsed - T2) / (T3 - T2);
    ofer.x = lerp(oferSitX, oferSitX + tr * 0.06, k);
    ofer.y = oferSitY;
    tal.x = lerp(talSitX + tr * 0.42, talSitX, k);
    tal.y = talSitY;
    mushu.x = w * 0.5;
    mushu.y = h * 1.22;
    mushu.hasRings = false;
    stageTwoIntroScene.ringVisible = false;
  } else if (elapsed < T_A){
    ofer.x = oferSitX + tr * 0.06;
    ofer.y = oferSitY;
    tal.x = talSitX;
    tal.y = talSitY;
    mushu.x = w * 0.5;
    mushu.y = h * 1.22;
    mushu.hasRings = false;
    stageTwoIntroScene.ringVisible = false;
    stageTwoIntroScene.ringStolen = false;
  } else if (elapsed < T_PLACE_END){
    ofer.x = oferSitX + tr * 0.06;
    ofer.y = oferSitY;
    tal.x = talSitX;
    tal.y = talSitY;
    mushu.x = w * 0.5;
    mushu.y = h * 1.22;
    mushu.hasRings = false;
    const k = clamp((elapsed - T_A) / (T_PLACE_END - T_A), 0, 1);
    const ease = k * k * (3 - 2 * k);
    const handX = ofer.x + tr * 0.38;
    const handY = ofer.y - tr * 0.48;
    stageTwoIntroScene.ringVisible = true;
    stageTwoIntroScene.ringX = lerp(handX, ringCx, ease);
    stageTwoIntroScene.ringY = lerp(handY, ringCy, ease);
    stageTwoIntroScene.ringAngle = 0.12 + ease * 2.2 + Math.sin(elapsed * 5.5) * 0.08;
  } else if (elapsed < T_STEAL_START){
    ofer.x = oferSitX + tr * 0.06;
    ofer.y = oferSitY;
    tal.x = talSitX;
    tal.y = talSitY;
    mushu.x = w * 0.5;
    mushu.y = h * 1.22;
    mushu.hasRings = false;
    stageTwoIntroScene.ringVisible = !stageTwoIntroScene.ringStolen;
    stageTwoIntroScene.ringX = ringCx;
    stageTwoIntroScene.ringY = ringCy;
    stageTwoIntroScene.ringAngle = 0.12 + Math.sin(elapsed * 2.1) * 0.06;
  } else if (elapsed < T_STEAL_END){
    ofer.x = oferSitX + tr * 0.06 + Math.sin(elapsed * 9) * 2;
    ofer.y = oferSitY;
    tal.x = talSitX;
    tal.y = talSitY;
    const u = clamp((elapsed - T_STEAL_START) / (T_STEAL_END - T_STEAL_START), 0, 1);
    const jump = Math.sin(u * Math.PI);
    const mushu0x = w * 0.36;
    const mushu0y = h * 0.94;
    mushu.x = lerp(mushu0x, ringCx, u);
    mushu.y = lerp(mushu0y, ringCy - tr * 0.12, u) - jump * tr * 0.5;
    if (!stageTwoIntroScene.ringStolen){
      mushu.hasRings = false;
      stageTwoIntroScene.ringVisible = true;
      stageTwoIntroScene.ringX = ringCx;
      stageTwoIntroScene.ringY = ringCy;
      const reach = Math.hypot(mushu.x - ringCx, mushu.y - ringCy);
      if (reach <= stealDist || u >= 0.985){
        stageTwoIntroScene.ringStolen = true;
        mushu.hasRings = true;
        stageTwoIntroScene.ringVisible = false;
        stageTwoIntroScene.stealMushuX = mushu.x;
        stageTwoIntroScene.stealMushuY = mushu.y;
      }
    } else {
      mushu.hasRings = true;
      stageTwoIntroScene.ringVisible = false;
    }
  } else {
    ofer.x = oferSitX + tr * 0.06;
    ofer.y = oferSitY;
    tal.x = talSitX;
    tal.y = talSitY;
    const k = clamp((elapsed - T_STEAL_END) / (TEND - T_STEAL_END), 0, 1);
    const ease = 1 - Math.pow(1 - k, 2.35);
    const sx = stageTwoIntroScene.stealMushuX ?? ringCx;
    const sy = stageTwoIntroScene.stealMushuY ?? (ringCy - tr * 0.12);
    mushu.x = lerp(sx, w * 1.08, ease);
    mushu.y = lerp(sy, h * 0.48, ease);
    mushu.hasRings = true;
    stageTwoIntroScene.ringVisible = false;
  }

  ofer.vx = 0;
  ofer.vy = 0;
  tal.vx = 0;
  tal.vy = 0;
  mushu.vx = 0;
  mushu.vy = 0;

  let captionIndex = 0;
  if (elapsed >= T_STEAL_END) captionIndex = 3;
  else if (elapsed >= T_A) captionIndex = 2;
  else if (elapsed >= T3) captionIndex = 1;
  if (captionIndex !== stageTwoIntroScene.captionIndex){
    stageTwoIntroScene.captionIndex = captionIndex;
    if (captionIndex === 0){
      setCutsceneOverlay(`טל מצטרפת (👏🏼👏🏼👏🏼)`);
    } else if (captionIndex === 1){
      setCutsceneOverlay(`עופר: "את לא מבינה מה קרה.."`);
    } else if (captionIndex === 2){
      setCutsceneOverlay(`עופר: "הוצאתי את הטבעת.. ככה.. ואז"`);
    } else {
      setCutsceneOverlay(`מושו מכה שנית!`);
    }
  }

  if (elapsed >= stageTwoIntroScene.durationSec){
    finishStageTwoIntroScene();
  }
}

function startStageThreeIntroScene(){
  stageOneIntroScene.active = false;
  stageTwoIntroScene.active = false;
  if (demoRafId) {
    cancelAnimationFrame(demoRafId);
    demoRafId = 0;
  }

  if (joystickEl) joystickEl.classList.remove('joystick--onStart');
  mountGameIntoAppShell();
  resetJoystickVisual();
  setJoystickHidden(true);
  setHidden(startUI, true);
  setHidden(endUI, true);
  setHidden(stageUI, true);
  setHidden(chaosEl, true);
  setHidden(hudRow, true);
  setQuip('');
  if (devBackToStartBtn) setHidden(devBackToStartBtn, false);

  world.celebrationMode = false;
  world.playEnabled = false;
  world.endReason = '';
  // Cutscene must not inherit Bride Rage from stage-2 gameplay (Tal sticker + radius).
  clearChaosEffects();
  tal.r = 20;
  world.stageIndex = StageId.STAGE_3;
  applyStageParams(getStageCfg(StageId.STAGE_3));
  bgCache = null;
  obstacles.length = 0;
  particles.length = 0;
  resizeCanvas();
  syncWorldToCanvasSize();

  const now = nowSec();
  const w = world.w || canvas.width;
  const h = world.h || canvas.height;
  world.t = now;
  world.lastT = now;
  world.dt = 0;

  const cx = w * 0.5;
  const yWalk0 = h * 0.88;
  const yWalk1 = h * 0.35;

  ofer.x = w * 0.43;
  ofer.y = yWalk0;
  ofer.vx = 0;
  ofer.vy = 0;

  tal.visible = true;
  tal.x = w * 0.57;
  tal.y = yWalk0 - 10;
  tal.vx = 0;
  tal.vy = 0;

  mushu.x = w * 0.5;
  mushu.y = h * 1.22;
  mushu.vx = 0;
  mushu.vy = 0;
  mushu.hasRings = false;

  stageThreeIntroScene.active = true;
  stageThreeIntroScene.startedAt = now;
  stageThreeIntroScene.durationSec = STAGE3_INTRO_SCENE_DURATION;
  stageThreeIntroScene.captionIndex = -1;
  stageThreeIntroScene.talAngry = false;
  stageThreeIntroScene.talFireSpitUntil = 0;
  stageThreeIntroScene.fireAcc = 0;
  stageThreeIntroScene.impactAcc = 0;

  state = GameState.CUTSCENE;
  stopStagePlayMusic();
  void ensureAudioUnlocked().then(() => { startIntroSceneMusic(); });
  updateStageThreeIntroScene();
  startLoopIfNeeded();
}

function finishStageThreeIntroScene(){
  stageThreeIntroScene.active = false;
  stageThreeIntroScene.talAngry = false;
  stageThreeIntroScene.talFireSpitUntil = 0;
  stageThreeIntroScene.fireAcc = 0;
  stageThreeIntroScene.impactAcc = 0;
  hideCutsceneOverlay();
  setHidden(hudRow, false);
  startStageImmediately(StageId.STAGE_3);
}

function updateStageThreeIntroScene(dt = world.dt || 0){
  if (!stageThreeIntroScene.active) return;

  const elapsed = clamp(world.t - stageThreeIntroScene.startedAt, 0, stageThreeIntroScene.durationSec);
  const w = world.w || canvas.width;
  const h = world.h || canvas.height;
  const cx = w * 0.5;
  const yWalk0 = h * 0.88;
  const yWalk1 = h * 0.35;
  const oferNormalX = cx - 38;
  const talNormalX  = cx + 38;
  const oferQuestionX = cx - 65;
  const talQuestionX  = cx + 65;
  const pairCx = cx;
  const pairCy = yWalk1 - 12;
  const orbitRx = Math.max(112, Math.min(w, h) * 0.24);
  const orbitRy = orbitRx * 0.52;

  const T1 = 5.5;
  const T2 = 8.6;
  const T3 = 9.12;
  const T4 = 13.45;
  const TEND = stageThreeIntroScene.durationSec;
  const orbitLaps = 1.7;

  if (elapsed < T1){
    const k = elapsed / T1;
    ofer.x = lerp(w * 0.43, oferNormalX, k);
    ofer.y = lerp(yWalk0, yWalk1, k) + Math.sin(elapsed * 5.5) * 2;
    tal.visible = true;
    tal.x = lerp(w * 0.57, talNormalX, k);
    tal.y = lerp(yWalk0 - 10, yWalk1 - 6, k) + Math.sin(elapsed * 5.2 + 0.4) * 2;
    mushu.x = w * 0.5;
    mushu.y = h * 1.22;
    mushu.hasRings = false;
  } else if (elapsed < T2){
    const t = elapsed - T1;
    const spread = clamp(t / 0.6, 0, 1);
    ofer.x = lerp(oferNormalX, oferQuestionX, spread) + Math.sin(t * 2.8) * 5;
    ofer.y = yWalk1 + Math.sin(t * 3.1) * 2;
    tal.x = lerp(talNormalX, talQuestionX, spread) + Math.cos(t * 2.6) * 5;
    tal.y = yWalk1 - 6 + Math.sin(t * 2.9) * 2;
    mushu.x = w * 0.5;
    mushu.y = h * 1.22;
    mushu.hasRings = false;
  } else if (elapsed < T3){
    const u = clamp((elapsed - T2) / (T3 - T2), 0, 1);
    const ease = 1 - Math.pow(1 - u, 1.85);
    ofer.x = oferQuestionX + Math.sin((elapsed - T2) * 2.2) * 4;
    ofer.y = yWalk1;
    tal.x = talQuestionX + Math.cos((elapsed - T2) * 2.0) * 4;
    tal.y = yWalk1 - 6;
    const ang0 = -Math.PI * 0.55;
    const x0 = pairCx + Math.cos(ang0) * orbitRx;
    const y0 = pairCy + Math.sin(ang0) * orbitRy;
    mushu.x = lerp(w * -0.06, x0, ease);
    mushu.y = lerp(h * 0.72, y0, ease);
    mushu.hasRings = true;
  } else if (elapsed < T4){
    const orbitT = clamp((elapsed - T3) / (T4 - T3), 0, 1);
    const ang = -Math.PI * 0.55 + orbitT * Math.PI * 2 * orbitLaps;
    ofer.x = oferQuestionX + Math.sin((elapsed - T2) * 1.9) * 3;
    ofer.y = yWalk1;
    tal.x = talQuestionX + Math.cos((elapsed - T2) * 1.85) * 3;
    tal.y = yWalk1 - 6;
    mushu.x = pairCx + Math.cos(ang) * orbitRx;
    mushu.y = pairCy + Math.sin(ang) * orbitRy;
    mushu.hasRings = true;
  } else {
    const fleeT = clamp((elapsed - T4) / (TEND - T4), 0, 1);
    const fleeEase = Math.pow(fleeT, 0.72);
    const angEnd = -Math.PI * 0.55 + orbitLaps * Math.PI * 2;
    const flee0x = pairCx + Math.cos(angEnd) * orbitRx;
    const flee0y = pairCy + Math.sin(angEnd) * orbitRy;
    ofer.x = oferQuestionX + Math.sin((elapsed - T2) * 1.6) * 2.5;
    ofer.y = yWalk1;
    tal.x = talQuestionX + Math.cos((elapsed - T2) * 1.55) * 2.5;
    tal.y = yWalk1 - 6;
    const fleeTargetX = lerp(flee0x, pairCx, fleeEase * 0.35);
    const fleeTargetY = h * 1.3;
    mushu.x = fleeTargetX;
    mushu.y = lerp(flee0y, fleeTargetY, fleeEase);
    mushu.hasRings = true;
  }

  if (stageThreeIntroScene.talAngry){
    const flinch = 1;
    ofer.x += Math.sin(world.t * 38) * 2.4 * flinch;
    ofer.y += Math.cos(world.t * 31) * 1.5 * flinch;
  }

  ofer.vx = 0;
  ofer.vy = 0;
  tal.vx = 0;
  tal.vy = 0;
  mushu.vx = 0;
  mushu.vy = 0;

  let captionIndex = 0;
  if (elapsed >= T4) captionIndex = 3;
  else if (elapsed >= T3) captionIndex = 2;
  else if (elapsed >= T1) captionIndex = 1;
  if (captionIndex !== stageThreeIntroScene.captionIndex){
    stageThreeIntroScene.captionIndex = captionIndex;
    if (captionIndex === 0){
      setCutsceneOverlay(`טל ועופר צועדים במעלה החופה.`);
    } else if (captionIndex === 1){
      setCutsceneOverlay(`רגע… איפה הטבעת?`);
    } else if (captionIndex === 2){
      stageThreeIntroScene.talAngry = true;
      stageThreeIntroScene.talFireSpitUntil = stageThreeIntroScene.startedAt + stageThreeIntroScene.durationSec;
      stageThreeIntroScene.fireStartAt = world.t + 1.0;
      stageThreeIntroScene.fireAcc = 0;
      stageThreeIntroScene.impactAcc = 0;
      setCutsceneOverlay(`מושו!`);
    }
  }

  if (stageThreeIntroScene.talAngry && world.t >= stageThreeIntroScene.fireStartAt){
    const talVr = tal.r * (tal.renderScale ?? 1);
    const mouthX = tal.x - talVr * 0.58;
    const mouthY = tal.y + talVr * 0.62;
    const hitX = ofer.x + ofer.r * 0.10;
    const hitY = ofer.y + ofer.r * 0.58;
    const dirX = hitX - mouthX;
    const dirY = hitY - mouthY;
    const dirLen = Math.hypot(dirX, dirY) || 1;
    const beamDirX = dirX / dirLen;
    const beamDirY = dirY / dirLen;
    const beamEndX = hitX + beamDirX * Math.max(world.w * 0.42, 170);
    const beamEndY = hitY + beamDirY * Math.max(world.h * 0.22, 90);
    stageThreeIntroScene.fireAcc += dt * 220;
    while (stageThreeIntroScene.fireAcc >= 1){
      stageThreeIntroScene.fireAcc -= 1;
      const t = Math.random();
      const spawnX = mouthX + dirX * t;
      const spawnY = mouthY + dirY * t;
      spawnFire(spawnX, spawnY, beamDirX + rand(-0.12, 0.12), beamDirY + rand(-0.12, 0.12), rand(30, 80));
    }

    stageThreeIntroScene.impactAcc += dt * 28;
    while (stageThreeIntroScene.impactAcc >= 1){
      stageThreeIntroScene.impactAcc -= 1;
      spawnFire(
        hitX + rand(-10, 10),
        hitY + rand(-12, 12),
        beamDirX + rand(-0.18, 0.08),
        beamDirY + rand(-0.25, 0.12),
        rand(80, 170)
      );
    }
  }

  updateParticles(dt);

  if (elapsed >= stageThreeIntroScene.durationSec){
    finishStageThreeIntroScene();
  }
}

function scheduleStageStart(stageIndex, { showHowTo }){
  pendingStageIndex = stageIndex;
  const cfg = getStageCfg(stageIndex);

  // Show overlay and schedule start.
  const t = nowSec();
  const totalDelay = showHowTo ? 5.0 : 3.0; // includes countdown
  stageStartAt = t + totalDelay;
  countdownFromAt = stageStartAt - 3.0;
  celebrationStartAt = 0;

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
  celebrationStartAt = 0;
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
    chaosInitialDelaySec: cfg.chaosInitialDelaySec,
    chaosEventMinMs: cfg.chaosEventMinMs ?? DEFAULT_CHAOS_EVENT_MIN_MS,
    chaosEventMaxMs: cfg.chaosEventMaxMs ?? DEFAULT_CHAOS_EVENT_MAX_MS,
    chaosWeights: cfg.chaosWeights,
    chaosSequence: cfg.chaosSequence,
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
    // Indoor hall: use provided background image, fallback to gradient + dance floor if not loaded yet.
    const drew = drawImageCover(levelTwoBgImg);
    if (!drew){
      const wall = g.createLinearGradient(0, 0, 0, h);
      wall.addColorStop(0, '#2b2a2f');
      wall.addColorStop(0.32, '#34333c');
      wall.addColorStop(0.62, '#1e1e24');
      wall.addColorStop(1, '#121216');
      g.fillStyle = wall;
      g.fillRect(0, 0, w, h);

      const vig = g.createRadialGradient(w * 0.5, h * 0.45, Math.min(w, h) * 0.10, w * 0.5, h * 0.45, Math.max(w, h) * 0.95);
      vig.addColorStop(0, 'rgba(255,255,255,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.42)');
      g.fillStyle = vig;
      g.fillRect(0, 0, w, h);
    }

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
// On-screen joystick input (pointer)
// =============================
const joystick = {
  active: false,
  pointerId: null,
  x: 0, // normalized [-1..1]
  y: 0, // normalized [-1..1]
};

function setJoystickHidden(hidden){
  if (!joystickEl) return;
  joystickEl.classList.toggle('isHidden', !!hidden);
}

function resetJoystickVisual(){
  joystick.active = false;
  joystick.pointerId = null;
  joystick.x = 0;
  joystick.y = 0;
  if (joystickKnobEl){
    joystickKnobEl.style.transition = 'transform 90ms ease-out';
    joystickKnobEl.style.transform = 'translate(-50%, -50%)';
  }
}

function updateJoystickFromClientPoint(clientX, clientY){
  if (!joystickBaseEl || !joystickKnobEl) return;
  const rect = joystickBaseEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  // Max knob travel in CSS pixels.
  const knobR = 22; // matches .joystickKnob (44px)
  const pad = 10;
  const max = Math.max(10, (rect.width / 2) - knobR - pad);

  let dx = clientX - cx;
  let dy = clientY - cy;
  const d = Math.hypot(dx, dy) || 1;
  if (d > max){
    const s = max / d;
    dx *= s;
    dy *= s;
  }

  joystick.x = clamp(dx / max, -1, 1);
  joystick.y = clamp(dy / max, -1, 1);

  joystickKnobEl.style.transform = `translate(-50%, -50%) translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
}

function onJoystickPointerDown(e){
  const allowed = state === GameState.PLAYING && world.playEnabled || state === GameState.IDLE;
  if (!allowed) return;
  if (!joystickBaseEl || !joystickKnobEl) return;
  if (joystick.active) return;
  if (state === GameState.IDLE){
    void Promise.all([ensureAudioUnlocked(), primeHtmlAudioElements()]);
  }

  joystick.active = true;
  joystick.pointerId = e.pointerId;
  joystickKnobEl.style.transition = 'none';

  joystickBaseEl.setPointerCapture?.(e.pointerId);
  updateJoystickFromClientPoint(e.clientX, e.clientY);
}

function onJoystickPointerMove(e){
  if (!joystick.active) return;
  if (e.pointerId !== joystick.pointerId) return;
  updateJoystickFromClientPoint(e.clientX, e.clientY);
}

function onJoystickPointerUp(e){
  if (!joystick.active) return;
  if (e.pointerId !== joystick.pointerId) return;
  resetJoystickVisual();
}

if (joystickBaseEl){
  joystickBaseEl.addEventListener('pointerdown', onJoystickPointerDown, { passive: true });
  joystickBaseEl.addEventListener('pointermove', onJoystickPointerMove, { passive: true });
  joystickBaseEl.addEventListener('pointerup', onJoystickPointerUp, { passive: true });
  joystickBaseEl.addEventListener('pointercancel', onJoystickPointerUp, { passive: true });
}

function onCelebrationCanvasPointerDown(e){
  if (!world.celebrationMode || state !== GameState.PLAYING) return;
  const pt = clientPointToCanvas(e.clientX, e.clientY);
  const slot = getCelebrationBottleAtPoint(pt.x, pt.y);
  if (!slot) return;
  e.preventDefault();
  handleCelebrationBottleClick(slot);
}

canvas.addEventListener('pointerdown', onCelebrationCanvasPointerDown, { passive: false });

// =============================
// Demo on start screen: joystick moves Ofer, catch Mushu
// =============================
const demoOfer = { x: 0, y: 0, vx: 0, vy: 0, r: 22 };
const demoMushu = { x: 0, y: 0, vx: 0, vy: 0, r: 18 };
let demoCaught = false;
let demoResetAt = 0;
let demoTimerStarted = false;
let demoTimeLeft = 0;
const DEMO_CATCH_SHOW_SEC = 1.2; /* celebration then go straight to stage 1 (no countdown) */

function initDemoPositions(){
  const w = canvas.width || 400;
  const h = canvas.height || 700;
  const m = 40;
  demoOfer.x = w * 0.5;
  demoOfer.y = h * 0.78;
  demoOfer.vx = 0;
  demoOfer.vy = 0;
  demoMushu.x = w * 0.5;
  demoMushu.y = h * 0.35;
  demoMushu.vx = 45;
  demoMushu.vy = 30;
  demoCaught = false;
  demoResetAt = 0;
  demoTimerStarted = false;
}

function startGameFromDemoCatch(){
  ensureAudioUnlocked().then(() => { if (audio) audio.sfx.win(); });
  startStageOneIntroScene();
}

function updateDemo(dt){
  if (demoCaught){
    if (nowSec() >= demoResetAt) {
      startGameFromDemoCatch();
    }
    return;
  }

  // Start demo timer on first joystick touch
  if (joystick.active && !demoTimerStarted) {
    demoTimerStarted = true;
  }
  if (demoTimerStarted) {
    demoTimeLeft = clamp(demoTimeLeft - dt, 0, 999);
    if (timerEl) timerEl.textContent = demoTimeLeft.toFixed(1);
  }

  // Steer demo Ofer from joystick (same logic as steerOfer)
  if (joystick.active){
    let x = joystick.x;
    let y = joystick.y;
    const m = Math.hypot(x, y);
    const dead = 0.12;
    if (m > dead){
      const strength = clamp((m - dead) / (1 - dead), 0, 1);
      const inv = 1 / (m || 1);
      x *= inv;
      y *= inv;
      const accel = 2000;
      demoOfer.vx += x * accel * strength * dt;
      demoOfer.vy += y * accel * strength * dt;
    }
  }

  demoOfer.vx *= 0.92;
  demoOfer.vy *= 0.92;
  demoOfer.x += demoOfer.vx * dt;
  demoOfer.y += demoOfer.vy * dt;

  // Mushu wanders slowly; repel from Ofer when close so he doesn't get stuck
  const dx = demoMushu.x - demoOfer.x;
  const dy = demoMushu.y - demoOfer.y;
  const d2 = dist2(demoOfer.x, demoOfer.y, demoMushu.x, demoMushu.y);
  const repelRadius = 38;
  if (d2 > 0 && d2 < repelRadius * repelRadius) {
    const d = Math.sqrt(d2);
    const nx = dx / d;
    const ny = dy / d;
    const strength = (1 - d / repelRadius) * 45;
    demoMushu.vx += nx * strength;
    demoMushu.vy += ny * strength;
  }
  demoMushu.x += demoMushu.vx * dt;
  demoMushu.y += demoMushu.vy * dt;
  const w = canvas.width || 400;
  const h = canvas.height || 700;
  const margin = 50;
  if (demoMushu.x < margin || demoMushu.x > w - margin) demoMushu.vx *= -1;
  if (demoMushu.y < margin || demoMushu.y > h - margin) demoMushu.vy *= -1;
  demoMushu.x = clamp(demoMushu.x, margin, w - margin);
  demoMushu.y = clamp(demoMushu.y, margin, h - margin);

  const m = ARENA_MARGIN;
  demoOfer.x = clamp(demoOfer.x, m + demoOfer.r, w - m - demoOfer.r);
  demoOfer.y = clamp(demoOfer.y, m + demoOfer.r, h - m - demoOfer.r);

  const rr = demoOfer.r + demoMushu.r;
  if (dist2(demoOfer.x, demoOfer.y, demoMushu.x, demoMushu.y) <= rr * rr){
    demoCaught = true;
    demoResetAt = nowSec() + DEMO_CATCH_SHOW_SEC;
  }
}

function renderDemo(){
  const w = canvas.width;
  const h = canvas.height;
  if (!w || !h) return;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (levelThreeBgImg.naturalWidth){
    const iw = levelThreeBgImg.naturalWidth, ih = levelThreeBgImg.naturalHeight;
    const s = Math.max(w / iw, h / ih);
    ctx.drawImage(levelThreeBgImg, (w - iw * s) / 2, (h - ih * s) / 2, iw * s, ih * s);
  } else {
    ctx.fillStyle = '#fffaf3';
    ctx.fillRect(0, 0, w, h);
  }

  if (demoCaught){
    ctx.font = '900 32px ui-rounded, system-ui, -apple-system, Segoe UI, Roboto, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,250,243,.95)';
    ctx.strokeStyle = 'rgba(18,49,28,.5)';
    ctx.lineWidth = 6;
    const msg = 'תפסת! 🎉';
    ctx.strokeText(msg, w / 2, h / 2);
    ctx.fillText(msg, w / 2, h / 2);
    return;
  }

  // Draw Mushu then Ofer (same drawBody style, simplified)
  function drawDemoBody(b, label, color){
    const vr = b.r * 1.3;
    ctx.fillStyle = 'rgba(0,0,0,.25)';
    ctx.beginPath();
    ctx.ellipse(b.x, b.y + vr * 0.85, vr * 0.95, vr * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
    const img = (b === demoOfer) ? oferStickerImg : mushuStickerImg;
    if (isImgReady(img)){
      const targetW = vr * 3.0;
      const scale = targetW / img.naturalWidth;
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, b.x - dw / 2, b.y - dh / 2, dw, dh);
    } else {
      const g = ctx.createRadialGradient(b.x - vr * 0.35, b.y - vr * 0.35, 2, b.x, b.y, vr * 1.2);
      g.addColorStop(0, 'rgba(255,255,255,.18)');
      g.addColorStop(0.25, color);
      g.addColorStop(1, 'rgba(0,0,0,.2)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(b.x, b.y, vr, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.16)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.font = '800 14px ui-rounded, system-ui, -apple-system, Segoe UI, Roboto, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = 'rgba(255,250,243,.85)';
    ctx.fillText(label, b.x, b.y - vr - 4);
  }

  drawDemoBody(demoMushu, 'מושו 🐶', '#ff4fd8');
  drawDemoBody(demoOfer, 'עופר 🤵', '#3cffb0');
}

function demoLoop(){
  if (state !== GameState.IDLE){
    demoRafId = 0;
    return;
  }
  const t = nowSec();
  if (!demoLoop.lastT) demoLoop.lastT = t;
  const dt = clamp(t - demoLoop.lastT, 0, 1 / 30);
  demoLoop.lastT = t;

  updateDemo(dt);
  renderDemo();

  demoRafId = requestAnimationFrame(demoLoop);
}

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

// iOS requires HTMLAudioElement.play() to be called directly inside a user gesture.
// We prime every music element silently on the first touch so subsequent play() calls succeed.
let _htmlAudioPrimed = false;
async function primeHtmlAudioElements(){
  if (_htmlAudioPrimed) return;
  _htmlAudioPrimed = true;
  const elements = [
    getIntroSceneMusicEl(),
    getStagePlayMusicEl(),
    getStage2BassChaosMusicEl(),
    getBrideRageChaosMusicEl(),
    getCelebrationMusicEl(),
  ];
  // Application Security Requirement: parallel priming keeps all play() calls within
  // the iOS user-gesture window; sequential awaits would expire it for later elements.
  await Promise.all(elements.map(async el => {
    try {
      el.muted = true;
      await el.play();
      el.pause();
      el.currentTime = 0;
      el.muted = false;
    } catch (_e){ el.muted = false; }
  }));
}

const INTRO_SCENE_MUSIC_URL = 'assets/audio/gameplay/monkeys-spinning-monkeys.m4a';
let introSceneMusicEl = null;

function getIntroSceneMusicEl(){
  if (!introSceneMusicEl){
    introSceneMusicEl = new Audio(INTRO_SCENE_MUSIC_URL);
    introSceneMusicEl.loop = true;
    introSceneMusicEl.preload = 'auto';
    introSceneMusicEl.volume = 0.48;
  }
  return introSceneMusicEl;
}

function stopIntroSceneMusic(){
  if (!introSceneMusicEl) return;
  try {
    introSceneMusicEl.pause();
    introSceneMusicEl.currentTime = 0;
  } catch (_e) {
    /* ignore */
  }
}

function startIntroSceneMusic(){
  const el = getIntroSceneMusicEl();
  void el.play().catch(() => {});
}

const STAGE_PLAY_MUSIC_URL = 'assets/audio/gameplay/8bit.m4a';
let stagePlayMusicEl = null;

function getStagePlayMusicEl(){
  if (!stagePlayMusicEl){
    stagePlayMusicEl = new Audio(STAGE_PLAY_MUSIC_URL);
    stagePlayMusicEl.loop = true;
    stagePlayMusicEl.preload = 'auto';
    stagePlayMusicEl.volume = 0.48;
  }
  return stagePlayMusicEl;
}

function stopStagePlayMusic(){
  if (!stagePlayMusicEl) return;
  try {
    stagePlayMusicEl.pause();
    stagePlayMusicEl.currentTime = 0;
  } catch (_e) {
    /* ignore */
  }
}

function startStagePlayMusic(){
  const el = getStagePlayMusicEl();
  void el.play().catch(() => {});
}

function stopPreCelebrationRunMusic(){
  stopIntroSceneMusic();
  stopStagePlayMusic();
  stopStage2BassChaosMusic();
  stopBrideRageChaosMusic();
}

/** Short Timelapse clip (first 5s), layered on stage-2 8bit during "רעידת באס" chaos. */
const STAGE_2_BASS_CHAOS_MUSIC_URL = 'assets/audio/chaos/timelapse-bass-5s.m4a';
let stage2BassChaosMusicEl = null;

function getStage2BassChaosMusicEl(){
  if (!stage2BassChaosMusicEl){
    stage2BassChaosMusicEl = new Audio(STAGE_2_BASS_CHAOS_MUSIC_URL);
    stage2BassChaosMusicEl.loop = false;
    stage2BassChaosMusicEl.preload = 'auto';
    stage2BassChaosMusicEl.volume = 0.36;
  }
  return stage2BassChaosMusicEl;
}

function stopStage2BassChaosMusic(){
  if (!stage2BassChaosMusicEl) return;
  try {
    stage2BassChaosMusicEl.pause();
    stage2BassChaosMusicEl.currentTime = 0;
  } catch (_e) {
    /* ignore */
  }
}

function startStage2BassChaosMusic(){
  const el = getStage2BassChaosMusicEl();
  el.currentTime = 0;
  void el.play().catch(() => {});
}

/** Volatile Reaction 10s–15s (5s), layered during "הכלה זועמת" chaos on stages 2–3. */
const BRIDE_RAGE_CHAOS_MUSIC_URL = 'assets/audio/chaos/volatile-bride-rage-5s.m4a';
let brideRageChaosMusicEl = null;

function getBrideRageChaosMusicEl(){
  if (!brideRageChaosMusicEl){
    brideRageChaosMusicEl = new Audio(BRIDE_RAGE_CHAOS_MUSIC_URL);
    brideRageChaosMusicEl.loop = false;
    brideRageChaosMusicEl.preload = 'auto';
    brideRageChaosMusicEl.volume = 0.36;
  }
  return brideRageChaosMusicEl;
}

function stopBrideRageChaosMusic(){
  if (!brideRageChaosMusicEl) return;
  try {
    brideRageChaosMusicEl.pause();
    brideRageChaosMusicEl.currentTime = 0;
  } catch (_e) {
    /* ignore */
  }
}

function startBrideRageChaosMusic(){
  const el = getBrideRageChaosMusicEl();
  el.currentTime = 0;
  void el.play().catch(() => {});
}

const CELEBRATION_MUSIC_URL = 'assets/audio/celebration/more-than-you-know.m4a';
let celebrationMusicEl = null;

function getCelebrationMusicEl(){
  if (!celebrationMusicEl){
    celebrationMusicEl = new Audio(CELEBRATION_MUSIC_URL);
    celebrationMusicEl.loop = true;
    celebrationMusicEl.preload = 'auto';
    celebrationMusicEl.volume = 0.52;
  }
  return celebrationMusicEl;
}

function stopCelebrationMusic(){
  if (!celebrationMusicEl) return;
  try {
    celebrationMusicEl.pause();
    celebrationMusicEl.currentTime = 0;
  } catch (_e) {
    /* ignore */
  }
}

function startCelebrationMusic(){
  const el = getCelebrationMusicEl();
  el.currentTime = 0;
  void el.play().catch(() => {});
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
  chaosBannerUntil: 0,
  chaosSequenceIndex: 0,
  instructionsUntil: 0,
  shakeUntil: 0,

  mushuBoost: 1,
  brideRage: false,
  fireTrailAcc: 0,

  caught: false,
  endReason: '',

  celebrationMode: false,
  celebrationUntil: 0,
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
  currentAngle: 0,
  wanderAngle: 0,
  wanderUntil: 0,
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

const CELEBRATION_BOTTLES = [
  { id: 'acai', label: 'אסאי', img: bottleAcaiImg },
  { id: 'arak', label: 'ערק', img: bottleArakImg },
  { id: 'gin', label: 'ג׳ין', img: bottleGinImg },
  { id: 'tubi', label: 'טובי 60', img: bottleTubiImg },
];

const celebration = {
  scoreDrawerOpen: false,
  bottleAssignments: new Map(),
  clickStreak: 0,
  theftBottleId: null,
  theftReturnAt: 0,
  mushuTheftState: 'idle',
  mushuTargetX: 0,
  mushuTargetY: 0,
  mushuExitX: 0,
  mushuExitY: 0,
  mushuCarryBottleId: null,
  promptShownCount: 0,
  promptLastId: null,
};

function getCelebrationBottleAsset(id){
  return CELEBRATION_BOTTLES.find((bottle) => bottle.id === id) || null;
}

function setCelebrationUiVisible(visible){
  if (!celebrationUI) return;
  setHidden(celebrationUI, !visible);
}

function setCelebrationResultDrawerOpen(open){
  celebration.scoreDrawerOpen = !!open;
  if (celebrationResultDockEl) celebrationResultDockEl.classList.toggle('isOpen', celebration.scoreDrawerOpen);
  if (celebrationResultBtn) celebrationResultBtn.setAttribute('aria-expanded', celebration.scoreDrawerOpen ? 'true' : 'false');
}

function initCelebrationActorState(actor){
  actor.celebrationState = 'dance';
  actor.celebrationBottleId = null;
  actor.celebrationDrinkUntil = 0;
  actor.celebrationTargetX = actor.x;
  actor.celebrationTargetY = actor.y;
}

function resetCelebrationState(){
  celebration.bottleAssignments.clear();
  celebration.clickStreak = 0;
  celebration.theftBottleId = null;
  celebration.promptShownCount = 0;
  celebration.promptLastId = null;
  celebration.theftReturnAt = 0;
  celebration.mushuTheftState = 'idle';
  celebration.mushuCarryBottleId = null;
  initCelebrationActorState(ofer);
  initCelebrationActorState(tal);
  setCelebrationResultDrawerOpen(false);
  setCelebrationUiVisible(false);
  if (celebrationBottomStackEl) celebrationBottomStackEl.classList.remove('celebrationBottomStack--hidden');
  stopCelebrationMusic();
}

function clearCelebrationTheft(){
  celebration.theftBottleId = null;
  celebration.theftReturnAt = 0;
  celebration.mushuTheftState = 'idle';
  celebration.mushuCarryBottleId = null;
}

function getCelebrationDanceAnchor(actor, t = world.t || 0){
  const w = world.w || canvas.width;
  const h = world.h || canvas.height;
  const cx = w * 0.5;
  const cy = h * 0.39;
  const radius = 48;
  const speed = 0.75;
  const phase = (actor === tal) ? Math.PI : 0;
  return {
    x: cx + Math.cos(t * speed + phase) * radius,
    y: cy + Math.sin(t * speed * 0.85 + phase) * (radius * 0.5),
  };
}

function getCelebrationBarObstacle(){
  if ((world.stageIndex ?? -1) !== StageId.STAGE_2) return null;
  if (!obstacles.length) buildObstacles();
  return obstacles.find((o) => o.type === 'bar') || null;
}

function getCelebrationBottleSlots(){
  const bar = getCelebrationBarObstacle();
  if (!bar) return [];
  const w = world.w || canvas.width;
  const h = world.h || canvas.height;
  const count = CELEBRATION_BOTTLES.length;
  const slotDuration = 2.0;
  const cyclePos = (world.t || 0) % (count * slotDuration);
  const slotFraction = cyclePos % slotDuration;
  const featuredIndex = slotFraction < 1.0 ? Math.floor(cyclePos / slotDuration) : -1;
  const usableLeft = bar.x + bar.w * 0.20;
  const usableRight = bar.x + bar.w * 0.80;
  const shelfY = bar.y + bar.h * 0.75;
  // Stand just in front of the bar (small gap below bar hitbox — closer than before).
  const standBelowBar = clamp(h * 0.028, 12, 26);
  const actorY = clamp(bar.y + bar.h + standBelowBar, ARENA_MARGIN + 34, h - ARENA_MARGIN - 34);

  return CELEBRATION_BOTTLES.map((bottle, index) => {
    const mix = (count <= 1) ? 0.5 : (index / (count - 1));
    const x = lerp(usableLeft, usableRight, mix);
    const phase = (world.t || 0) * 5.1 + index * 0.75;
    const featured = index === featuredIndex;
    const bob = featured ? (Math.sin(phase * 1.6) * 6 - 7) : (Math.sin(phase) * 1.8);
    const maxW = clamp(bar.w * 0.20, 57, 123);
    const maxH = clamp(bar.h * 1.56, 90, 195);
    const renderRect = isImgReady(bottle.img)
      ? imgContainDims(bottle.img, x, shelfY + bob, maxW, maxH, 'bottom')
      : { x: x - maxW / 2, y: shelfY + bob - maxH, w: maxW, h: maxH };
    return {
      ...bottle,
      x,
      y: shelfY + bob,
      featured,
      glow: featured ? 0.92 : (0.32 + 0.12 * Math.sin(phase)),
      renderRect,
      targetX: clamp(x, ARENA_MARGIN + 30, w - ARENA_MARGIN - 30),
      targetY: actorY,
      occupiedBy: celebration.bottleAssignments.get(bottle.id) || null,
      blockedByTheft: bottle.id === celebration.theftBottleId,
      hiddenByTheft: bottle.id === celebration.mushuCarryBottleId,
    };
  });
}

function getCelebrationBottleAtPoint(x, y){
  const slots = getCelebrationBottleSlots();
  for (let i = slots.length - 1; i >= 0; i--){
    const slot = slots[i];
    if (slot.occupiedBy || slot.blockedByTheft || slot.hiddenByTheft) continue;
    const pad = 18;
    const r = slot.renderRect;
    if (x >= r.x - pad && x <= r.x + r.w + pad && y >= r.y - pad && y <= r.y + r.h + pad) return slot;
  }
  return null;
}

function moveBodyToward(body, tx, ty, speed, dt){
  const dx = tx - body.x;
  const dy = ty - body.y;
  const d = Math.hypot(dx, dy);
  if (d <= Math.max(4, speed * dt)){
    body.x = tx;
    body.y = ty;
    body.vx = 0;
    body.vy = 0;
    return true;
  }
  const inv = 1 / (d || 1);
  body.x += dx * inv * speed * dt;
  body.y += dy * inv * speed * dt;
  body.vx = 0;
  body.vy = 0;
  return false;
}

function pickCelebrationActor(slot){
  const freeActors = [ofer, tal].filter((actor) => actor.celebrationState === 'dance');
  if (!freeActors.length) return null;
  freeActors.sort((a, b) => Math.abs(a.x - slot.targetX) - Math.abs(b.x - slot.targetX));
  return freeActors[0];
}

function assignCelebrationDrink(slot){
  if (!slot || celebration.bottleAssignments.has(slot.id) || celebration.theftBottleId === slot.id) return false;
  const actor = pickCelebrationActor(slot);
  if (!actor) return false;
  celebration.bottleAssignments.set(slot.id, actor);
  actor.celebrationState = 'toBottle';
  actor.celebrationBottleId = slot.id;
  actor.celebrationDrinkUntil = 0;
  actor.celebrationTargetX = slot.targetX;
  actor.celebrationTargetY = slot.targetY;
  spawnConfetti(12, slot.targetX, slot.targetY - 26, 140);
  return true;
}

function startCelebrationBottleTheft(slot){
  const w = world.w || canvas.width;
  const side = (slot.targetX < w * 0.5) ? -1 : 1;
  celebration.clickStreak = 0;
  celebration.theftBottleId = slot.id;
  celebration.theftReturnAt = 0;
  celebration.mushuCarryBottleId = null;
  celebration.mushuTheftState = 'entering';
  celebration.mushuTargetX = slot.targetX;
  celebration.mushuTargetY = slot.targetY + 2;
  celebration.mushuExitX = (side < 0) ? (-mushu.r * 4) : (w + mushu.r * 4);
  celebration.mushuExitY = clamp(slot.targetY + 18, ARENA_MARGIN + mushu.r, (world.h || canvas.height) - ARENA_MARGIN - mushu.r);
  mushu.x = (side < 0) ? (-mushu.r * 4) : (w + mushu.r * 4);
  mushu.y = celebration.mushuExitY;
  mushu.vx = 0;
  mushu.vy = 0;
  mushu.hasRings = false;
  spawnConfetti(18, slot.targetX, slot.targetY - 18, 180);
}

function handleCelebrationBottleClick(slot){
  if (!slot || slot.occupiedBy || slot.blockedByTheft || slot.hiddenByTheft) return false;
  celebration.clickStreak += 1;
  if (celebration.clickStreak >= CELEBRATION_STEAL_EVERY_CLICKS && celebration.mushuTheftState === 'idle' && !celebration.theftBottleId){
    startCelebrationBottleTheft(slot);
    return true;
  }
  const assigned = assignCelebrationDrink(slot);
  if (!assigned) celebration.clickStreak = Math.max(0, celebration.clickStreak - 1);
  return assigned;
}

function updateCelebrationActor(actor, anchor, slots, dt){
  const activeSlot = actor.celebrationBottleId
    ? (slots.find((slot) => slot.id === actor.celebrationBottleId) || null)
    : null;
  if (activeSlot){
    actor.celebrationTargetX = activeSlot.targetX;
    actor.celebrationTargetY = activeSlot.targetY;
  }

  if (actor.celebrationState === 'toBottle'){
    if (!activeSlot){
      actor.celebrationState = 'returning';
    } else if (moveBodyToward(actor, actor.celebrationTargetX, actor.celebrationTargetY, CELEBRATION_WALK_SPEED, dt)){
      actor.celebrationState = 'drinking';
      actor.celebrationDrinkUntil = world.t + CELEBRATION_DRINK_SEC;
    }
    return;
  }

  if (actor.celebrationState === 'drinking'){
    actor.x = lerp(actor.x, actor.celebrationTargetX, clamp(dt * 10, 0, 1));
    actor.y = actor.celebrationTargetY + Math.sin((world.t || 0) * 8.5 + (actor === tal ? 1.4 : 0)) * 4;
    if ((world.t || 0) >= (actor.celebrationDrinkUntil || 0)){
      if (actor.celebrationBottleId) celebration.bottleAssignments.delete(actor.celebrationBottleId);
      actor.celebrationBottleId = null;
      actor.celebrationState = 'returning';
    }
    return;
  }

  if (actor.celebrationState === 'returning'){
    if (moveBodyToward(actor, anchor.x, anchor.y, CELEBRATION_WALK_SPEED * 1.06, dt)){
      initCelebrationActorState(actor);
    }
    return;
  }

  actor.x = anchor.x;
  actor.y = anchor.y;
  actor.vx = 0;
  actor.vy = 0;
}

function updateCelebrationMushuTheft(dt, slots){
  if (celebration.theftBottleId && celebration.theftReturnAt > 0 && world.t >= celebration.theftReturnAt){
    const bottleSlot = slots.find((slot) => slot.id === celebration.theftBottleId);
    if (bottleSlot) spawnConfetti(14, bottleSlot.x, bottleSlot.y - 10, 150);
    clearCelebrationTheft();
    return;
  }

  if (!celebration.theftBottleId || celebration.mushuTheftState === 'idle') return;

  if (celebration.mushuTheftState === 'entering'){
    if (moveBodyToward(mushu, celebration.mushuTargetX, celebration.mushuTargetY, CELEBRATION_MUSHU_STEAL_SPEED, dt)){
      celebration.mushuCarryBottleId = celebration.theftBottleId;
      celebration.theftReturnAt = world.t + CELEBRATION_STOLEN_BOTTLE_RETURN_SEC;
      celebration.mushuTheftState = 'escaping';
      spawnConfetti(16, mushu.x, mushu.y - 12, 180);
    }
    return;
  }

  if (celebration.mushuTheftState === 'escaping'){
    const done = moveBodyToward(mushu, celebration.mushuExitX, celebration.mushuExitY, CELEBRATION_MUSHU_STEAL_SPEED * 1.06, dt);
    const farEnough = (celebration.mushuExitX < 0)
      ? (mushu.x <= celebration.mushuExitX + 6)
      : (mushu.x >= celebration.mushuExitX - 6);
    if (done || farEnough){
      celebration.mushuTheftState = 'idle';
    }
  }
}

function drawCelebrationBottles(){
  const slots = getCelebrationBottleSlots();
  if (!slots.length) return;

  for (const slot of slots){
    if (slot.hiddenByTheft) continue;
    const r = slot.renderRect;

    // Tilt + move the bottle toward the drinker while they're drinking
    let tiltAngle = 0;
    let offsetX = 0;
    let offsetY = 0;
    const drinker = slot.occupiedBy;
    if (drinker && drinker.celebrationState === 'drinking'){
      const dir = drinker.x < slot.x ? -1 : 1;
      const elapsed = CELEBRATION_DRINK_SEC - Math.max(0, (drinker.celebrationDrinkUntil || 0) - (world.t || 0));
      const remaining = Math.max(0, (drinker.celebrationDrinkUntil || 0) - (world.t || 0));
      const rampUp = clamp(elapsed / 0.3, 0, 1);
      const rampDown = clamp(remaining / 0.25, 0, 1);
      const t = rampUp * rampDown;
      tiltAngle = dir * 1.2 * t;
      // Move bottle from shelf down toward drinker's head
      const targetX = drinker.x - r.w * 1.1;
      const targetY = drinker.y + drinker.r * 0.5;
      offsetX = (targetX - slot.x) * t;
      offsetY = (targetY - slot.y) * t;
    }

    const pivotX = slot.x + offsetX;
    const pivotY = slot.y + offsetY;

    ctx.save();
    // Shadow (drawn before rotation so it stays flat)
    ctx.fillStyle = 'rgba(18,49,28,.14)';
    ctx.beginPath();
    ctx.ellipse(slot.x, slot.y + 8, Math.max(12, r.w * 0.36), Math.max(5, r.w * 0.14), 0, 0, Math.PI * 2);
    ctx.fill();

    // Rotate around bottle base (which may have moved toward the drinker)
    ctx.translate(pivotX, pivotY);
    ctx.rotate(tiltAngle);
    ctx.translate(-pivotX, -pivotY);

    if (isImgReady(slot.img)){
      ctx.drawImage(slot.img, r.x + offsetX, r.y + offsetY, r.w, r.h);
    } else {
      drawRoundedRect(ctx, r.x + offsetX, r.y + offsetY, r.w, r.h, 8, 'rgba(255,250,243,.68)', 'rgba(18,49,28,.14)');
    }
    ctx.restore();
  }

  // Flashing prompt above the featured bottle (only when free and no one is drinking it)
  const featuredSlot = slots.find((slot) => slot.featured && !slot.occupiedBy && !slot.blockedByTheft && !slot.hiddenByTheft);
  if (featuredSlot){
    const blink = 1;
    const r = featuredSlot.renderRect;
    const text = 'לחצו!';
    ctx.save();
    ctx.font = '700 14px system-ui, -apple-system, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const textW = ctx.measureText(text).width;
    const padX = 11;
    const padY = 6;
    const boxW = textW + padX * 2;
    const boxH = 14 + padY * 2;
    const textX = featuredSlot.x;
    const textY = r.y - 18;
    ctx.globalAlpha = 0.2 + blink * 0.8;
    drawRoundedRect(ctx, textX - boxW / 2, textY - boxH / 2, boxW, boxH, boxH / 2, 'rgba(255,220,240,0.94)', 'rgba(255,123,184,0.55)');
    ctx.fillStyle = 'rgba(106,28,66,0.97)';
    ctx.fillText(text, textX, textY);
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}

function drawCelebrationMushuBottle(){
  if (!celebration.mushuCarryBottleId) return;
  const bottle = getCelebrationBottleAsset(celebration.mushuCarryBottleId);
  if (!bottle) return;
  const vr = mushu.r * (mushu.renderScale ?? 1);
  const drawW = vr * 1.45;
  const drawH = vr * 2.05;
  const x = mushu.x + vr * 0.58;
  const y = mushu.y + vr * 0.12;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(0.28);
  if (isImgReady(bottle.img)){
    ctx.drawImage(bottle.img, -drawW * 0.5, -drawH * 0.78, drawW, drawH);
  } else {
    drawRoundedRect(ctx, -drawW * 0.22, -drawH * 0.72, drawW * 0.44, drawH * 0.72, 6, 'rgba(255,250,243,.74)', 'rgba(18,49,28,.14)');
  }
  ctx.restore();
}

function clientPointToCanvas(clientX, clientY){
  const rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left) * (canvas.width / Math.max(1, rect.width)),
    y: (clientY - rect.top) * (canvas.height / Math.max(1, rect.height)),
  };
}

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
    // Bar size (smaller in stage 2 per request).
    const bw = clamp(w * nW, 180, 520);
    const bh = clamp(h * nH, 60, 180);
    const x = clamp(w * nx - bw / 2, left, right - bw);
    const y = clamp(h * ny, top, bottom - bh);
    obstacles.push({ kind: 'rect', type: 'bar', x, y, w: bw, h: bh, r: 18 });
  }

  function addSpeaker(nx, ny, nW, nH){
    const sw = clamp(w * nW, 56, 104);
    const sh = clamp(h * nH, 100, 158);
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
    addYardTable(0.18, 0.84);
    addYardTable(0.50, 0.66);
    addYardTable(0.82, 0.84);

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
    // Hall: clean top area; bar raised high, speakers + dance floor below.
    addBar(0.50, 0.008, 0.78, 0.19);
    addSpeaker(0.10, 0.30, 0.20, 0.26);
    addSpeaker(0.90, 0.30, 0.20, 0.26);

    // Tables: upper row lowered a bit more; lower row unchanged.
    const row1Y = clamp(h * 0.68, top + 140, bottom - tableR - 18);
    const row2Y = clamp(h * 0.84, top + 260, bottom - tableR - 18);
    const row1LeftX = clamp(w * 0.28, left + tableR + 18, right - tableR - 18);
    const row1RightX = clamp(w * 0.72, left + tableR + 18, right - tableR - 18);
    const leftX = clamp(w * 0.18, left + tableR + 18, right - tableR - 18);
    const rightX = clamp(w * 0.82, left + tableR + 18, right - tableR - 18);
    addTableWithChairs(row1LeftX, row1Y, 6);
    addTableWithChairs(row1RightX, row1Y, 6);
    addTableWithChairs(leftX, row2Y, 5);
    addTableWithChairs(rightX, row2Y, 5);
  } else {
    // Stage 3 (chuppah): hupa lowered, carpet raised. Chuppah drawn smaller (0.85x).
    const S3 = 0.81; // global 19% scale for ALL stage-3 props (not characters)
    const HUPA_SCALE = 0.85; // shrink chuppah in stage 3
    const hupaDraw = addRect('hupa', 0.50, 0.25, 0.54 * S3 * HUPA_SCALE, 0.28 * S3 * HUPA_SCALE);
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
      // Keep drawing anchored to original position/size; collision circle can be shrunk and centered on visual.
      o.drawX = o.x;
      o.drawY = o.y;
      o.drawR = o.r;
      o.r *= (mul ?? 1);
      if (yShiftFrac) o.y += o.r * yShiftFrac;
    }
    function centerStage3TreeCollision(o){
      // After drawX/drawY may be overridden: put collision center at visual center.
      o.x = o.drawX ?? o.x;
      o.y = o.drawY ?? o.y;
    }

    // Place fountains flanking the hupa (slightly smaller in stage 3).
    addImgCircle('fountain', 0.12, 0.25, 0.048 * S3);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.90, yShiftFrac: 0 });
    addImgCircle('fountain', 0.88, 0.25, 0.048 * S3);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.90, yShiftFrac: 0 });

    // No white path/carpet in stage 3; keep virtual strip for bush positioning (raised to match chuppah).
    const carpetTop = clamp(h * 0.12, top, bottom - 220);
    const carpetHeightFrac = Math.max(0.65, (bottom - carpetTop) / h);
    const cw = clamp(w * (0.22 * S3), 110, 200);
    const ch = clamp(h * carpetHeightFrac, 220, h);
    const carpet = { x: clamp(w * 0.50 - cw / 2, left, right - cw), y: clamp(carpetTop, top, bottom - ch), w: cw, h: ch };

    // Big blockers on the sides to frame the aisle (same visual size as stage-1 trees); collision smaller and centered on tree.
    const palmTreeNr = 0.0754;
    addImgCircle('palmTree', 0.12, 0.14, palmTreeNr);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 0.5, yShiftFrac: 0 });
    addImgCircle('palmTree', 0.88, 0.14, palmTreeNr);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 0.5, yShiftFrac: 0 });

    // Pink trees: same visual size as stage-1 trees; collision smaller and centered on tree (drawX shifted to edges).
    const pinkTreeNr = 0.0754;
    addImgCircle('pinkTree', 0.08, 0.42, pinkTreeNr);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 0.5, yShiftFrac: 0 });
    obstacles[obstacles.length - 1].drawX = w * -0.01;
    centerStage3TreeCollision(obstacles[obstacles.length - 1]);
    addImgCircle('pinkTree', 0.92, 0.40, pinkTreeNr);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 0.5, yShiftFrac: 0 });
    obstacles[obstacles.length - 1].drawX = w * 1.01;
    centerStage3TreeCollision(obstacles[obstacles.length - 1]);
    addImgCircle('pinkTree', 0.08, 0.66, pinkTreeNr);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 0.5, yShiftFrac: 0 });
    obstacles[obstacles.length - 1].drawX = w * -0.01;
    centerStage3TreeCollision(obstacles[obstacles.length - 1]);
    addImgCircle('pinkTree', 0.92, 0.64, pinkTreeNr);
    tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 0.5, yShiftFrac: 0 });
    obstacles[obstacles.length - 1].drawX = w * 1.01;
    centerStage3TreeCollision(obstacles[obstacles.length - 1]);

    // Symmetric white bushes along the carpet: two columns close to each other, 4 per side.
    const colGap = clamp(Math.min(w, h) * 0.048, 20, 38);
    const colPad = 22;
    const leftColX = clamp(carpet.x - colGap, left + colPad, right - colPad);
    const rightColX = clamp(carpet.x + carpet.w + colGap, left + colPad, right - colPad);
    const rWhite = clamp(Math.min(w, h) * 0.042, 15, 34) * S3;
    const y0 = carpet.y + carpet.h * 0.32;
    const y1 = carpet.y + carpet.h * 0.44;
    const y2 = carpet.y + carpet.h * 0.56;
    const y3 = carpet.y + carpet.h * 0.68;
    for (const x of [leftColX, rightColX]){
      obstacles.push({ kind: 'circle', type: 'whiteFlowers', x, y: y0, r: rWhite });
      tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.25, yShiftFrac: 0.00 });
      obstacles.push({ kind: 'circle', type: 'whiteFlowers', x, y: y1, r: rWhite });
      tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.25, yShiftFrac: 0.00 });
      obstacles.push({ kind: 'circle', type: 'whiteFlowers', x, y: y2, r: rWhite });
      tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.25, yShiftFrac: 0.00 });
      obstacles.push({ kind: 'circle', type: 'whiteFlowers', x, y: y3, r: rWhite });
      tuneStage3CircleCollision(obstacles[obstacles.length - 1], { mul: 1.25, yShiftFrac: 0.00 });
    }

    // Wooden stages: symmetric left and right (smaller), lowered, spaced further apart.
    addRect('woodStage', 0.14, 0.88, 0.22 * S3, 0.17 * S3);
    addRect('woodStage', 0.86, 0.88, 0.22 * S3, 0.17 * S3);
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

// Mushu must not overlap Ofer: when his movement would hit Ofer, only Mushu is pushed out and his velocity is reflected (he changes direction; Ofer stays put).
function resolveMushuVsOfer(){
  const rr = mushu.r + ofer.r;
  const d2 = dist2(mushu.x, mushu.y, ofer.x, ofer.y);
  if (d2 >= rr * rr) return false;

  const d = Math.sqrt(d2) || 0.0001;
  const nx = (mushu.x - ofer.x) / d;
  const ny = (mushu.y - ofer.y) / d;
  const overlap = rr - d;

  mushu.x += nx * overlap;
  mushu.y += ny * overlap;

  const vn = mushu.vx * nx + mushu.vy * ny;
  if (vn < 0) {
    const restitution = 0.4;
    mushu.vx -= (1 + restitution) * vn * nx;
    mushu.vy -= (1 + restitution) * vn * ny;
  }
  return true;
}

function nudgeBodiesOutOfObstacles(){
  // A few iterations to prevent spawning inside props on resize.
  // Mushu passes through obstacles in all stages; only Ofer and Tal are nudged out.
  for (let i = 0; i < 6; i++){
    let any = false;
    any = resolveBodyVsObstacles(ofer) || any;
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

function spawnFireJet(x0, y0, x1, y1, amount, speedMin = 220, speedMax = 380, spread = 0.18){
  const dx = x1 - x0;
  const dy = y1 - y0;
  const d = Math.hypot(dx, dy) || 1;
  const dirX = dx / d;
  const dirY = dy / d;
  const px = -dirY;
  const py = dirX;
  for (let i = 0; i < amount; i++){
    const sway = rand(-spread, spread);
    const burstX = dirX + px * sway;
    const burstY = dirY + py * sway;
    const burstD = Math.hypot(burstX, burstY) || 1;
    spawnFire(
      x0 + dirX * rand(0, 8),
      y0 + dirY * rand(0, 8),
      burstX / burstD,
      burstY / burstD,
      rand(speedMin, speedMax)
    );
  }
}

function resetGameToPlaying(stageIndex){
  resetCelebrationState();
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
  world.chaosCountdown =
    world.params?.chaosInitialDelaySec ??
    world.params?.chaosIntervalSec ??
    5;
  world.chaosActive = false;
  world.chaosName = 'רגוע(בערך)';
  world.chaosUntil = 0;
  world.chaosBannerUntil = 0;
  world.chaosSequenceIndex = 0;
  world.instructionsUntil = world.t + (world.stageIndex === 0 ? 6 : 4);
  world.shakeUntil = 0;
  world.mushuBoost = 1;
  world.brideRage = false;
  world.fireTrailAcc = 0;
  world.caught = false;
  world.endReason = '';
  celebrationStartAt = 0;

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
  mushu.wanderUntil = 0;

  // Stage 1 should be Tal-free (no visual, no collisions).
  tal.visible = (world.stageIndex !== 0);
  if (world.stageIndex === 0){
    tal.x = w * 0.14; tal.y = h * 0.20;
  } else if (world.stageIndex === 1){
    tal.x = w * 0.16; tal.y = h * 0.18;
  } else {
    // Stage 3: Tal starts next to Ofer (chuppah – bride beside groom).
    const offset = (ofer.r + tal.r + 28);
    tal.x = ofer.x - offset * 0.9;
    tal.y = ofer.y - offset * 0.4;
  }
  tal.vx = 110; tal.vy = 30;

  // Ensure spawns are always inside the playable arena (important after mobile viewport resizes).
  clampBodyToArena(ofer);
  clampBodyToArena(mushu);
  clampBodyToArena(tal);
  nudgeBodiesOutOfObstacles();

  particles.length = 0;

  resetJoystickVisual();

  state = GameState.PLAYING;
  stageOneIntroScene.active = false;
  stageTwoIntroScene.active = false;
  stageThreeIntroScene.active = false;
  world.celebrationMode = false;
  setHidden(endUI, true);
  setHidden(startUI, true);
  setHidden(stageUI, true);
  hideCutsceneOverlay();
  setHidden(hudRow, false);
  setJoystickHidden(false);
  stopIntroSceneMusic();
  void ensureAudioUnlocked().then(() => { startStagePlayMusic(); });
}

// Celebration: stage 2 (hall) look, interactive bar, no timer, no joystick.
function enterCelebration(){
  resetCelebrationState();
  stopPreCelebrationRunMusic();
  world.celebrationMode = true;
  world.celebrationUntil = Number.POSITIVE_INFINITY;
  world.stageIndex = StageId.STAGE_2; // 1 = hall / הרחבת ריקודים
  world.chaosActive = false;
  world.brideRage = false;
  world.endReason = 'ALL_CLEAR';
  bgCache = null;
  obstacles.length = 0;
  syncWorldToCanvasSize();
  const w = world.w || canvas.width;
  const h = world.h || canvas.height;
  const oferAnchor = getCelebrationDanceAnchor(ofer, world.t);
  const talAnchor = getCelebrationDanceAnchor(tal, world.t);
  ofer.x = oferAnchor.x;
  ofer.y = oferAnchor.y;
  ofer.vx = 0;
  ofer.vy = 0;
  tal.visible = true;
  tal.r = 20;
  tal.x = talAnchor.x;
  tal.y = talAnchor.y;
  tal.vx = 0;
  tal.vy = 0;
  mushu.x = -mushu.r * 4;
  mushu.y = h * 0.82;
  mushu.vx = 0;
  mushu.vy = 0;
  mushu.hasRings = false;
  initCelebrationActorState(ofer);
  initCelebrationActorState(tal);
  setJoystickHidden(true);
  resetJoystickVisual();
  setHidden(hudRow, true);
  setHidden(chaosEl, true);
  setHidden(endUI, true);
  setCelebrationUiVisible(true);
  if (celebrationBottomStackEl) {
    celebrationBottomStackEl.classList.add('celebrationBottomStack--hidden');
    setTimeout(() => {
      celebrationBottomStackEl.classList.remove('celebrationBottomStack--hidden');
    }, 10000);
  }
  showOutcome('ALL_CLEAR');
  // Big confetti burst at start – random positions across the screen
  particles.length = 0;
  const pad = Math.min(w, h) * 0.08;
  for (let i = 0; i < 5; i++){
    const rx = pad + rand(0, w - 2 * pad);
    const ry = pad + rand(0, h - 2 * pad);
    spawnConfetti(55, rx, ry, 520);
  }
  world.celebrationLastConfettiAt = world.t;
  void ensureAudioUnlocked().then(() => { startCelebrationMusic(); });
}

function enterEnd(reason){
  state = GameState.END;
  world.playEnabled = false;
  world.endReason = reason;
  world.celebrationMode = false;
  resetCelebrationState();
  stopPreCelebrationRunMusic();
  setHidden(endUI, false);
  setHidden(startUI, true);
  setHidden(stageUI, true);
  setJoystickHidden(true);
  resetJoystickVisual();
  setHidden(hudRow, false);
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
// Stage 2: fixed order – טל כועסת → רעידת באס → חוזר חלילה
STAGES[1].chaosWeights = [
  [ChaosEvent.SCREEN_SHAKE, 1.0],
  [ChaosEvent.BRIDE_RAGE, 1.05],
];
STAGES[1].chaosSequence = [ChaosEvent.BRIDE_RAGE, ChaosEvent.SCREEN_SHAKE];
// Stage 3: fixed order – מושו טורבו → טל כועסת → חוזר חלילה
STAGES[2].chaosWeights = [
  [ChaosEvent.MUSHU_BOOST, 1.35],
  [ChaosEvent.BRIDE_RAGE, 1.25],
];
STAGES[2].chaosSequence = [ChaosEvent.MUSHU_BOOST, ChaosEvent.BRIDE_RAGE];

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
  world.chaosBannerUntil = 0;
  world.mushuBoost = 1;
  world.brideRage = false;
  world.shakeUntil = 0;
  stopStage2BassChaosMusic();
  stopBrideRageChaosMusic();
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
  // Next chaos starts (dur + CHAOS_BREAK_SEC) from now = chaos duration + 3s break.
  world.chaosCountdown = dur + CHAOS_BREAK_SEC;

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
      if (world.stageIndex === StageId.STAGE_2){
        void ensureAudioUnlocked().then(() => { startStage2BassChaosMusic(); });
      }
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
      if (world.stageIndex === StageId.STAGE_2 || world.stageIndex === StageId.STAGE_3){
        void ensureAudioUnlocked().then(() => { startBrideRageChaosMusic(); });
      }
      break;
  }

  world.chaosBannerUntil = t + CHAOS_BANNER_VISIBLE_SEC;

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
    const seq = p.chaosSequence;
    if (seq && seq.length > 0){
      const idx = world.chaosSequenceIndex % seq.length;
      world.chaosSequenceIndex += 1;
      startChaosEvent(seq[idx]);
    } else {
      const weights = p.chaosWeights || DEFAULT_CHAOS_WEIGHTS;
      if (weights.length === 0) return; // Stage 1: no chaos
      startChaosEvent(pickWeighted(weights));
    }
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

  // Ofer gets energetic bounce; Mushu gets a damped bounce (wall repulsion handles steering).
  const bounce = gainy ? rand(0.92, 1.12) : 1.0;
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
  if (!joystick.active) return;

  // Joystick steering: analog direction + strength (with a small deadzone).
  let x = joystick.x;
  let y = joystick.y;
  const m = Math.hypot(x, y);
  const dead = 0.12;
  if (m <= dead) return;

  const strength = clamp((m - dead) / (1 - dead), 0, 1);
  const eased = Math.pow(strength, 1.15);
  const inv = 1 / (m || 1);
  x *= inv;
  y *= inv;

  const accel = (world.params?.playerSpeed ?? 2400);
  ofer.vx += x * accel * eased * dt;
  ofer.vy += y * accel * eased * dt;
}

function updateMushuAI(dt){
  // Steering model: fixed speed, limited turn rate → smooth organic curves.
  // All stages + turbo share this path via world.mushuBoost.
  mushu.mood += dt;
  const t = world.t;
  const w = world.w || canvas.width;
  const h = world.h || canvas.height;
  const m = ARENA_MARGIN;

  const base = (world.params?.mushuBaseSpeed ?? DEFAULT_MUSHU_BASE_SPEED);
  const speed = base * 0.72 * world.mushuBoost;

  // --- Pick new target angle periodically ---
  if (!mushu.wanderUntil || t >= mushu.wanderUntil){
    mushu.wanderUntil = t + rand(2.5, 4.5);
    mushu.wanderAngle = rand(0, Math.PI * 2);
  }

  // --- Steer currentAngle toward target at a fixed turn rate (rad/s) ---
  const turnRate = 1.1;
  let da = mushu.wanderAngle - mushu.currentAngle;
  while (da > Math.PI) da -= Math.PI * 2;
  while (da < -Math.PI) da += Math.PI * 2;
  const maxTurn = turnRate * dt;
  mushu.currentAngle += Math.sign(da) * Math.min(Math.abs(da), maxTurn);

  // --- Wall awareness: bias current angle away from nearby edges ---
  const wallZone = Math.min(w, h) * 0.16;
  let wallBiasX = 0, wallBiasY = 0;
  if (mushu.x - m - mushu.r < wallZone) wallBiasX += 1;
  if (w - m - mushu.r - mushu.x < wallZone) wallBiasX -= 1;
  if (mushu.y - m - mushu.r < wallZone) wallBiasY += 1;
  if (h - m - mushu.r - mushu.y < wallZone) wallBiasY -= 1;
  if (wallBiasX !== 0 || wallBiasY !== 0){
    const biasAngle = Math.atan2(wallBiasY, wallBiasX);
    let bd = biasAngle - mushu.currentAngle;
    while (bd > Math.PI) bd -= Math.PI * 2;
    while (bd < -Math.PI) bd += Math.PI * 2;
    mushu.currentAngle += Math.sign(bd) * Math.min(Math.abs(bd), turnRate * 2.5 * dt);
  }

  // --- Set velocity from current heading ---
  mushu.vx = Math.cos(mushu.currentAngle) * speed;
  mushu.vy = Math.sin(mushu.currentAngle) * speed;

  // --- Opening 5s of stages 2 & 3: maintain safe radius from Ofer ---
  const dx = ofer.x - mushu.x;
  const dy = ofer.y - mushu.y;
  const distToOfer = Math.hypot(dx, dy) || 1;
  const stageIdx = world.stageIndex ?? 0;
  const stageDur = world.params?.durationSec ?? 30;
  const elapsed = stageDur - world.timeLeft;
  if ((stageIdx === 1 || stageIdx === 2) && elapsed < 5){
    const fleeRadius = 180;
    const fade = 1 - elapsed / 5;
    if (distToOfer < fleeRadius){
      // Override wander angle to point directly away from Ofer
      mushu.wanderAngle = Math.atan2(-dy, -dx) + rand(-0.4, 0.4);
      mushu.wanderUntil = t + 0.6;
      // Extra flee impulse — stronger the closer Ofer is
      const fleePush = (1 - distToOfer / fleeRadius) * speed * 2.2 * fade * dt;
      mushu.vx -= (dx / distToOfer) * fleePush;
      mushu.vy -= (dy / distToOfer) * fleePush;
    }
  } else if (distToOfer < 55){
    // Normal gentle repel
    const f = (1 - distToOfer / 55) * speed * 0.3 * dt;
    mushu.vx -= (dx / distToOfer) * f;
    mushu.vy -= (dy / distToOfer) * f;
  }

  // --- Avoid Tal during Bride Rage ---
  if (world.brideRage){
    const tx = mushu.x - tal.x;
    const ty = mushu.y - tal.y;
    const tm = Math.hypot(tx, ty) || 1;
    mushu.vx += (tx / tm) * speed * 0.2 * dt;
    mushu.vy += (ty / tm) * speed * 0.2 * dt;
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

    // Wind field (slightly wrong): pushes everyone sideways. Same effect on Mushu in all stages.
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

// Interactive celebration: highlighted bottles invite taps; Ofer/Tal grab drinks and return.
function updateCelebration(dt){
  const w = world.w || canvas.width;
  const h = world.h || canvas.height;
  const slots = getCelebrationBottleSlots();
  updateCelebrationActor(ofer, getCelebrationDanceAnchor(ofer, world.t), slots, dt);
  updateCelebrationActor(tal, getCelebrationDanceAnchor(tal, world.t), slots, dt);
  updateCelebrationMushuTheft(dt, slots);

  // Ongoing fireworks every ~1.1s at random positions on screen
  if (world.t - (world.celebrationLastConfettiAt ?? 0) >= CELEBRATION_CONFETTI_INTERVAL_SEC){
    world.celebrationLastConfettiAt = world.t;
    const pad = Math.min(w, h) * 0.1;
    for (let i = 0; i < 3; i++){
      const rx = pad + rand(0, w - 2 * pad);
      const ry = pad + rand(0, h - 2 * pad);
      spawnConfetti(40, rx, ry, 420);
    }
  }
  updateParticles(dt);
}

function update(dt){
  if (world.celebrationMode){
    updateCelebration(dt);
    return;
  }
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
  // When Ofer is in contact with Mushu, apply extra resistance so he "gets stuck" in Mushu
  const rr = ofer.r + mushu.r;
  const distOferMushu = Math.hypot(ofer.x - mushu.x, ofer.y - mushu.y) || 0.0001;
  if (distOferMushu < rr * 1.35) {
    const stickFactor = 1 - (1 - distOferMushu / (rr * 1.35)) * 0.85;
    ofer.vx *= stickFactor;
    ofer.vy *= stickFactor;
  }
  const isMushuTurbo = world.chaosActive && world.chaosName === ChaosEvent.MUSHU_BOOST;
  // Less drag so Mushu keeps speed and moves more continuously.
  // Drag not applied to Mushu — billiard AI normalizes speed each frame.
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

  // Wedding props collisions: Ofer and Tal hit obstacles; Mushu passes through (no collision).
  resolveBodyVsObstacles(ofer);
  if (tal.visible) resolveBodyVsObstacles(tal);

  // Mushu must not enter Ofer: if his movement would overlap Ofer, push Mushu out and reflect his velocity (he changes direction; Ofer is not moved).
  resolveMushuVsOfer();

  // Catch check
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
      // Freeze: hold quip on screen until POST_CATCH_BEAT_SEC, then intro / next stage.
      world.playEnabled = false;
      celebrationStartAt = 0;
      pendingStageIndex = world.stageIndex + 1;
      stageStartAt = world.t + POST_CATCH_BEAT_SEC;
      countdownFromAt = 0;
      clearChaosEffects();
      tal.r = 20;
      hideStageOverlay();
      const quipStage1 = `איזה תפיסה! (+${pts} נק׳).\nמושו: \"זה היה חימום\".`;
      const quipStage2 = `תפיסה הירואית (+${pts} נק׳).\nמושו: \"אוקיי אוקיי, הפעם ניצחתם… עד השלב הבא.\"`;
      setQuip(world.stageIndex === 0 ? quipStage1 : quipStage2, POST_CATCH_QUIP_MS);
    } else {
      world.playEnabled = false;
      stageStartAt = 0;
      countdownFromAt = 0;
      celebrationStartAt = world.t + POST_CATCH_BEAT_SEC;
      hideStageOverlay();
      const quipStage3 = `סוגרים מעגל! (+${pts} נק׳).\nמושו: \"טוב, נתתם פה קרב אמיתי… אני הולך לנוח.\"`;
      setQuip(quipStage3, POST_CATCH_QUIP_MS);
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

  // Screen shake chaos (speakers drawn without shake below)
  let shakeDx = 0, shakeDy = 0;
  if (world.shakeUntil > world.t){
    const intensity = (world.params?.shakeIntensity ?? 1.0);
    const s = rand(0.8, 1.6) * intensity * (window.devicePixelRatio || 1);
    shakeDx = rand(-1, 1) * s * 4;
    shakeDy = rand(-1, 1) * s * 4;
    ctx.translate(shakeDx, shakeDy);
  }

  // Background (changes per stage: yard / hall / chuppah).
  if (!bgCache || bgCache.w !== w || bgCache.h !== h || bgCache.stage !== (world.stageIndex ?? 0)) buildBackgroundCache();
  if (bgCache) ctx.drawImage(bgCache.c, 0, 0);
  else {
    ctx.fillStyle = '#7bd77f';
    ctx.fillRect(0, 0, w, h);
  }

  // Wedding props (obstacles) – trees drawn after characters so they appear in front
  if (!obstacles.length) buildObstacles();
  const stageIndex = (world.stageIndex ?? 0);
  for (let i = 0; i < obstacles.length; i++){
    const o = obstacles[i];
    if (o.type === 'tree' || o.type === 'whiteTree' || o.type === 'palmTree' || o.type === 'pinkTree') continue;
    // Stage 1 (yard): swap props to provided webp assets.
    if (stageIndex === 0){
      if (o.type === 'table'){
        // Slightly larger than collision radius for readability.
        if (drawImgContain(ctx, tableOutsideImg, o.x, o.y, o.r * 3.35, o.r * 3.35, 'center')) continue;
      } else if (o.type === 'bush'){
        // Slightly bottom-anchored so it "sits" on the lawn.
        if (drawImgContain(ctx, pinkBushImg, o.x, o.y + o.r * 1.05, o.r * 2.65, o.r * 2.35, 'bottom')) continue;
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
        if (drawImgContain(ctx, barImg, cx, cy, o.w * 3.85, o.h * 3.85, 'center')) continue;
      } else if (o.type === 'speaker'){
        const isLeft = o.x < w / 2;
        const img = isLeft ? leftSpeakerImg : rightSpeakerImg;
        const cx = o.x + o.w / 2;
        const cy = o.y + o.h / 2;
        const speakerScale = (world.shakeUntil > world.t) ? 1.28 : 1.0;
        ctx.save();
        ctx.translate(-shakeDx, -shakeDy);
        if (drawImgContain(ctx, img, cx, cy, o.w * 1.5 * speakerScale, o.h * 1.5 * speakerScale, 'center')){ ctx.restore(); continue; }
        ctx.restore();
        continue;
      }
    }

    // Stage 3 (chuppah): render prop images. (No white path/carpet; everything else is solid.)
    if (stageIndex === 2){
      if (o.type === 'carpet'){
        continue; // Carpet not used in stage 3 (no white path).
      } else if (o.type === 'hupa'){
        const dx = (o.drawX ?? o.x);
        const dy = (o.drawY ?? o.y);
        const dw = (o.drawW ?? o.w);
        const dh = (o.drawH ?? o.h);
        const cx = dx + dw / 2;
        const by = dy + dh;
        if (drawImgContain(ctx, hupaImg, cx, by, dw * 1.45, dh * 1.45, 'bottom')) continue;
      } else if (o.type === 'fountain'){
        const dx = (o.drawX ?? o.x);
        const dy = (o.drawY ?? o.y);
        const dr = (o.drawR ?? o.r);
        if (drawImgContain(ctx, fountainImg, dx, dy, dr * 4.2, dr * 4.2, 'center')) continue;
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
        continue; // drawn on top of characters below
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
      // Speaker (solid obstacle) – drawn without screen shake; larger during bass shake
      const spCx = o.x + o.w / 2, spCy = o.y + o.h / 2;
      const speakerScale = (world.shakeUntil > world.t) ? 1.28 : 1.0;
      ctx.save();
      ctx.translate(-shakeDx, -shakeDy);
      if (speakerScale !== 1.0){ ctx.translate(spCx, spCy); ctx.scale(speakerScale, speakerScale); ctx.translate(-spCx, -spCy); }
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
      ctx.restore();
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

  // Ring aura around Mushu if he has rings (not in celebration)
  if (!world.celebrationMode && mushu.hasRings){
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

  // Characters (celebration: only Ofer and Tal dancing)
  drawBody(ofer);

  // Stage 2 intro: ring travels from Ofer to table — draw after Ofer so it reads in front.
  if (state === GameState.CUTSCENE && stageTwoIntroScene.active && stageTwoIntroScene.ringVisible){
    const pulse = 0.5 + 0.5 * Math.sin(world.t * 8.5);
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,.18)';
    ctx.beginPath();
    ctx.ellipse(stageTwoIntroScene.ringX, stageTwoIntroScene.ringY + 10, 11, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(255,215,140,${0.12 + 0.18 * pulse})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(stageTwoIntroScene.ringX, stageTwoIntroScene.ringY, 15 + pulse * 2.5, 0, Math.PI * 2);
    ctx.stroke();
    drawRingIcon(stageTwoIntroScene.ringX, stageTwoIntroScene.ringY, 13, stageTwoIntroScene.ringAngle);
    ctx.restore();
  }

  // Stage 1 intro: ring must draw after Ofer so it sits in front (not behind his sprite).
  if (state === GameState.CUTSCENE && stageOneIntroScene.active && stageOneIntroScene.ringVisible){
    const pulse = 0.5 + 0.5 * Math.sin(world.t * 8.5);
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,.18)';
    ctx.beginPath();
    ctx.ellipse(stageOneIntroScene.ringX, stageOneIntroScene.ringY + 12, 12, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(255,215,140,${0.12 + 0.18 * pulse})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(stageOneIntroScene.ringX, stageOneIntroScene.ringY, 16 + pulse * 3, 0, Math.PI * 2);
    ctx.stroke();
    drawRingIcon(stageOneIntroScene.ringX, stageOneIntroScene.ringY, 12, stageOneIntroScene.ringAngle);
    ctx.restore();
  }

  if (!world.celebrationMode || celebration.mushuTheftState !== 'idle' || celebration.mushuCarryBottleId){
    drawBody(mushu);
    if (world.celebrationMode) drawCelebrationMushuBottle();
  }
  if (tal.visible) drawBody(tal);
  if (world.celebrationMode) drawCelebrationBottles();

  // Trees drawn on top so they appear in front of characters
  for (let i = 0; i < obstacles.length; i++){
    const o = obstacles[i];
    if (stageIndex === 0 && o.type === 'tree'){
      const img = (o.variant === 'palm') ? palmTreeImg : treeImg;
      const cx = o.drawCx ?? o.cx ?? (o.x + o.w / 2);
      const by = o.drawBy ?? o.by ?? (o.y + o.h);
      const maxW = o.drawMaxW ?? o.maxW ?? (o.w || 0);
      const maxH = o.drawMaxH ?? o.maxH ?? (o.h || 0);
      if (isImgReady(img)){
        const d = imgContainDims(img, cx, by, maxW, maxH, 'bottom');
        ctx.drawImage(img, d.x, d.y, d.w, d.h);
        const xOff = (o.variant === 'palm') ? STAGE1_TREE_HITBOX.palmX : STAGE1_TREE_HITBOX.treeX;
        const colCx = (d.x + d.w * 0.5) + d.w * xOff;
        const colCy = d.y + d.h * STAGE1_TREE_HITBOX.cy;
        const colR = Math.min(d.w, d.h) * STAGE1_TREE_HITBOX.r;
        o.kind = 'circle';
        o.x = colCx;
        o.y = colCy;
        o.r = colR;
      } else {
        drawImgContain(ctx, img, cx, by, maxW, maxH, 'bottom');
      }
    } else if (stageIndex === 2 && o.type === 'woodStage'){
      const cx = o.x + o.w / 2;
      const cy = o.y + o.h / 2;
      drawImgContain(ctx, woodStageImg, cx, cy, o.w * 1.35, o.h * 1.35, 'center');
    } else if (stageIndex === 2 && o.type === 'whiteTree'){
      const dx = (o.drawX ?? o.x);
      const dy = (o.drawY ?? o.y);
      const dr = (o.drawR ?? o.r);
      drawImgContain(ctx, whiteTreeImg, dx, dy, dr * 5.0, dr * 6.3, 'center');
    } else if (stageIndex === 2 && o.type === 'palmTree'){
      const dx = (o.drawX ?? o.x);
      const dy = (o.drawY ?? o.y);
      const dr = (o.drawR ?? o.r);
      drawImgContain(ctx, palmTreeImg, dx, dy, dr * 5.2, dr * 6.8, 'center');
    } else if (stageIndex === 2 && o.type === 'pinkTree'){
      const dx = (o.drawX ?? o.x);
      const dy = (o.drawY ?? o.y);
      const dr = (o.drawR ?? o.r);
      drawImgContain(ctx, pinkTreeImg, dx, dy, dr * 5.2, dr * 6.6, 'center');
    }
  }

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

  // HUD text updates (DOM overlay; hidden during celebration)
  if (!world.celebrationMode) timerEl.textContent = world.timeLeft.toFixed(1);
  const showChaosBanner = !world.celebrationMode && world.chaosActive
    && world.t < world.chaosBannerUntil;
  if (showChaosBanner){
    const txt = chaosBannerText(world.chaosName);
    const chaosJustStarted = !hudPrevChaosActive;
    if (chaosJustStarted || chaosEl.textContent !== txt){
      chaosEl.textContent = txt;
      chaosEl.classList.remove('chaosBanner--pulse');
      void chaosEl.offsetWidth;
      chaosEl.classList.add('chaosBanner--pulse');
    }
    setHidden(chaosEl, false);
    hudPrevChaosActive = true;
  } else {
    hudPrevChaosActive = false;
    chaosEl.classList.remove('chaosBanner--pulse');
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

function getCelebrationDancePose(b, vr){
  if (!world?.celebrationMode) return null;
  if (b !== ofer && b !== tal) return null;
  if (b.celebrationState && b.celebrationState !== 'dance') return null;
  const phase = (b === tal) ? Math.PI : 0;
  const groove = (world.t || 0) * 6.1 + phase;
  return {
    swayX: Math.sin(groove * 0.72) * vr * 0.22,
    bobY: Math.sin(groove * 1.65) * vr * 0.18,
    torsoLean: Math.sin(groove * 0.72) * 0.3,
    headTilt: Math.sin(groove * 1.3) * 0.2,
    armSwing: Math.sin(groove * 2.2) * 0.75,
    forearmSwing: Math.cos(groove * 2.1 + 0.45) * 0.55,
    legSwing: Math.sin(groove * 1.7 + 0.3) * 0.58,
    kneeSwing: Math.cos(groove * 1.7 + 0.2) * 0.36,
    clapOpen: (Math.sin(groove * 2.6) * 0.5 + 0.5),
    wristFlick: Math.sin(groove * 3.4) * vr * 0.12,
    shoulderLift: Math.sin(groove * 3.1) * vr * 0.08,
  };
}

function drawStickPath(points){
  if (!points || points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++){
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
}

function drawStickLimb(x, y, upperLen, upperAngle, lowerLen, lowerAngle){
  const elbowX = x + Math.cos(upperAngle) * upperLen;
  const elbowY = y + Math.sin(upperAngle) * upperLen;
  const handX = elbowX + Math.cos(upperAngle + lowerAngle) * lowerLen;
  const handY = elbowY + Math.sin(upperAngle + lowerAngle) * lowerLen;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(elbowX, elbowY);
  ctx.lineTo(handX, handY);
  ctx.stroke();

  return { elbowX, elbowY, handX, handY };
}

function drawCelebrationStickBody(b, vr, pose){
  if (!pose) return;

  const bodyColor = (b === tal) ? 'rgba(255,244,250,.98)' : 'rgba(241,255,248,.98)';
  const accentColor = (b === tal) ? 'rgba(255,182,216,.8)' : 'rgba(86,255,193,.75)';
  const bodyDrop = vr * 0.72;
  const centerX = b.x + pose.swayX * 0.35;
  const neckY = b.y + vr * 0.52 + bodyDrop + pose.bobY * 0.12;
  const shoulderY = b.y + vr * 0.84 + bodyDrop + pose.bobY * 0.2;
  const hipY = b.y + vr * 1.72 + bodyDrop + pose.bobY * 0.45;
  const shoulderSpread = vr * 0.42;
  const hipSpread = vr * 0.26;
  const torsoShift = pose.torsoLean * vr * 0.46;

  const leftShoulder = { x: centerX - shoulderSpread + torsoShift, y: shoulderY - pose.shoulderLift * 0.4 };
  const rightShoulder = { x: centerX + shoulderSpread + torsoShift, y: shoulderY + pose.shoulderLift * 0.4 };
  const leftHip = { x: centerX - hipSpread - torsoShift * 0.2, y: hipY };
  const rightHip = { x: centerX + hipSpread - torsoShift * 0.2, y: hipY };

  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = bodyColor;
  ctx.lineWidth = Math.max(3, vr * 0.12);
  ctx.shadowColor = 'rgba(18,49,28,.18)';
  ctx.shadowBlur = 8;

  ctx.beginPath();
  ctx.moveTo(centerX + torsoShift * 0.1, neckY);
  ctx.lineTo(leftShoulder.x, leftShoulder.y);
  ctx.lineTo(leftHip.x, leftHip.y);
  ctx.moveTo(rightShoulder.x, rightShoulder.y);
  ctx.lineTo(centerX + torsoShift * 0.1, neckY);
  ctx.lineTo(rightHip.x, rightHip.y);
  ctx.moveTo(leftShoulder.x, leftShoulder.y);
  ctx.lineTo(rightShoulder.x, rightShoulder.y);
  ctx.moveTo(leftHip.x, leftHip.y);
  ctx.lineTo(rightHip.x, rightHip.y);
  ctx.stroke();

  if (b === tal){
    const armOut = vr * 0.58;
    const handOut = vr * 0.92;
    const armWave = pose.wristFlick * 0.8;
    drawStickPath([
      leftShoulder,
      { x: leftShoulder.x - armOut, y: leftShoulder.y + pose.shoulderLift * 0.3 },
      { x: leftShoulder.x - handOut, y: leftShoulder.y + armWave }
    ]);
    drawStickPath([
      rightShoulder,
      { x: rightShoulder.x + armOut, y: rightShoulder.y - pose.shoulderLift * 0.3 },
      { x: rightShoulder.x + handOut, y: rightShoulder.y - armWave }
    ]);
  } else {
    const clapGap = vr * (0.12 + pose.clapOpen * 0.34);
    const clapY = shoulderY + vr * 0.32 + pose.bobY * 0.18;
    const leftPalm = { x: centerX - clapGap, y: clapY };
    const rightPalm = { x: centerX + clapGap, y: clapY };
    drawStickPath([
      leftShoulder,
      {
        x: centerX - vr * 0.48,
        y: shoulderY + vr * 0.06 - pose.shoulderLift * 0.2,
      },
      leftPalm
    ]);
    drawStickPath([
      rightShoulder,
      {
        x: centerX + vr * 0.48,
        y: shoulderY + vr * 0.06 + pose.shoulderLift * 0.2,
      },
      rightPalm
    ]);

    if (clapGap <= vr * 0.18){
      ctx.beginPath();
      ctx.moveTo(centerX - vr * 0.08, clapY - vr * 0.08);
      ctx.lineTo(centerX + vr * 0.08, clapY + vr * 0.08);
      ctx.moveTo(centerX - vr * 0.08, clapY + vr * 0.08);
      ctx.lineTo(centerX + vr * 0.08, clapY - vr * 0.08);
      ctx.stroke();
    }
  }

  drawStickLimb(
    leftHip.x,
    leftHip.y,
    vr * 0.64,
    1.98 + pose.legSwing * 0.28,
    vr * 0.5,
    -0.36 + pose.kneeSwing * 0.2
  );
  drawStickLimb(
    rightHip.x,
    rightHip.y,
    vr * 0.64,
    1.16 - pose.legSwing * 0.28,
    vr * 0.5,
    0.36 - pose.kneeSwing * 0.2
  );

  ctx.shadowBlur = 0;
  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.arc(centerX + torsoShift * 0.14, shoulderY + (hipY - shoulderY) * 0.42, Math.max(3, vr * 0.12), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBody(b){
  const vr = b.r * (b.renderScale ?? 1);
  const stageIndex = (world?.stageIndex ?? 0);
  const talRageFx = (b === tal) && !!world?.brideRage && stageIndex === 2;
  const talStage3IntroAngry = (b === tal) && !!stageThreeIntroScene?.active && !!stageThreeIntroScene.talAngry;
  const celebrationPose = getCelebrationDancePose(b, vr);
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,.28)';
  ctx.beginPath();
  ctx.ellipse(b.x, b.y + vr * 0.85, vr * 0.95, vr * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();

  // Bride Rage (Stage 3): surround Tal with visible anger (render-only).
  if (talRageFx){
    drawBrideRageBackFx(b, vr);
  }

  drawCelebrationStickBody(b, vr, celebrationPose);

  // Body (special case: characters use local sticker images for display only)
  const imgReady = (img) => !!img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
  let stickerImg = null;
  if (b === ofer) stickerImg = oferStickerImg;
  else if (b === mushu) stickerImg = mushuStickerImg;
  else if (b === tal){
    // Swap Tal sticker during "Bride Rage" chaos.
    const preferred = talStage3IntroAngry ? brideRageTwoImg
      : (world?.brideRage && stageIndex === 1) ? brideRageOneImg
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
    if (celebrationPose){
      ctx.translate(b.x, b.y + celebrationPose.bobY * 0.35);
      ctx.rotate(celebrationPose.headTilt);
      ctx.drawImage(stickerImg, -dw / 2, -dh / 2 - vr * 0.08, dw, dh);
    } else {
      ctx.drawImage(stickerImg, b.x - dw / 2, b.y - dh / 2, dw, dh);
    }
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

  // Bride Rage (Stage 3): front layer (steam/sparks) above the sticker.
  if (talRageFx){
    drawBrideRageFrontFx(b, vr);
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

function drawBrideRageBackFx(b, vr){
  // Render-only: smoke aura around bride rage (stage 3).
  const t = world.t || 0;
  const TAU = Math.PI * 2;

  ctx.save();
  ctx.translate(b.x, b.y);

  function fract(x){ return x - Math.floor(x); }
  function hash01(x){ return fract(Math.sin(x) * 43758.5453123); }

  // Base haze (soft, blurred). This is the "volume" of smoke.
  const hazeBlur = Math.max(1, vr * 0.09);
  ctx.filter = `blur(${hazeBlur.toFixed(2)}px)`;
  const hazeR = vr * (2.05 + 0.10 * Math.sin(t * 1.6));
  const haze = ctx.createRadialGradient(-vr * 0.15, -vr * 0.18, vr * 0.25, 0, 0, hazeR);
  haze.addColorStop(0, 'rgba(26,26,30,0.40)');
  haze.addColorStop(0.45, 'rgba(50,50,58,0.28)');
  haze.addColorStop(0.75, 'rgba(90,90,98,0.14)');
  haze.addColorStop(1, 'rgba(120,120,128,0)');
  ctx.fillStyle = haze;
  ctx.beginPath();
  ctx.arc(0, 0, hazeR, 0, TAU);
  ctx.fill();

  // Dense puffs around the body (more smoke)
  ctx.globalCompositeOperation = 'source-over';
  const puffCount = 26;
  for (let i = 0; i < puffCount; i++){
    const seed = i * 19.73;
    const baseA = hash01(seed + 1.2) * TAU;
    const speed = 0.08 + 0.08 * hash01(seed + 2.4);
    const phase = fract(t * speed + hash01(seed + 3.9));

    // Puff starts near the body and expands as it rises.
    const startR = vr * (0.55 + 0.25 * hash01(seed + 5.1));
    const endR = vr * (1.35 + 0.65 * hash01(seed + 6.2));
    const rr = lerp(startR, endR, phase);

    const swirl = Math.sin(t * (0.7 + 0.25 * hash01(seed + 7.7)) + seed) * (0.22 + 0.12 * hash01(seed + 8.3));
    const a = baseA + swirl;

    const rise = -vr * (0.35 + 0.55 * phase);
    const cx = Math.cos(a) * rr * (0.62 + 0.18 * Math.sin(t * 0.9 + seed));
    const cy = Math.sin(a) * rr * (0.48 + 0.15 * Math.cos(t * 1.0 + seed)) + rise;

    const grow = 0.55 + 0.75 * phase;
    const rx = vr * (0.55 + 0.35 * hash01(seed + 9.1)) * grow;
    const ry = vr * (0.45 + 0.30 * hash01(seed + 10.2)) * grow;

    // Alpha fades as puff rises; a little denser at the bottom.
    const alpha = (0.32 + 0.26 * (1 - phase)) * (0.85 + 0.15 * Math.sin(seed));

    const offX = cx - rx * (0.15 + 0.10 * hash01(seed + 11.1));
    const offY = cy - ry * (0.22 + 0.10 * hash01(seed + 12.7));
    const pg = ctx.createRadialGradient(offX, offY, 0, cx, cy, Math.max(rx, ry) * 1.25);
    pg.addColorStop(0, `rgba(14,14,18,${alpha})`);
    pg.addColorStop(0.55, `rgba(62,62,70,${alpha * 0.78})`);
    pg.addColorStop(0.82, `rgba(125,125,132,${alpha * 0.34})`);
    pg.addColorStop(1, 'rgba(140,140,148,0)');
    ctx.fillStyle = pg;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, a * 0.35, 0, TAU);
    ctx.fill();
  }

  // Reset filter for anything else after.
  ctx.filter = 'none';

  ctx.restore();
}

function drawBrideRageFrontFx(b, vr){
  // Smoke front layer: rising wisps and puffs above head.
  const t = world.t || 0;
  const TAU = Math.PI * 2;

  ctx.save();
  ctx.translate(b.x, b.y);

  function fract(x){ return x - Math.floor(x); }
  function hash01(x){ return fract(Math.sin(x) * 43758.5453123); }

  // Front wisps: slightly sharper than back, but still soft.
  const wispBlur = Math.max(0.75, vr * 0.045);
  ctx.filter = `blur(${wispBlur.toFixed(2)}px)`;
  ctx.globalCompositeOperation = 'source-over';

  // Many small rising wisps (more smoke)
  const wispCount = 24;
  for (let i = 0; i < wispCount; i++){
    const seed = i * 41.17;
    const speed = 0.22 + 0.20 * hash01(seed + 2.0);
    const phase = fract(t * speed + hash01(seed + 5.0));

    const lane = (hash01(seed + 7.0) * 2 - 1);
    const x = lane * vr * (0.95 + 0.20 * Math.sin(t * 0.8 + seed)) + Math.sin(t * 1.2 + seed) * vr * 0.10;
    const y = -vr * (0.35 + 1.65 * phase);

    const grow = 0.55 + 0.95 * phase;
    const rx = vr * (0.18 + 0.10 * hash01(seed + 9.0)) * grow;
    const ry = vr * (0.22 + 0.12 * hash01(seed + 10.0)) * grow;
    const rot = (hash01(seed + 11.0) - 0.5) * 1.2 + Math.sin(t * 0.6 + seed) * 0.15;

    const alpha = (0.28 + 0.34 * (1 - phase)) * (0.85 + 0.15 * Math.sin(seed));
    const sg = ctx.createRadialGradient(x - rx * 0.18, y - ry * 0.22, 0, x, y, Math.max(rx, ry) * 1.35);
    sg.addColorStop(0, `rgba(34,34,40,${alpha})`);
    sg.addColorStop(0.55, `rgba(82,82,92,${alpha * 0.62})`);
    sg.addColorStop(0.85, `rgba(150,150,158,${alpha * 0.22})`);
    sg.addColorStop(1, 'rgba(160,160,168,0)');
    ctx.fillStyle = sg;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rot, 0, TAU);
    ctx.fill();
  }

  // A couple of curled smoke strokes (reads as "real" smoke wisps)
  ctx.filter = `blur(${Math.max(0.5, vr * 0.03).toFixed(2)}px)`;
  ctx.strokeStyle = 'rgba(120,120,128,0.22)';
  ctx.lineWidth = Math.max(1.2, vr * 0.05);
  ctx.lineCap = 'round';
  for (let i = 0; i < 4; i++){
    const s = i * 2.4;
    const x0 = (hash01(10 + s) * 2 - 1) * vr * 0.55;
    const y0 = -vr * (0.55 + 0.25 * i);
    const x1 = x0 + Math.sin(t * 0.9 + s) * vr * 0.35;
    const y1 = y0 - vr * 0.55;
    const x2 = x0 - Math.cos(t * 0.8 + s) * vr * 0.35;
    const y2 = y0 - vr * 1.05;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.bezierCurveTo(x1, y1, x2, y1, x2, y2);
    ctx.stroke();
  }

  ctx.filter = 'none';

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

  if (state === GameState.CUTSCENE && !landscape){
    if (stageOneIntroScene.active) updateStageOneIntroScene(dt);
    else if (stageTwoIntroScene.active) updateStageTwoIntroScene(dt);
    else if (stageThreeIntroScene.active) updateStageThreeIntroScene(dt);
  } else if (state === GameState.PLAYING && !landscape){
    // Delayed celebration after final catch (same beat as inter-stage quip).
    if (!world.playEnabled && celebrationStartAt > 0 && world.t >= celebrationStartAt){
      celebrationStartAt = 0;
      world.playEnabled = true;
      enterCelebration();
    }
    // Stage start scheduling (uses world clock)
    if (!world.playEnabled && stageStartAt > 0 && world.t >= stageStartAt){
      const nextIdx = pendingStageIndex;
      stageStartAt = 0;
      countdownFromAt = 0;
      celebrationStartAt = 0;
      hideStageOverlay();
      if (nextIdx === StageId.STAGE_2){
        startStageTwoIntroScene();
      } else if (nextIdx === StageId.STAGE_3){
        startStageThreeIntroScene();
      } else {
        const cfg = getStageCfg(nextIdx);
        applyStageParams(cfg);
        resetGameToPlaying(nextIdx);
        world.playEnabled = true;
        if (nextIdx === 0) hasShownStage1HowTo = true;
      }
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
      text: 'עופר תופס את מושו (בעדינות). הטבעות נשמרות. מושו טוען שזה היה אימון. טל צועקת: "למה אתה מזיע?!"',
    },
    {
      title: 'תפיסה הירואית',
      text: 'תפסתם את מושו, הוא מפיל את הטבעות ומיד דורש חטיפים כפיצוי.',
    },
    {
      title: 'הכלב מקבל תבוסה',
      text: 'מושו נכנע… בכך שהוא נהיה "לחמנייה". הטבעות אצלכם. הכאוס נשאר.',
    },
  ],
  TIME: [
    {
      title: 'הטבעות נעלמו',
      text: 'הזמן נגמר. מושו קבר את הטבעות "לשמירה". החתונה ממשיכה עם טבעות בצל.',
    },
    {
      title: 'החתונה פספסה את הבאזר',
      text: 'השעון נגמר בדיוק כשכולם נכנסו ללחץ. טל מכריזה ש"אהבה היא מעגל, לא בהכרח טבעת".',
    },
    {
      title: 'שוד טבעות בפרווה שחורה',
      text: 'מושו נעלם מהזירה עם שלל נוצץ. עופר מקבל חיבוק, מים, ומבט שמבטיח המשך דרמטי.',
    },
  ],
  ALL_CLEAR: [
    {
      title: 'החתונה ניצלה',
      text: 'מושו נתפס. הטבעות חזרו. טל עדיין לא מרוצה.',
    },
    {
      title: 'סוף טוב',
      text: 'הטבעות ניצלו. הכאוס נשאר.',
    },
    {
      title: 'מושו: הובס, זמנית',
      text: 'הטבעות אצלכם. מושו מובס. לבינתיים.',
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
  if (celebrationResultTitleEl){
    celebrationResultTitleEl.textContent = reason === 'ALL_CLEAR' ? `${o.title} • ${runScore.totalPoints} נק׳` : o.title;
  }
  if (celebrationResultSummaryEl){
    celebrationResultSummaryEl.textContent = reason === 'ALL_CLEAR'
      ? `${o.text} לחצו על הבקבוקים כדי לשלוח את עופר או את טל לדרינק קצר על הבר.`
      : o.text;
  }
  renderEndScore();
}

// =============================
// UI wiring
// =============================
function enterIdle(){
  resetCelebrationState();
  stopPreCelebrationRunMusic();
  state = GameState.IDLE;
  stageOneIntroScene.active = false;
  stageTwoIntroScene.active = false;
  stageThreeIntroScene.active = false;
  setHidden(startUI, false);
  setHidden(endUI, true);
  setHidden(rotateUI, true);
  setHidden(stageUI, true);
  hideCutsceneOverlay();
  setHidden(hudRow, false);
  if (devBackToStartBtn) setHidden(devBackToStartBtn, true);
  setJoystickHidden(false);
  if (canvas && startUIDemoViewport) startUIDemoViewport.appendChild(canvas);
  if (joystickEl && startUIDemoPanel) startUIDemoPanel.appendChild(joystickEl);
  if (timerEl && startUITimerWrap) startUITimerWrap.appendChild(timerEl);
  if (joystickEl) joystickEl.classList.add('joystick--onStart');
  resetJoystickVisual();
  setQuip('');
  celebrationStartAt = 0;
  if (instructionsEl) instructionsEl.style.opacity = '0';
  chaosEl.textContent = '';
  chaosEl.classList.remove('chaosBanner--pulse');
  hudPrevChaosActive = false;
  setHidden(chaosEl, true);
  const idleDur = (getStageCfg(StageId.STAGE_1)?.durationSec ?? DEFAULT_GAME_DURATION);
  demoTimeLeft = idleDur;
  demoTimerStarted = false;
  if (timerEl) timerEl.textContent = idleDur.toFixed(1);
  world.playEnabled = false;
  world.stageIndex = StageId.STAGE_1;
  applyStageParams(getStageCfg(StageId.STAGE_1));
  resizeCanvas();
  initDemoPositions();
  demoTimerStarted = true; // Start timer as soon as start screen opens (initDemoPositions resets it)
  demoLoop.lastT = 0;
  if (demoRafId) cancelAnimationFrame(demoRafId);
  demoRafId = requestAnimationFrame(demoLoop);
}

function goToPlayingAndStartStage(stageIndex, opts = {}) {
  const skipStage1Intro = !!opts.skipStage1Intro;
  const skipStage2Intro = !!opts.skipStage2Intro;
  const skipStage3Intro = !!opts.skipStage3Intro;
  if (stageIndex === StageId.STAGE_1 && !skipStage1Intro){
    startStageOneIntroScene();
    return;
  }
  if (stageIndex === StageId.STAGE_2 && !skipStage2Intro){
    startStageTwoIntroScene();
    return;
  }
  if (stageIndex === StageId.STAGE_3 && !skipStage3Intro){
    startStageThreeIntroScene();
    return;
  }
  if (demoRafId) {
    cancelAnimationFrame(demoRafId);
    demoRafId = 0;
  }
  if (joystickEl) joystickEl.classList.remove('joystick--onStart');
  mountGameIntoAppShell();
  setJoystickHidden(false);
  state = GameState.PLAYING;
  setHidden(startUI, true);
  if (stageIndex === 0) hasShownStage1HowTo = true;
  if (devBackToStartBtn) setHidden(devBackToStartBtn, false);
  startStageImmediately(stageIndex);
  startLoopIfNeeded();
}

function goToCelebration() {
  if (demoRafId) {
    cancelAnimationFrame(demoRafId);
    demoRafId = 0;
  }
  if (joystickEl) joystickEl.classList.remove('joystick--onStart');
  const appEl = document.getElementById('app');
  if (canvas && startUIDemoViewport && canvas.parentNode === startUIDemoViewport && appEl) {
    appEl.insertBefore(canvas, appEl.firstChild);
  }
  if (joystickEl && appEl) appEl.appendChild(joystickEl);
  if (timerEl && hudRow) hudRow.appendChild(timerEl);
  state = GameState.PLAYING;
  setHidden(startUI, true);
  if (devBackToStartBtn) setHidden(devBackToStartBtn, false);
  resizeCanvas();
  syncWorldToCanvasSize();
  world.t = nowSec();
  world.playEnabled = true;
  enterCelebration();
  startLoopIfNeeded();
}

if (startBtn) startBtn.addEventListener('click', async () => {
  await Promise.all([ensureAudioUnlocked(), primeHtmlAudioElements()]);
  audio.sfx.start();
  goToPlayingAndStartStage(StageId.STAGE_1, { skipStage1Intro: true });
}, { passive: true });

if (introSceneBtn) {
  introSceneBtn.addEventListener('click', async () => {
    await Promise.all([ensureAudioUnlocked(), primeHtmlAudioElements()]);
    audio.sfx.start();
    startStageOneIntroScene();
  }, { passive: true });
}

if (introScene2Btn) {
  introScene2Btn.addEventListener('click', async () => {
    await Promise.all([ensureAudioUnlocked(), primeHtmlAudioElements()]);
    audio.sfx.start();
    startStageTwoIntroScene();
  }, { passive: true });
}

if (introScene3Btn) {
  introScene3Btn.addEventListener('click', async () => {
    await Promise.all([ensureAudioUnlocked(), primeHtmlAudioElements()]);
    audio.sfx.start();
    startStageThreeIntroScene();
  }, { passive: true });
}

function setupDevStageButton(btn, stageIndex, opts = {}) {
  if (!btn) return;
  btn.addEventListener('click', async () => {
    await ensureAudioUnlocked();
    audio.sfx.start();
    goToPlayingAndStartStage(stageIndex, opts);
  }, { passive: true });
}
setupDevStageButton(devStage1Btn, StageId.STAGE_1, { skipStage1Intro: true });
setupDevStageButton(devStage2Btn, StageId.STAGE_2, { skipStage2Intro: true });
setupDevStageButton(devStage3Btn, StageId.STAGE_3, { skipStage3Intro: true });

if (devCelebrationBtn) {
  devCelebrationBtn.addEventListener('click', async () => {
    await ensureAudioUnlocked();
    audio.sfx.start();
    goToCelebration();
  }, { passive: true });
}

if (devBackToStartBtn) {
  devBackToStartBtn.addEventListener('click', () => {
    enterIdle();
  }, { passive: true });
}

if (celebrationResultBtn) {
  celebrationResultBtn.addEventListener('click', () => {
    setCelebrationResultDrawerOpen(!celebration.scoreDrawerOpen);
  }, { passive: true });
}

if (celebrationRestartBtn) {
  celebrationRestartBtn.addEventListener('click', async () => {
    await Promise.all([ensureAudioUnlocked(), primeHtmlAudioElements()]);
    audio.sfx.start();
    goToPlayingAndStartStage(StageId.STAGE_1, { skipStage1Intro: true });
  }, { passive: true });
}

restartBtn.addEventListener('click', async () => {
  await Promise.all([ensureAudioUnlocked(), primeHtmlAudioElements()]);
  audio.sfx.start();

  // Retry same stage on TIME. After full clear, restart from stage 1.
  const retryStage = world.endReason === 'TIME' ? world.stageIndex : StageId.STAGE_1;
  if (retryStage === StageId.STAGE_1){
    startStageOneIntroScene();
    return;
  }
  state = GameState.PLAYING;
  setHidden(endUI, true);
  startStageImmediately(retryStage);
  startLoopIfNeeded();
}, { passive: true });

window.addEventListener('resize', () => {
  resizeCanvas();
  if (state === GameState.IDLE){
    initDemoPositions();
  } else {
    syncWorldToCanvasSize();
  }
}, { passive: true });

// =============================
// Page visibility: pause music when tab is hidden, resume on return
// =============================
document.addEventListener('visibilitychange', () => {
  const els = [introSceneMusicEl, stagePlayMusicEl, stage2BassChaosMusicEl, brideRageChaosMusicEl, celebrationMusicEl];
  if (document.hidden){
    for (const el of els){
      if (el && !el.paused){
        el._pausedByVisibility = true;
        el.pause();
      }
    }
  } else {
    for (const el of els){
      if (el && el._pausedByVisibility){
        el._pausedByVisibility = false;
        void el.play().catch(() => {});
      }
    }
  }
});

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
