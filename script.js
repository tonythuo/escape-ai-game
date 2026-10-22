// ==========================================
// 1. TEAM INSTRUCTIONS (UX - Tony)
// ==========================================
alert("Welcome to Escape the Evil AI!\n\nIMPORTANT: Press F12 (or Right-Click -> Inspect -> Console) to see the story log.\n\nYou are trapped in the machine. Read each pop-up, make your choice, and find a way out. Press 'Cancel' at any time to give up.");
console.clear();

// ==========================================
// 2. GAME STATE (Karim)
// ==========================================
// TODO(Karim): give these their starting values (player name, room 1, no Red Key).
let playerName;
let currentRoom;
let hasKey;

// TODO(Karim): reset the state above so a replay never starts with the previous round's key.
function resetGame() {
}

// ==========================================
// 3. INPUT HELPERS
// ==========================================
// Returns the answer trimmed and lowercased, or null if the player pressed Cancel.
function askPlayer(message) {
    const input = prompt(message);
    if (input === null) return null;
    return input.trim().toLowerCase();
}

// Keeps asking until the player picks one of the options. Returns null on Cancel.
function choose(message, options) {
    while (true) {
        const choice = askPlayer(message + "\n\nType " + options.join(" or ") + ":");
        if (choice === null) return null;
        if (options.includes(choice)) return choice;
        alert("Invalid input! Please type " + options.join(" or ") + ".");
    }
}

// ==========================================
// 4. ROOMS (Lefa)
// ==========================================
// Map: Room 1 (Start) --LEFT--> Room 2 (Red Key) --BACK--> Room 3 (locked door)
//      Room 1 --RIGHT--> Room 3
//      Room 3: hasKey -> ESCAPED, otherwise CAUGHT
// Every room: Cancel returns null from choose(), so show "GAME OVER" and return.

// TODO(Lefa): announce the ending, then log it.
function endGame(message) {
}

// TODO(Lefa): Room 1 - wake up in a cold server room, choose LEFT or RIGHT.
function room1() {
}

// TODO(Lefa): Room 2 - find the Red Key, then head back to the door.
function room2() {
}

// TODO(Lefa): Room 3 - locked door: escaped with the key, caught without it.
function room3() {
}

// ==========================================
// 5. GAME LOOP (Lefa)
// ==========================================
// TODO(Lefa): reset the game, ask the prisoner's name (Cancel quits), call room1(),
// then ask confirm("Do you want to play again?") and loop while they say yes.
function game() {
}

// ==========================================
// 6. START THE GAME
// ==========================================
game();
