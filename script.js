// ==========================================
// 1. STORY TEXT (Tony)
// ==========================================
// All wording lives here so the story can be rewritten without touching the game logic.
// Keep the words ESCAPED / CAUGHT, and start every Cancel message with GAME OVER (tests check them).
const STORY = {
  welcome: "Welcome to Escape the Evil AI!\n\nIMPORTANT: Press F12 (or Right-Click -> Inspect -> Console) to see the story log.\n\nYou are trapped in the machine. Read each pop-up, make your choice, and find a way out. Press 'Cancel' at any time to give up.",
  namePrompt: "The machine hums. A voice asks: what is your name, prisoner?",
  room1: "SYSTEM REBOOT COMPLETE.\n\nYou wake on a cold metal floor. Red lights blink in the dark.\n\nOn your left, a door glows faintly. On your right, a corridor disappears into shadow.",
  room1Cancel: "GAME OVER\n\nYou sat down and waited. The AI rebooted you. Forever.",
  room2: "MAINTENANCE CLOSET.\n\nA Red Key hangs on a hook, still warm from the last prisoner.\n\nYou take it. The only way out is back to the corridor.",
  room2Cancel: "GAME OVER\n\nYou hid in the closet. Something locked it from the outside.",
  endingEscaped: "ENDING 1 - YOU ESCAPED!\n\nThe Red Key turns. The door swings open and real daylight hits your face.\n\nBehind you, the AI screams in static.",
  endingCaught: "ENDING 2 - CAUGHT!\n\nYou reach the door with nothing but empty pockets.\n\nSteel shutters slam down. The AI laughs, and the lights go out.",
  replay: "Do you want to play again?"
};

// ==========================================
// 2. TEAM INSTRUCTIONS (UX - Tony)
// ==========================================
alert(STORY.welcome);
console.clear();

// ==========================================
// 3. GAME STATE (Karim)
// ==========================================
// TODO(Karim): give these their starting values (player name, room 1, no Red Key).

// TODO(Karim): reset the state above so a replay never starts with the previous round's key.
function resetGame() {
}

// ==========================================
// 4. INPUT HELPERS (Karim)
// ==========================================
// Returns the answer trimmed and lowercased, or null if the player pressed Cancel.
function askPlayer(message) {
}

// Keeps asking until the player picks one of the options. Returns null on Cancel.
function choose(message, options) {
}

// ==========================================
// 5. ROOMS (Lefa)
// ==========================================
// Map: Room 1 (Start) --LEFT--> Room 2 (Red Key) --BACK--> Room 3 (locked door)
//      Room 1 --RIGHT--> Room 3
//      Room 3: hasKey -> ESCAPED, otherwise CAUGHT

// announce the ending, then log it.
function endGame(message) {
  alert(message);
  console.log(message);
  gameState.isGameOver = true; // Assuming Karim set this up
}

// Room 1 - wake up in a cold server room, choose LEFT or RIGHT.
function room1() {
  // Use Tony's choose() helper. We pass the question and the valid options.
  let choice = choose("ROOM 1: You wake up in a cold server room. Type 'LEFT' or 'RIGHT'.", ["left", "right"]);

  if (choice === null) {
    endGame("GAME OVER: You gave up.");
    return;
  }

  if (choice === "left") {
    room2();
  } else {
    room3();
  }
}

// Room 2 - find the Red Key, then head back to the door.
function room2() {
  let choice = choose("ROOM 2: You see a glowing Red Key on a table. Type 'TAKE' to take it, or 'BACK' to return.", ["take", "back"]);

  if (choice === null) {
    endGame("GAME OVER: You gave up.");
    return;
  }

  if (choice === "take") {
    gameState.hasRedKey = true; // Karim's state variable
    console.log("Inventory: Red Key acquired.");
    // Automatically send them back after taking the key
    room1();
  } else {
    room1();
  }
}

// Room 3 - locked door: escaped with the key, caught without it.
function room3() {
  if (gameState.hasRedKey) {
    endGame("SUCCESS! You used the Red Key to unlock the door and escaped the Evil AI!");
  } else {
    endGame("CAUGHT! The door is locked. Without a key, the Evil AI captures you. GAME OVER.");
  }
}

// ==========================================
// 6. GAME LOOP (Tony)
// ==========================================
// reset the game, ask the prisoner's name (Cancel quits), call room1(),
// then ask confirm("Do you want to play again?") and loop while they say yes.
function game() {
}

// ==========================================
// 7. START THE GAME
// ==========================================
game();
