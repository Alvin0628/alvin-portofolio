(()=>{const q=s=>document.querySelector(s),red=matchMedia('(prefers-reduced-motion:reduce)').matches;
const nav=q('.nav');addEventListener('scroll',()=>nav.classList.toggle('s',scrollY>8),{passive:true});
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>red?el.classList.add('in'):io.observe(el));
const r=q('#roles');if(r){const w=r.dataset.w.split('|');let i=0;r.textContent=w[0];
if(!red)setInterval(()=>{r.style.opacity=0;setTimeout(()=>{i=(i+1)%w.length;r.textContent=w[i];r.style.opacity=1},350)},2600)}
const t=q('#type');if(t){const p=t.dataset.p.split('|');let i=0,c=0,d=1;
if(red){t.textContent=p[0]}else(function tick(){const s=p[i];c+=d;t.textContent=s.slice(0,c);let n=d>0?55:26;
if(d>0&&c===s.length){d=-1;n=1800}else if(d<0&&c===0){d=1;i=(i+1)%p.length;n=350}setTimeout(tick,n)})()}
const hero=q('.hero');if(hero&&!red){let last=0;
hero.addEventListener('pointermove',e=>{const b=hero.getBoundingClientRect();
hero.style.setProperty('--mx',((e.clientX-b.left)/b.width*100)+'%');
hero.style.setProperty('--my',((e.clientY-b.top)/b.height*100)+'%');
const now=performance.now();if(now-last<45)return;last=now;
if(hero.querySelectorAll('.ember').length>24)return;
const s=document.createElement('span');s.className='ember';
const size=4+Math.random()*6;
s.style.width=size+'px';s.style.height=size+'px';
s.style.left=(e.clientX-b.left-size/2)+'px';s.style.top=(e.clientY-b.top-size/2)+'px';
s.style.setProperty('--dx',(Math.random()*28-14)+'px');
hero.appendChild(s);setTimeout(()=>s.remove(),950)});
hero.addEventListener('pointerleave',()=>hero.classList.remove('glow-on'));
hero.addEventListener('pointerenter',()=>hero.classList.add('glow-on'))}
const st=q('.statement'),txt=q('#statementText');
if(st&&txt){const once=new IntersectionObserver(e=>{if(e[0].isIntersecting){st.classList.add('in');once.disconnect()}},{threshold:.4});
red?st.classList.add('in'):once.observe(st);
const mq=matchMedia('(max-width:800px)');
function fitStatement(){if(mq.matches){txt.style.fontSize='';return}
const target=txt.clientWidth;txt.style.fontSize='100px';const w=txt.scrollWidth||1;
const size=Math.max(30,Math.min(100*(target/w),190));txt.style.fontSize=size+'px'}
fitStatement();let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(fitStatement,120)});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitStatement)}})();

