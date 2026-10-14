(()=>{const q=s=>document.querySelector(s),red=matchMedia('(prefers-reduced-motion:reduce)').matches;
const nav=q('.nav');if(nav)addEventListener('scroll',()=>nav.classList.toggle('s',scrollY>8),{passive:true});
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>red?el.classList.add('in'):io.observe(el));})();

(()=>{const red=matchMedia('(prefers-reduced-motion:reduce)').matches,cn=document.querySelectorAll('[data-n]'),io=new IntersectionObserver(e=>e.forEach(x=>{if(!x.isIntersecting)return;const el=x.target,t=+el.dataset.n,d=+(el.dataset.d||0),p=el.dataset.p||'',s=el.dataset.s||'',T=1200,t0=performance.now();
(function f(n){const k=Math.min(1,(n-t0)/T),v=t*(1-Math.pow(1-k,3));el.textContent=p+v.toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g,d?'':',')+s;if(k<1)requestAnimationFrame(f)})(t0);io.unobserve(el)}),{threshold:.4});cn.forEach(e=>io.observe(e));
document.querySelectorAll('.bc,.dr').forEach(e=>{const o=new IntersectionObserver(a=>{if(a[0].isIntersecting){e.classList.add('in');o.disconnect()}},{threshold:.25});o.observe(e)});
const lb=document.querySelector('.lb');document.querySelectorAll('.gal img,.zoom img').forEach(i=>i.onclick=()=>{lb.querySelector('img').src=i.src;lb.classList.add('on')});if(lb)lb.onclick=()=>lb.classList.remove('on');

/* ---- Hero: image + title + tabular tokens fuse into one score (illustrative) ---- */
const sv=document.getElementById('fuse');if(!sv)return;
const NS='http://www.w3.org/2000/svg',mk=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);(p||sv).appendChild(e);return e};
const tx=(x,y,s,fill,sz)=>{const e=mk('text',{x,y,fill:fill||'#B3B3B3','font-size':sz||10,'letter-spacing':'.06em'});e.textContent=s;return e};
tx(22,28,'IMAGE · 50 TOKENS');tx(22,162,'TITLE · 32 TOKENS');tx(22,216,'TABULAR · 24 TOKENS');
const cells=[];for(let r=0;r<7;r++)for(let c=0;c<7;c++)cells.push(mk('rect',{class:'cell',x:22+c*16,y:36+r*16,width:13,height:13,rx:3}));
mk('rect',{class:'cell cls',x:140,y:36,width:13,height:13,rx:3});
const txt=[];for(let i=0;i<14;i++)txt.push(mk('rect',{class:'tokp',x:22+i*13,y:170,width:10,height:16,rx:3}));
const tab=[];for(let i=0;i<8;i++)tab.push(mk('rect',{class:'tokp tb',x:22+i*17,y:224,width:13,height:16,rx:3}));
const L=[mk('path',{class:'lnk',d:'M150 92 C185 96 195 124 214 136'}),mk('path',{class:'lnk',d:'M190 178 C200 170 205 160 214 152'}),mk('path',{class:'lnk',d:'M162 232 C190 230 200 190 218 168'})];
mk('circle',{cx:250,cy:150,r:40,fill:'#111',stroke:'#E61E32','stroke-width':2});
mk('circle',{cx:250,cy:150,r:52,fill:'none',stroke:'#E61E32','stroke-width':1,opacity:.35,'stroke-dasharray':'3 5'});
const t1=tx(250,146,'RATF','#fff',13);t1.setAttribute('text-anchor','middle');t1.setAttribute('font-weight','700');
const t2=tx(250,162,'fusion','#B3B3B3',9);t2.setAttribute('text-anchor','middle');
mk('path',{d:'M250 192 L250 252',stroke:'#B3B3B3','stroke-width':1,'stroke-dasharray':'2 4',fill:'none'});
tx(190,262,'VS CHANNEL AVERAGE','#B3B3B3',9);
mk('rect',{x:190,y:272,width:188,height:6,rx:3,fill:'#2a2a2a'});mk('rect',{x:283,y:268,width:2,height:14,fill:'#B3B3B3'});
tx(190,300,'worse','#B3B3B3',9);const bt=tx(378,300,'better','#B3B3B3',9);bt.setAttribute('text-anchor','end');
const m=mk('circle',{class:'mk',cx:284,cy:275,r:8,fill:'#E61E32',stroke:'#fff','stroke-width':2});
const out=document.getElementById('pick'),EX=[.38,-.21,.12,.64,-.47,.27];let ex=0;
const pickN=(a,n)=>{const s=new Set();while(s.size<n)s.add(Math.floor(Math.random()*a.length));return[...s].map(i=>a[i])};
function show(){const s=EX[ex++%EX.length];
cells.forEach(c=>c.classList.remove('on'));txt.forEach(c=>c.classList.remove('on'));tab.forEach(c=>c.classList.remove('on'));L.forEach(l=>l.classList.remove('on'));
pickN(cells,16).forEach(c=>c.classList.add('on'));pickN(txt,7).forEach(c=>c.classList.add('on'));pickN(tab,5).forEach(c=>c.classList.add('on'));L.forEach(l=>l.classList.add('on'));
m.style.transform='translateX('+(s*94)+'px)';
const r=Math.exp(s);out.innerHTML='<span>score <b>'+(s>=0?'+':'−')+Math.abs(s).toFixed(2)+'</b> &rarr; ~<b>'+r.toFixed(2)+'&times;</b> channel avg</span>'}
if(red){show()}else{show();setInterval(show,2600)}
})();
