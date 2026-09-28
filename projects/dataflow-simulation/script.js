(()=>{const q=s=>document.querySelector(s),red=matchMedia('(prefers-reduced-motion:reduce)').matches;
const nav=q('.nav');addEventListener('scroll',()=>nav.classList.toggle('s',scrollY>8),{passive:true});
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>red?el.classList.add('in'):io.observe(el));
const r=q('#roles');if(r){const w=r.dataset.w.split('|');let i=0;r.textContent=w[0];
if(!red)setInterval(()=>{r.style.opacity=0;setTimeout(()=>{i=(i+1)%w.length;r.textContent=w[i];r.style.opacity=1},350)},2600)}
const t=q('#type');if(t){const p=t.dataset.p.split('|');let i=0,c=0,d=1;
if(red){t.textContent=p[0]}else(function tick(){const s=p[i];c+=d;t.textContent=s.slice(0,c);let n=d>0?55:26;
if(d>0&&c===s.length){d=-1;n=1800}else if(d<0&&c===0){d=1;i=(i+1)%p.length;n=350}setTimeout(tick,n)})()}})();

(()=>{const io=new IntersectionObserver(e=>e.forEach(x=>{if(!x.isIntersecting)return;const el=x.target,t=+el.dataset.n,T=1100,t0=performance.now();(function f(n){const k=Math.min(1,(n-t0)/T);el.textContent=Math.round(t*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0);io.unobserve(el)}),{threshold:.4});document.querySelectorAll('[data-n]').forEach(e=>io.observe(e));
document.querySelectorAll('.bc').forEach(e=>{const o=new IntersectionObserver(a=>{if(a[0].isIntersecting){e.classList.add('in');o.disconnect()}},{threshold:.2});o.observe(e)});
document.querySelectorAll('[data-load]').forEach(b=>b.onclick=()=>{const f=b.closest('.bf');f.querySelector('iframe').src=f.dataset.src;f.classList.add('on');b.parentNode.remove()});
const L=[...document.querySelectorAll('.stg li')];if(!L.length)return;const no=document.getElementById('bn'),rt=document.getElementById('rt'),st=document.getElementById('bs');let b=1,s=0;
const set=()=>{L.forEach((l,i)=>{l.classList.toggle('on',i===s);l.classList.toggle('done',i<s)});const r=b%6===0;rt.classList.toggle('on',r);st.textContent='batch '+String(b).padStart(2,'0')+(r?': inference + retraining (batch % 6 == 0)':': inference only')};
const tick=()=>{no.textContent=String(b).padStart(2,'0');set();s++;if(s>=L.length){s=0;b=b>=12?1:b+1}};
if(matchMedia('(prefers-reduced-motion:reduce)').matches){b=6;s=5;no.textContent='06';set()}else{tick();setInterval(tick,850)}})();
