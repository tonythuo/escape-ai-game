// ==========================================
// 1. STORY TEXT (Tony)
// ==========================================
// All wording lives here so the story can be rewritten without touching the game logic.
// Keep the words ESCAPED / CAUGHT, and start every Cancel message with GAME OVER (tests check them).
const STORY = {
  welcome: { text: "Welcome to Escape the Evil AI!\n\nIMPORTANT: Press F12 (or Right-Click -> Inspect -> Console) to see the story log.\n\nYou are trapped in the machine. Read each pop-up, make your choice, and find a way out.\n\nPress OK to start, or Cancel to quit." },

  rooms: {
    1: {
      first: { text: "SYSTEM REBOOT COMPLETE.\n\nYou wake on a cold metal floor. Red lights blink in the dark.\n\nOn your left, a door glows faintly. On your right, a corridor disappears into shadow.\n\nType LEFT or RIGHT:", options: ["left", "right"] },
      noKey: { text: "THE SERVER ROOM, AGAIN.\n\nSame cold floor, same red lights. You have already turned this room inside out, and there was nothing in it.\n\nThe glowing door is on your left. The dark corridor is on your right.\n\nType LEFT or RIGHT:", options: ["left", "right"] },
      withKey: { text: "THE SERVER ROOM, AGAIN.\n\nThe Red Key in your pocket is the only warm thing in here. The glowing door has already given you everything it had. The corridor on the right is all that is left.\n\nType RIGHT:", options: ["right"] },
      cancel: { text: "GAME OVER\n\nYou sat down and waited. The AI rebooted you. Forever." }
    },
    2: {
      first: { text: "MAINTENANCE CLOSET.\n\nA Red Key hangs on a hook, still warm from the last prisoner.\n\nThe corridor is behind you, and the key is right there.\n\nType TAKE or LEAVE:", options: ["take", "leave"] },
      noKey: { text: "THE MAINTENANCE CLOSET, AGAIN.\n\nThe Red Key is still on its hook. It has not moved. Neither have you.\n\nDust, old cables, and a decision you keep avoiding.\n\nType TAKE or LEAVE:", options: ["take", "leave"] },
      key: { text: "THE MAINTENANCE CLOSET, AGAIN.\n\nThe hook is empty now. The Red Key is in your pocket and the closet has nothing else to offer.\n\nType BACK:", options: ["back"] },
      cancel: { text: "GAME OVER\n\nYou hid in the closet. Something locked it from the outside." },
    },
    3: {
      first: { text: "THE EXIT.\n\nA steel door marks the end of the corridor. Beside the handle sits a slot the exact size and shape of a key.\n\nThe lights flicker.\n\nType OPEN or BACK:", options: ["open", "back"] },
      noKey: { text: "THE EXIT, AGAIN.\n\nThe door has not moved. The slot is still empty, and so are your pockets.\n\nSomewhere behind the walls, the AI is smiling.\n\nType OPEN or BACK:", options: ["open", "back"] },
      key: { text: "THE EXIT, AGAIN.\n\nThe slot beside the handle glows faintly at you now. The Red Key is warm in your pocket.\n\nThis is the closest anyone has come.\n\nType OPEN or BACK:", options: ["open", "back"] },
      cancel: { text: "GAME OVER\n\nYou turned your back on the only door in the building. The lights went out before you took the second step." },
    },
  },

  ending: {
    escaped: { text: "ENDING 1 - YOU ESCAPED!\n\nThe Red Key turns. The door swings open and real daylight hits your face.\n\nBehind you, the AI screams in static." },
    caught: { text: "ENDING 2 - CAUGHT!\n\nYou reach the door with nothing but empty pockets.\n\nSteel shutters slam down. The AI laughs, and the lights go out." }
  },

  replay: { text: "Do you want to play again?" }
};

// ==========================================
// 2. TEAM INSTRUCTIONS (UX - Tony)
// ==========================================
alert(STORY.welcome.text);
console.clear();

// ==========================================
// 3. GAME STATE (Karim)
// ==========================================
// TODO(Karim): give these their starting values (player name, room 1, no Red Key).

// TODO(Karim): reset the state above so a replay never starts with the previous round's key.
function resetGame() {
}

// ==========================================
// 4. INPUT HELPERS
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
// 6. GAME LOOP (Lefa)
// ==========================================
// reset the game, ask the prisoner's name (Cancel quits), call room1(),
// then ask confirm("Do you want to play again?") and loop while they say yes.
function game() {
}

// ==========================================
// 7. START THE GAME
// ==========================================
game();
