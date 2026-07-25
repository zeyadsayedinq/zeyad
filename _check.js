
document.documentElement.className='js';
function run(fn){try{fn();}catch(e){console.error('[portfolio]',e);}}
function boot(){
  /* REVEAL FIRST — guarantees content is visible no matter what else happens */
  run(function(){
    var reveals=document.querySelectorAll('.reveal');
    function showAll(){reveals.forEach(function(el){el.classList.add('on');});}
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target);}});},{threshold:.05,rootMargin:'0px 0px -6% 0px'});
      reveals.forEach(function(el){io.observe(el);});
      requestAnimationFrame(function(){reveals.forEach(function(el){var r=el.getBoundingClientRect();if(r.top<window.innerHeight*1.05)el.classList.add('on');});});
    }else{showAll();}
    window.addEventListener('load',function(){setTimeout(showAll,300);});
    setTimeout(showAll,2500);
  });

  /* CURSOR — additive ring, native pointer stays */
  run(function(){
    if(!window.matchMedia||!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
    var ring=document.getElementById('cur-ring');if(!ring)return;
    var rx=0,ry=0,tx=0,ty=0,shown=false;
    document.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!shown){shown=true;ring.classList.add('on');rx=tx;ry=ty;}});
    (function loop(){rx+=(tx-rx)*0.2;ry+=(ty-ry)*0.2;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
    document.querySelectorAll('a,button,.track,.skill,.cat-btn,.ph,.cell,.feat-card').forEach(function(el){
      el.addEventListener('mouseenter',function(){document.body.classList.add('cur-hover');});
      el.addEventListener('mouseleave',function(){document.body.classList.remove('cur-hover');});
    });
  });

  /* COUNT UP */
  run(function(){
    if(!('IntersectionObserver' in window))return;
    var cio=new IntersectionObserver(function(en){en.forEach(function(x){
      if(!x.isIntersecting)return;
      x.target.querySelectorAll('[data-count]').forEach(function(el){
        var tg=+el.dataset.count,suf=el.dataset.suf||'',t0=null;
        function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/1400,1);el.textContent=Math.round((1-Math.pow(1-p,3))*tg)+suf;if(p<1)requestAnimationFrame(step);}
        requestAnimationFrame(step);
      });
      cio.unobserve(x.target);
    });},{threshold:.4});
    document.querySelectorAll('.stats').forEach(function(el){cio.observe(el);});
  });

  /* SCROLL CHAR REVEAL */
  run(function(){
    document.querySelectorAll('[data-chreveal]').forEach(function(p){
      var txt=p.textContent;p.textContent='';var spans=[];
      for(var i=0;i<txt.length;i++){var s=document.createElement('span');s.className='ch';s.textContent=txt[i];s.style.color='rgba(225,224,204,.24)';p.appendChild(s);spans.push(s);}
      function upd(){var r=p.getBoundingClientRect(),vh=window.innerHeight,start=vh*0.85,end=vh*0.3;
        var prog=Math.min(Math.max((start-r.top)/(start-end),0),1),lit=Math.floor(prog*spans.length);
        for(var i=0;i<spans.length;i++)spans[i].style.color=i<lit?'var(--text)':'rgba(225,224,204,.24)';}
      window.addEventListener('scroll',upd);window.addEventListener('resize',upd);upd();
    });
  });

  /* NAV ACTIVE */
  run(function(){
    var navLinks=document.querySelectorAll('#nav a');
    window.addEventListener('scroll',function(){var cur='';document.querySelectorAll('section[id],div[id]').forEach(function(s){if(window.scrollY>=s.offsetTop-140)cur=s.id;});navLinks.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+cur);});});
  });

  /* SKILLS FILTER */
  run(function(){
    document.querySelectorAll('.cat-btn').forEach(function(btn){btn.addEventListener('click',function(){
      document.querySelectorAll('.cat-btn').forEach(function(b){b.classList.remove('on');});btn.classList.add('on');
      var c=btn.dataset.c;document.querySelectorAll('.skill').forEach(function(s){s.classList.toggle('off',c!=='all'&&s.dataset.c!==c);});
    });});
  });

  /* PLAYLIST — isolated so it always runs */
  run(function(){
  var TRACKS=[{"title": "ElBakht", "artist": "Wegz", "stat": "309.6M views", "tag": "Distribution", "len": "3:14"}, {"title": "Mesaytara", "artist": "Lamis Kan", "stat": "398M views", "tag": "A&R \u00b7 Campaign", "len": "2:58"}, {"title": "Msh Khalsa", "artist": "Wegz \u00d7 ElGrandeToto", "stat": "Egypt \u00d7 Morocco", "tag": "Cross-Border", "len": "3:05"}, {"title": "Qalbi Ertah (Album)", "artist": "Latifa", "stat": "Dolby Atmos", "tag": "Immersive Audio", "len": "LP"}, {"title": "Sorry", "artist": "Latifa", "stat": "#1 TikTok Egypt", "tag": "Marketing \u00b7 PR", "len": "2:47"}, {"title": "Attraction (Arabic Remix)", "artist": "Ramy Sabry \u00d7 ETOLUBOV", "stat": "Egypt \u00d7 Ukraine", "tag": "Exec Producer", "len": "3:22"}, {"title": "B3oda Ya Belady", "artist": "Wegz", "stat": "26.7M views", "tag": "Sync \u00b7 Film", "len": "3:40"}, {"title": "3al 3mom", "artist": "Shehab \u00d7 Horizon \u00d7 Alfy", "stat": "24M \u00b7 33M Spotify", "tag": "Production", "len": "2:51"}, {"title": "Satamoni", "artist": "Shehab \u00d7 DJ Totti", "stat": "Production", "tag": "Management", "len": "2:39"}, {"title": "Ras Shetan", "artist": "Shehab \u00d7 DJ Totti", "stat": "Production", "tag": "Management", "len": "2:44"}, {"title": "Sohab Zaman", "artist": "Sandy \u00d7 Resha Costa & Samara", "stat": "Concept built", "tag": "A&R \u00b7 Concept", "len": "3:11"}, {"title": "Placebo (Album)", "artist": "Lege-Cy", "stat": "Repositioned", "tag": "Marketing Dir.", "len": "LP"}, {"title": "Tameneny", "artist": "Resha Costa \u00d7 Samara Now", "stat": "25M+ views", "tag": "Distribution", "len": "2:55"}, {"title": "Moled El Gezeera (Remix)", "artist": "DJ Totti", "stat": "Production", "tag": "Media", "len": "3:02"}, {"title": "W Enta Ghayeb", "artist": "Hany Shaker", "stat": "Account Mgmt", "tag": "Distribution", "len": "4:05"}, {"title": "Official Trailer", "artist": "Lel Egar \u2014 Netflix Egypt", "stat": "Netflix Egypt", "tag": "Film \u00b7 Release", "len": "1:48"}, {"title": "Rockstar", "artist": "L5VAV", "stat": "A&R", "tag": "Signing", "len": "2:33"}, {"title": "Ana Magnoon", "artist": "3AB3AZ", "stat": "A&R", "tag": "Signing", "len": "2:41"}, {"title": "Masterpiece", "artist": "Kordy \u00d7 Meno Zein \u00d7 Mahib", "stat": "A&R", "tag": "Multi-Artist", "len": "3:08"}, {"title": "Siri", "artist": "Shahyn", "stat": "Distribution", "tag": "Digital Release", "len": "2:36"}, {"title": "Tushkar", "artist": "Lamis Kan", "stat": "Project Mgmt", "tag": "A&R \u00b7 Video", "len": "2:59"}, {"title": "Edeko Fouq", "artist": "DizzyTooSkinny \u00d7 Wezza \u00d7 Nubi", "stat": "A&R", "tag": "Multi-Artist", "len": "2:50"}];
  var listEl=document.getElementById('trackList');
  var curIdx=0,playing=true;
  function fmt(i){return (i+1<10?'0':'')+(i+1);}
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  var els={t:document.getElementById('pnTitle'),a:document.getElementById('pnArtist'),g:document.getElementById('pnTag'),st:document.getElementById('pnStat'),cu:document.getElementById('pnCur'),bar:document.getElementById('pnBar'),icon:document.getElementById('playIcon')};
  TRACKS.forEach(function(t,i){
    var d=document.createElement('div');d.className='track'+(i===0?' active':'');d.setAttribute('data-i',i);
    d.innerHTML='<div class="tk-i"><span class="num">'+fmt(i)+'</span><span class="eq"><i></i><i></i><i></i></span></div>'+
      '<div class="tk-main"><div class="tk-t">'+esc(t.title)+'</div><div class="tk-a">'+esc(t.artist)+'</div></div>'+
      '<div><div class="tk-stat">'+esc(t.stat)+'</div><div class="tk-tag">'+esc(t.tag)+'</div></div>'+
      '<div class="tk-len">'+esc(t.len)+'</div>';
    d.addEventListener('click',function(){curIdx=i;render(true);});
    listEl.appendChild(d);
  });
  function render(scroll){
    document.querySelectorAll('.track').forEach(function(el){el.classList.toggle('active',+el.getAttribute('data-i')===curIdx);});
    var t=TRACKS[curIdx];
    if(els.t)els.t.textContent=t.title;if(els.a)els.a.textContent=t.artist;if(els.g)els.g.textContent=t.tag;if(els.st)els.st.textContent=t.stat;if(els.cu)els.cu.textContent=t.len;
    if(els.bar)els.bar.style.width=(22+Math.random()*58)+'%';
    if(scroll){var a=document.querySelector('.track.active');if(a)a.scrollIntoView({block:'nearest',behavior:'smooth'});}
  }
  var nb=document.getElementById('nextBtn'),pb=document.getElementById('prevBtn'),plb=document.getElementById('playBtn');
  if(nb)nb.onclick=function(){curIdx=(curIdx+1)%TRACKS.length;render(true);};
  if(pb)pb.onclick=function(){curIdx=(curIdx-1+TRACKS.length)%TRACKS.length;render(true);};
  if(plb)plb.onclick=function(){playing=!playing;if(els.icon)els.icon.innerHTML=playing?'<path d="M8 5v14l11-7z"/>':'<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>';};

  /* VINYL CANVAS */
  (function(){
    var canvas=document.getElementById('vinylCanvas');if(!canvas)return;var ctx=canvas.getContext('2d');if(!ctx)return;var frame=0;
    function size(){var dpr=window.devicePixelRatio||1,w=canvas.offsetWidth||300,h=canvas.offsetHeight||300;canvas.width=w*dpr;canvas.height=h*dpr;}
    size();window.addEventListener('resize',size);
    var BARS=90,notes=[];for(var i=0;i<BARS;i++)notes.push({phase:Math.random()*6.28,speed:.6+Math.random()*1.2,amp:.35+Math.random()*.65});
    function draw(){
      frame++;var t=frame*0.008,dpr=window.devicePixelRatio||1,W=canvas.width,H=canvas.height,cx=W*.5,cy=H*.5;
      if(!W||!H){requestAnimationFrame(draw);return;}
      ctx.clearRect(0,0,W,H);var radius=Math.min(W,H)*.30;
      ctx.save();ctx.translate(cx,cy);ctx.rotate(playing?t*0.4:t*0.02);
      var rec=ctx.createRadialGradient(0,0,0,0,0,radius);rec.addColorStop(0,'#191919');rec.addColorStop(.4,'#0e0e0e');rec.addColorStop(1,'#060606');
      ctx.beginPath();ctx.arc(0,0,radius,0,6.2832);ctx.fillStyle=rec;ctx.fill();
      for(var r=radius*.28;r<radius*.94;r+=radius*.032){ctx.beginPath();ctx.arc(0,0,r,0,6.2832);ctx.strokeStyle='rgba(225,224,204,'+(0.03+Math.sin(r*.1+t)*.015)+')';ctx.lineWidth=.7*dpr;ctx.stroke();}
      ctx.beginPath();ctx.arc(0,0,radius*.75,-.8,.2);ctx.strokeStyle='rgba(225,224,204,.09)';ctx.lineWidth=radius*.08;ctx.stroke();
      var lbl=ctx.createRadialGradient(0,0,0,0,0,radius*.22);lbl.addColorStop(0,'#DEDBC8');lbl.addColorStop(1,'#9c9a86');
      ctx.beginPath();ctx.arc(0,0,radius*.22,0,6.2832);ctx.fillStyle=lbl;ctx.fill();
      ctx.beginPath();ctx.arc(0,0,radius*.03,0,6.2832);ctx.fillStyle='#060606';ctx.fill();
      ctx.restore();
      ctx.save();ctx.translate(cx,cy);var outerR=radius*1.08,maxH=radius*.4;
      for(var j=0;j<BARS;j++){var a=(j/BARS)*6.2832-1.5708,n=notes[j],wv=(Math.sin(t*n.speed+n.phase)*.5+.5)*n.amp*(playing?1:.15),bh=3+wv*maxH;
        ctx.strokeStyle='rgba(225,224,204,'+(0.1+wv*.7)+')';ctx.lineWidth=(6.2832*outerR/BARS)*.5;ctx.lineCap='round';
        ctx.beginPath();ctx.moveTo(Math.cos(a)*outerR,Math.sin(a)*outerR);ctx.lineTo(Math.cos(a)*(outerR+bh),Math.sin(a)*(outerR+bh));ctx.stroke();}
      ctx.restore();requestAnimationFrame(draw);
    }
    draw();
  })();
  }); /* end playlist run() */
} /* end boot() */
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',boot);}else{boot();}
