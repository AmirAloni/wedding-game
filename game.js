/* Wedding Chaos: Ofer vs Mushu (mobile-only canvas)
   No external assets. Touch only. Portrait-ish.
*/
'use strict';

// =============================
// Constants (tweak here)
// =============================
const GAME_DURATION = 30;       // seconds (how long you have to catch Mushu)
const CHAOS_INTERVAL = 5;       // seconds (how often chaos triggers)
const PLAYER_SPEED = 1250;      // "oomph" for Ofer (higher = snappier, easier)

// How to tweak chaos:
// - Change CHAOS_EVENT_MIN_MS / CHAOS_EVENT_MAX_MS to make chaos shorter/longer.
// - Change CHAOS_WEIGHTS to bias which events happen more.
const CHAOS_EVENT_MIN_MS = 4000;
const CHAOS_EVENT_MAX_MS = 4000;

// How to adjust difficulty:
// - Increase PLAYER_SPEED to make catching easier.
// - Increase MUSHU_BASE_SPEED to make Mushu harder.
// - Increase ARENA_MARGIN to reduce playable area (harder).
const MUSHU_BASE_SPEED = 330;
const ARENA_MARGIN = 18;

// How to change text:
// - Edit OUTCOMES at the bottom for different absurd endings.

// =============================
// DOM / Canvas
// =============================
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d', { alpha: false });

// Cached background for the canvas (rebuilt on resize).
let bgCache = null;

const startUI = document.getElementById('startUI');
const endUI = document.getElementById('endUI');
const rotateUI = document.getElementById('rotateUI');

const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

const timerEl = document.getElementById('timer');
const chaosEl = document.getElementById('chaos');
const instructionsEl = document.getElementById('instructions');
const endTitleEl = document.getElementById('endTitle');
const endTextEl = document.getElementById('endText');

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

  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d', { alpha: false });

  // Lawn gradient.
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

  // Keep background clean: no decorative ellipses/circles over the lawn.

  bgCache = { w, h, c };
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

  timeLeft: GAME_DURATION,
  chaosCountdown: CHAOS_INTERVAL,
  chaosActive: false,
  chaosName: 'רגוע(בערך)',
  chaosUntil: 0,
  instructionsUntil: 0,
  shakeUntil: 0,

  mushuBoost: 1,
  brideRage: false,

  caught: false,
  endReason: '',
};

const ofer = {
  x: 0, y: 0,
  vx: 0, vy: 0,
  r: 22,
  color: '#3cffb0',
  label: 'עופר 🤵',
};

const mushu = {
  x: 0, y: 0,
  vx: 0, vy: 0,
  r: 18,
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

  // Chuppah near the top center.
  const chW = clamp(w * 0.46, 190, 280);
  const chH = clamp(h * 0.12, 84, 128);
  const chX = clamp(w * 0.5 - chW / 2, left, right - chW);
  const chY = clamp(top + h * 0.07, top, bottom - chH);
  obstacles.push({
    kind: 'rect',
    type: 'chuppah',
    x: chX,
    y: chY,
    w: chW,
    h: chH,
    r: 16,
  });

  // Tables + chairs in the middle-ish area.
  const tableR = clamp(Math.min(w, h) * 0.055, 34, 52);
  const tableY = clamp(h * 0.60, top + chH + 70, bottom - tableR - 40);
  const tableX1 = clamp(w * 0.28, left + tableR + 30, right - tableR - 30);
  const tableX2 = clamp(w * 0.72, left + tableR + 30, right - tableR - 30);

  const tables = [
    { x: tableX1, y: tableY },
    { x: tableX2, y: tableY + clamp(h * 0.02, -18, 18) },
  ];

  for (const t of tables){
    obstacles.push({ kind: 'circle', type: 'table', x: t.x, y: t.y, r: tableR });

    const chairR = clamp(tableR * 0.42, 14, 22);
    const ring = tableR + chairR + 10;
    const chairAngles = [
      0,
      Math.PI / 3,
      (2 * Math.PI) / 3,
      Math.PI,
      (4 * Math.PI) / 3,
      (5 * Math.PI) / 3,
    ];
    for (const a of chairAngles){
      const cx = t.x + Math.cos(a) * ring;
      const cy = t.y + Math.sin(a) * ring;
      if (cx < left + chairR || cx > right - chairR || cy < top + chairR || cy > bottom - chairR) continue;
      obstacles.push({ kind: 'circle', type: 'chair', x: cx, y: cy, r: chairR });
    }
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
      hue: randInt(0, 360),
      size: rand(2, 5),
      spin: rand(-10, 10),
    });
  }
}

