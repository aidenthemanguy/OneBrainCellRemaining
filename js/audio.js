(function(){
  'use strict';
  let ac=null,bus=null;
  const player=new Audio();player.loop=true;player.preload='auto';
  const tracks=[['2:13 a.m.','audio/two-thirteen.mp3'],['Paid by the Excuse','audio/paid-by-the-excuse.mp3']];
  let track=0,wanted=false,music=.55,effects=.55,onState=()=>{};
  player.src=tracks[0][1];player.volume=music;
  const status=()=>onState({playing:!player.paused,wanted,track:tracks[track][0],error:player.error?'Music file could not load. Extract the entire folder first.':''});
  player.addEventListener('playing',status);player.addEventListener('pause',status);player.addEventListener('error',status);
  function context(){
    if(!ac){const A=window.AudioContext||window.webkitAudioContext;if(A){ac=new A();bus=ac.createGain();bus.gain.value=effects*.6;bus.connect(ac.destination);}}
    if(ac?.state==='suspended')ac.resume().catch(()=>{});
  }
  function play(){
    wanted=true;context();
    // HTML audio playback begins directly in the user gesture, before any await.
    const promise=player.play();if(promise)promise.then(status).catch(()=>{onState({playing:false,wanted:true,track:tracks[track][0],error:'Click “start music” to allow audio in this browser.'});});
    status();
  }
  function pause(){wanted=false;player.pause();status();}
  function tone(f,d=.12,delay=0,vol=.12,type='triangle',end=f){
    if(!ac||effects===0)return;const osc=ac.createOscillator(),g=ac.createGain(),at=ac.currentTime+delay;
    osc.type=type;osc.frequency.setValueAtTime(f,at);if(end!==f)osc.frequency.exponentialRampToValueAtTime(end,at+d);
    g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(vol,at+.008);g.gain.exponentialRampToValueAtTime(.0001,at+d);
    osc.connect(g);g.connect(bus);osc.start(at);osc.stop(at+d+.015);osc.onended=()=>{osc.disconnect();g.disconnect();};
  }
  function sfx(kind,index=0){
    if(effects===0)return;context();
    if(kind==='click')tone(115+(index%5)*13,.05,0,.07,'triangle',70);
    else if(kind==='buy'){tone(160+index*9,.1,0,.13,'triangle');tone(260+index*7,.12,.06,.11,'sine');}
    else if(kind==='evolve'){[196,247,294,392,494].forEach((f,i)=>tone(f,.24,i*.07,.1,'triangle'));}
    else if(kind==='event'){tone(480,.08,0,.08,'sine');tone(360,.1,.13,.08,'sine');}
    else if(kind==='bad')tone(170,.21,0,.1,'sawtooth',65);
    else if(kind==='flip'){tone(120,.15,0,.08,'triangle',250);}
    else if(kind==='ability'){tone(100,.3,0,.1,'triangle',380);tone(490,.18,.15,.08,'sine');}
    else if(kind==='prestige'){[392,294,247,196].forEach((f,i)=>tone(f,.35,i*.12,.1,'sine'));}
    else if(kind==='stamp')tone(75,.06,0,.16,'square',40);
    else {[262,330,392,523].forEach((f,i)=>tone(f,.22,i*.07,.09,'sine'));}
  }
  window.OBC_AUDIO={play,pause,sfx,unlock:context,subscribe(fn){onState=fn;status();},
    configure(settings){music=Number(settings.musicVolume??.55);effects=Number(settings.effectsVolume??.55);player.volume=music;if(bus)bus.gain.value=effects*.6;},
    setTrack(index){track=index%tracks.length;const resume=wanted;player.src=tracks[track][1];if(resume)play();else status();},
    get playing(){return !player.paused;},get track(){return track;},get wanted(){return wanted;},
    resume(){if(wanted&&player.paused)play();},tracks
  };
})();
