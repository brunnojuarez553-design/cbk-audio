/* CBK service catalogue — links generate a prefilled WhatsApp enquiry. */
const items=[
 ['Sistemas antirrobo','Protección','Asesoramiento sobre soluciones de protección adaptadas a tu vehículo.'],
 ['Antirrobo IGLA','Protección','Sistemas IGLA con consulta previa de compatibilidad e instalación profesional.'],
 ['Antirrobo CBK','Protección','Sistema antirrobo CBK con instalación adaptada a tu vehículo. Consulta opciones y compatibilidad.'],
 ['Dashcam con modo parking','Tecnología','Cámara de grabación con vigilancia durante el estacionamiento, según equipo y configuración.'],
 ['Alarmas','Protección','Instalación de alarmas y sistemas de aviso adecuados a tu coche.'],
 ['Localizadores GPS','Protección','Consulta de equipos y posibilidades de localización para vehículos.'],
 ['Dashcam','Tecnología','Cámaras a bordo con integración profesional.'],
 ['Pantallas multimedia','Tecnología','Actualización de la experiencia multimedia del coche.'],
 ['CarPlay y Android Auto','Tecnología','Activación e integración sujetas a compatibilidad.'],
 ['Detectores de radar','Tecnología','Consultas sobre equipamiento dentro de la normativa aplicable en España.'],
 ['Cámaras de marcha atrás','Tecnología','Mejora la visibilidad durante las maniobras.'],
 ['Insonorización','Sonido','Opciones de tratamiento acústico para el interior del vehículo.'],
 ['Equipos de sonido','Sonido','Instalaciones de audio adaptadas al coche y a tus preferencias.']
];
function wa(service){return 'https://wa.me/34722193861?text='+encodeURIComponent('Hola David, quiero información sobre '+service+' para mi vehículo.');}
function safe(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
const serviceSlugs=['sistemas-antirrobo','antirrobo-igla','sistemas-antirrobo','dashcam','alarmas','localizadores-gps','dashcam','pantallas-multimedia','carplay-android-auto','detectores-radar','camaras-marcha-atras','insonorizacion','equipos-sonido'];
const cards=document.querySelector('#service-cards');
if(cards)cards.innerHTML=items.slice(0,6).map(function(s,i){return '<a class="card" href="servicios/'+serviceSlugs[i]+'/" aria-label="Descubrir '+safe(s[0])+'"><small>0'+(i+1)+' / '+s[1].toUpperCase()+'</small><div class="card-bottom"><div><h3>'+safe(s[0])+'</h3><p>'+safe(s[2])+'</p></div><span class="go">↗</span></div></a>';}).join('');
const more=document.querySelector('#other-list');
if(more)more.innerHTML=items.slice(6).map(function(s,i){return '<a class="other-row" href="servicios/'+serviceSlugs[i+6]+'/"><small>'+String(i+7).padStart(2,'0')+'</small><strong>'+safe(s[0])+'</strong><span class="category">'+safe(s[1])+'</span><span>↗</span></a>';}).join('');
const toggle=document.querySelector('.hamburger'),nav=document.querySelector('#main-nav');
if(toggle&&nav){toggle.addEventListener('click',function(){const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');toggle.textContent=open?'×':'☰';});nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');toggle.textContent='☰';});});}

/* Progressive motion and navigation enhancements */
(function(){
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header=document.querySelector('.header');
const bar=document.createElement('div');bar.className='scroll-progress';bar.setAttribute('aria-hidden','true');document.body.prepend(bar);
let pending=false;
function updateScroll(){pending=false;const y=window.scrollY||0;header?.classList.toggle('is-scrolled',y>35);const max=document.documentElement.scrollHeight-window.innerHeight;bar.style.transform='scaleX('+(max>0?Math.min(1,y/max):0)+')';}
window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(updateScroll)}},{passive:true});window.addEventListener('resize',updateScroll,{passive:true});updateScroll();
/* The cinematic observer below owns reveal transitions.
   Do not run a second observer or apply duplicate transforms to text. */
if(!reduce&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){
 document.querySelectorAll('.card').forEach(card=>{
  let raf=0;card.addEventListener('pointermove',e=>{if(raf)return;raf=requestAnimationFrame(()=>{const r=card.getBoundingClientRect();card.style.setProperty('--spot-x',(e.clientX-r.left)+'px');card.style.setProperty('--spot-y',(e.clientY-r.top)+'px');raf=0})});
  card.addEventListener('pointerleave',()=>{card.style.removeProperty('--spot-x');card.style.removeProperty('--spot-y')});
 });
}
})();

