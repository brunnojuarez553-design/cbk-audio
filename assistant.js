
/* CBK premium AI concierge — available on every page loading app.js */
(()=>{
 if(document.getElementById('cbk-assistant'))return;
 const root=document.createElement('div');root.id='cbk-assistant';
 root.innerHTML=`<button class="cbk-ai-launch" type="button" aria-label="Abrir asistente virtual" aria-expanded="false"><span class="cbk-ai-orb"><img src="${new URL('assets/cbk-logo-vector.svg',document.querySelector('script[src*="assistant.js"]')?.src||location.origin+'/').href}" alt="" aria-hidden="true"></span></button>
 <div class="cbk-ai-nudge" role="status" hidden><button type="button" class="cbk-ai-nudge-close" aria-label="Cerrar mensaje">×</button><strong>¿Necesitas ayuda con tu coche?</strong><span>Estoy aquí para resolver tus dudas y asesorarte.</span><button type="button" class="cbk-ai-nudge-open">HABLAR CON EL ASISTENTE ↗</button></div>
 <section class="cbk-ai-panel" role="dialog" aria-modal="false" aria-label="Asistente virtual CBK" hidden>
 <header class="cbk-ai-header"><div class="cbk-ai-avatar">✦</div><div><strong>CBK CONCIERGE</strong><small><span class="cbk-ai-live"></span> ASISTENTE VIRTUAL · SEGURIDAD Y TECNOLOGÍA</small></div><button type="button" class="cbk-ai-close" aria-label="Cerrar asistente">×</button></header>
 <div class="cbk-ai-messages" aria-live="polite"><div class="cbk-ai-msg bot">¡Hola! Soy el asistente virtual de CBK. ¿En qué puedo ayudarte con tu vehículo? Puedo orientarte sobre seguridad IGLA, Toyota, GPS, audio y mucho más.</div></div>
 <div class="cbk-ai-chips"><button type="button" data-question="Quiero proteger mi coche con IGLA, ¿cómo funciona?">PROTECCIÓN IGLA</button><button type="button" data-question="¿Qué soluciones de seguridad ofrecéis para Toyota?">TOYOTA</button><button type="button" data-question="Quiero asesoramiento para mi vehículo">ASESORAMIENTO</button></div>
 <div class="cbk-ai-lead"><a class="cbk-ai-ready-wa" href="https://wa.me/34722193861" target="_blank" rel="noopener noreferrer" hidden>ENVIAR CONSULTA POR WHATSAPP ↗<small>CBK CONFIRMARÁ LA DISPONIBILIDAD · NO ES UNA RESERVA</small></a><button type="button" class="cbk-ai-lead-toggle" aria-expanded="false">✧ PREPARAR MI CONSULTA POR WHATSAPP <span>⌄</span></button>
 <div class="cbk-ai-lead-body" hidden><p>Cuéntanos los detalles de tu coche para que podamos asesorarte mejor. No es necesario completarlo todo.</p>
 <div class="cbk-ai-fields"><label>Tu nombre<input name="name" maxlength="70" autocomplete="given-name" placeholder="¿Cómo te llamas?"></label><label>Marca del vehículo<input name="brand" maxlength="70" placeholder="Ej. Toyota"></label><label>Modelo<input name="model" maxlength="70" placeholder="Ej. Corolla Cross"></label><label>Año<input name="year" inputmode="numeric" maxlength="4" placeholder="Ej. 2024"></label><label>Transmisión<select name="transmission"><option value="">Seleccionar</option><option>Manual</option><option>Automático</option></select></label><label>Combustible<select name="fuel"><option value="">Seleccionar</option><option>Gasolina</option><option>Diésel</option><option>Híbrido</option><option>Híbrido enchufable</option><option>Eléctrico</option><option>Otro</option></select></label><label class="wide">¿Qué necesitas?<textarea name="interest" rows="2" maxlength="450" placeholder="Ej. Instalar IGLA 231 y localizador GPS"></textarea></label></div>
 <a class="cbk-ai-whatsapp" target="_blank" rel="noopener noreferrer" href="https://wa.me/34722193861">ENVIAR CONSULTA A CBK POR WHATSAPP ↗</a><small class="cbk-ai-privacy">Al pulsar, se abrirá WhatsApp con los datos que hayas decidido compartir. Revisa el mensaje antes de enviarlo.</small></div></div>
 <form class="cbk-ai-compose"><input aria-label="Escribe tu consulta" maxlength="1800" placeholder="Escribe tu consulta..." required><button type="submit" aria-label="Enviar mensaje">➤</button></form>
 <div class="cbk-ai-foot">CBK CAR AUDIO & SECURITY · COLLADO VILLALBA</div></section>`;
 document.body.appendChild(root);
 // The assistant replaces the old floating WhatsApp shortcut; the WhatsApp handoff inside chat remains.
 document.querySelectorAll(".whatsapp-float").forEach(el=>el.remove());
 const launch=root.querySelector('.cbk-ai-launch'),panel=root.querySelector('.cbk-ai-panel'),close=root.querySelector('.cbk-ai-close'),messages=root.querySelector('.cbk-ai-messages'),form=root.querySelector('.cbk-ai-compose'),input=form.querySelector('input'),submit=form.querySelector('button'),leadToggle=root.querySelector('.cbk-ai-lead-toggle'),leadBody=root.querySelector('.cbk-ai-lead-body'),wa=root.querySelector('.cbk-ai-whatsapp'),readyWa=root.querySelector('.cbk-ai-ready-wa');
 const nudge=root.querySelector('.cbk-ai-nudge');let history=[],busy=false,nudgeDismissed=false,preferredTime='',handoffIntent=false;
 const dismissNudge=()=>{nudge.hidden=true;nudgeDismissed=true};
 nudge.querySelector('.cbk-ai-nudge-close').addEventListener('click',dismissNudge);
 nudge.querySelector('.cbk-ai-nudge-open').addEventListener('click',()=>open(true));
 window.setTimeout(()=>{if(panel.hidden&&!nudgeDismissed&&!document.hidden)nudge.hidden=false},45000);
 function open(show){if(show)dismissNudge();panel.hidden=!show;launch.setAttribute('aria-expanded',String(show));launch.classList.toggle('active',show);if(show)setTimeout(()=>input.focus(),100)}
 launch.addEventListener('click',()=>open(panel.hidden));close.addEventListener('click',()=>open(false));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)open(false)});
 leadToggle.addEventListener('click',()=>{leadBody.hidden=!leadBody.hidden;leadToggle.setAttribute('aria-expanded',String(!leadBody.hidden));if(!leadBody.hidden)leadBody.querySelector('input')?.focus()});
 const fields=['name','brand','model','year','transmission','fuel','interest'];
 const required=['name','brand','transmission','fuel'];
 const isComplete=()=>required.every(k=>details()[k].trim().length>0);
 const updateHandoff=()=>{readyWa.hidden=!(handoffIntent&&isComplete());if(!readyWa.hidden)whatsapp()};
 const details=()=>Object.fromEntries(fields.map(k=>[k,(root.querySelector('[name="'+k+'"]')?.value||'').trim()]));
 function whatsapp(){
  const d=details(),lines=['Hola, equipo de CBK. Me gustaría recibir asesoramiento sobre mi vehículo.',''];
  const labels={name:'Nombre',brand:'Marca',model:'Modelo',year:'Año',transmission:'Transmisión',fuel:'Combustible',interest:'Consulta'};
  fields.forEach(k=>{if(d[k])lines.push(labels[k]+': '+d[k])});
  const last=history.filter(m=>m.role==='user').slice(-1)[0];
  if(!d.interest&&last)lines.push('Mi consulta: '+last.content.slice(0,350));
  if(preferredTime)lines.push('Fecha/hora preferida (pendiente de confirmación): '+preferredTime);
  lines.push('','Entiendo que esto es una solicitud y que CBK debe confirmar cualquier cita. Gracias.');
  wa.href='https://wa.me/34722193861?text='+encodeURIComponent(lines.join('\n'));
  readyWa.href=wa.href;
 }
 root.querySelectorAll('.cbk-ai-fields input,.cbk-ai-fields select,.cbk-ai-fields textarea').forEach(el=>el.addEventListener('input',()=>{whatsapp();updateHandoff()}));wa.addEventListener('click',whatsapp);readyWa.addEventListener('click',e=>{if(!isComplete()){e.preventDefault();readyWa.hidden=true;return}whatsapp()});whatsapp();updateHandoff();
 function bubble(text,kind){const el=document.createElement('div');el.className='cbk-ai-msg '+kind;el.textContent=text;messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el}
 async function send(value){
  const text=value.trim();if(!text||busy)return;busy=true;submit.disabled=true;input.value='';
  bubble(text,'user');history.push({role:'user',content:text});const waiting=bubble('Escribiendo…','bot thinking');
  try{
   const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history.slice(-16),details:details()})});
   const data=await res.json();if(!res.ok)throw Error(data.error||'No disponible');
   waiting.remove();bubble(data.reply,'bot');history.push({role:'assistant',content:data.reply});history=history.slice(-16);
   if(data.collected&&typeof data.collected==='object'){
    fields.forEach(k=>{const el=root.querySelector('[name="'+k+'"]');const value=data.collected[k];if(el&&!el.value&&typeof value==='string'&&value.trim())el.value=value.trim()});
    if(typeof data.collected.preferredTime==='string'&&data.collected.preferredTime.trim())preferredTime=data.collected.preferredTime.trim();
   }
   if(data.ready)handoffIntent=true;
   updateHandoff();
   messages.scrollTop=messages.scrollHeight;
  }catch(e){waiting.remove();bubble(e.message||'No hemos podido conectar. Puedes escribirnos por WhatsApp.','bot error')}
  finally{busy=false;submit.disabled=false;whatsapp();input.focus()}
 }
 form.addEventListener('submit',e=>{e.preventDefault();send(input.value)});
 root.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>send(b.dataset.question)));
})();
