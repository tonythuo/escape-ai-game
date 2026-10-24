# escape-ai-game

Two browser assignments, one file each. This repo is **Assignment 2 only**: "Escape the Evil AI".
The Rock, Paper, Scissors game (`computerPlay` / `playRound`) lives in a separate repo, `rps-game`.
Do not add RPS functions here.

**Current state:** playable. `index.html`, `script.js`, `tests.js`, `README.md` exist; state
(`gameState`), input helpers (`askPlayer` / `choose`), the rooms and `game()` are implemented.
Git repo on `main`-based branches; verify with `node tests.js` (12 checks, no install needed;
`script.js` stubs `alert`/`prompt`/`confirm`, so the game itself must stay free of test code).
Keep it green — never "fix" a failing test by weakening the assertion.

## Hard constraints (lecturer-graded)
- **No DOM.** No `document.*`, no `querySelector`, no event listeners, no `innerHTML`.
  All interaction is `alert()` / `prompt()` / `confirm()` / `console.log()`.
- Vanilla JS, no build step, no deps. `index.html` loads `script.js` via
  `<script src="script.js"></script>` (classic script, not `type="module"`).
- `game()` is called at the bottom of `script.js`; opening `index.html` starts the game.

## Function contracts
- `computerPlay()` → exactly `"Rock"`, `"Paper"`, or `"Scissors"` (capitalized, nothing else).
- `playRound(playerSelection, computerSelection)` → `"win"`, `"lose"`, or `"draw"`.
  Case-insensitive; it must **not** prompt, alert, or touch the score.
- `game()` owns the loop, the prompts, the score, first to 3 points, and the winner message.

## Edge cases the grader will try
- Whitespace and case: `" RoCk "` must play as Rock → normalize with `.trim().toLowerCase()` at the input boundary.
- `prompt()` returns `null` on Cancel → end the game cleanly, alert, no crash, no score change.
- Invalid input (`"banana"`, `123`) → `alert("Invalid input")`, `continue` without scoring.
- Draw → no score change for either side.
- Game stops at exactly 3, never 4.
- Replay: `confirm("Do you want to play again?")` — OK resets **all** state (`hasKey`, current room, scores) back to Room 1.

---

hey guys, here is a game plan i was suggesting. Phase 1: Setup & Planning (Do this together - 30 mins)
Create the Repositories: Create the GitHub repository for the Rock, Paper, Scissors game. Add Karim and Tony as collaborators.

Create the Skeleton: One person creates the index.html (boilerplate) and script.js files and pushes them to the repo.

Draft the "UX Script": The assignment requires clear instructions. As a team, write down exactly what the first alert() messages will say. (e.g., "Welcome! Open your console by pressing F12...").

Agree on the Data Structure: Decide how you will store the score. (e.g., let playerScore = 0; let computerScore = 0;).  Phase 2: Divide the Code (The "Function by Function" Approach)
Since you cannot use DOM manipulation, the whole game lives in functions. Here is how to split the work so you can merge the code easily:

👤 Person 1 (You, Lefa) - The Computer Logic

Your Task: Write the computerPlay() function.

Requirement: It must use Math.random() to return exactly "Rock", "Paper", or "Scissors".

Bonus: Write a small test at the bottom of your file to console.log(computerPlay()) 5 times to prove it is random. (Remove it before committing — the final file runs `game()`, not the randomness test.)

👤 Person 2 (Karim) - The Round Logic

Your Task: Write the playRound(playerSelection, computerSelection) function.

Requirement: This function takes the two inputs, compares them (case-insensitive!), and returns whether the player "win", "lose", or "draw".

Note: This function should not handle the score or the prompts. It just does the math and returns the result.

👤 Person 3 (Tony) - The Game Loop & User Experience

Your Task: Write the game() function.

Requirement:

Create the while loop that runs until someone gets 3 points.

Use prompt() to ask the user for input.

Handle the "Cancel" button (if prompt returns null, exit the game).

Handle invalid input (if they type "banana", alert them and continue the loop without counting a point).

Update the score based on what playRound() returns.

Print the final winner.    Phase 3: Integration (Putting it together)
Once you all have your pieces working individually:

Paste all three functions into the main script.js file.

At the very bottom of the file, call game(); to start the game.

Test it together in the browser.

Phase 4: "Breaking" the Game (QA Testing)
The lecturer specifically said: "I will try to find mistakes and break your apps!"

As a team, spend 20 minutes trying to break your own game:

What happens if you type RoCk (with spaces)?

What happens if you press Cancel on the very first prompt?

What happens if you type 123?

