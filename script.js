/* ===== NAMA TAMU DARI URL (?to=Nama+Tamu) ===== */
(function(){
  const params=new URLSearchParams(window.location.search);
  const raw=params.get('to')||params.get('kepada')||params.get('nama');
  if(!raw)return;
  const name=raw.trim();
  if(!name)return;
  const toGuest=document.getElementById('toGuest');
  const guestNameDisplay=document.getElementById('guestNameDisplay');
  if(toGuest&&guestNameDisplay){
    guestNameDisplay.textContent=name;
    toGuest.style.display='block';
  }
  const guestNameInput=document.getElementById('guestName');
  if(guestNameInput&&!guestNameInput.value)guestNameInput.value=name;
  document.title='Undangan Pernikahan untuk '+name+' — Alviyan & Dinda';
})();

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
 rsvpForm.target='rsvpSubmitFrame'; rsvpForm.action=RSVP_ENDPOINT; rsvpForm.method='POST';
 rsvpResult.textContent='Mengirim konfirmasi...';
 const btn=rsvpForm.querySelector('button[type="submit"]'); btn.disabled=true; btn.style.opacity='.65';
 rsvpFrame.onload=()=>{rsvpResult.innerHTML=`Terima kasih, <b>${safe(name)}</b>.<br>Konfirmasi Anda sudah dikirim.`;rsvpForm.reset();document.getElementById('guestCount').value=1;btn.disabled=false;btn.style.opacity='1';setTimeout(loadUcapan,1800);};
 rsvpForm.submit();
});
function safe(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}

/* ===== UCAPAN & DOA (ambil data dari Google Apps Script via JSONP) ===== */
const ucapanList=document.getElementById('ucapanList');
const ucapanViewport=document.getElementById('ucapanViewport');
const AUTO_SCROLL_MIN=4; // minimal jumlah ucapan sebelum mode ticker aktif
const SECONDS_PER_ITEM=4.2; // makin besar = makin pelan

function renderUcapanItems(list){
  return list.map(item=>`
      <div class="ucapan-item">
        <div class="ucapan-name">${safe(item.nama||'Tamu')}<span class="ucapan-status">${safe(item.kehadiran||'')}</span></div>
        <p class="ucapan-text">${safe(item.ucapan||'')}</p>
      </div>`).join('');
}

function loadUcapan(){
  if(!ucapanList)return;
  const cbName='ucapanCb_'+Date.now();
  const timeout=setTimeout(()=>{if(window[cbName]){delete window[cbName];ucapanList.innerHTML='<p class="ucapan-empty">Gagal memuat ucapan. Coba muat ulang halaman.</p>';}},9000);
  window[cbName]=function(res){
    clearTimeout(timeout);
    delete window[cbName];
    tag.remove();
    ucapanList.classList.remove('scrolling','paused');
    ucapanList.style.animationDuration='';
    if(!res||res.result!=='success'||!Array.isArray(res.data)||res.data.length===0){
      ucapanList.innerHTML='<p class="ucapan-empty">Belum ada ucapan. Jadilah yang pertama mengirimkan doa restu!</p>';
      return;
    }
    const itemsHTML=renderUcapanItems(res.data);
    if(res.data.length>=AUTO_SCROLL_MIN){
      ucapanList.innerHTML=itemsHTML+itemsHTML; // digandakan agar loop mulus
      ucapanList.style.animationDuration=(res.data.length*SECONDS_PER_ITEM)+'s';
      ucapanList.classList.add('scrolling');
    }else{
      ucapanList.innerHTML=itemsHTML;
    }
  };
  const tag=document.createElement('script');
  tag.src=RSVP_ENDPOINT+'?callback='+cbName;
  tag.onerror=()=>{clearTimeout(timeout);ucapanList.innerHTML='<p class="ucapan-empty">Gagal memuat ucapan. Coba muat ulang halaman.</p>';};
  document.body.appendChild(tag);
}
if(ucapanViewport){
  ucapanViewport.addEventListener('click',()=>{
    if(ucapanList.classList.contains('scrolling'))ucapanList.classList.toggle('paused');
  });
}
loadUcapan();
