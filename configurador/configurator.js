/* CBK security configurator: no backend, no compatibility assertions, no stored leads */
(()=>{'use strict';
const form=document.getElementById('vehicle-configurator');if(!form)return;
const steps=[...form.querySelectorAll('.config-step')];
const prev=document.getElementById('config-back'),next=document.getElementById('config-next'),submit=document.getElementById('config-submit');
const quick=document.getElementById('config-quick-send'),quickNote=document.getElementById('config-fast-note');
const progress=document.getElementById('config-progress-bar'),stepLabel=document.getElementById('config-step-label'),error=document.getElementById('config-error'),review=document.getElementById('config-review');
const brand=form.elements.namedItem('marca'),year=form.elements.namedItem('anio');
let step=0;
const thisYear=new Date().getFullYear();for(let y=thisYear+1;y>=1980;y--){const option=document.createElement('option');option.value=String(y);option.textContent=String(y);year.append(option);}
const get=name=>String(form.elements.namedItem(name)?.value||'').trim();
const objective=()=>form.querySelector('input[name="objetivo"]:checked')?.value||'';
const solutions=()=>[...form.querySelectorAll('input[name="soluciones"]:checked')].map(e=>e.value);
const showError=message=>{error.textContent=message;error.hidden=!message;};
function updateSummary(){
 for(const key of ['marca','modelo','anio','transmision','combustible','nombre']){const el=document.querySelector('[data-summary="'+key+'"]');if(el)el.textContent=get(key)||'POR DEFINIR';}
 const target=document.querySelector('[data-summary="objetivo"]');if(target)target.textContent=objective()||'POR DEFINIR';
}
function updateReview(){
 const lines=[['MARCA',get('marca')],['MODELO',get('modelo')],['AÑO',get('anio')],['CAMBIO',get('transmision')],['COMBUSTIBLE',get('combustible')],['VERSIÓN',get('version')||'No especificada'],['OBJETIVO',objective()],['SOLUCIONES',solutions().join(', ')||'Asesoramiento general'],['COMENTARIOS',get('comentarios')||'Sin comentarios']];
 review.replaceChildren();
 for(const [label,value] of lines){const row=document.createElement('div'),dt=document.createElement('span'),dd=document.createElement('strong');dt.textContent=label;dd.textContent=value;row.append(dt,dd);review.append(row);}
}
function showStep(index){step=index;steps.forEach((el,i)=>{el.hidden=i!==step;});prev.hidden=step===0;quick.hidden=step!==0;quickNote.hidden=step!==0;next.hidden=step===steps.length-1;submit.hidden=step!==steps.length-1;progress.style.width=((step+1)/steps.length*100)+'%';stepLabel.textContent='PASO '+String(step+1).padStart(2,'0')+' / 04';showError('');updateSummary();if(step===3)updateReview();const heading=steps[step].querySelector('h2');heading?.setAttribute('tabindex','-1');heading?.focus({preventScroll:true});}
function validate(){
 if(step===0){for(const name of ['marca','modelo','anio','transmision','combustible']){const input=form.elements.namedItem(name);if(!input.checkValidity()){showError('Completa la marca, el modelo, el año, el tipo de cambio y el combustible de tu vehículo.');input.focus();return false;}}if(Number(get('anio'))>thisYear+1){showError('Comprueba el año de tu vehículo.');year.focus();return false;}}
 if(step===1&&!objective()){showError('Selecciona el objetivo principal para continuar.');return false;}
 return true;
}
form.addEventListener('input',updateSummary);form.addEventListener('change',updateSummary);
function openWhatsapp(message){const url='https://wa.me/34722193861?text='+encodeURIComponent(message);const popup=window.open(url,'_blank','noopener,noreferrer');if(!popup)window.location.assign(url);}
quick.addEventListener('click',()=>{if(!validate())return;showStep(1);});
function sendQuick(){if(!validate())return;const message=['Hola David, quiero asesoramiento de CBK para mi vehículo.','','Nombre: '+get('nombre'),'Vehículo: '+get('marca')+' '+get('modelo')+' ('+get('anio')+')',get('version')?'Versión: '+get('version'):'','Cambio: '+get('transmision'),'Combustible: '+get('combustible'),'','¿Podéis recomendarme opciones de protección y confirmar la compatibilidad?'].filter(Boolean).join('\\n');openWhatsapp(message);}
next.addEventListener('click',()=>{if(step===0){sendQuick();return;}if(validate()){showStep(Math.min(step+1,3));}});
prev.addEventListener('click',()=>showStep(Math.max(0,step-1)));
form.addEventListener('submit',event=>{event.preventDefault();if(step!==3)return;
const name=form.elements.namedItem('nombre');if(!name.checkValidity()){showError('Escribe tu nombre para preparar la consulta.');name.focus();return;}
const message=['Hola David, he utilizado el configurador de seguridad de CBK y quiero asesoramiento.','','Nombre: '+get('nombre'),'Vehículo: '+get('marca')+' '+get('modelo')+' ('+get('anio')+')',get('version')?'Versión: '+get('version'):'','Cambio: '+get('transmision'),'Combustible: '+get('combustible'),'Objetivo: '+objective(),'Soluciones de interés: '+(solutions().join(', ')||'Solicito recomendación'),get('comentarios')?'Comentarios: '+get('comentarios'):'','','¿Podéis revisar la compatibilidad y orientarme sobre las opciones disponibles?'].filter(Boolean).join('\n');
openWhatsapp(message);
});
showStep(0);
})();
