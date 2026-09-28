(()=>{const q=s=>document.querySelector(s),red=matchMedia('(prefers-reduced-motion:reduce)').matches;
const nav=q('.nav');addEventListener('scroll',()=>nav.classList.toggle('s',scrollY>8),{passive:true});
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>red?el.classList.add('in'):io.observe(el));
const r=q('#roles');if(r){const w=r.dataset.w.split('|');let i=0;r.textContent=w[0];
if(!red)setInterval(()=>{r.style.opacity=0;setTimeout(()=>{i=(i+1)%w.length;r.textContent=w[i];r.style.opacity=1},350)},2600)}
const t=q('#type');if(t){const p=t.dataset.p.split('|');let i=0,c=0,d=1;
if(red){t.textContent=p[0]}else(function tick(){const s=p[i];c+=d;t.textContent=s.slice(0,c);let n=d>0?55:26;
if(d>0&&c===s.length){d=-1;n=1800}else if(d<0&&c===0){d=1;i=(i+1)%p.length;n=350}setTimeout(tick,n)})()}})();
