const screens=[...document.querySelectorAll('.screen')];
const toast=document.getElementById('toast');let activeSong=null;let toastTimer;
// Start points are approximate chorus/main-hook cues, chosen to skip most opening music.
// end is an absolute YouTube video timestamp; each clip plays for about 35 seconds.
const songs={
  bros:{id:'9HbmDkLpXkU',start:49,end:84},
  us:{id:'yKc_OiYWOXU',start:64,end:99},
  dad:{id:'dTZIa4BnpGE',start:54,end:89}
};
function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),4200)}
function stopMusic(){Object.keys(songs).forEach(key=>{const player=document.getElementById(`player-${key}`);if(player){player.innerHTML='';player.hidden=true}});activeSong=null;document.querySelectorAll('.music-toggle').forEach(b=>{b.textContent='▶';b.setAttribute('aria-label',`Play ${b.dataset.song==='bros'?'Hum Nahi Sudhrenge':b.dataset.song==='us'?'Dil Na Jaaneya':'Papa Meri Jaan'}`)})}
function goTo(id){screens.forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>goTo(b.dataset.next)));
document.querySelectorAll('[data-prev]').forEach(b=>b.addEventListener('click',()=>goTo(b.dataset.prev)));
document.getElementById('restart').addEventListener('click',()=>{closeModal('surprise-modal');closeModal('letter-modal');stopMusic();goTo('page-birthday')});
function openModal(id){document.getElementById(id).classList.add('open');document.getElementById(id).setAttribute('aria-hidden','false');document.body.classList.add('modal-open')}
function closeModal(id){document.getElementById(id).classList.remove('open');document.getElementById(id).setAttribute('aria-hidden','true');if(!document.querySelector('.modal.open'))document.body.classList.remove('modal-open')}
document.getElementById('open-letter').addEventListener('click',()=>{openModal('letter-modal');balloonBurst()});
document.getElementById('open-surprise').addEventListener('click',()=>{openModal('surprise-modal');balloonBurst()});
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',()=>closeModal(el.dataset.close)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal.open').forEach(m=>closeModal(m.id))});
function balloonBurst(){for(let i=0;i<18;i++){const b=document.createElement('span');b.className='burst-balloon';b.textContent=Math.random()>.35?'♥':'♡';b.style.cssText=`position:fixed;z-index:35;left:${Math.random()*100}vw;bottom:-50px;color:${['#b94e59','#e79da5','#c99b6c','#fff0e8'][i%4]};font-size:${18+Math.random()*22}px;pointer-events:none;animation:balloon-up ${3+Math.random()*2}s ease-out forwards;`;document.body.appendChild(b);setTimeout(()=>b.remove(),5200)}}
const balloonStyle=document.createElement('style');balloonStyle.textContent='@keyframes balloon-up{0%{transform:translateY(0) rotate(0deg);opacity:0}12%{opacity:1}100%{transform:translateY(-115vh) rotate(35deg);opacity:0}}';document.head.appendChild(balloonStyle);
document.querySelectorAll('.music-toggle').forEach(btn=>btn.addEventListener('click',()=>{
  const key=btn.dataset.song;
  if(activeSong===key){stopMusic();return}
  stopMusic();
  const song=songs[key];const player=document.getElementById(`player-${key}`);
  const iframe=document.createElement('iframe');
  iframe.title=key==='bros'?'Hum Nahi Sudhrenge YouTube player':key==='us'?'Dil Na Jaaneya YouTube player':'Papa Meri Jaan YouTube player';
  iframe.src=`https://www.youtube-nocookie.com/embed/${song.id}?autoplay=1&controls=1&start=${song.start}&end=${song.end}&playsinline=1&rel=0`;
  iframe.allow='autoplay; encrypted-media; picture-in-picture';iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.allowFullscreen=true;
  player.appendChild(iframe);player.hidden=false;activeSong=key;btn.textContent='Ⅱ';btn.setAttribute('aria-label','Stop song');
  showToast('Starting near the main part of the song ♥ If YouTube blocks playback, tap the player or open it on YouTube.');
}));
