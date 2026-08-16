document.body.classList.add('locked');

const opening = document.getElementById('opening');
const openBtn = document.getElementById('openBtn');
const music = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');

openBtn.addEventListener('click', async () => {
  opening.classList.add('hide');
  document.body.classList.remove('locked');
  try {
    await music.play();
    musicBtn.textContent = '❚❚';
  } catch (e) {
    musicBtn.textContent = '♫';
  }
});

musicBtn.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = '❚❚';
    } catch (e) {
      alert('File musik belum tersedia. Jika Anda memiliki file MP3 yang sah/berlisensi, simpan dengan nama river-flows-in-you.mp3 di folder yang sama dengan index.html.');
    }
  } else {
    music.pause();
    musicBtn.textContent = '♫';
  }
});

const target = new Date('2026-11-07T08:30:00+07:00').getTime();
function updateCountdown(){
  let diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86400000); diff %= 86400000;
  const hours = Math.floor(diff / 3600000); diff %= 3600000;
  const minutes = Math.floor(diff / 60000); diff %= 60000;
  const seconds = Math.floor(diff / 1000);
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}
updateCountdown();
setInterval(updateCountdown,1000);

const form = document.getElementById('rsvpForm');
const result = document.getElementById('rsvpResult');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('guestName').value;
  const attendance = document.getElementById('attendance').value;
  const count = document.getElementById('guestCount').value;
  const message = document.getElementById('guestMessage').value;

  const data = {name, attendance, count, message, time:new Date().toISOString()};
  const saved = JSON.parse(localStorage.getItem('alviyanDindaRSVP') || '[]');
  saved.unshift(data);
  localStorage.setItem('alviyanDindaRSVP', JSON.stringify(saved.slice(0,50)));

  result.innerHTML = `Terima kasih, <b>${escapeHtml(name)}</b>.<br>Konfirmasi Anda: <b>${escapeHtml(attendance)}</b> untuk ${escapeHtml(count)} orang.`;
  form.reset();
  document.getElementById('guestCount').value = 1;
});

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[c]));
}
