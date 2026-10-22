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

globalThis.alert = (message) => {
    lastAlert = message;
    alerts.push(message);
};
// No queued answer means the stub pressed Cancel, which is exactly the case we want to test.
globalThis.prompt = () => (answers.length ? answers.shift() : null);
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
    playerName = "Lefa";
    currentRoom = 2;
    hasKey = true;
    resetGame();
    assertEquals(playerName, "", "resetGame clears the player name");
    assertEquals(currentRoom, 1, "resetGame sends the player back to Room 1");
    assertEquals(hasKey, false, "resetGame removes the Red Key");

    // --- TESTS FOR askPlayer / choose (Input Handling) ---
    queue("  LEFT  ");
    assertEquals(askPlayer("test"), "left", "askPlayer trims and lowercases");
    queue();
    assertEquals(askPlayer("test"), null, "askPlayer returns null on Cancel");
    queue("banana", "left");
    assertEquals(choose("test", ["left", "right"]), "left", "choose rejects invalid input and asks again");

    // --- TESTS FOR THE ROOMS (Lefa's Logic) ---
    // Clear the leftover state by hand: a stubbed resetGame() must not be able to fake a pass.
    playerName = "";
    currentRoom = 1;
    hasKey = false;
    queue("left", "back");
    silence(() => room1());
    assertEquals(hasKey, true, "Room 1 -> Left picks up the Red Key");
    assertEquals(lastAlert.includes("ESCAPED"), true, "Left -> Key -> Door escapes (Ending 1)");

    resetGame();
    queue("right");
    silence(() => room1());
    assertEquals(lastAlert.includes("CAUGHT"), true, "Right -> locked door is caught (Ending 2)");

    resetGame();
    alerts.length = 0;
    queue("banana", "right");
    silence(() => room1());
    assertEquals(lastAlert.includes("CAUGHT"), true, "Invalid input does not skip the locked door");
    assertEquals(alerts.filter((message) => message.includes("Invalid input")).length >= 1, true, "Invalid input is reported to the player");

    // --- TESTS FOR CANCEL (Grader's Favourite) ---
    resetGame();
    queue();
    let threw = false;
    try {
        silence(() => room1());
    } catch (error) {
        threw = true;
    }
    assertEquals(threw, false, "Cancel in Room 1 does not crash");
    assertEquals(lastAlert.startsWith("GAME OVER"), true, "Cancel in Room 1 ends the game safely");

    console.log(`\n📊 TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
    return failed === 0;
}

runTests();
