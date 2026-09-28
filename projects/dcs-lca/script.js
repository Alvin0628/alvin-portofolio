(()=>{const q=s=>document.querySelector(s),red=matchMedia('(prefers-reduced-motion:reduce)').matches;
const nav=q('.nav');addEventListener('scroll',()=>nav.classList.toggle('s',scrollY>8),{passive:true});
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>red?el.classList.add('in'):io.observe(el));
const r=q('#roles');if(r){const w=r.dataset.w.split('|');let i=0;r.textContent=w[0];
if(!red)setInterval(()=>{r.style.opacity=0;setTimeout(()=>{i=(i+1)%w.length;r.textContent=w[i];r.style.opacity=1},350)},2600)}
const t=q('#type');if(t){const p=t.dataset.p.split('|');let i=0,c=0,d=1;
if(red){t.textContent=p[0]}else(function tick(){const s=p[i];c+=d;t.textContent=s.slice(0,c);let n=d>0?55:26;
if(d>0&&c===s.length){d=-1;n=1800}else if(d<0&&c===0){d=1;i=(i+1)%p.length;n=350}setTimeout(tick,n)})()}})();

(()=>{const cn=document.querySelectorAll('[data-n]'),io=new IntersectionObserver(e=>e.forEach(x=>{if(!x.isIntersecting)return;const el=x.target,t=+el.dataset.n,d=+(el.dataset.d||0),p=el.dataset.p||'',s=el.dataset.s||'',T=1200,t0=performance.now();
(function f(n){const k=Math.min(1,(n-t0)/T),v=t*(1-Math.pow(1-k,3));el.textContent=p+v.toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g,d?'':',')+s;if(k<1)requestAnimationFrame(f)})(t0);io.unobserve(el)}),{threshold:.4});cn.forEach(e=>io.observe(e));
document.querySelectorAll('.bc,.dr').forEach(e=>{const o=new IntersectionObserver(a=>{if(a[0].isIntersecting){e.classList.add('in');o.disconnect()}},{threshold:.25});o.observe(e)});
const lb=document.querySelector('.lb');document.querySelectorAll('.gal img').forEach(i=>i.onclick=()=>{lb.querySelector('img').src=i.src;lb.classList.add('on')});if(lb)lb.onclick=()=>lb.classList.remove('on');
const sv=document.getElementById('scat');if(!sv)return;let s=7;const R=()=>(s=(s*16807)%2147483647)/2147483647,N=(m,sd)=>m+sd*(R()+R()+R()-1.5)*1.6;
const C=[[110,235,40,26,0,'Naive Bayes'],[205,150,26,24,1,'XGBoost'],[290,85,62,30,2,'SVM (RBF)']],P=[];
C.forEach(c=>{for(let i=0;i<c[2];i++)P.push([N(c[0],c[3]),N(c[1],c[3]*.9),c[4]])});
const NS='http://www.w3.org/2000/svg',mk=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);sv.appendChild(e);return e};
const dots=P.map(p=>mk('circle',{cx:p[0],cy:p[1],r:4.2,fill:p[2]==0?'#FBF9E4':p[2]==1?'#5B88B2':'none',stroke:'#FBF9E4','stroke-width':p[2]==2?1.3:0,opacity:.85}));
const ring=mk('circle',{r:56,fill:'rgba(91,136,178,.12)',stroke:'#5B88B2','stroke-width':1.5,'stroke-dasharray':'4 4'}),q=mk('circle',{r:7,fill:'#5B88B2',stroke:'#FBF9E4','stroke-width':2}),ls=[];
const out=document.getElementById('pick'),T=[[150,205],[215,140],[280,95],[190,175]];let i=0,cur=[150,205];
function go(){const t=T[i++%T.length],a=cur,t0=performance.now();ls.splice(0).forEach(l=>l.remove());
(function f(n){const k=Math.min(1,(n-t0)/1500),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,x=a[0]+(t[0]-a[0])*e,y=a[1]+(t[1]-a[1])*e;q.setAttribute('cx',x);q.setAttribute('cy',y);ring.setAttribute('cx',x);ring.setAttribute('cy',y);
if(k<1)requestAnimationFrame(f);else{cur=t;const nb=P.map((p,j)=>[Math.hypot(p[0]-t[0],p[1]-t[1]),j]).sort((u,v)=>u[0]-v[0]).slice(0,7),cnt=[0,0,0];
dots.forEach(d=>d.setAttribute('opacity',.35));nb.forEach(([,j])=>{dots[j].setAttribute('opacity',1);cnt[P[j][2]]++;ls.push(mk('line',{x1:t[0],y1:t[1],x2:P[j][0],y2:P[j][1],stroke:'#5B88B2','stroke-width':1,opacity:.7}))});
q.remove();sv.appendChild(q);const w=cnt.indexOf(Math.max(...cnt));out.innerHTML='K=7 &rarr; delegate to <b>'+C[w][5]+'</b>';setTimeout(go,1800)}})(t0)}
if(matchMedia('(prefers-reduced-motion:reduce)').matches){out.innerHTML='K=7 &rarr; delegate to <b>XGBoost</b>'}else go()})();
