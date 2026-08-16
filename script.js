const opening = document.getElementById('opening');
document.getElementById('openInvitation').addEventListener('click', () => {
  opening.classList.add('hidden');
  document.body.classList.add('opened');
  const music = document.getElementById('weddingMusic');
  music.play().catch(()=>{});
});

const music = document.getElementById('weddingMusic');
const musicBtn = document.getElementById('musicBtn');
musicBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play().then(()=>musicBtn.textContent='❚❚').catch(()=>{});
  } else {
    music.pause();
    musicBtn.textContent='♫';
  }
});

const target = new Date('2026-11-07T08:30:00+07:00').getTime();
function updateCountdown(){
  const now = Date.now();
  let diff = Math.max(0, target-now);
  const d = Math.floor(diff/86400000); diff%=86400000;
  const h = Math.floor(diff/3600000); diff%=3600000;
  const m = Math.floor(diff/60000); diff%=60000;
  const s = Math.floor(diff/1000);
  document.getElementById('days').textContent=d;
  document.getElementById('hours').textContent=h;
  document.getElementById('minutes').textContent=m;
  document.getElementById('seconds').textContent=s;
}
updateCountdown(); setInterval(updateCountdown,1000);

const form = document.getElementById('wishForm');
const list = document.getElementById('wishList');
function renderWishes(){
  const data = JSON.parse(localStorage.getItem('alviyanDindaWishes') || '[]');
  list.innerHTML = data.map(x => `<div class="wish-item"><b>${escapeHtml(x.name)}</b><p>${escapeHtml(x.text)}</p></div>`).join('');
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
form.addEventListener('submit', e=>{
  e.preventDefault();
  const data = JSON.parse(localStorage.getItem('alviyanDindaWishes') || '[]');
  data.unshift({name:document.getElementById('guestName').value.trim(),text:document.getElementById('wishText').value.trim()});
  localStorage.setItem('alviyanDindaWishes',JSON.stringify(data.slice(0,30)));
  form.reset(); renderWishes();
});
renderWishes();

const style = document.createElement('style');
style.textContent = '.opening{transition:opacity .7s,visibility .7s}.opening.hidden{opacity:0;visibility:hidden;pointer-events:none}';
document.head.appendChild(style);
