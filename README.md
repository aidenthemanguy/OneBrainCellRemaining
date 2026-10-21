# One Brain Cell Remaining

An incremental game about writing one sentence and doing absolutely everything else first.

## Start

1. Extract the complete folder, including `audio` and `js`.
2. Open `index.html` in a browser.
3. Select **play with music** or **play quietly**.

The folder also opens directly in Visual Studio Code. Live Server is optional. No installation or internet connection is required to play.

## Controls

| Control | Action |
| --- | --- |
| Click the student / Space | Attempt a thought |
| F | Open or close the skill tree |
| 1–4 | Activate unlocked abilities |
| ⓘ / Click an owned object | Inspect an upgrade |
| Bedroom / Overflow | Change room |
| ♪ | Music and sound settings |
| ? | How to play |
| ⚙ | Settings, fullscreen and save transfer |
| Escape | Close a dialog |

The skill tree scrolls horizontally. Selecting an unaffordable skill displays its description.

## Progression

The game runs at normal speed. Production bonuses come from upgrades, skills, synergies, abilities and permanent progression.

Objects evolve at levels 5, 10 and 20. Their unit output increases to 1.8×, 3× and 5×. Related pairs at level 5 activate synergies.

At 5,000 Brainpower earned in a run, Tomorrow unlocks. Starting a new day resets junk and skills for Notes to Self. Permanent perks, tokens, errands, secrets, achievements and endings remain unlocked. Spending notes does not remove the lifetime production bonus.

The canteen exchanges snack tokens for temporary boosts. Tokens are earned through errands, secrets and distractions. Endings remain collected after continuing play.

## Distractions

Six games each have regular, rough and deeply unreasonable difficulties. Bronze requires 60 points, silver 80 and gold 95. Bronze unlocks the next difficulty for that game. Scores, medals and difficulty unlocks survive Tomorrow. Earlier versions' minigame wins remain counted; the new medal records start fresh because the rules have changed.

- **Stop it at 0:01:** six precision attempts, shrinking targets and moving zones on harder difficulties. Space stops the marker. The centre stripe gives full points.
- **Why did I walk in here?:** four growing memory sequences, extra tiles on harder settings, and backwards recall in the last two unreasonable rounds. Tiles also use number keys.
- **Close the useless tabs:** three timed waves with shuffled positions and exact protected document titles. Two document mistakes end the attempt.
- **Clean out the backpack:** sort food, rubbish and borrowed belongings before time expires. Harder settings include borrowed food. Number keys 1–3 select the bins.
- **Two legs on the floor:** hold the lean buttons, left/right arrows or A/D to balance a drifting chair. Release to coast. Three falls end the attempt.
- **The drawer is jammed:** a solvable sliding puzzle with move and time targets for gold. Clicking tiles or arrow keys moves the gap.

Timers pause while the browser tab is hidden. Starting or finishing an attempt starts a 45-second recovery period. Leaving an attempt grants no reward.

Bronze in three different games unlocks the avoidance circuit. It draws three different games at the selected difficulty. Bronze in all three legs clears it and grants bonus tokens. Each leg keeps its own rewards and record.

The Distractions notebook tab contains twelve claimable stamps. Each pays tokens and adds permanent +1% production. There are 32 errands and 34 achievements in total. Six small trophies appear above the Brainpower note as medals are earned; clicking the rail opens the medal cabinet.

## Saves and audio

Progress saves automatically in browser storage. Settings includes save export, JSON import and support for older save codes. Save files allow progress to move between folders or browsers. Browser data cleanup and private browsing can remove local progress.

Offline production runs at half speed for up to four hours. Temporary abilities retain their normal expiry times.

Browsers require an interaction before music can start. Playback and separate volume controls are available under ♪. Both tracks are included in `audio`. A loading error usually indicates an incomplete extraction.

## Files

- `index.html` — game interface
- `main.css` — layout and appearance
- `js/data.js` — upgrades, skills, errands and events
- `js/models.js` — physical upgrade designs
- `js/room.js` — room and character animation
- `js/audio.js` — music playback and sound effects
- `js/app.js` — progression, saves, minigames and endings
- `js/minigames.js` — six distractions, difficulty rules, scores and circuits
- `audio/` — soundtrack files
