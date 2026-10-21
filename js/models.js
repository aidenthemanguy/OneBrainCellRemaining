/* Model geometry is deliberately isolated: every evolution changes its silhouette. */
(function () {
  'use strict';
  const ink='#302820',paper='#fff9eb',red='#a7443c',gold='#c69937',blue='#6f8990',green='#687e65',skin='#f1dfbd';
  function draw(id,level,x,y,w,h,time,ctx,opts={}) {
    if(!level)return;
    const t=level>=20?3:level>=10?2:level>=5?1:0;
    ctx.save();ctx.translate(x,y);ctx.scale(w/100,h/100);
    const b=(x,y,w,h,c=paper,s=ink,l=3)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);if(s){ctx.strokeStyle=s;ctx.lineWidth=l;ctx.strokeRect(x,y,w,h);}};
    const l=(x,y,a,z,c=ink,k=3)=>{ctx.beginPath();ctx.strokeStyle=c;ctx.lineWidth=k;ctx.moveTo(x,y);ctx.lineTo(a,z);ctx.stroke();};
    const p=(a,c=paper,s=ink,k=3)=>{ctx.beginPath();a.forEach((v,i)=>i?ctx.lineTo(...v):ctx.moveTo(...v));ctx.closePath();ctx.fillStyle=c;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=k;ctx.stroke();}};
    const e=(x,y,rx,ry,c=paper)=>{ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=c;ctx.fill();ctx.strokeStyle=ink;ctx.lineWidth=3;ctx.stroke();};
    const txt=(s,x,y,size=9,c=ink)=>{ctx.fillStyle=c;ctx.font=`${size}px 'Comic Sans MS',cursive`;ctx.textAlign='center';ctx.fillText(s,x,y);};
    const face=(x,y,sz=1)=>{const blink=Math.sin(time/650+x)>.985?1:5;b(x-8*sz,y-5*sz,5*sz,blink*sz,paper,null);b(x+3*sz,y-5*sz,5*sz,blink*sz,paper,null);l(x-4*sz,y+7*sz,x+5*sz,y+7*sz,ink,2);};
    const human=(x,y,sz=1,hat=false)=>{b(x-12*sz,y+20*sz,24*sz,25*sz,blue);b(x-13*sz,y,26*sz,25*sz,skin);b(x-14*sz,y-4*sz,28*sz,8*sz,ink,null);face(x,y+12*sz,sz);if(hat)p([[x-17*sz,y-5*sz],[x,y-20*sz],[x+16*sz,y-5*sz]],gold);};
    const spin=time/(t===3?350:1100-t*220)*(1+((level-1)%5)*.12);
    const bounce=Math.sin(time/180)*2;
    switch(id){
      case 'stressBall':
        if(t===0){e(50,58,28+(opts.pulse||0)*6,28-(opts.pulse||0)*9,red);face(50,56);}
        if(t===1){p([[30,76],[35,43],[45,40],[43,22],[60,18],[67,29],[61,43],[72,49],[69,78]],gold);p([[61,26],[82,31],[63,37]],red);b(49,24,4,4,ink,null);l(40,77,29,91);l(61,78,72,90);}
        if(t===2){p([[17,87],[21,50],[36,39],[66,38],[80,51],[83,86]],green);e(31,39,13,14,green);e(68,39,13,14,green);b(27,35,5,5,ink,null);b(64,35,5,5,ink,null);l(32,68,68,68);l(18,87,5,90);l(82,87,96,90);}
        if(t===3){b(5,68,90,23,blue);for(const a of [10,90]){l(a,36,a,75);b(a-3,31,6,8,red);}l(10,46,90,46,red,2);l(10,60,90,60,red,2);b(31+bounce,39,15,20,red);b(56-bounce,39,15,20,red);l(45+bounce,48,56-bounce,48,ink,5);}
        break;
      case 'coffee':
        if(t===0){b(14,35,60,55,'#baa98c');b(74,45,18,28,paper);b(20,40,48,7,'#563a28',null);txt('cold',44,74,13);}
        if(t===1){b(12,20,73,65,blue);b(18,27,35,23,ink);b(25,52,20,8,gold);b(19,69,18,14,paper);b(55,68,18,15,paper);l(32,53,30,67,'#563a28',3);l(65,53,65,67,'#563a28',3);b(8,85,81,7,ink);}
        if(t===2){b(10,13,62,20,gold);p([[18,33],[62,33],[51,51],[29,51]],paper);b(25,57,41,28,paper);b(11,85,77,7,ink);l(78,15,78,87,ink,6);l(44,50,44,61,'#563a28',3);}
        if(t===3){b(13,26,75,63,'#bbaa8b');p([[7,28],[50,3],[95,28]],red);b(42,62,18,27,ink);b(23,39,16,16,paper);b(61,39,16,16,paper);b(30,9,10,20,ink);txt('COFFEE',50,58,9);}
        for(let i=0;i<3;i++)l(30+i*15,22-t*5,32+i*15+Math.sin(time/220+i)*4,13-t*4,'#7f7060',1.5);
        break;
      case 'lamp':
        if(t===0){b(40,3,18,12,gold);l(49,15,49,37);p([[27,38],[71,38],[83,66],[15,66]],gold);}
        if(t===1){b(7,82,76,9,ink);l(36,82,15,47,ink,5);l(15,47,64,15,ink,5);p([[60,8],[89,24],[70,46],[45,25]],gold);e(15,47,5,5,paper);}
        if(t===2){l(45,53,45,84,ink,5);l(45,83,19,97);l(45,83,75,97);b(25,15,50,38,ink);b(19,21,11,25,red);p([[75,18],[94,10],[94,57],[75,49]],gold);b(35,24,27,21,paper);}
        if(t===3){l(3,6,52,6,ink,5);l(52,6,52,28,ink,5);p([[22,29],[80,29],[95,61],[7,61]],ink);b(18,60,66,9,paper);p([[25,71],[77,71],[91,96],[9,96]],'#e3c77e',null);l(49,79,49,89,red,4);}
        break;
      case 'dictionary':
        if(t===0){p([[14,24],[81,19],[86,86],[18,91]],green);l(26,24,29,89,paper,3);txt('WORDS',53,53,12,paper);}
        if(t===1)for(let i=0;i<5;i++)b(8+i%2*6,75-i*15,80-i%3*7,14,[green,red,blue,gold][i%4]);
        if(t===2){b(7,4,85,78,'#7f5a3e');for(let r=0;r<3;r++){b(12,10+r*23,75,18,paper);for(let c=0;c<7;c++)b(14+c*10,12+r*23,8,16,[green,red,blue,gold][(r+c)%4]);}e(23,91,7,7,ink);e(77,91,7,7,ink);}
        if(t===3){for(let i=0;i<4;i++)b(23,12+i*16,54,14,[green,red,gold,blue][i]);b(9,64,82,19,red);b(9,45,16,40,gold);b(76,45,16,40,gold);l(21,83,14,99,ink,6);l(81,83,88,99,ink,6);p([[18,10],[30,1],[48,10],[68,0],[80,10]],gold);}
        break;
      case 'friend':
        if(t===0){human(48,20,1.1);l(38,70,18,94,ink,5);l(60,70,81,94,ink,5);}
        if(t===1){b(12,70,75,18,'#b8a98d');human(48,12,1);b(59,53,27,24,gold);p([[62,52],[66,40],[72,51],[80,42],[83,53]],red);}
        if(t===2){b(13,9,75,73,red);b(28,0,48,22,ink);human(48,24,.9);b(5,63,25,13,ink);b(72,63,25,13,ink);l(48,83,48,94,ink,5);l(22,96,76,96,ink,5);}
        if(t===3){b(4,80,92,13,'#57402f');human(49,4,1,true);b(19,48,61,35,blue);l(62,47,70,25);e(71,22,5,6,ink);txt('START',49,70,10,paper);}
        break;
      case 'printer':
        if(t===0){b(23,11,54,39,paper);b(8,39,85,53,'#b7afa1');b(20,56,61,26,ink);b(28,73,48,25,paper);}
        if(t===1){b(15,24,73,71,'#b7afa1');p([[12,25],[22,6],[86,6],[95,24]],blue);b(25,39,51,8,ink);b(25,54,44,31,paper);b(74,30,8,6,red);}
        if(t===2){b(10,53,75,35,blue);p([[11,57],[15,23],[79,23],[91,57]],'#aaa18d');b(5,18,92,13,ink);p([[16,19],[35,0],[67,0],[85,19]],paper);for(let i=0;i<3;i++)b(27+i*19,38,8,8,[red,gold,green][i]);}
        if(t===3){b(25,5,49,28,ink);b(32,13,35,13,red);p([[38,32],[65,32],[76,54],[56,62],[79,81],[69,97],[26,91],[19,74],[40,60],[23,49]],paper);for(let i=0;i<7;i++)l(38,42+i*7,58,42+i*7,'#9d8d76',1);}
        if(t>0){const z=(time/35)%25;b(38,68+z/2,26,5,paper,null);}
        break;
      case 'fan':
        if(t===3){e(50,48,35,32,'#b7c2c0');for(let i=0;i<5;i++)l(20+i*14,80,16+i*14,94+(i%2)*5,blue,2);p([[46,64],[60,64],[51,81],[61,81],[39,98],[44,79],[33,79]],gold);}
        else{l(50,0,50,44,ink,4);if(t===2){e(50,50,43,43,'#b8ad98');e(50,50,37,37,paper);}}
        ctx.save();ctx.translate(50,48);ctx.rotate(spin);for(let i=0;i<(t===0?2:t===1?3:6);i++){ctx.rotate(Math.PI*2/(t===0?2:t===1?3:6));p([[0,-4],[t===2?34:42,-9],[t===2?34:42,6],[0,5]],t===2?ink:blue);}ctx.restore();e(50,48,7,7,gold);
        break;
      case 'intern':
      case 'department':{
        const count=id==='department'?(t===0?4:t===1?6:8):t===0?1:t===1?2:t===2?4:6;
        b(2,3,96,90,ink);const cols=count===1?1:count<=4?2:4;const rows=Math.ceil(count/cols);
        for(let i=0;i<count;i++){const ww=88/cols,hh=68/rows,xx=6+(i%cols)*ww,yy=9+Math.floor(i/cols)*hh;b(xx+1,yy+1,ww-3,hh-3,'#d8cfbd',null);human(xx+ww/2,yy+hh*.2,Math.min(ww/38,hh/48));}
        b(9,82,14,5,red,null);b(28,82,8,5,paper,null);b(78,82,13,5,red,null);
        if(id==='department'&&t>=2){b(0,0,100,12,red);txt(t===3?'EMERGENCY':'LIVE',50,9,8,paper);}
        if(id==='intern'&&t===3){b(0,0,100,12,gold);txt('ANOTHER MEETING',50,9,7);}
        break;}
      case 'whiteboard':
        b(3,5,94,83,t<2?paper:'#b18d62');b(21,89,61,5,ink);
        if(t===0){txt('ideas',50,30,12);l(15,46,66,46,'#b8a98d',2);}
        if(t===1){for(let i=0;i<3;i++){b(13+i*25,17+(i%2)*35,20,20,paper);txt('?',23+i*25,32+(i%2)*35,14,red);if(i<2)l(32+i*25,30,38+i*25,58,red,2);}}
        if(t===2){for(let i=0;i<6;i++){const xx=12+i%3*28,yy=15+Math.floor(i/3)*34;b(xx,yy,18,23,paper);b(xx+3,yy+3,12,10,'#b8a98d',null);l(xx+8,yy+22,75-xx/2,60-yy/3,red,1.4);}}
        if(t===3){b(9,11,83,18,red);txt('DO SOMETHING',50,24,9,paper);for(let i=0;i<4;i++){b(12+i*20,41,15,15,gold);txt('!',19+i*20,53,12);}txt('still no plan',50,77,11);}
        break;
      case 'snack':
        if(t===0){b(16,4,70,91,red);b(23,13,38,61,ink);for(let i=0;i<6;i++)b(26+i%2*17,18+Math.floor(i/2)*18,12,12,[gold,blue,green][i%3]);b(67,24,10,10,paper);b(65,66,14,14,ink);b(28,82,41,7,ink);}
        if(t===1){e(20,88,10,10,ink);e(68,88,10,10,ink);b(10,50,64,25,gold);l(77,15,77,88,ink,5);l(77,84,98,84,ink,4);for(let i=0;i<3;i++)b(27,32-i*13,40,13,red);}
        if(t===2){b(10,28,80,65,paper);p([[3,28],[17,5],[84,5],[98,28]],red);for(let i=0;i<5;i++)b(9+i*17,29,17,16,i%2?paper:red);b(20,57,28,25,blue);b(60,57,18,36,ink);}
        if(t===3){b(18,21,65,74,blue);b(35,3,34,20,gold);for(let i=0;i<12;i++)b(25+i%3*18,30+Math.floor(i/3)*14,9,8,paper);txt('SNACK',51,18,9);}
        break;
      case 'pigeon':
        if(t>=1)b(t===3?5:18,64,t===3?90:64,25,'#7f5a3e');
        if(t>=2){b(3,7,31,13,green);txt(t===3?'CEO':'BOSS',18,17,7,paper);}
        e(47,57,22,25,'#9a9d9a');e(58,35,15,15,'#9a9d9a');p([[71,32],[88,39],[70,42]],gold);b(61,29,4,4,ink,null);l(38,78,34,94);l(51,79,57,94);l(39,51,45+Math.sin(time/270)*4,69,ink,2);b(13,55,24,31,paper);l(19,65,31,65,red,2);if(t>=1)p([[45,43],[56,43],[52,61]],red);if(t===3){p([[44,21],[40,6],[52,15],[60,3],[66,15],[76,7],[72,25]],gold);}
        break;
      case 'committee':
        if(t<2){human(24,15,.65);human(76,15,.65);if(t===1)human(50,8,.7);b(7,57,87,14,'#7f5a3e');l(17,71,17,96,ink,4);l(83,71,83,96,ink,4);}
        if(t>=2){b(4,32,92,62,paper);p([[1,32],[50,4],[99,32]],t===3?gold:red);for(let i=0;i<5;i++)b(13+i*17,39,8,48,'#d3c4a7');b(38,65,24,30,ink);txt(t===3?'NOT TODAY':'HEARING',50,27,8);}
        break;
      case 'factory':
        if(t===0){b(12,38,77,55,'#b18d62');p([[3,39],[49,13],[97,39]],red);b(30,62,39,31,ink);}
        if(t===1){b(8,70,85,15,ink);for(let i=0;i<4;i++){e(20+i*20,78,7,7,gold);b(15+i*20,45,15,24,paper);}l(15,86,15,97);l(85,86,85,97);}
        if(t>=2){b(4,47,92,47,'#9a8b76');p([[4,47],[31,28],[31,47],[60,28],[60,47],[88,28],[96,47]],red);b(72,5,13,43,ink);for(let i=0;i<4;i++)b(12+i*20,60,13,15,gold);if(t===3){b(8,13,52,20,paper);txt('EXCUSES',34,27,9);}}
        for(let i=0;i<=t;i++)b(28+i*14+(time/120)%8,83,10,8,paper);
        break;
      case 'moon':
        if(t===0){l(50,30,50,96,ink,5);e(50,27,22,22,'#c9c4b8');}
        else{e(50,53,42,39,'#c9c4b8');e(30,44,8,8,'#b8ad98');e(66,67,11,9,'#b8ad98');e(62,29,7,7,'#b8ad98');l(49,44,49,8,ink,2);p([[49,8],[77,12],[49,26]],red);if(t>=2){b(9,72,80,15,ink);for(let i=0;i<5;i++)l(17+i*15,74,17+i*15,84,paper,1);b(19,76,10,6,blue);}if(t===3){b(17,37,27,23,paper);p([[12,38],[31,24],[49,38]],red);b(27,49,8,12,ink);}}
        break;
      case 'court':
        if(t===0){human(48,17,1,true);b(10,65,82,28,'#7f5a3e');b(58,51,28,8,ink);l(70,46,70,65,ink,3);}
        else{b(4,31,92,63,paper);p([[0,31],[50,3],[100,31]],t===3?gold:'#b18d62');for(let i=0;i<4;i++)b(12+i*23,39,10,49,'#d3c4a7');b(37,61,25,33,ink);txt(t===1?'COURT':t===2?'SUPREME':'EVERYONE',50,26,8);if(t===3){l(50,3,50,0,red,3);b(73,61,22,30,paper);txt('!!',84,82,13,red);}}
        break;
      case 'weather':
        if(t===0||t===2){for(let i=0;i<4;i++)e(23+i*17,34+(i%2)*6,19,15,'#a3a7a6');b(19,34,64,16,'#a3a7a6',null);for(let i=0;i<5;i++){const yy=60+(time/22+i*9)%30;l(20+i*14,yy,16+i*14,yy+9,blue,2);}if(t===2)p([[45,48],[62,48],[51,66],[64,66],[35,96],[43,72],[30,72]],gold);}
        else{b(5,8,90,72,ink);b(11,14,78,59,blue);p([[15,60],[30,34],[41,51],[59,24],[85,61]],green);e(72,27,10,10,gold);l(50,80,50,95,ink,5);l(25,96,75,96,ink,5);if(t===3){b(9,62,82,14,red);txt('STILL DUE',50,72,9,paper);}}
        break;
      case 'bureau':
        if(t===0){human(47,8,1,true);b(8,54,84,26,'#7f5a3e');l(15,80,15,97,ink,5);l(85,80,85,97,ink,5);b(62,43,24,13,paper);}
        else{b(8,28,84,67,'#b8ad98');p([[3,28],[50,3],[97,28]],t===3?gold:red);for(let i=0;i<12;i++)b(15+i%4*19,38+Math.floor(i/4)*17,11,10,paper);b(40,77,21,18,ink);txt(t===1?'ONE SENTENCE':t===2?'NATIONAL':'EVERYBODY',50,23,7);if(t>=2){l(90,28,90,3);p([[90,3],[99,7],[90,15]],red);}}
        break;
    }
    // A new small attachment on every intermediate level, not a palette swap.
    const attachments=(level-1)%5;
    if(attachments>0 && !['fan','stressBall','friend'].includes(id))for(let i=0;i<attachments;i++)b(6+i*7,91,4,5,i%2?gold:red,ink,1);
    if(id==='stressBall'&&attachments){b(36,66,13+attachments*2,7,'#e9dec7',ink,1);for(let i=0;i<attachments;i++)l(40+i*4,67,40+i*4,72,red,1);}
    if(id==='friend'&&attachments){b(5,72,12+attachments*2,17,gold,ink,2);if(attachments>1)p([[29,14],[45,2],[62,14]],red,ink,2);if(attachments>2){b(32,29,10,8,ink);b(53,29,10,8,ink);l(42,32,53,32,ink,2);}}
    if(id==='fan'&&attachments){l(76,53,76,84,ink,1);for(let i=0;i<attachments;i++)b(74,64+i*6,5,4,gold,ink,1);}
    ctx.restore();
  }
  window.OBC_MODELS={draw,tier:level=>level>=20?3:level>=10?2:level>=5?1:0};
})();
