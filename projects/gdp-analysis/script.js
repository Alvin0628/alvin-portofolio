(()=>{const q=s=>document.querySelector(s),red=matchMedia('(prefers-reduced-motion:reduce)').matches;
const nav=q('.nav');if(nav)addEventListener('scroll',()=>nav.classList.toggle('s',scrollY>8),{passive:true});
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>red?el.classList.add('in'):io.observe(el));})();

(()=>{const cn=document.querySelectorAll('[data-n]'),io=new IntersectionObserver(e=>e.forEach(x=>{if(!x.isIntersecting)return;const el=x.target,t=+el.dataset.n,d=+(el.dataset.d||0),p=el.dataset.p||'',s=el.dataset.s||'',T=1200,t0=performance.now();
(function f(n){const k=Math.min(1,(n-t0)/T),v=t*(1-Math.pow(1-k,3));el.textContent=p+v.toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g,d?'':',')+s;if(k<1)requestAnimationFrame(f)})(t0);io.unobserve(el)}),{threshold:.4});cn.forEach(e=>io.observe(e));
document.querySelectorAll('.bc,.dr').forEach(e=>{const o=new IntersectionObserver(a=>{if(a[0].isIntersecting){e.classList.add('in');o.disconnect()}},{threshold:.25});o.observe(e)});
const lb=document.querySelector('.lb');document.querySelectorAll('.gal img').forEach(i=>i.onclick=()=>{lb.querySelector('img').src=i.src;lb.classList.add('on')});if(lb)lb.onclick=()=>lb.classList.remove('on');})();

/* Hero: Indonesia's real GDP growth rate, 1995-2024 (IMF WEO, NGDP_RPCH), traced live */
(()=>{
const sv=document.getElementById('gdpline');if(!sv)return;
const YEARS=[];for(let y=1995;y<=2024;y++)YEARS.push(y);
const VALS=[8.220,7.818,4.700,-13.127,0.791,4.979,3.643,4.499,4.780,5.031,5.693,5.501,6.345,7.442,4.702,6.378,6.170,6.030,5.557,5.007,4.876,5.033,5.070,5.174,5.019,-2.066,3.703,5.307,5.048,4.958];
const xL=24,xR=376,yTop=48,yBot=272,vmax=10,vmin=-15;
const X=i=>xL+i*(xR-xL)/(YEARS.length-1);
const Y=v=>yTop+(vmax-v)/(vmax-vmin)*(yBot-yTop);
const NS='http://www.w3.org/2000/svg';
const mk=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);sv.appendChild(e);return e};
const zero=Y(0);
mk('line',{x1:xL,y1:zero,x2:xR,y2:zero,stroke:'rgba(242,239,228,.25)','stroke-width':1,'stroke-dasharray':'3 4'});
const CRISES=[{yr:1998,label:'Asian Financial Crisis'},{yr:2009,label:'Global Financial Crisis'},{yr:2020,label:'COVID-19 Pandemic'}];
CRISES.forEach(c=>{const i=YEARS.indexOf(c.yr);const bx=X(i)-9;mk('rect',{x:bx,y:yTop,width:18,height:yBot-yTop,fill:'rgba(255,0,30,.13)'})});
const pathD='M'+YEARS.map((y,i)=>`${X(i).toFixed(1)},${Y(VALS[i]).toFixed(1)}`).join(' L');
mk('path',{d:pathD,fill:'none',stroke:'#FFAA00','stroke-width':2.5,'stroke-linejoin':'round','stroke-linecap':'round'});
const path=sv.querySelector('path');const len=path.getTotalLength();
['1995','2010','2024'].forEach(yr=>{const i=YEARS.indexOf(+yr);mk('text',{x:X(i),y:yBot+18,'font-size':10,'font-family':'ui-monospace,Menlo,monospace',fill:'rgba(242,239,228,.55)','text-anchor':i===0?'start':(i===YEARS.length-1?'end':'middle')}).textContent=yr});
const ring=mk('circle',{r:9,fill:'rgba(255,170,0,.15)',stroke:'#FFAA00','stroke-width':1.4});
const dot=mk('circle',{r:4.5,fill:'#FFAA00',stroke:'#05060F','stroke-width':1.5});
const out=document.getElementById('gdppick');
const stops=CRISES.map(c=>({t:YEARS.indexOf(c.yr)/(YEARS.length-1),yr:c.yr,label:c.label,val:VALS[YEARS.indexOf(c.yr)]}));
function place(t){const p=path.getPointAtLength(t*len);dot.setAttribute('cx',p.x);dot.setAttribute('cy',p.y);ring.setAttribute('cx',p.x);ring.setAttribute('cy',p.y)}
function fmt(v){return (v>0?'+':'')+v.toFixed(1)+'% YoY'}
if(red){place(1);out.innerHTML=CRISES[2].yr+' &rarr; <b>'+fmt(stops[2].val)+'</b>';return}
let s=0;
function run(){const stop=stops[s%stops.length],from=s===0?0:(stops[(s-1+stops.length)%stops.length].t),t0=performance.now(),DUR=1600;
(function f(n){const k=Math.min(1,(n-t0)/DUR),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,t=from+(stop.t-from)*e;place(t);
if(k<1)requestAnimationFrame(f);else{out.innerHTML=stop.yr+' &rarr; <b>'+fmt(stop.val)+'</b>';s++;setTimeout(run,1700)}})(t0)}
run();
})();
