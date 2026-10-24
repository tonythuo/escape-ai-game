// ==========================================
// 1. STORY TEXT (Tony)
// ==========================================
// All wording lives here so the story can be rewritten without touching the game logic.
// Keep the words ESCAPED / CAUGHT, and start every Cancel message with GAME OVER (tests check them).
const STORY = {
  welcome: { text: "Welcome to Escape the Evil AI!\n\nYou are trapped in the machine. Read each pop-up, make your choice, and find a way out.\n\nPress OK to start, or Cancel to quit." },

  rooms: {
    1: {
      first: { text: "SYSTEM REBOOT COMPLETE.\n\nYou wake on a cold metal floor. Red lights blink in the dark.\n\nOn your left, a door glows faintly. On your right, a corridor disappears into shadow.\n\nType LEFT or RIGHT:", options: ["left", "right"] },
      noKey: { text: "THE SERVER ROOM, AGAIN.\n\nSame cold floor, same red lights. You have already turned this room inside out, and there was nothing in it.\n\nThe glowing door is on your left. The dark corridor is on your right.\n\nType LEFT or RIGHT:", options: ["left", "right"] },
      withKey: { text: "THE SERVER ROOM, AGAIN.\n\nThe Red Key in your pocket is the only warm thing in here. The glowing door on the left has already given you everything it had, but the corridor on the right still leads to the exit.\n\nType LEFT or RIGHT:", options: ["left", "right"] },
      cancel: { text: "GAME OVER\n\nYou sat down and waited. The AI rebooted you. Forever." }
    },
    2: {
      first: { text: "MAINTENANCE CLOSET.\n\nA Red Key hangs on a hook, still warm from the last prisoner.\n\nThe corridor is behind you, and the key is right there.\n\nType TAKE or LEAVE:", options: ["take", "leave"] },
      noKey: { text: "THE MAINTENANCE CLOSET, AGAIN.\n\nThe Red Key is still on its hook. It has not moved. Neither have you.\n\nDust, old cables, and a decision you keep avoiding.\n\nType TAKE or LEAVE:", options: ["take", "leave"] },
      withKey: { text: "THE MAINTENANCE CLOSET, AGAIN.\n\nThe hook is empty now. The Red Key is in your pocket and the closet has nothing else to offer.\n\nType BACK:", options: ["back"] },
      cancel: { text: "GAME OVER\n\nYou hid in the closet. Something locked it from the outside." },
    },
    3: {
      first: { text: "THE EXIT.\n\nA steel door marks the end of the corridor. Beside the handle sits a slot the exact size and shape of a key.\n\nThe lights flicker.\n\nType OPEN or BACK:", options: ["open", "back"] },
      noKey: { text: "THE EXIT, AGAIN.\n\nThe door has not moved. The slot is still empty, and so are your pockets.\n\nSomewhere behind the walls, the AI is smiling.\n\nType OPEN or BACK:", options: ["open", "back"] },
      withKey: { text: "THE EXIT, AGAIN.\n\nThe slot beside the handle glows faintly at you now. The Red Key is warm in your pocket.\n\nThis is the closest anyone has come.\n\nType OPEN or BACK:", options: ["open", "back"] },
      cancel: { text: "GAME OVER\n\nYou turned your back on the only door in the building. The lights went out before you took the second step." },
    },
  },

  ending: {
    escaped: { text: "ENDING 1 - YOU ESCAPED!\n\nThe Red Key turns. The door swings open and real daylight hits your face.\n\nBehind you, the AI screams in static." },
    caught: { text: "ENDING 2 - CAUGHT!\n\nYou reach the door with nothing but empty pockets.\n\nSteel shutters slam down. The AI laughs, and the lights go out." }
  },

  replay: { text: "Do you want to play again?" },

  // Shown before the page closes, on a cancelled welcome and after the last run.
  bye: { text: "Thanks for playing Escape the Evil AI!" }
};

// ==========================================
// 2. TEAM INSTRUCTIONS (UX - Tony)
// ==========================================
// Welcome is the start gate inside game(), so nothing is shown before it.

