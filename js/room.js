(function(){
  'use strict';
  const C={ink:'#302820',paper:'#e9dec7',light:'#fff9eb',floor:'#90785f',wood:'#7f5a3e',blue:'#6f8990',skin:'#f1dfbd',red:'#a7443c',gold:'#c69937',pink:'#da777d'};
  const zones={stressBall:[148,165,25,22],coffee:[333,134,40,46],lamp:[316,99,36,39],dictionary:[188,203,65,55],friend:[0,178,48,81],printer:[401,116,61,64],fan:[254,0,100,92],intern:[111,7,138,57],whiteboard:[366,45,104,67],department:[111,7,138,57]};
  function render(ctx,s,r,time){
    const lev=id=>s.upgrades[id]||0,skill=id=>s.skills.includes(id),buff=id=>(s.buffs[id]||0)>Date.now();
    const b=(x,y,w,h,c=C.light,stroke=null,k=2)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=k;ctx.strokeRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}};
    const p=(a,c=C.light,stroke=C.ink,k=2)=>{ctx.beginPath();a.forEach((v,i)=>i?ctx.lineTo(Math.round(v[0]),Math.round(v[1])):ctx.moveTo(...v));ctx.closePath();ctx.fillStyle=c;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=k;ctx.stroke();}};
    const l=(x,y,a,z,c=C.ink,k=3)=>{ctx.beginPath();ctx.strokeStyle=c;ctx.lineWidth=k;ctx.moveTo(Math.round(x),Math.round(y));ctx.lineTo(Math.round(a),Math.round(z));ctx.stroke();};
    const text=(s,x,y,size=9,c=C.ink,align='left',maxWidth=null)=>{ctx.font=`${size}px 'Comic Sans MS','Segoe Print',cursive`;ctx.fillStyle=c;ctx.textAlign=align;if(maxWidth)ctx.fillText(s,x,y,maxWidth);else ctx.fillText(s,x,y);};
    const model=(id,rect=zones[id])=>window.OBC_MODELS.draw(id,lev(id),...rect,time,ctx,{pulse:r.thinkPulse});
    ctx.clearRect(0,0,480,270);b(0,0,480,216,C.paper);b(0,216,480,54,C.floor);b(0,212,480,5,C.ink);l(0,236,480,236,'#a58e73',1);l(0,258,480,258,'#a58e73',1);
    if(r.area==='annex'){
      b(0,0,480,270,'#c9bdA5');
      text('THE OVERFLOW DEPARTMENT',14,17,10);text('the bedroom ran out of room',466,17,7,'#685a4c','right');
      const extras=window.OBC_CONTENT.upgrades.filter(u=>u.area==='annex');
      extras.forEach((u,i)=>{
        const x=8+i%4*118,y=27+Math.floor(i/4)*118;
        b(x,y,110,111,C.light,C.ink,2);b(x+1,y+87,108,23,'#d8c8a9');
        if(lev(u.id)){model(u.id,[x+16,y+3,77,80]);text(u.name,x+55,y+98,6,C.ink,'center');text(`lv ${lev(u.id)} · ${u.forms[window.OBC_MODELS.tier(lev(u.id))]}`,x+55,y+107,5,'#685a4c','center');}
        else {text('VACANT',x+55,y+43,7,'#a99a86','center');text('for now',x+55,y+56,9,'#a99a86','center');}
      });
      return;
    }
    // A separate trophy rail sits above the pinned Brainpower note.
    const arcade=window.OBC_ARCADE;
    if(arcade&&s.arcade){let visible=0;arcade.games.forEach((g,i)=>{const rows=s.arcade.records[g.id],best=Math.max(...rows.map(v=>arcade.medal(v.best)));if(!best)return;visible++;const x=17+i*14,y=3,col=['', '#a2774d','#b0b5b5',C.gold][best];b(x,y+8,9,2,C.wood);b(x+3,y+5,3,4,col,C.ink,1);if(g.id==='timing'){b(x+1,y,7,5,col,C.ink,1);b(x+3,y+1,3,2,C.ink);}if(g.id==='memory')p([[x+1,y+2],[x+3,y],[x+6,y],[x+8,y+2],[x+7,y+5],[x+2,y+5]],col,C.ink,1);if(g.id==='tabs'){b(x,y+1,8,5,col,C.ink,1);b(x+2,y-1,8,5,col,C.ink,1);}if(g.id==='sorting'){b(x+1,y,7,6,col,C.ink,1);l(x+3,y+2,x+6,y+2,C.ink,1);}if(g.id==='balance'){l(x+2,y,x+2,y+6,col,2);l(x+2,y+4,x+8,y+4,col,2);l(x+7,y+4,x+7,y+7,col,2);}if(g.id==='puzzle'){b(x+1,y,7,6,col,C.ink,1);l(x+4,y,x+4,y+6,C.ink,1);l(x+1,y+3,x+8,y+3,C.ink,1);}});if(visible)b(13,12,91,2,C.wood);}
    // Mutually exclusive wall displays keep the late game legible.
    if(lev('whiteboard'))model('whiteboard');
    else {b(382,49,83,54,'#f5e9cb',C.ink);b(411,46,23,6,C.gold);text('the assignment',390,65,8,C.red);text('submit one',390,83,11);text('sentence',390,96,11);}
    if(lev('department'))model('department');else if(lev('intern'))model('intern');
    else {b(114,19,77,27,'#e0c985',C.ink);text('delete history',123,36,8);}
    if(lev('fan'))model('fan');
    if(lev('lamp')){ctx.globalAlpha=.13;p([[321,121],[347,121],[370,181],[270,181]],'#f6d681',null);ctx.globalAlpha=1;model('lamp');}
    b(14,18,91,44,'#f5e9cb',C.ink);b(47,15,23,6,C.gold);text('brainpower',22,34,9);text(r.number(s.brainpower),22,57,17,C.ink,'left',75);
    p([[7,88],[83,86],[86,158],[9,160]],'#d9ccb2');text('hear me out',18,104,10);l(46,115,46,136);l(46,125,28,134);l(46,125,64,137);l(46,125,54,110);b(43,122,7,7,C.ink);text('the ceiling fan',17,151,7);
    // Skill props have dedicated positions, separate from the upgrade footprints.
    const shelf=skill('hydrate')||skill('petRock')||skill('deskPlant')||skill('terribleClarity');
    if(shelf){b(13,81,86,3,C.wood,C.ink,1);if(skill('hydrate')){b(17,67,9,13,'#91b8bd',C.ink,1);b(19,64,5,3,C.ink);}if(skill('petRock'))p([[35,80],[38,72],[46,71],[51,80]],'#9c9991',C.ink,1);if(skill('deskPlant')){b(60,75,11,5,C.wood,C.ink,1);l(65,75,65,65,'#687e65',2);l(65,70,58,66,'#687e65',2);l(65,69,72,64,'#687e65',2);}if(skill('terribleClarity')){p([[82,78],[84,69],[89,69],[93,78]],C.gold,C.ink,1);l(87,78,87,81,C.ink,1);}}
    if(skill('clock')){b(230,112,24,27,C.light,C.ink);l(242,125,242+Math.sin(time/1000)*7,125-Math.cos(time/1000)*7,C.red,1);l(242,125,237,120,C.ink,2);}
    if(skill('stareHarder')){b(237,98,36,9,C.light,C.ink,1);l(240,102,269,102,C.red,2);text('standards',237,96,5);}
    if(skill('lowerStandards')){b(264,113,18,18,'#b8ad98',C.ink,1);p([[262,113],[284,113],[282,117],[264,117]],C.paper,C.ink,1);b(270,108,8,7,C.light,C.ink,1);}
    const takeover=buff('takeOver');
    // Chair is genuinely replaced by the chair skill.
    p([[92,121],[129,121],[129,194],[100,194],[92,183]],skill('oneGoodChair')?'#87575a':'#64797a',C.ink,4);
    if(skill('oneGoodChair')){b(89,111,44,14,'#87575a',C.ink,3);b(85,164,17,8,C.ink);}
    l(101,191,101,233,C.ink,6);l(126,191,126,233,C.ink,6);b(90,230,23,5,C.ink);b(118,230,24,5,C.ink);
    const stand=buff('standUp'),rise=stand?(s.settings.reducedMotion?24:Math.min(1,(Date.now()-(s.buffs.standUp-10000))/300)*24):0;
    if(!takeover){
      ctx.save();ctx.translate(0,-rise);
      p(stand?[[116,191],[122,137],[148,113],[177,124],[168,191]]:[[111,191],[117,158],[132,126],[151,109],[190,122],[176,159],[167,194],[122,194]],C.blue,C.ink,5);
      p([[136,118],[151,101],[184,113],[195,133],[177,138],[160,123]],'#536c72',C.ink,3);
      l(112,194,108,235+rise,C.ink,9);l(164,194,174,235+rise,C.ink,9);ctx.restore();
    }
    p([[53,181],[451,181],[449,199],[49,199],[49,187]],C.wood,C.ink,5);b(62,198,10,48,'#57402f');b(425,198,10,48,'#57402f');b(54,242,26,6,C.ink);b(417,242,27,6,C.ink);
    p([[230,175],[321,173],[329,189],[233,192]],C.light);l(248,185,315,183,'#d5cab7',1);
    if(skill('accidentalWork')){b(304,178,10,5,'#bdb7ae',C.ink,1);l(303,177,315,185,C.red,1);}
    ['dictionary','friend','printer','coffee'].forEach(id=>lev(id)&&model(id));
    // Phone has a separate footprint and really turns face-down during Lock In.
    const phone=r.event?.id==='phone',shake=phone?Math.round(Math.sin(time/45)*2):0;
    b(379+shake,165,20,16,C.ink);b(381+shake,167,16,11,buff('actuallyTry')?'#57402f':'#c9d0c5');if(!buff('actuallyTry'))text(phone?'u up?':'2:13',389+shake,175,5,C.ink,'center');
    p([[286,237],[326,237],[331,260],[283,260]],'#d5c3a6');p([[296,237],[307,225],[319,237]],'#f5e9cb');b(338,237,18,25,'#cbb37b',C.ink);b(343,230,8,8,C.ink);l(347,230,363,230,C.ink,2);l(363,230,363,234,C.ink,2);
    if(takeover){
      p([[128,144],[151,144],[166,177],[116,177]],C.blue,C.ink,3);b(122,117,38,30,C.pink,C.ink,3);b(130,128,5,5,C.light);b(148,128,5,5,C.light);l(139,147,139,163);p([[137,147],[143,147],[141,163]],C.red,C.ink,1);l(154,158,239,176,C.ink,5);
    } else {
      const pulse=r.thinkPulse||0,lift=pulse>.5?-3:pulse>.2?1:0;
      ctx.save();ctx.translate(pulse>.5?2:0,lift-rise);
      p([[170,98],[216,98],[225,105],[225,147],[219,160],[172,160],[164,155],[160,108]],C.skin,C.ink,5);
      for(const a of [[164,93,13,9],[176,89,14,11],[189,92,15,9],[203,90,13,12],[214,96,8,9]])b(...a,C.ink);
      b(168,116,19,18,C.light,C.ink);b(193,116,20,18,C.light,C.ink);b(178,123,5,7,C.ink);b(196,123,5,7,C.ink);
      [[169,118,175,124],[186,118,181,124],[170,132,176,127],[194,118,199,124],[212,119,206,125],[211,132,206,127]].forEach(a=>l(...a,C.red,2));
      l(181,148,205,148,C.ink,3);l(205,148,211,143,C.ink,3);b(210,149,4,8,'#79a4aa');
      if(skill('lockedIn')){l(162,117,162,108,C.ink,5);l(162,108,173,103,C.ink,5);l(173,103,213,103,C.ink,5);l(213,103,227,110,C.ink,5);b(157,114,10,23,C.red,C.ink);b(220,114,10,23,C.red,C.ink);}
      const tap=skill('nervousTap')?Math.sin(time/(skill('deskDrums')?75:120))*(pulse>.05?5:1):0;
      l(166,132,147,149,C.ink,9);l(147,149,174,176+tap,C.ink,9);l(167,133,150,149,C.blue,5);l(150,149,176,174+tap,C.blue,5);b(173,171+tap,24,11,C.skin,C.ink,3);
      l(174,135,202,155,C.ink,9);l(202,155,247,177-(skill('bothHands')?tap:0),C.ink,9);l(176,135,204,155,C.blue,5);l(204,155,246,176-(skill('bothHands')?tap:0),C.blue,5);b(239,171-(skill('bothHands')?tap:0),19,12,C.skin,C.ink,3);
      if(skill('twoFingers')){l(181,178+tap,181,185+tap,C.ink,1);l(187,178+tap,187,185+tap,C.ink,1);}if(skill('wristDamage'))b(232,170,8,12,'#b8ad98',C.ink,1);
      ctx.save();ctx.translate(251,176-(skill('bothHands')?tap:0));ctx.rotate(.16-pulse*.07);b(0,0,36,5,C.gold,C.ink,1);b(1,1,6,3,'#b8534e');p([[36,0],[44,2.5],[36,5]],'#ead1a4',C.ink,1);ctx.restore();ctx.restore();
    }
    if(lev('stressBall'))model('stressBall');
    // Small skill helpers stay in a tray above the paper.
    if(skill('delegateTap')){b(260,157,12,9,C.skin,C.ink,1);l(266,166,266,171+Math.sin(time/100)*2,C.ink,2);}
    if(skill('supervisor')){b(280,154,14,10,C.gold,C.ink,1);b(286,149,8,8,C.gold,C.ink,1);b(294,152,5,3,C.red);}
    if(skill('bigButton')){b(300,162,17,5,C.ink);b(303,158,11,5,C.red,C.ink,1);}
    if(skill('rubberStamp')){b(288,169,11,5,'#57402f',C.ink,1);if(r.thinkPulse>.3){b(283,175,18,8,'#c18372',C.red,1);}}
    if(!takeover){const x=stand?117:185-(r.event?.id==='escape'?Math.round(time/140%48):0),y=75+Math.round(Math.sin(time/240))-(r.thinkPulse||0)*3;
      p([[x+6,y],[x+22,y],[x+27,y+4],[x+27,y+17],[x+23,y+22],[x+5,y+22],[x,y+18],[x,y+6]],C.pink,C.ink,2);b(x+6,y+8,4,5,C.light);b(x+17,y+8,4,5,C.light);b(x+8,y+10,2,3,C.ink);b(x+17,y+10,2,3,C.ink);l(x+9,y+17,x+18,y+17,C.ink,1);l(x+1,y+10,x-6,y+16,C.ink,1);l(x+26,y+11,x+33,y+17,C.ink,1);
      if(skill('union')){const sx=stand?89:x+34;l(sx+5,76,sx+5,97,C.ink,1);b(sx,69,25,12,C.light,C.ink,1);text('NO',sx+12,78,7,C.red,'center');}
    }
    if(buff('panic')){for(let i=0;i<5;i++){const x=83+i*24,y=113-i%3*10;b(x,y,43,26,C.light,C.ink,1);b(x,y,43,6,'#b8ad98');text('×',x+39,y+5,5,C.red,'center');}}
    if(r.event){const id=r.event.id;if(id==='fly'){const x=286+Math.sin(time/70)*4;b(x,177,5,4,C.ink);l(x,177,x-5,173,C.ink,1);l(x+5,177,x+10,173,C.ink,1);}if(id==='delivery'){b(372,233,32,27,'#b18d62',C.ink);l(388,234,388,258,C.gold,4);}if(id==='duck'){b(258,240,19,12,C.gold,C.ink);b(268,233,10,10,C.gold,C.ink);b(278,236,5,4,C.red);l(263,253,261,259,C.ink,1);l(272,253,274,259,C.ink,1);}}
    // Particle effects contain shapes only. Numeric feedback lives outside the character area.
    for(const q of r.particles||[]){ctx.globalAlpha=Math.max(0,q.life);b(q.x,q.y,q.size||3,q.size||3,q.color||C.gold);}
    ctx.globalAlpha=1;
    if(r.purchasePulse>0){const z=zones[r.purchaseId];if(z){const rr=(1-r.purchasePulse)*12;ctx.strokeStyle=C.red;ctx.lineWidth=1;ctx.strokeRect(z[0]-rr,z[1]-rr,z[2]+rr*2,z[3]+rr*2);}}
  }
  window.OBC_ROOM={render,zones};
})();
