(()=>{const q=s=>document.querySelector(s),red=matchMedia('(prefers-reduced-motion:reduce)').matches;
const nav=q('.nav');addEventListener('scroll',()=>nav.classList.toggle('s',scrollY>8),{passive:true});
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>red?el.classList.add('in'):io.observe(el));
const r=q('#roles');if(r){const w=r.dataset.w.split('|');let i=0;r.textContent=w[0];
if(!red)setInterval(()=>{r.style.opacity=0;setTimeout(()=>{i=(i+1)%w.length;r.textContent=w[i];r.style.opacity=1},350)},2600)}
const t=q('#type');if(t){const p=t.dataset.p.split('|');let i=0,c=0,d=1;
if(red){t.textContent=p[0]}else(function tick(){const s=p[i];c+=d;t.textContent=s.slice(0,c);let n=d>0?55:26;
if(d>0&&c===s.length){d=-1;n=1800}else if(d<0&&c===0){d=1;i=(i+1)%p.length;n=350}setTimeout(tick,n)})()}
const hero=q('.hero-stage')||q('.hero');if(hero&&!red){let last=0;
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
if(st&&txt){const once=new IntersectionObserver(e=>{if(e[0].isIntersecting){st.classList.add('in');once.disconnect()}},{threshold:.2});
red?st.classList.add('in'):once.observe(st);
const mq=matchMedia('(max-width:800px)');
function fitStatement(){if(mq.matches){txt.style.fontSize='';return}
const target=txt.clientWidth;txt.style.fontSize='100px';const w=txt.scrollWidth||1;
const size=Math.max(30,Math.min(100*(target/w),190));txt.style.fontSize=size+'px'}
fitStatement();let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(fitStatement,120)});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitStatement)}})();


/* Homepage enhancements: background videos + experience/certificate images */
(()=>{const red=matchMedia('(prefers-reduced-motion:reduce)').matches;
const vids=[...document.querySelectorAll('.bg-video')];
if(vids.length){const vis=new Set();
const play=v=>{if(red)return;const p=v.play();if(p&&p.catch)p.catch(()=>{})};
vids.forEach(v=>{const box=v.parentElement;
v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;
const ready=()=>{box.classList.add('on');box.parentElement.classList.add('has-video')};
if(v.readyState>=2)ready();else v.addEventListener('loadeddata',ready,{once:true});
if(red){v.removeAttribute('autoplay');v.pause();v.addEventListener('play',()=>v.pause())}});
const vo=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target.querySelector('.bg-video');if(!v)return;
if(e.isIntersecting){vis.add(v);play(v)}else{vis.delete(v);v.pause()}}),{threshold:0});
vids.forEach(v=>vo.observe(v.parentElement));
const unlock=()=>vids.forEach(v=>{if(v.paused&&vis.has(v))play(v)});
['pointerdown','touchend','keydown'].forEach(t=>addEventListener(t,unlock,{passive:true}))}
const slots=document.querySelectorAll('[data-img]');
if(slots.length){const exts=['jpg','jpeg','png','webp'];
const load=el=>{const base=el.dataset.img;
const list=/\.[a-z0-9]{3,4}$/i.test(base)?[base]:exts.map(x=>base+'.'+x);let i=0;
(function next(){if(i>=list.length)return;const im=new Image();
im.onload=()=>{im.alt=el.dataset.alt||'';im.decoding='async';el.appendChild(im);el.classList.add('has-img')};
im.onerror=next;im.src=list[i++]})()};
if(!('IntersectionObserver' in window))slots.forEach(load);
else{const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){so.unobserve(e.target);load(e.target)}}),{rootMargin:'300px'});
slots.forEach(el=>so.observe(el))}}
const kv=document.querySelector('.keep-video');
if(kv){const box=kv.parentElement;kv.muted=true;kv.defaultMuted=true;kv.loop=true;kv.playsInline=true;
const ready=()=>{box.classList.add('on');box.parentElement.classList.add('has-video')};
if(kv.readyState>=2)ready();else kv.addEventListener('loadeddata',ready,{once:true});
const go=()=>{if(red||!kv.paused)return;const p=kv.play();if(p&&p.catch)p.catch(()=>{})};
if(red){kv.removeAttribute('autoplay');kv.pause();kv.addEventListener('play',()=>kv.pause())}
else{go();['pointerdown','touchend','keydown'].forEach(t=>addEventListener(t,go,{passive:true}))}}})();

