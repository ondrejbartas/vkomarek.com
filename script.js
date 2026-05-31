document.getElementById('yr').textContent = new Date().getFullYear();

const navtog = document.getElementById('navtog');
document.querySelectorAll('.menu a').forEach(a =>
  a.addEventListener('click', () => { if (navtog) navtog.checked = false; })
);

const audio = document.getElementById('audio');
const npTitle = document.getElementById('npTitle');
const np = document.querySelector('.np');
const tracks = [...document.querySelectorAll('.track')];
let current = -1;

function load(i, play){
  if (i < 0 || i >= tracks.length) return;
  if (current >= 0) tracks[current].classList.remove('active');
  current = i;
  const t = tracks[i];
  t.classList.add('active');
  audio.src = t.dataset.src;
  npTitle.textContent = t.dataset.title;
  if (play){ audio.play().catch(()=>{}); }
}

tracks.forEach((t,i) => t.addEventListener('click', () => {
  if (i === current){ audio.paused ? audio.play() : audio.pause(); }
  else load(i, true);
}));

audio.addEventListener('play', () => np.classList.remove('paused'));
audio.addEventListener('pause', () => np.classList.add('paused'));
audio.addEventListener('ended', () => load(current + 1, true));
np.classList.add('paused');