function resetGameToPlaying(){
  resizeCanvas();
  syncWorldToCanvasSize();
  const w = world.w, h = world.h;
  world.t = nowSec();
  world.lastT = world.t;
  world.dt = 0;
  world.timeLeft = GAME_DURATION;
  world.chaosCountdown = CHAOS_INTERVAL;
  world.chaosActive = false;
  world.chaosName = 'רגוע(בערך)';
  world.chaosUntil = 0;
  world.instructionsUntil = world.t + 5;
  world.shakeUntil = 0;
  world.mushuBoost = 1;
  world.brideRage = false;
  world.caught = false;
  world.endReason = '';

  // Start positions (portrait-ish)
  // Keep initial action closer to screen center (less "spawn at bottom / ceiling").
  ofer.x = w * 0.5; ofer.y = h * 0.70;
  ofer.vx = 0; ofer.vy = 0;

  mushu.x = w * 0.5; mushu.y = h * 0.40;
  mushu.vx = rand(-120, 120); mushu.vy = rand(-60, 60);
  mushu.hasRings = true;
  mushu.mood = rand(0, 1000);
  mushu.zigUntil = 0;

  tal.x = w * 0.16; tal.y = h * 0.18;
  tal.vx = 110; tal.vy = 30;
  tal.visible = true;

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
}

function enterEnd(reason){
  state = GameState.END;
  world.endReason = reason;
  setHidden(endUI, false);
  setHidden(startUI, true);
  instructionsEl.style.opacity = '0';
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

// Bias: more goofy camera + controls.
const CHAOS_WEIGHTS = [
  [ChaosEvent.MUSHU_BOOST, 1.1],
  [ChaosEvent.SCREEN_SHAKE, 1.25],
  [ChaosEvent.BRIDE_RAGE, 1.15],
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
  const dur = rand(CHAOS_EVENT_MIN_MS, CHAOS_EVENT_MAX_MS) / 1000;
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
      world.mushuBoost = rand(1.6, 2.3);
      mushu.vx *= rand(1.05, 1.25);
      mushu.vy *= rand(1.05, 1.25);
      break;
    case ChaosEvent.SCREEN_SHAKE:
      world.shakeUntil = t + dur;
      break;
    case ChaosEvent.BRIDE_RAGE:
      world.brideRage = true;
      // Tal becomes the rule engine: she injects wind + random bonks.
      tal.vx *= 1.25;
      tal.vy *= 1.1;
      break;
  }

  if (audio) audio.sfx.chaos();
}

