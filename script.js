// ==========================================
// 1. TEAM INSTRUCTIONS (UX - Tony)
// ==========================================
alert("Welcome to Escape the Evil AI!\n\nIMPORTANT: Press F12 (or Right-Click -> Inspect -> Console) to see the story log.\n\nYou are trapped in the machine. Read each pop-up, make your choice, and find a way out. Press 'Cancel' at any time to give up.");
console.clear();

// ==========================================
// 2. GAME STATE (Karim)
// ==========================================
let playerName = "";
let currentRoom = 1;
let hasKey = false;

function resetGame() {
    playerName = "";
    currentRoom = 1;
    hasKey = false;
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
function endGame(message) {
    alert(message);
    console.log(message);
}

function room1() {
    currentRoom = 1;
    const choice = choose("TODO(story): Room 1 - you wake up in a cold server room. Two doors, one glowing red on the left, one dark on the right.", ["left", "right"]);
    if (choice === null) return endGame("GAME OVER\n\nYou froze in the corridor until the AI rebooted. It is not impressed.");
    if (choice === "left") return room2();
    return room3();
}

function room2() {
    currentRoom = 2;
    alert("TODO(story): Room 2 - a small maintenance closet. A red key hangs on the wall.");
    hasKey = true;
    console.log("Picked up the Red Key.");
    const choice = choose("TODO(story): You grab the Red Key. The only way out is back to the corridor.", ["back"]);
    if (choice === null) return endGame("GAME OVER\n\nYou hid in the closet. The AI locked it from the outside.");
    return room3();
}

function room3() {
    currentRoom = 3;
    if (hasKey) {
        return endGame("ENDING 1 - YOU ESCAPED!\n\nTODO(story): The Red Key turns. The door opens and daylight hits your face.");
    }
    return endGame("ENDING 2 - CAUGHT!\n\nTODO(story): The door is locked. Steel shutters drop and the AI laughs.");
}

// ==========================================
// 5. GAME LOOP
// ==========================================
function game() {
    let again = true;

    while (again) {
        resetGame();

        const name = prompt("What is your name, prisoner?");
        if (name === null) {
            alert("Goodbye!");
            return;
        }
        playerName = name.trim() || "Prisoner";
        console.log(`Welcome, ${playerName}. Good luck.`);

        room1();

        again = confirm("Do you want to play again?");
        resetGame();
    }
}

// ==========================================
// 6. START THE GAME
// ==========================================
game();
