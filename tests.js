// tests.js
// Run with: node tests.js
// In the browser: finish (or cancel) the game, then paste runTests() into the console.
//
// Why the vm call: script.js is a plain browser script with no exports, so we load it
// into the global scope with alert/prompt/confirm stubbed. The file itself stays untouched.

const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

let answers = [];
const alerts = [];
let lastAlert = "";

const promptMessages = [];

globalThis.alert = (message) => {
    lastAlert = message;
    alerts.push(message);
};
// No queued answer means the stub pressed Cancel, which is exactly the case we want to test.
globalThis.prompt = (message) => {
    promptMessages.push(message);
    return answers.length ? answers.shift() : null;
};
globalThis.confirm = () => false;

const realClear = console.clear;
console.clear = () => {};
vm.runInThisContext(fs.readFileSync(path.join(__dirname, "script.js"), "utf8"), { filename: "script.js" });
console.clear = realClear;

function queue(...values) {
    answers = values.slice();
}

// Games log to the console; tests keep their output readable.
function silence(fn) {
    const realLog = console.log;
    console.log = () => {};
    try {
        return fn();
    } finally {
        console.log = realLog;
    }
}

function runTests() {
    console.log("🧪 STARTING UNIT TESTS 🧪");
    let passed = 0;
    let failed = 0;

    function assertEquals(actual, expected, testName) {
        if (actual === expected) {
            console.log(`✅ PASS: ${testName}`);
            passed++;
        } else {
            console.error(`❌ FAIL: ${testName}. Expected "${expected}", got "${actual}"`);
            failed++;
        }
    }

    // --- TESTS FOR resetGame (Karim's State) ---
    gameState.hasKey = true;
    ROOMS[2].visited = true;
    resetGame();
    assertEquals(gameState.hasKey, false, "resetGame removes the Red Key");
    assertEquals(ROOMS[2].visited, false, "resetGame forgets visited rooms");

    // --- TESTS FOR askPlayer / choose (Input Handling) ---
    // askPlayer logs the prompt and the answer to the console; silence keeps test output clean.
    queue("  LEFT  ");
    assertEquals(silence(() => askPlayer("test")), "left", "askPlayer trims and lowercases");
    queue();
    assertEquals(silence(() => askPlayer("test")), null, "askPlayer returns null on Cancel");
    queue("banana", "left");
    assertEquals(silence(() => choose({ text: "test", options: ["left", "right"] })), "left", "choose rejects invalid input and asks again");

    // --- TESTS FOR THE ROOMS (Lefa's Logic) ---
    // Rooms return their successor, so playRun() drives them exactly like game() does.
    const play = () => silence(() => playRun());
    const promptsInclude = (text) => promptMessages.some((message) => message.includes(text));

    resetGame();
    queue("left", "take");
    play();
    assertEquals(gameState.hasKey, true, "Room 1 -> Left -> TAKE picks up the Red Key");

    resetGame();
    queue("left", "take", "right", "open");
    play();
    assertEquals(lastAlert.includes("ESCAPED"), true, "Left -> Key -> Door escapes (Ending 1)");

    resetGame();
    queue("left", "take", "left", "back", "right", "open");
    play();
    assertEquals(promptsInclude("THE MAINTENANCE CLOSET, AGAIN"), true, "Room 1 with the key still allows LEFT back into Room 2");
    assertEquals(lastAlert.includes("ESCAPED"), true, "Key -> closet -> back -> door still escapes");

    resetGame();
    queue("right", "open");
    play();
    assertEquals(lastAlert.includes("CAUGHT"), true, "Right -> locked door is caught (Ending 2)");

    resetGame();
    promptMessages.length = 0;
    queue("banana", "right", "open");
    play();
    assertEquals(lastAlert.includes("CAUGHT"), true, "Invalid input does not skip the locked door");
    assertEquals(promptMessages.some((message) => message.includes("INVALID INPUT")), true, "Invalid input is reported in the next prompt");

    // --- TESTS FOR CANCEL (Grader's Favourite) ---
    resetGame();
    queue();
    let threw = false;
    try {
        play();
    } catch (error) {
        threw = true;
    }
    assertEquals(threw, false, "Cancel in Room 1 does not crash");
    assertEquals(lastAlert.startsWith("GAME OVER"), true, "Cancel in Room 1 ends the game safely");

    console.log(`\n📊 TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
    return failed === 0;
}

runTests();
