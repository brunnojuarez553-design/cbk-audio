/* CBK vehicle enquiry: single step, WhatsApp handoff, no backend storage */
(()=>{'use strict';
const form=document.getElementById('vehicle-configurator');if(!form)return;
const year=form.elements.namedItem('anio'),error=document.getElementById('config-error');
const thisYear=new Date().getFullYear();for(let y=thisYear+1;y>=1980;y--){const o=document.createElement('option');o.value=String(y);o.textContent=String(y);year.append(o);}
const get=name=>String(form.elements.namedItem(name)?.value||'').trim();
const updateSummary=()=>{for(const key of ['marca','modelo','anio','transmision','combustible']){const el=document.querySelector('[data-summary="'+key+'"]');if(el)el.textContent=get(key)||'POR DEFINIR';}};
const showError=message=>{error.textContent=message;error.hidden=!message;};
form.addEventListener('input',updateSummary);form.addEventListener('change',updateSummary);
form.addEventListener('submit',event=>{event.preventDefault();showError('');
for(const name of ['marca','modelo','anio','transmision','combustible','nombre']){const input=form.elements.namedItem(name);if(!input.checkValidity()){showError('Completa los datos del vehículo y tu nombre para continuar.');input.focus();return;}}
if(Number(get('anio'))>thisYear+1){showError('Comprueba el año del vehículo.');year.focus();return;}
const message=['Hola David, quiero asesoramiento de CBK para mi vehículo.','','Nombre: '+get('nombre'),'Vehículo: '+get('marca')+' '+get('modelo')+' ('+get('anio')+')',get('version')?'Versión: '+get('version'):'','Cambio: '+get('transmision'),'Combustible: '+get('combustible'),'','¿Podéis recomendarme opciones de protección y confirmar la compatibilidad?'].filter(Boolean).join('\\n');
const url='https://wa.me/34722193861?text='+encodeURIComponent(message);const popup=window.open(url,'_blank','noopener,noreferrer');if(!popup)window.location.assign(url);
});updateSummary();
})();
