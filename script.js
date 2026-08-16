const opening=document.getElementById('openInvitation');
const cover=document.getElementById('coverScreen');
const music=document.getElementById('music');
const musicBtn=document.getElementById('musicBtn');

opening.addEventListener('click',async()=>{
  cover.classList.add('hide');
  document.body.classList.remove('locked');
  try{await music.play();musicBtn.textContent='❚❚';}catch(e){musicBtn.textContent='♫';}
});
musicBtn.addEventListener('click',async()=>{
  if(music.paused){
    try{await music.play();musicBtn.textContent='❚❚';}
    catch(e){alert('File musik belum tersedia. Jika Anda memiliki file MP3 yang sah/berlisensi, simpan dengan nama river-flows-in-you.mp3 di folder yang sama dengan index.html.');}
  }else{music.pause();musicBtn.textContent='♫';}
});

const target=new Date('2026-11-07T08:30:00+07:00').getTime();
function tick(){
  let d=Math.max(0,target-Date.now());
  const days=Math.floor(d/86400000);d%=86400000;
  const hours=Math.floor(d/3600000);d%=3600000;
  const minutes=Math.floor(d/60000);d%=60000;
  const seconds=Math.floor(d/1000);
  document.getElementById('days').textContent=days;
  document.getElementById('hours').textContent=hours;
  document.getElementById('minutes').textContent=minutes;
  document.getElementById('seconds').textContent=seconds;
}
tick();setInterval(tick,1000);

const RSVP_ENDPOINT='https://script.google.com/macros/s/AKfycbyy7_xqPgOE0Hf5Xk3GaxZ2ucL5iVrG1ydolPnheoj39Qu316GrC8vJkQxmoKGGeNY_VQ/exec';
const rsvpForm=document.getElementById('rsvpForm');
const rsvpFrame=document.getElementById('rsvpSubmitFrame');
const rsvpResult=document.getElementById('rsvpResult');
rsvpForm.addEventListener('submit',e=>{
 e.preventDefault();
 const name=document.getElementById('guestName').value.trim();
 const attendance=document.getElementById('attendance').value;
 const count=document.getElementById('guestCount').value;
 if(!name||!attendance||!count){rsvpResult.textContent='Mohon lengkapi nama, kehadiran, dan jumlah tamu.';return;}
 rsvpForm.target='rsvpSubmitFrame'; rsvpForm.action=RSVP_ENDPOINT; rsvpForm.method='GET';
 rsvpResult.textContent='Mengirim konfirmasi...';
 const btn=rsvpForm.querySelector('button[type="submit"]'); btn.disabled=true; btn.style.opacity='.65';
 rsvpFrame.onload=()=>{rsvpResult.innerHTML=`Terima kasih, <b>${safe(name)}</b>.<br>Konfirmasi Anda sudah dikirim.`;rsvpForm.reset();document.getElementById('guestCount').value=1;btn.disabled=false;btn.style.opacity='1';};
 rsvpForm.submit();
});
function safe(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
