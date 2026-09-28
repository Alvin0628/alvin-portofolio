(()=>{const q=s=>document.querySelector(s),red=matchMedia('(prefers-reduced-motion:reduce)').matches;
const nav=q('.nav');if(nav)addEventListener('scroll',()=>nav.classList.toggle('s',scrollY>8),{passive:true});
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>red?el.classList.add('in'):io.observe(el));

/* word-reveal headings animate via CSS only (no JS needed) */

/* count-up numbers */
const cn=document.querySelectorAll('[data-n]'),cio=new IntersectionObserver(e=>e.forEach(x=>{if(!x.isIntersecting)return;const el=x.target,t=+el.dataset.n,d=+(el.dataset.d||0),p=el.dataset.p||'',s=el.dataset.s||'',T=1200,t0=performance.now();
(function f(n){const k=Math.min(1,(n-t0)/T),v=t*(1-Math.pow(1-k,3));el.textContent=p+v.toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g,d?'':',')+s;if(k<1)requestAnimationFrame(f)})(t0);cio.unobserve(el)}),{threshold:.4});
cn.forEach(e=>cio.observe(e));

/* bar / ring fill trigger */
document.querySelectorAll('.bc,.dr,.ringrow').forEach(e=>{const o=new IntersectionObserver(a=>{if(a[0].isIntersecting){e.classList.add('in');o.disconnect()}},{threshold:.25});o.observe(e)});

/* gallery lightbox */
const lb=document.querySelector('.lb');document.querySelectorAll('.gal img').forEach(i=>i.onclick=()=>{lb.querySelector('img').src=i.src;lb.classList.add('on')});if(lb)lb.onclick=()=>lb.classList.remove('on');
})();

/* ---- Hero scan animation: cycles simulated food detections on a plate ---- */
(()=>{const sv=document.getElementById('scan');if(!sv)return;
const NS='http://www.w3.org/2000/svg',mk=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);sv.appendChild(e);return e};
const dets=[
 {x:40,y:130,w:130,h:110,label:'Rice · 96%'},
 {x:190,y:70,w:140,h:100,label:'Grilled Chicken · 92%'},
 {x:200,y:190,w:120,h:80,label:'Vegetable · 89%'},
 {x:70,y:60,w:90,h:70,label:'Sambal · 84%'}
];
const boxes=dets.map(d=>{const r=mk('rect',{class:'detbox',x:d.x,y:d.y,width:d.w,height:d.h,rx:10});
const bg=mk('rect',{class:'detlblbg',x:d.x,y:d.y-20,width:d.label.length*6.6+14,height:18,rx:5});
const tx=mk('text',{class:'detlbl',x:d.x+7,y:d.y-7});tx.textContent=d.label;
return{r,bg,tx}});
const out=document.getElementById('scanOut');
function reveal(i){if(i>=boxes.length){setTimeout(()=>{boxes.forEach(b=>{b.r.style.transition='opacity .3s';b.bg.style.transition='opacity .3s';b.tx.style.transition='opacity .3s';b.r.style.opacity=0;b.bg.style.opacity=0;b.tx.style.opacity=0});if(out)out.innerHTML='Rescanning…';setTimeout(()=>reveal(0),900)},2200);return}
const b=boxes[i];b.r.style.transition='opacity .4s';b.bg.style.transition='opacity .4s';b.tx.style.transition='opacity .4s';
b.r.style.opacity=1;b.bg.style.opacity=1;b.tx.style.opacity=1;
if(out)out.innerHTML=(i+1)+' of '+boxes.length+' items detected — <b>'+dets[i].label.split(' · ')[0]+'</b>';
setTimeout(()=>reveal(i+1),red?0:550)}
if(matchMedia('(prefers-reduced-motion:reduce)').matches){boxes.forEach(b=>{b.r.style.opacity=1;b.bg.style.opacity=1;b.tx.style.opacity=1});if(out)out.innerHTML='4 of 4 items detected'}else reveal(0)
})();

/* ---- Interactive gram slider demo (technical page) ------------------------ */
(()=>{const sl=document.getElementById('gramSlider');if(!sl)return;
const base=165,baseP=31,baseC=0,baseF=3.6,baseG=100; // grilled chicken breast per 100g
const gv=document.getElementById('gramVal'),kv=document.getElementById('kcalVal'),pv=document.getElementById('protVal'),cv=document.getElementById('carbVal'),fv=document.getElementById('fatVal');
const ng=document.getElementById('nlGram'),nk=document.getElementById('nlKcal'),np=document.getElementById('nlProt'),nc=document.getElementById('nlCarb'),nf=document.getElementById('nlFat');
function upd(){const g=+sl.value,r=g/baseG,kcal=Math.round(base*r),prot=(baseP*r).toFixed(1),carb=(baseC*r).toFixed(1),fat=(baseF*r).toFixed(1);
gv.textContent=g+' g';kv.textContent=kcal;pv.textContent=prot+' g';cv.textContent=carb+' g';fv.textContent=fat+' g';
if(ng){ng.textContent=g+' g';nk.textContent=kcal;np.textContent=prot+' g';nc.textContent=carb+' g';nf.textContent=fat+' g'}}
sl.addEventListener('input',upd);upd()
})();