// ==========================================
// 3. GAME STATE (Karim)
// ==========================================
// Room graph: index = room number, so index 0 is unused.
const ROOMS = [
  null,
  { visited: false, next: room3, prev: room2 },
  { visited: false, next: room1 },
  { visited: false, prev: room1 },   // open is handled in room3()
];

const gameState = {
  hasKey: false,
};

// Runs before every round, so a replay never starts with the previous round's key or history.
function resetGame() {
  gameState.hasKey = false;
  ROOMS.forEach((room) => {
    if (room) room.visited = false;
  });
}

// ==========================================
// 4. HELPER FUNCTIONS (Karim)
// ==========================================
// Returns the answer trimmed and lowercased, or null if the player pressed Cancel.
function askPlayer(message) {
  const input = prompt(message);
  if (input === null) return null;
  return input.trim().toLowerCase();
}

// Keeps asking until the player picks one of promptData.options. Returns null on Cancel.
// The invalid-input note goes into the next prompt rather than its own alert, so the
// player never gets two dialogs in a row.
function choose(promptData) {
  let note = "";
  while (true) {
    const choice = askPlayer(note + promptData.text);
    if (choice === null) return null;
    if (promptData.options.includes(choice)) return choice;
    note = "INVALID INPUT - that was not one of the options.\n\n";
  }
}

function promptFor(roomNumber) {
  const room = ROOMS[roomNumber];
  const roomData = STORY.rooms[roomNumber];
  if (!room.visited) {
    room.visited = true;
    return roomData.first;
  }
  return gameState.hasKey ? roomData.withKey : roomData.noKey;
}

function playRun() {
  let step = room1
  while (step) {
    step = step()
  }
}

// ==========================================
// 5. ROOMS (Lefa)
// ==========================================
// Map: Room 1 (Start) --LEFT--> Room 2 (Red Key) --BACK--> Room 3 (locked door)
//      Room 1 --RIGHT--> Room 3
//      Room 3: hasKey -> ESCAPED, otherwise CAUGHT

// announce the ending, then log it.
function endGame(message) {
  alert(message.text);
}

// Room 1 - wake up in a cold server room, choose LEFT or RIGHT.
function room1() {
  // Use Tony's choose() helper. We pass the question and the valid options.
  let room = 1;
  let choice = choose(promptFor(room));

  if (choice === null) {
    endGame(STORY.rooms[room].cancel);
    return;
  }

  if (choice === "left") {
    return ROOMS[room].prev
  } else if (choice === "right") {
    return ROOMS[room].next
  }
}

// Room 2 - find the Red Key, then head back to the door.
function room2() {
  let room = 2;
  let choice = choose(promptFor(room));

  if (choice === null) {
    endGame(STORY.rooms[room].cancel);
    return;
  }

  if (choice === "take") {
    gameState.hasKey = true;
    // Automatically send them back after taking the key
  }
  return ROOMS[room].next
}

// Room 3 - locked door: escaped with the key, caught without it.
function room3() {
  let room = 3;
  let choice = choose(promptFor(room));
  if (choice === null) {
    endGame(STORY.rooms[room].cancel);
    return;
  } else if (choice === "open") {
    endGame(gameState.hasKey ? STORY.ending.escaped : STORY.ending.caught);
  } else if (choice === "back") {
    return ROOMS[room].prev
  }
}

// ==========================================
// 6. GAME LOOP (Tony)
// ==========================================
// Start gate, then one run per round until the player declines a replay.
// window.close() only works on script-opened windows; in a normal tab it is a
// no-op, so the bye alert always tells the player to refresh to play again.
function closePage() {
  window.close();
}

function game() {
  if (!confirm(STORY.welcome.text)) {
    alert(STORY.bye.text);
    closePage();
    return;
  }
  let again = true;
  while (again) {
    resetGame();
    playRun();
    again = confirm(STORY.replay.text);
  }
  alert(STORY.bye.text);
  closePage();
}

// ==========================================
// 7. START THE GAME
// ==========================================
game();
