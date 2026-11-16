/* CBK security configurator: no backend, no compatibility assertions, no stored leads */
(()=>{'use strict';
const form=document.getElementById('vehicle-configurator');if(!form)return;
const steps=[...form.querySelectorAll('.config-step')];
const prev=document.getElementById('config-back'),next=document.getElementById('config-next'),submit=document.getElementById('config-submit');
const progress=document.getElementById('config-progress-bar'),stepLabel=document.getElementById('config-step-label'),error=document.getElementById('config-error'),review=document.getElementById('config-review');
const brand=form.elements.namedItem('marca'),year=form.elements.namedItem('anio');
let step=0;
const thisYear=new Date().getFullYear();for(let y=thisYear+1;y>=1980;y--){const option=document.createElement('option');option.value=String(y);option.textContent=String(y);year.append(option);}
const get=name=>String(form.elements.namedItem(name)?.value||'').trim();
const objective=()=>form.querySelector('input[name="objetivo"]:checked')?.value||'';
const solutions=()=>[...form.querySelectorAll('input[name="soluciones"]:checked')].map(e=>e.value);
const showError=message=>{error.textContent=message;error.hidden=!message;};
function updateSummary(){
 for(const key of ['marca','modelo','anio','transmision','combustible']){const el=document.querySelector('[data-summary="'+key+'"]');if(el)el.textContent=get(key)||'POR DEFINIR';}
 const target=document.querySelector('[data-summary="objetivo"]');if(target)target.textContent=objective()||'POR DEFINIR';
 const brandName=get('marca');const current=document.getElementById('cfg-brand-current');if(current)current.textContent=brandName||'VER TODAS LAS MARCAS';
}
function updateReview(){
 const lines=[['MARCA',get('marca')],['MODELO',get('modelo')],['AÑO',get('anio')],['CAMBIO',get('transmision')],['COMBUSTIBLE',get('combustible')],['VERSIÓN',get('version')||'No especificada'],['OBJETIVO',objective()],['SOLUCIONES',solutions().join(', ')||'Asesoramiento general'],['COMENTARIOS',get('comentarios')||'Sin comentarios']];
 review.replaceChildren();
 for(const [label,value] of lines){const row=document.createElement('div'),dt=document.createElement('span'),dd=document.createElement('strong');dt.textContent=label;dd.textContent=value;row.append(dt,dd);review.append(row);}
}
function showStep(index){step=index;steps.forEach((el,i)=>{el.hidden=i!==step;});prev.hidden=step===0;next.hidden=step===steps.length-1;submit.hidden=step!==steps.length-1;progress.style.width=((step+1)/steps.length*100)+'%';stepLabel.textContent='PASO '+String(step+1).padStart(2,'0')+' / 04';showError('');updateSummary();if(step===3)updateReview();const heading=steps[step].querySelector('h2');heading?.setAttribute('tabindex','-1');heading?.focus({preventScroll:true});}
function validate(){
 if(step===0){for(const name of ['marca','modelo','anio','transmision','combustible']){const input=form.elements.namedItem(name);if(!input.checkValidity()){showError('Completa la marca, el modelo, el año, el tipo de cambio y el combustible de tu vehículo.');(name==='marca'?document.getElementById('cfg-brand-open'):input).focus();return false;}}if(Number(get('anio'))>thisYear+1){showError('Comprueba el año de tu vehículo.');year.focus();return false;}}
 if(step===1&&!objective()){showError('Selecciona el objetivo principal para continuar.');return false;}
 return true;
}
const brandOpen=document.getElementById('cfg-brand-open'),brandList=document.getElementById('cfg-brand-list');
const toggleBrands=show=>{brandList.hidden=!show;brandOpen.setAttribute('aria-expanded',String(show));};
[...brand.options].filter(option=>option.value).forEach(option=>{
 const button=document.createElement('button');button.type='button';button.setAttribute('role','option');button.dataset.value=option.value;button.textContent=option.textContent;button.setAttribute('aria-selected','false');
 button.addEventListener('click',()=>{brand.value=option.value;brand.dispatchEvent(new Event('change',{bubbles:true}));brandList.querySelectorAll('[role="option"]').forEach(el=>el.setAttribute('aria-selected',String(el===button)));toggleBrands(false);brandOpen.focus();});
 brandList.append(button);
});
brandOpen.addEventListener('click',()=>toggleBrands(brandList.hidden));
document.addEventListener('click',event=>{if(!event.target.closest('.config-brand-picker'))toggleBrands(false)});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!brandList.hidden){toggleBrands(false);brandOpen.focus()}});

form.addEventListener('input',updateSummary);form.addEventListener('change',updateSummary);
next.addEventListener('click',()=>{if(validate()){showStep(Math.min(step+1,3));}});
prev.addEventListener('click',()=>showStep(Math.max(0,step-1)));
form.addEventListener('submit',event=>{event.preventDefault();if(step!==3)return;
const name=form.elements.namedItem('nombre');if(!name.checkValidity()){showError('Escribe tu nombre para preparar la consulta.');name.focus();return;}
const message=['Hola David, he utilizado el configurador de seguridad de CBK y quiero asesoramiento.','','Nombre: '+get('nombre'),'Vehículo: '+get('marca')+' '+get('modelo')+' ('+get('anio')+')',get('version')?'Versión: '+get('version'):'','Cambio: '+get('transmision'),'Combustible: '+get('combustible'),'Objetivo: '+objective(),'Soluciones de interés: '+(solutions().join(', ')||'Solicito recomendación'),get('comentarios')?'Comentarios: '+get('comentarios'):'','','¿Podéis revisar la compatibilidad y orientarme sobre las opciones disponibles?'].filter(Boolean).join('\n');
const url='https://wa.me/34722193861?text='+encodeURIComponent(message);
const popup=window.open(url,'_blank','noopener,noreferrer');if(!popup)window.location.assign(url);
});
showStep(0);
})();
