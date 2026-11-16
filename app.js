/* CBK service catalogue — links generate a prefilled WhatsApp enquiry. */
const items=[
 ['Sistemas antirrobo','Protección','Asesoramiento sobre soluciones de protección adaptadas a tu vehículo.'],
 ['Antirrobo IGLA','Protección','Sistemas IGLA con consulta previa de compatibilidad e instalación profesional.'],
 ['Inmovilizador CAN BUS','Protección','Protección electrónica adicional, valorada según el modelo y equipamiento.'],
 ['Protección OBD','Protección','Soluciones para reforzar la protección del acceso de diagnóstico del vehículo.'],
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
const cards=document.querySelector('#service-cards');
if(cards)cards.innerHTML=items.slice(0,6).map(function(s,i){return '<a class="card" href="'+wa(s[0])+'" target="_blank" rel="noopener noreferrer" aria-label="Consultar '+safe(s[0])+'"><small>0'+(i+1)+' / '+s[1].toUpperCase()+'</small><div class="card-bottom"><div><h3>'+safe(s[0])+'</h3><p>'+safe(s[2])+'</p></div><span class="go">↗</span></div></a>';}).join('');
const more=document.querySelector('#other-list');
if(more)more.innerHTML=items.slice(6).map(function(s,i){return '<a class="other-row" href="'+wa(s[0])+'" target="_blank" rel="noopener noreferrer"><small>'+String(i+7).padStart(2,'0')+'</small><strong>'+safe(s[0])+'</strong><span class="category">'+safe(s[1])+'</span><span>↗</span></a>';}).join('');
const toggle=document.querySelector('.hamburger'),nav=document.querySelector('#main-nav');
if(toggle&&nav){toggle.addEventListener('click',function(){const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');toggle.textContent=open?'×':'☰';});nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');toggle.textContent='☰';});});}