function updateChaos(dt){
  if (world.chaosActive && world.t >= world.chaosUntil){
    clearChaosEffects();
  }

  world.chaosCountdown -= dt;
  if (world.chaosCountdown <= 0){
    world.chaosCountdown = CHAOS_INTERVAL;
    const ev = pickWeighted(CHAOS_WEIGHTS);
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
  const ax = (dx * 3.2 + input.dx * 10);
  const ay = (dy * 3.2 + input.dy * 10);

  const accel = PLAYER_SPEED;
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
  const speed = (MUSHU_BASE_SPEED + 110 * Math.sin(mushu.mood * 2.1)) * world.mushuBoost;
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
  const targetR = world.brideRage ? 30 : 20;
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

    // Desired point along the segment Ofer→Mushu (slightly closer to Mushu to block better).
    const minAlong = ofer.r + tal.r + 12;
    const maxAlong = d - (mushu.r + tal.r + 12);
    const desiredAlong = clamp(d * 0.58, minAlong, Math.max(minAlong, maxAlong));

    // Express Tal position in (along, side) relative to Ofer→Mushu line.
    const rx = tal.x - ofer.x;
    const ry = tal.y - ofer.y;
    const along = rx * dx + ry * dy;
    const side = rx * px + ry * py;

    // Strongly correct both along + side errors so Tal sticks "between" them.
    const errAlong = desiredAlong - along;
    const errSide = -side;
    const ax = (dx * errAlong * 7.0) + (px * errSide * 12.0);
    const ay = (dy * errAlong * 7.0) + (py * errSide * 12.0);
    tal.vx += clamp(ax, -1800, 1800) * dt;
    tal.vy += clamp(ay, -1800, 1800) * dt;

    // Wind field (slightly wrong): pushes everyone sideways.
    const wind = Math.sin(t * 9.5) * 280;
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
    p.vx *= Math.pow(0.92, dt * 60);
    p.vy *= Math.pow(0.92, dt * 60);
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
  applyDrag(mushu, dt, 0.955);
  boundsBounce(ofer, true);
  boundsBounce(mushu, false);

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

    // Exaggerated win animation: confetti + overpowered bounce.
    spawnConfetti(90, mushu.x, mushu.y, 520);
    ofer.vx *= -1.2; ofer.vy = -Math.abs(ofer.vy) * 1.35;
    mushu.vx *= 0.15; mushu.vy *= 0.15;

    enterEnd('CAUGHT');
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
    const s = rand(0.8, 1.6) * (window.devicePixelRatio || 1);
    ctx.translate(rand(-1, 1) * s * 6, rand(-1, 1) * s * 6);
  }

  // Background (garden wedding vibe).
  if (!bgCache || bgCache.w !== w || bgCache.h !== h) buildBackgroundCache();
  if (bgCache) ctx.drawImage(bgCache.c, 0, 0);
  else {
    ctx.fillStyle = '#7bd77f';
    ctx.fillRect(0, 0, w, h);
  }

  // Wedding props (obstacles)
  if (!obstacles.length) buildObstacles();
  for (const o of obstacles){
    if (o.type === 'table'){
      // Table cloth
      ctx.fillStyle = 'rgba(255,250,243,.86)';
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();

      // Rim + flower ring
      ctx.strokeStyle = 'rgba(18,49,28,.16)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255,123,184,.26)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r * 0.72, 0, Math.PI * 2);
      ctx.stroke();
    } else if (o.type === 'chair'){
      // Simple chair blob
      ctx.fillStyle = 'rgba(233,238,241,.78)';
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(18,49,28,.12)';
      ctx.lineWidth = 2;
      ctx.stroke();
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
    const pulse = 0.5 + 0.5 * Math.sin(world.t * 9);
    ctx.strokeStyle = `rgba(255,215,140,${0.18 + 0.18 * pulse})`;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(mushu.x, mushu.y, mushu.r + 10 + pulse * 4, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = '800 18px system-ui, -apple-system, Segoe UI, Roboto, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,235,190,.95)';
    ctx.fillText('💍💍', mushu.x, mushu.y - mushu.r - 16);
  }

  // Characters
  drawBody(ofer);
  drawBody(mushu);
  if (tal.visible) drawBody(tal);

  // Particles on top
  for (const p of particles){
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.spin * (1 - p.life));
    ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${clamp(p.life, 0, 1)})`;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.8);
    ctx.restore();
  }

  // HUD text updates (DOM overlay)
  timerEl.textContent = `${world.timeLeft.toFixed(1)}ש׳`;
  chaosEl.textContent = world.chaosActive ? `כאוס: ${world.chaosName}` : 'כאוס: רגוע(בערך)';

  // Instructions fade out after 5 seconds (non-blocking)
  if (state === GameState.PLAYING){
    const remain = world.instructionsUntil - world.t;
    const alpha = clamp(remain / 1.0, 0, 1);
    instructionsEl.style.opacity = String(alpha);
  }
}

function drawBody(b){
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,.28)';
  ctx.beginPath();
  ctx.ellipse(b.x, b.y + b.r * 0.85, b.r * 0.95, b.r * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  const g = ctx.createRadialGradient(b.x - b.r * 0.35, b.y - b.r * 0.35, 2, b.x, b.y, b.r * 1.2);
  g.addColorStop(0, 'rgba(255,255,255,.18)');
  g.addColorStop(0.25, b.color);
  g.addColorStop(1, 'rgba(0,0,0,.2)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
  ctx.fill();

  // Outline
  ctx.strokeStyle = 'rgba(255,255,255,.16)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Label
  drawLabel(b.label, b.x, b.y - b.r - 2);
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
    update(dt);
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
};

function pickOutcome(reason){
  const arr = OUTCOMES[reason] || OUTCOMES.TIME;
  return arr[randInt(0, arr.length - 1)];
}

function showOutcome(reason){
  const o = pickOutcome(reason);
  endTitleEl.textContent = o.title;
  endTextEl.textContent = o.text;
}

// =============================
// UI wiring
// =============================
function enterIdle(){
  state = GameState.IDLE;
  setHidden(startUI, false);
  setHidden(endUI, true);
  setHidden(rotateUI, true);
  instructionsEl.style.opacity = '0';
  chaosEl.textContent = 'כאוס: רגוע(בערך)';
  timerEl.textContent = `${GAME_DURATION.toFixed(1)}ש׳`;
}

startBtn.addEventListener('click', async () => {
  // Unlock audio ONLY after user interaction (MANDATORY).
  await ensureAudioUnlocked();
  audio.sfx.start();

  resetGameToPlaying();
  startLoopIfNeeded();
}, { passive: true });

restartBtn.addEventListener('click', async () => {
  await ensureAudioUnlocked();
  audio.sfx.start();

  resetGameToPlaying(); // END → PLAYING (MANDATORY)
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

// Application Security Requirement: no network calls, no external assets, touch-only input handled locally.