/* Lead qualification: no third-party collection, no storage, WhatsApp handoff */
(function(){
const form=document.getElementById('quote-form');
if(!form)return;
const q=new URLSearchParams(window.location.search).get('servicio');
if(q){const select=form.elements.namedItem('servicio');if(select&&Array.from(select.options).some(o=>o.value===q))select.value=q;}
form.addEventListener('submit',function(event){
event.preventDefault();if(!form.reportValidity())return;
const data=new FormData(form),get=k=>String(data.get(k)||'').trim();
const year=Number(get('anio'));
if(!Number.isInteger(year)||year<1980||year>new Date().getFullYear()+1){form.elements.namedItem('anio').setCustomValidity('Introduce un año válido');form.reportValidity();return;}
form.elements.namedItem('anio').setCustomValidity('');
const msg=['Hola David, quiero asesoramiento para mi coche.','', 'Nombre: '+get('nombre'),'Vehículo: '+get('marca')+' '+get('modelo')+' ('+year+')','Servicio: '+get('servicio'),get('mensaje')?'Consulta: '+get('mensaje'):''].filter(Boolean).join('\n');
const url='https://wa.me/34722193861?text='+encodeURIComponent(msg);
const w=window.open(url,'_blank','noopener,noreferrer');if(!w)window.location.href=url;
});
})();


/* CBK / CINEMATIC SCROLL — progressive enhancement, all pages */
(function(){
'use strict';
const media=window.matchMedia('(prefers-reduced-motion: reduce)');
if(media.matches||!('IntersectionObserver' in window))return;
const selectors=[
 '.stats-inner>div','.statement .wrap>*','.section-title','.split>*',
 '.services .card','.other-services .other-row','.priority-grid>*',
 '.warranty-grid>div','.config-promo-visual','.highlight .wrap>*',
 '.about-grid>*','.about-intro>*','.about-story-grid>*','.about-specialty-heading','.about-specialty-grid>*','.about-service-panel>*','.about-endnote>*','.works .work','.process-grid>div','.faq-grid>*',
 '.quote-grid>*','.contact-grid>*','.map-embed-card',
 '.service-detail-grid>*','.service-faq .service-detail-grid>*',
 '.related-grid>a','.final-cta-inner>*',
 '.config-hero .wrap>*','.config-main','.config-sidebar>*',
 '.config-hero-tags>span','.service-hero .wrap>*'
];
const seen=new Set(),targets=[];
for(const selector of selectors){
 for(const node of document.querySelectorAll(selector)){
  if(seen.has(node)||node.closest('.config-step[hidden]'))continue;
  // Avoid nested reveal containers: parent reveals take precedence.
  if(targets.some(parent=>parent.contains(node)))continue;
  seen.add(node);targets.push(node);
 }
}
const observer=new IntersectionObserver(entries=>{
 for(const entry of entries){
  if(!entry.isIntersecting)continue;
  entry.target.classList.add('cbk-visible');
  observer.unobserve(entry.target);
 }
},{threshold:0.08,rootMargin:'0px 0px -35px 0px'});
let index=0;
for(const el of targets){
 const rect=el.getBoundingClientRect();
 // Above-the-fold elements should never disappear while the page loads.
 if(rect.top<window.innerHeight*.88){continue;}
 const side=(index++%2===0)?'left':'right';
 el.dataset.cbkSide=side;
 el.classList.add('cbk-reveal');
 el.style.setProperty('--cbk-delay',((index-1)%3)*85+'ms');
 observer.observe(el);
}
document.documentElement.classList.add('motion-ready');
const stop=()=>{observer.disconnect();document.querySelectorAll('.cbk-reveal').forEach(el=>el.classList.add('cbk-visible'));};
media.addEventListener?.('change',e=>{if(e.matches)stop();});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&media.matches)stop();});
})();