Does the score update correctly if it's a draw?

Does the game stop exactly at 3 points?  Phase 5: Presentation Prep
The lecturer said you will have to present your solution. Assign roles for the presentation:

Speaker 1: Explains the overall logic and how you divided the work.

Speaker 2: Demonstrates the game live (show a win, a loss, and a draw).

Speaker 3: Explains how you handled edge cases (Cancel button, invalid input, spaces) and answers the lecturer's questions.

Since you only have a few days, you need to split the work strictly. Do not have everyone coding at the same time. Use Git branches or have one person be the "Integrator" who merges the code.

📅 Day 1 (Tuesday): Rock, Paper, Scissors - Logic & Setup
Goal: Get Repository 1 set up and the core logic working.

1. Setup (30 mins):

One person creates Repository 1 on GitHub (e.g., rps-game).

Create the index.html (with the boilerplate and <script src="script.js"></script>).

Create script.js.

Add Karim and Tony as collaborators.

2. Split the Code (Independent Work):

Lefa (You): Write the computerPlay() function. Make sure it returns "Rock", "Paper", or "Scissors" randomly.

Karim: Write the playRound(playerSelection, computerSelection) function. It should return a string ("win", "lose", or "draw"). Handle case-insensitivity here (e.g., playerSelection.toLowerCase()).

Tony: Write the initial User Experience instructions using alert(). Remember, he must explain how to open the console and why it is needed.

3. Merge: Push your individual functions to the repository. Tony or whoever is best at Git pulls them all into script.js.

📅 Day 2 (Wednesday): Rock, Paper, Scissors - The Loop & Testing
Goal: Finish Assignment 1 and start the Bonus.

1. The Game Loop (Tony's main task):

Write the game() function. Use a while loop (while (playerScore < 3 && computerScore < 3)).

Add prompt() inside the loop.

Crucial: Add the if (playerSelection === null) check to handle the "Cancel" button.

Crucial: Add the validation check. If they type "banana", use alert("Invalid input") and continue.

2. Testing (All 3 of you):

Play the game. Try to break it.

Type "ROCK", type " paper ", press Cancel, type numbers.

Make sure the score only updates when someone wins, and it stops exactly at 3 points.

3. Push & Finish: Commit the final RPS code to GitHub. Assignment 1 is done.

📅 Day 3 (Thursday): Bonus Assignment (Escape the Evil AI)
Goal: Build Repository 2. This one is harder because it requires state management (remembering if the player picked up a key).

1. Setup (15 mins):

Create Repository 2 on GitHub (e.g., escape-ai-game).

Create index.html and script.js.

2. Storyboarding (Do this together - 30 mins):

Before coding, draw a map on paper (or Notion).

Example: Room 1 (Start) -> User chooses Left or Right.

Example: Room 2 (Left) -> Finds a "Red Key". Set let hasRedKey = true;.

Example: Room 3 (Right) -> Locked door. If hasRedKey === true, they escape. If false, they get caught (Ending 2).

3. Divide the Work:

Tony (The Storyteller): Writes the text for the alert() and prompt() messages. Make it fun and descriptive. Write the instructions on how to open the console.

Karim (The State Manager): Writes the variables at the top of the file to track progress (e.g., let currentRoom = 1; let hasKey = false; let playerName = "";).

Lefa (You - The Architect): Write the main game() loop and the functions for each room (e.g., function room1() { ... }). Use prompt() to ask for choices and use if/else statements to move them to the next function.

📅 Day 4 (Friday): Final Polish & Presentation Prep
Goal: Ensure everything works, handle edge cases, and prepare to present.

1. The "Cancel" Test (Crucial):

In the bonus game, what happens if they press Cancel in Room 2? The game must end safely without crashing. Ensure you have if (input === null) { alert("Game Over"); return; } everywhere.

2. The "Replay" Test:

When the game ends (Win or Lose), use confirm("Do you want to play again?").

If they click OK, the game must reset all variables. If they had a key, it must be removed. They must start back at Room 1.

3. Presentation Prep:

The lecturer said he will try to break your apps.

Decide who presents Repository 1 and who presents Repository 2.

Practice your presentation: Show how you handled invalid inputs (e.g., "Watch what happens when I type 'banana' here...") and Cancel buttons.

⚠️ Team Rule for Git (To avoid losing code):
Since you are working in the same file (script.js), you must communicate.

Don't everyone code the same function at the same time.

One person writes the playRound function, pushes it, and then the next person pulls it and writes the game loop. If you all try to push at the exact same time, you will get "Merge Conflicts," and you will waste hours fixing them.