/* Hero: intro loader, scroll-driven pinned scene, name fitted to the screen */
(()=>{const q=s=>document.querySelector(s),root=document.documentElement,
red=matchMedia('(prefers-reduced-motion:reduce)').matches,
hero=q('.hero'),stage=q('.hero-stage');if(!hero||!stage)return;
const nm=q('.hero-name'),hm=q('.hero-main'),hi=q('.hero-hi'),stacked=matchMedia('(max-width:800px),(max-aspect-ratio:1/1)');
const fit=()=>{if(!nm||!hm)return;nm.style.fontSize='100px';
const need=Math.max(...[...nm.querySelectorAll('.nl>span')].map(s=>s.getBoundingClientRect().width));
const cs=getComputedStyle(hm),avail=hm.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
const hcap=(parseFloat(getComputedStyle(stage).getPropertyValue('--name-h'))||11)/100*stage.offsetHeight;
if(need>0)nm.style.fontSize=Math.max(28,Math.min(98*avail/need,hcap,260))+'px'};
const fitHi=()=>{if(!hi)return;const ls=[...hi.querySelectorAll('.hl')];
ls.forEach(l=>l.style.fontSize='100px');
const w=ls.map(l=>l.firstElementChild.getBoundingClientRect().width);
const cs=getComputedStyle(hi),avail=hi.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
const lh=.96,hmax=.76*stage.offsetHeight;let sz;
if(stacked.matches)sz=w.map(x=>98*avail/x);
else{const s1=98*avail/(w[0]+w[1]+20);sz=[s1,s1,98*avail/w[2]]}
const tot=stacked.matches?sz.reduce((a,s)=>a+s*lh,0):sz[0]*lh+sz[2]*lh,k=Math.min(1,hmax/tot);
ls.forEach((l,i)=>l.style.fontSize=(sz[i]*k)+'px');hi.style.columnGap=(.2*sz[0]*k)+'px'};
const fitAll=()=>{fit();fitHi()};
fitAll();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitAll);
if(!red){let tgt=0,cur=0,run=false;
const calc=()=>{const total=hero.offsetHeight-stage.offsetHeight;
tgt=total>0?Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/total)):0};
const loop=()=>{cur+=(tgt-cur)*.14;if(Math.abs(tgt-cur)<.0008){cur=tgt;run=false}else requestAnimationFrame(loop);
stage.style.setProperty('--p',cur.toFixed(4));hero.classList.toggle('hero-early',cur<.48)};
const onScroll=()=>{calc();if(!run){run=true;requestAnimationFrame(loop)}};
addEventListener('scroll',onScroll,{passive:true});
addEventListener('resize',()=>{fitAll();onScroll()});hero.classList.add('hero-early');onScroll()}
else addEventListener('resize',fitAll);
const heroIn=()=>hero.classList.add('hero-in'),intro=q('#intro');
if(!root.classList.contains('has-intro')||!intro){heroIn();return}
const num=q('#introNum'),bar=q('#introBar'),vid=q('.hero .bg-video'),img=q('.hero-photo img');
const MIN=1500,MAX=3400;let ready=!vid,imgOk=!img||img.complete,done=false;
if(vid){if(vid.readyState>=3)ready=true;else vid.addEventListener('canplay',()=>ready=true,{once:true});
vid.addEventListener('error',()=>ready=true,true)}
if(img&&!img.complete){img.addEventListener('load',()=>imgOk=true,{once:true});img.addEventListener('error',()=>imgOk=true,{once:true})}
const t0=performance.now();let shown=0,last=t0;
const finish=()=>{if(done)return;done=true;num.textContent='100';bar.style.transform='scaleX(1)';
setTimeout(()=>{intro.classList.add('out');setTimeout(heroIn,380);
setTimeout(()=>{root.classList.remove('has-intro');try{sessionStorage.setItem('introSeen','1')}catch(e){}},1000)},260)};
const frame=now=>{const el=now-t0,dt=Math.min(64,now-last);last=now;
let t=ready&&imgOk&&el>=MIN?1:Math.min(.9,el/MIN*.9);if(el>MAX)t=1;
shown+=(t-shown)*(1-Math.pow(.0015,dt/1000));
num.textContent=Math.min(100,Math.round(shown*100));bar.style.transform='scaleX('+shown+')';
if(shown>.992&&t===1)finish();else requestAnimationFrame(frame)};
requestAnimationFrame(frame)})();

/* About: cursor-following highlight on the cards */
(()=>{const sec=document.getElementById('about');if(!sec||!matchMedia('(hover:hover)').matches)return;
sec.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.ab-card');if(!c)return;
const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true})})();
