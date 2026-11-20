/* Independent Google review modal: no dependency on the rest of app.js. */
(()=>{
 const init=()=>{
  const dialog=document.getElementById('cbk-review-dialog');
  const track=document.getElementById('cbk-reviews-track');
  if(!dialog||!track)return;
  const rail=track.querySelector('.cbk-reviews-rail');
  const title=dialog.querySelector('#cbk-review-dialog-author');
  const body=dialog.querySelector('#cbk-review-dialog-text');
  const stop=()=>{if(rail)rail.style.animationPlayState='paused'};
  const resume=()=>{if(rail)rail.style.animationPlayState=''};
  track.addEventListener('pointerdown',e=>{if(e.target.closest('.cbk-review-expand'))stop()},{capture:true});
  track.addEventListener('click',e=>{
   const button=e.target.closest('.cbk-review-expand');
   if(!button)return;
   e.preventDefault();e.stopPropagation();
   const card=button.closest('.cbk-review-card');
   if(!card)return;
   title.textContent=card.querySelector('.cbk-review-author')?.childNodes[0]?.textContent?.trim()||'Reseña de Google';
   body.textContent=(card.querySelector('blockquote')?.textContent||'').trim().replace(/^“|”$/g,'');
   stop();
   try{if(!dialog.open)dialog.showModal()}catch(err){dialog.setAttribute('open','')}
  });
  dialog.querySelector('.cbk-review-dialog-close')?.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  dialog.addEventListener('close',resume);
  document.addEventListener('pointerup',()=>{if(!dialog.open)resume()});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
