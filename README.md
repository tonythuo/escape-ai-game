# escape-ai-game
JavaScript Only - Escape the Evil AI

A browser-based JavaScript game built as part of the Practicum assignment (bonus). No DOM, no
build tools: the whole game runs through `alert()` / `prompt()` / `confirm()` and the console.

> **Status:** playable. State, input helpers, rooms and the loop are implemented and covered by
> `node tests.js`.

## 🚀 How to Play
1. Open the `index.html` file in your browser.
2. Follow the pop-up prompts. Press "Cancel" to quit — the game asks you to confirm before ending.
3. When the run ends, a farewell dialog points you to the console: press `F12` (or `Cmd+Option+J` on Mac) and scroll up to relive the whole story.

## 🗺️ The Map
```
Room 1 (Start)
├── LEFT  -> Room 2: pick up the Red Key -> back to the door -> ESCAPE
└── RIGHT -> Room 3: locked door, no key -> CAUGHT
```

## 🛡️ Special Cases & Edge Cases Handled
*   **The "Cancel" Button:** `prompt()` returns `null` on Cancel. Every room funnels it through a confirm — OK ends the run safely with the room's GAME OVER text, Cancel returns to the same room. After the last dialog, a farewell alert explains the console and how to replay.
*   **Invalid Inputs (e.g., "Banana"):** `choose()` re-asks the question and alerts the player. No progress is made and no room is skipped.
*   **Unnecessary Spaces & Capitalization:** `.trim()` and `.toLowerCase()` mean `"  LEFT  "` works exactly like `"left"`.
*   **Replay:** After every ending, `confirm()` asks to play again and `resetGame()` clears the Red Key and all visited rooms, so nobody escapes with last round's key.

## 🧪 Unit Testing (Logic Verification)
`tests.js` loads `script.js` with `alert`/`prompt`/`confirm` stubbed, so it needs no browser and
`script.js` stays free of test code.

```bash
node tests.js
```

All 18 pass. Run it after any change to the rooms or the loop.

**Tests Included:**
*   `resetGame()` clears the key and returns to Room 1
*   Input trimming, lowercasing, and Cancel returning `null`
*   `choose()` rejecting `"banana"` and asking again
*   Left -> Key -> Door escape ending
*   Right -> locked door caught ending
*   Invalid input does not skip the key room
*   Cancel in Room 1 ends the game without throwing
*   Declined quit returns to the same room and does not end the run
*   Farewell alert with console instructions is the last dialog
