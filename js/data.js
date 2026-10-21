(function () {
  'use strict';
  const upgrades = [
    ['stressBall','Stress Ball','●',15,.5,'room', ['sad foam ball','rubber chicken','angry desk frog','tiny boxing ring'], 'Something to squeeze instead of doing the assignment.'],
    ['coffee','Coffee From Earlier','▥',80,2.8,'room', ['cold mug','double espresso','drip tower','coffee with a mortgage'], 'Nobody knows how old it is.'],
    ['lamp','Desk Lamp','⌁',350,13,'room', ['clip lamp','anglepoise lamp','studio spotlight','interrogation lamp'], 'The paper has been identified as a suspect.'],
    ['dictionary','Thesaurus Nobody Opened','Aa',1500,60,'room', ['one book','book pile','rolling library','book throne'], 'All these words. Still no sentence.'],
    ['friend',"Friend Who Said ‘Just Start’",'2',6200,270,'room', ['unhelpful friend','friend with snacks','gaming chair consultant','paid motivational speaker'], 'Their entire contribution is still “just start”.'],
    ['printer','Printer','▣',26000,1200,'room', ['budget printer','office copier','paper cannon','receipt of every failure'], 'It prints the blank document. Repeatedly.'],
    ['fan','Real Ceiling Fan','✣',110000,5400,'room', ['two-blade fan','ceiling propeller','industrial turbine','tiny weather system'], 'At least something in this room is doing work.'],
    ['intern','Group Project Member','@',460000,24000,'room', ['one muted call','two muted calls','four muted calls','meeting about the meeting'], 'They are all waiting for somebody else to start.'],
    ['whiteboard','Whiteboard','#',1900000,108000,'room', ['blank whiteboard','bad flowchart','evidence board','emergency planning board'], 'The problem is now mounted on the wall.'],
    ['department','Entire Study Group','??',8000000,480000,'room', ['group chat','conference call','press conference','emergency broadcast'], 'This was a solo assignment.'],
    ['snack','Vending Machine','▤',34000000,2200000,'annex', ['school vending machine','snack forklift','snack restaurant','snack headquarters'], 'Buying the whole machine was easier than choosing a snack.'],
    ['pigeon','Pigeon With a Clipboard','v',145000000,10000000,'annex', ['unpaid pigeon','pigeon supervisor','pigeon boardroom','pigeon CEO'], 'It has approved absolutely nothing.'],
    ['committee','Committee About Starting','…',620000000,46000000,'annex', ['folding table','committee table','public hearing','parliament of excuses'], 'First item on the agenda: schedule the next meeting.'],
    ['factory','Excuse Factory','▰',2650000000,210000000,'annex', ['shed of excuses','excuse conveyor','excuse factory','excuse distribution centre'], 'Now the excuses are produced at a sustainable rate.'],
    ['moon','Moon Rental','◒',11500000000,960000000,'annex', ['moon on a stick','rented moon','moon with parking','moon with an HOA'], 'The landlord says no pets. On the moon.'],
    ['court','Homework Court','§',50000000000,4400000000,'annex', ['angry judge','full courtroom','supreme homework court','planetary subpoena'], 'The blank page has become evidence.'],
    ['weather','Deadline Forecast','☂',220000000000,20000000000,'annex', ['rain cloud','weather station','deadline storm','personal weather channel'], 'There is a 100% chance the page is still blank.'],
    ['bureau','Department of One Sentence','!',1000000000000,92000000000,'annex', ['one official desk','civil service building','national department','world administration'], 'Eight billion people. One shared document. Still blank.']
  ].map((a,i)=>({id:a[0],name:a[1],icon:a[2],baseCost:a[3],bps:i<5?[.06,.1,.25,.5,1.1][i]:a[3]/60000,area:a[5],forms:a[6],description:a[7],growth:1.19+i*.001,unlockAt:i===0?0:a[3]*.52}));
  const skills = [
    ['nervousTap','Tap the Desk',40,{clickFlat:2},'The free hand starts tapping. Patience does not improve.'],
    ['twoFingers','Use Two Fingers',260,{clickMultiplier:.8},'Two fingers tap. Twice the commitment to doing nothing.'],
    ['bothHands','Use Both Hands',1800,{clickMultiplier:1.4},'Both arms join in with each thought. The page stays untouched.'],
    ['wristDamage','Get a Wrist Brace',12000,{clickMultiplier:2},'A wrist brace arrives. The tapping continues.'],
    ['deskDrums','Desk Drummer',90000,{clickMultiplier:3},'The tapping gets a beat. The neighbours have concerns.'],
    ['rubberStamp','Official Thinking Stamp',700000,{clickMultiplier:4},'The stamp keeps hitting the same spot.'],
    ['delegateTap','Hire a Tapping Hand',7000000,{autoClick:1},'A tiny hired hand taps automatically once per second.'],
    ['bigButton','Emergency Thought Button',80000000,{clickMultiplier:6},'A big red button arrives. Everyone expects it to help.'],
    ['stareHarder','Lower Expectations',70,{allMultiplier:.2},'A new standards meter appears. It points down.'],
    ['lowerStandards','Keep the First Thought',430,{allMultiplier:.35},'A little idea bin catches every discarded thought.'],
    ['accidentalWork','Stop Erasing',3200,{passiveMultiplier:.6},'The eraser gets crossed out. Passive production increases by 60%.'],
    ['lockedIn','Noise-Cancelling Headphones',21000,{allMultiplier:.6},'The student puts on headphones and looks even less approachable.'],
    ['oneGoodChair','A Chair That Does Not Suck',160000,{allMultiplier:.8},'Replace the terrible chair with a proper padded one.'],
    ['deskPlant','Keep One Plant Alive',1250000,{passiveMultiplier:1},'A plant appears. It is somehow handling the assignment better than anyone else.'],
    ['supervisor','Appoint a Supervisor',11000000,{allMultiplier:1.2},'A tiny duck supervises the desk. No qualifications.'],
    ['union','The Brain Cell Unionises',120000000,{allMultiplier:2},'The brain cell gets a picket sign. It still produces Brainpower.'],
    ['standUpUnlock','Leave the Chair',110,{unlockAbility:'standUp'},'Unlocks an actual stand-up animation and a 10-second ×2 boost.'],
    ['panicUnlock','Open Every Tab',700,{unlockAbility:'panic'},'Unlocks a shower of useless browser tabs and an instant production burst.'],
    ['tryUnlock','Put the Phone Down',5000,{unlockAbility:'actuallyTry'},'Unlocks Lock In. The phone flips face-down during the boost.'],
    ['terribleClarity','Reward the Distractions',33000,{eventMultiplier:1},'Room events pay twice as much. A small event bell appears.'],
    ['hydrate','Drink Some Water',240000,{cooldown:.15},'A water bottle appears. Panic-button cooldowns are 15% shorter.'],
    ['petRock','Emotional Support Rock',1900000,{eventMultiplier:1},'It just sits there. That helps.'],
    ['clock','Threatening Wall Clock',18000000,{cooldown:.2},'A ticking wall clock appears. Cooldowns are another 20% shorter.'],
    ['takeOver','Let the Brain Cell Drive',180000000,{unlockAbility:'takeOver'},'The brain cell takes the chair for 15 seconds. ×4 passive production.']
  ].map((a,i)=>{const row=Math.floor(i/8)+1,col=i%8+1;return {id:a[0],name:a[1],cost:a[2],effect:a[3],description:a[4],short:a[4],row,column:col,branch:['finger damage','lower standards','avoidance'][row-1],requires:col===1?[]:[['nervousTap','twoFingers','bothHands','wristDamage','deskDrums','rubberStamp','delegateTap','bigButton','stareHarder','lowerStandards','accidentalWork','lockedIn','oneGoodChair','deskPlant','supervisor','union','standUpUnlock','panicUnlock','tryUnlock','terribleClarity','hydrate','petRock','clock','takeOver'][i-1]]};});
  const abilities = [
    {id:'standUp',name:'Stand Up, Sit Back Down',hotkey:'1',icon:'↑',cooldown:40,duration:10,description:'×2 clicks and passive for 10s. The student actually gets up.',line:'My knees just cracked.'},
    {id:'panic',name:'Open Every Tab',hotkey:'2',icon:'!',cooldown:50,duration:2,description:'Gain 18 seconds of production. The room gets buried in tabs.',line:'WHY ARE THERE SEVENTEEN OF THESE.'},
    {id:'actuallyTry',name:'Lock In',hotkey:'3',icon:'×6',cooldown:55,duration:12,description:'×6 clicks for 12s. The phone goes face-down.',line:'Do not send me anything for twelve seconds.'},
    {id:'takeOver',name:'Let It Drive',hotkey:'4',icon:'◉',cooldown:90,duration:15,description:'×4 passive for 15s. The brain cell takes the chair.',line:'Fine. Handing over.'}
  ];
  const quests = [
    ['q1','Attempt a thought','clicks',10,1,'Attempt ten thoughts.'],
    ['q2','Buy something unhelpful','levels',3,1,'Own three upgrade levels.'],
    ['q3','Use the back of the room','skills',2,2,'Learn two skills. Press F.'],
    ['q4','A different kind of problem','tier',2,2,'Get any physical object to level 5.'],
    ['q5','Get distracted successfully','events',3,3,'Resolve three room events.'],
    ['q6','Have one good excuse','minigames',1,3,'Earn bronze or better in any distraction.'],
    ['q7','Fill the desk','types',6,4,'Own six different upgrades in this run.'],
    ['q8','Tomorrow will be different','prestiges',1,5,'Make tomorrow’s problem once. It will not be different.'],
    ['q9','The group has arrived','department',1,5,'Buy the Entire Study Group.'],
    ['q10','A completely different object','tier',3,6,'Evolve any object to level 10.'],
    ['q11','Actually use the panic buttons','abilities',8,7,'Use any eight abilities across all runs.'],
    ['q12','The room is not enough','annex',1,8,'Purchase one overflow upgrade.'],
    ['q13','This pigeon has a job','pigeon',1,9,'Hire a pigeon with a clipboard.'],
    ['q14','Have a proper problem','levels',100,10,'Own 100 total upgrade levels.'],
    ['q15','Extremely qualified','skills',15,12,'Learn 15 skills in this run.'],
    ['q16','Money was a mistake','tier',4,14,'Evolve any object to level 20.'],
    ['q17','It is literally the moon','moon',1,16,'Rent the moon.'],
    ['q18','The legal route','court',1,18,'Open Homework Court.'],
    ['q19','The weather is personal','weather',1,20,'Buy Deadline Forecast.'],
    ['q20','Everyone is involved','bureau',1,25,'Establish the Department of One Sentence.'],
    ['q21','That was apparently a warm-up','bronze',3,4,'Earn three medals across different game/difficulty records.'],
    ['q22','Adequate at everything else','distinctGames',6,6,'Earn bronze in all six distractions.'],
    ['q23','A deeply misplaced achievement','gold',1,6,'Earn a gold medal in any distraction.'],
    ['q24','Three consecutive distractions','circuits',1,8,'Complete an avoidance circuit.'],
    ['q25','Accept the worse version','roughWins',5,8,'Win five games on rough difficulty.'],
    ['q26','The mouse deserves a break','miniStreak',5,6,'Build a streak of five distraction wins.'],
    ['q27','The entire desk has a purpose','synergies',5,12,'Activate five upgrade synergies at the same time.'],
    ['q28','At least the stamps look official','stamps',6,10,'Claim six distraction stamps.'],
    ['q29','This is where the effort went','silver',10,14,'Earn silver or better in ten game/difficulty records.'],
    ['q30','Completely unnecessary accuracy','perfect',3,16,'Score 100 in three game/difficulty records.'],
    ['q31','Surely this is enough now','absurdSilver',3,20,'Earn silver in three deeply unreasonable games.'],
    ['q32','The evening has been deleted','gold',18,30,'Earn gold in every game on every difficulty.']
  ].map(a=>({id:a[0],name:a[1],metric:a[2],target:a[3],reward:a[4],description:a[5]}));
  const perks = [
    {id:'pockets',name:'Found Money',cost:2,max:5,description:'Start each new run with 150 Brainpower per rank.'},
    {id:'memory',name:'Muscle Memory',cost:3,max:8,description:'+20% click power per rank. Permanent.'},
    {id:'nightshift',name:'Night Shift',cost:4,max:8,description:'+20% passive production per rank. Permanent.'},
    {id:'insurance',name:'Distraction Insurance',cost:3,max:4,description:'Events last 2 seconds longer per rank.'},
    {id:'keys',name:'Spare Keys',cost:8,max:1,description:'Unlock optional auto-buy. It buys the cheapest visible upgrade.'},
    {id:'carry',name:'Leave It on the Desk',cost:10,max:1,description:'Keep the first skill in each branch after tomorrow.'}
  ];
  const achievements = [
    ['firstThought','Opened the Document','Attempt one thought.'],['stillNothing','Still Blank','Make 100 lifetime Brainpower.'],['thatHurt','Not a Rhythm Game','Attempt 100 thoughts.'],['pleaseStop','Let the Mouse Rest','Attempt 500 thoughts.'],['dueYesterday','Due Yesterday','Make 10,000 lifetime Brainpower.'],['deleteHistory','Behind the Room','Flip to the skill tree.'],['foundThat','Not Discussing This','Inspect the floor.'],['uUp','Read at 2:13','Answer the late-night text.'],['dailyDisaster','Tomorrow Me','Start a new day.'],['notBetter','This Is Furniture Now','Own 25 upgrade levels.'],['department','This Was a Solo Assignment','Assemble the study group.'],['oneSentence','Submitted at 11:59','See the submission ending.'],['evolve','Actual Character Development','Evolve an upgrade to its final model.'],['pigeonBoss','Who Hired Him','Promote a pigeon to CEO.'],['lunar','Security Deposit','Rent the moon.'],['allSkills','A Very Bad Education','Learn all 24 skills in one run.'],['distraction','Task Failed Successfully','Win three distractions.'],['combo','A Brief Thought','Reach a 25-click streak.'],['secrets','Nothing to See Here','Find all five room secrets.'],['extension','Another Week','See the extension ending.'],['bureaucracy','Worldwide Group Project','See the absurd ending.'],['sleep','Reasonable Decision','See the quiet ending.'],['allEndings','Four Ways Out','Collect all four endings.'],['questMaster','Side Quest Main Character','Complete twenty errands.']
  ].map(a=>({id:a[0],name:a[1],description:a[2],secret:['foundThat','uUp','sleep','bureaucracy','extension'].includes(a[0])}));
  achievements.push(...[
    ['firstMedal','An Official Waste of Time','Earn the first distraction medal.'],
    ['sixGames','Something for Every Bad Habit','Earn bronze in all six distractions.'],
    ['goldMedal','The Wrong Leaderboard','Earn a gold medal.'],
    ['cleanCircuit','Three in a Row','Clear the avoidance circuit.'],
    ['roughCircuit','A Longer Evening','Clear a rough or unreasonable circuit.'],
    ['absurdMedal','A Concerning Amount of Practice','Earn silver on deeply unreasonable.'],
    ['allStamps','Certified in Avoidance','Claim all twelve distraction stamps.'],
    ['winStreak','Five Consecutive Excuses','Win five distractions in a row.'],
    ['regularGold','Everything Except the Assignment','Earn gold in all six regular games.'],
    ['allErrands','The Side Quests Have Side Quests','Complete all 32 errands.']
  ].map(a=>({id:a[0],name:a[1],description:a[2],secret:false})));
  window.OBC_CONTENT = {version:5,upgrades,skills,abilities,quests,perks,achievements,
    tierLevels:[1,5,10,20],
    chapters:[
      {at:0,name:'1. Open the document',line:'One sentence. This should be possible.'},
      {at:1000,name:'2. Buy literally anything',line:'Shopping has replaced working.'},
      {at:100000,name:'3. Involve other people',line:'Nobody in this room knows the topic.'},
      {at:20000000,name:'4. It no longer fits in here',line:'Additional problems have been purchased.'},
      {at:2000000000,name:'5. A public inconvenience',line:'People are holding meetings about this.'},
      {at:500000000000,name:'6. Everybody’s problem',line:'The assignment has acquired jurisdiction.'}
    ],
    dialogue:['I genuinely have nothing.','I have read the question six times.','No. That sounds stupid.','It is ONE sentence.','I need to stop checking the time.','Why did I open that tab?','I am so tired.','Can everyone stop asking how it is going?','I forgot what I was about to do.','I have done everything except the work.','I swear I had an idea a second ago.','That was not worth buying.','It is still blank. I checked.','I do not need another snack.','I am buying another snack.','This is getting expensive.','Please do not look at my screen.'],
    events:[
      {id:'phone',name:'phone buzzing',duration:9,line:'The phone buzzed. This cannot be important.',success:'It was “u up?” Obviously.',miss:'It stopped. Leave it.',bonusSeconds:12,hitbox:{x:373,y:157,w:30,h:32}},
      {id:'escape',name:'brain cell leaving',duration:8,line:'The brain cell is trying to leave.',success:'No. Rent is due.',miss:'It came back. Rent is expensive.',bonusSeconds:16,hitbox:{x:128,y:68,w:94,h:40}},
      {id:'fly',name:'fly on the page',duration:7,line:'There is a fly on the page. It has written just as much as the study group.',success:'Got it. Still blank.',miss:'The fly has moved on with its life.',bonusSeconds:10,hitbox:{x:259,y:169,w:65,h:30}},
      {id:'delivery',name:'questionable delivery',duration:10,line:'Another delivery. Again.',success:'It is another empty box. Perfect.',miss:'They left it outside.',bonusSeconds:20,hitbox:{x:367,y:220,w:42,h:43}},
      {id:'duck',name:'uninvited visitor',duration:8,line:'A duck has walked in. Somebody should probably ask why.',success:'The duck says to start the assignment. Unbelievable.',miss:'The duck is disappointed.',bonusSeconds:18,hitbox:{x:254,y:221,w:29,h:40}}
    ]
  };
})();