/* Animated homepage statistics: count once on entry, preserve formatting */
(()=>{
 const counters=[...document.querySelectorAll('.stat-count[data-count]')];
 if(!counters.length)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const format=(el,n)=>String(n).padStart(Number(el.dataset.pad)||1,'0');
 const finish=el=>{el.textContent=format(el,Number(el.dataset.count));};
 if(reduced||!('IntersectionObserver' in window)){counters.forEach(finish);return;}
 let started=false;
 const start=()=>{
  if(started)return;started=true;
  const duration=1650;
  const startedAt=performance.now();
  counters.forEach(el=>{el.textContent=format(el,0);});
  const frame=now=>{
   const t=Math.min((now-startedAt)/duration,1);
   const eased=1-Math.pow(1-t,4);
   counters.forEach(el=>{const end=Number(el.dataset.count);el.textContent=format(el,Math.min(end,Math.round(end*eased)));});
   if(t<1)requestAnimationFrame(frame);else counters.forEach(finish);
  };
  requestAnimationFrame(frame);
 };
 const section=document.querySelector('.stats');
 if(!section)return;
 const io=new IntersectionObserver(entries=>{
  if(entries.some(entry=>entry.isIntersecting)){io.disconnect();start();}
 },{threshold:.25});
 io.observe(section);
})();


/* CBK Icon System — crisp, accessible inline SVG instead of symbol/emoji glyphs */
(()=>{
 const paths={
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  external:'<path d="M7 17 17 7M8 7h9v9"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  spark:'<path d="m12 2 1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z"/>',
  location:'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  phone:'<path d="M22 16.8v3a2 2 0 0 1-2.2 2A19 19 0 0 1 2.2 4.2 2 2 0 0 1 4.2 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7.5 10a16 16 0 0 0 6.5 6.5l1.5-1.6a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.7 2Z"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  close:'<path d="M5 5 19 19M19 5 5 19"/>',
  star:'<path d="m12 2.5 3 6.1 6.7 1-4.8 4.7 1.1 6.7-6-3.2-6 3.2 1.1-6.7-4.8-4.7 6.7-1Z"/>'
 };
 const svg=(name)=>'<svg class="cbk-icon cbk-icon-'+name+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="'+(name==='star'?'currentColor':'none')+'" stroke="currentColor" stroke-width="'+(name==='star'?'1.3':'1.8')+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+paths[name]+'</svg>';
 const map={'↗':'external','→':'arrow','✓':'check','✦':'spark','⌖':'location','✆':'phone','✉':'mail','☰':'menu','×':'close'};
 function iconize(root){
  if(!root||root.nodeType!==1||root.closest?.('svg,script,style,textarea,option'))return;
  if(root.classList?.contains('hero-rating-stars')&&root.textContent.includes('★')){
   root.innerHTML=Array.from({length:5},()=>svg('star')).join('');root.setAttribute('aria-label','Cinco estrellas');return;
  }
  if(root.classList?.contains('hamburger')){
   const name=root.getAttribute('aria-expanded')==='true'?'close':'menu';
   root.innerHTML=svg(name);return;
  }
  if(root.classList?.contains('whatsapp-float')){root.innerHTML=svg('phone');return;}
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];let node;
  while((node=walker.nextNode())){
   if(!node.parentElement||node.parentElement.closest('script,style,textarea,option,svg,.hero-rating-stars'))continue;
   if(/[↗→✓✦⌖✆✉★]/u.test(node.nodeValue))nodes.push(node);
  }
  for(const textNode of nodes){
   const str=textNode.nodeValue;
   const re=/[↗→✓✦⌖✆✉★]/gu;let match,last=0;const frag=document.createDocumentFragment();
   while((match=re.exec(str))){
    if(match.index>last)frag.appendChild(document.createTextNode(str.slice(last,match.index)));
    const holder=document.createElement('span');holder.className='cbk-icon-wrap';
    holder.innerHTML=svg(map[match[0]]||(match[0]==='★'?'star':'spark'));
    frag.appendChild(holder);last=match.index+match[0].length;
   }
   if(last<str.length)frag.appendChild(document.createTextNode(str.slice(last)));
   textNode.replaceWith(frag);
  }
 }
 iconize(document.body);
 const menu=document.querySelector('.hamburger');
 if(menu){
  menu.addEventListener('click',()=>queueMicrotask(()=>iconize(menu)));
 }
 // Service cards and lists can be rendered after initial page load.
 const services=document.querySelector('#service-cards');
 if(services){const mo=new MutationObserver(()=>{mo.disconnect();iconize(services)});mo.observe(services,{childList:true});}
})();

/* Load the shared AI concierge from the same directory as app.js on all pages. */
(()=>{
 const src=[...document.scripts].find(s=>/\/app\.js(?:\?|$)/.test(s.src))?.src;
 if(!src)return;
 const script=document.createElement('script');
 script.src=new URL('assistant.js',src).href;
 script.defer=true;
 document.body.appendChild(script);
})();
