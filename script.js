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

document.getElementById('rsvpForm').addEventListener('submit',e=>{
 e.preventDefault();
 const name=document.getElementById('guestName').value;
 const attendance=document.getElementById('attendance').value;
 const count=document.getElementById('guestCount').value;
 const message=document.getElementById('guestMessage').value;
 const key='alviyanDindaRSVP';
 const arr=JSON.parse(localStorage.getItem(key)||'[]');
 arr.unshift({name,attendance,count,message,time:new Date().toISOString()});
 localStorage.setItem(key,JSON.stringify(arr.slice(0,50)));
 document.getElementById('rsvpResult').innerHTML=`Terima kasih, <b>${safe(name)}</b>.<br>Konfirmasi: <b>${safe(attendance)}</b> untuk ${safe(count)} orang.`;
 e.target.reset();document.getElementById('guestCount').value=1;
});
function safe(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
