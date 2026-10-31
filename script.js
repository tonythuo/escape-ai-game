// ==========================================
// 1. STORY TEXT (Tony)
// ==========================================
// All wording lives here so the story can be rewritten without touching the game logic.
// Tests match these strings: endings contain ESCAPED / CAUGHT, every room cancel text
// starts with GAME OVER, and STORY.bye starts with "Thanks for playing".
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

  bye: { text: "Thanks for playing Escape the Evil AI!" }
};

// ==========================================
// 2. GAME STATE (Karim)
// ==========================================
// ROOMS references the room functions before they are declared; that only works
// because function declarations hoist, so keep them as `function` declarations.
const ROOMS = [
  null,
  { visited: false, next: room3, prev: room2 },
  { visited: false, next: room1 },
  { visited: false, prev: room1 },
];

// Tracks what the player carries between rooms.
const gameState = {
  hasKey: false,
};

/** Clears all round state, so a replay never starts with the previous run's key or history. */
function resetGame() {
  gameState.hasKey = false;
  ROOMS.forEach((room) => {
    if (room) room.visited = false;
  });
}

// ==========================================
// 3. INPUT HELPERS (Karim)
// ==========================================
/**
 * Reads one line of player input, trimmed and lowercased.
 * @param {string} message - The prompt text to show.
 * @returns {string|null} The normalized answer, or null if the player pressed Cancel.
 */
function askPlayer(message) {
  const input = prompt(message);
  if (input === null) return null;
  return input.trim().toLowerCase();
}

/**
 * Keeps asking until the player picks one of the valid options.
 * The invalid-input note goes into the next prompt rather than its own alert,
 * so the player never gets two dialogs in a row.
 * @param {{text: string, options: string[]}} promptData - The question and its valid answers.
 * @returns {string|null} The chosen option, or null on Cancel.
 */
function choose(promptData) {
  let note = "";
  while (true) {
    const choice = askPlayer(note + promptData.text);
    if (choice === null) return null;
    if (promptData.options.includes(choice)) return choice;
    note = "INVALID INPUT - that was not one of the options.\n\n";
  }
}

/**
 * Picks the right prompt for a room: the first visit, or the repeat variant
 * depending on whether the player carries the Red Key. Marks the room visited.
 * @param {number} roomNumber - Room 1, 2 or 3.
 * @returns {{text: string, options: string[]}} The prompt to show.
 */
function promptFor(roomNumber) {
  const room = ROOMS[roomNumber];
  const roomData = STORY.rooms[roomNumber];
  if (!room.visited) {
    room.visited = true;
    return roomData.first;
  }
  return gameState.hasKey ? roomData.withKey : roomData.noKey;
}

// ==========================================
// 4. RUN LOOP & ROOMS (Lefa)
// ==========================================
/**
 * Drives one full run: each room returns the next room function, or undefined
 * when the run ends (an ending was shown or the player pressed Cancel).
 */
function playRun() {
  let step = room1;
  while (step) {
    step = step();
  }
}

/**
 * Shows one full-screen story message: an ending or a game over.
 * @param {{text: string}} message - One of the STORY message objects.
 */
function endGame(message) {
  alert(message.text);
}

/**
 * Shows a room's GAME OVER text after the player pressed Cancel there.
 * @param {number} room - The room number the player cancelled in.
 */
function quitRoom(room) {
  endGame(STORY.rooms[room].cancel);
}

/**
 * Room 1 - wake up in a cold server room. LEFT leads to Room 2 (the closet),
 * RIGHT to Room 3 (the exit).
 * @returns {Function|undefined} The next room function, or undefined to end the run.
 */
function room1() {
  const room = 1;
  const choice = choose(promptFor(room));
  if (choice === null) return quitRoom(room);
  return choice === "left" ? ROOMS[room].prev : ROOMS[room].next;
}

/**
 * Room 2 - the maintenance closet. TAKE picks up the Red Key and moves on.
 * @returns {Function|undefined} The next room function, or undefined to end the run.
 */
function room2() {
  const room = 2;
  const choice = choose(promptFor(room));
  if (choice === null) return quitRoom(room);
  if (choice === "take") gameState.hasKey = true;
  return ROOMS[room].next;
}

/**
 * Room 3 - the locked exit door. OPEN ends the run: escaped with the Red Key,
 * caught without it.
 * @returns {Function|undefined} The next room function, or undefined to end the run.
 */
function room3() {
  const room = 3;
  const choice = choose(promptFor(room));
  if (choice === null) return quitRoom(room);
  if (choice === "open") {
    return endGame(gameState.hasKey ? STORY.ending.escaped : STORY.ending.caught);
  }
  return ROOMS[room].prev;
}

// ==========================================
// 5. GAME LOOP (Tony)
// ==========================================
/**
 * Asks the browser to close the page. Browsers only honour window.close() for
 * windows opened by script, so in a normal tab this is a quiet no-op and the
 * bye alert is what the player actually sees.
 */
function closePage() {
  window.close();
}

/** Shows the welcome gate. @returns {boolean} True when the player pressed OK. */
function welcome() {
  return confirm(STORY.welcome.text);
}

/** Asks for a replay after an ending. @returns {boolean} True to run the game again. */
function askReplay() {
  return confirm(STORY.replay.text);
}

/** One full round: fresh state, then one run through the rooms. */
function playRound() {
  resetGame();
  playRun();
}

/** Says goodbye and closes the page. */
function exitGame() {
  alert(STORY.bye.text);
  closePage();
}

/** Runs the whole game: welcome gate, one run per replay, goodbye at the end. */
function game() {
  if (!welcome()) return exitGame();
  let again = true;
  while (again) {
    playRound();
    again = askReplay();
  }
  exitGame();
}

// ==========================================
// 6. START THE GAME
// ==========================================
game();
