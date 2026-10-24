# escape-ai-game
JavaScript Only - Escape the Evil AI

A browser-based JavaScript game built as part of the Practicum assignment (bonus). No DOM, no
build tools: the whole game runs through `alert()` / `prompt()` / `confirm()`.

> **Status:** playable. State, input helpers, rooms and the loop are implemented and covered by
> `node tests.js`.

## 🚀 How to Play
1. Open the `index.html` file in your browser.
2. Follow the pop-up prompts. Press "Cancel" at any time to give up safely.
3. At the end, the game shows a goodbye alert and closes — refresh the page (F5) to play again.

## 🗺️ The Map
```
Room 1 (Start)
├── LEFT  -> Room 2: pick up the Red Key -> back to the door -> ESCAPE
└── RIGHT -> Room 3: locked door, no key -> CAUGHT
```

## 🛡️ Special Cases & Edge Cases Handled
*   **The "Cancel" Button:** `prompt()` returns `null` on Cancel. Every room checks for it and ends the run with its GAME OVER alert instead of crashing. Cancelling the welcome, or declining the replay, shows the goodbye alert and closes the page.
*   **Invalid Inputs (e.g., "Banana"):** `choose()` re-asks the question and alerts the player. No progress is made and no room is skipped.
*   **Unnecessary Spaces & Capitalization:** `.trim()` and `.toLowerCase()` mean `"  LEFT  "` works exactly like `"left"`.
*   **Replay:** After every ending, `confirm()` asks to play again and `resetGame()` clears the player name, the current room and the Red Key, so nobody escapes with last round's key.

## 🧪 Unit Testing (Logic Verification)
`tests.js` loads `script.js` with `alert`/`prompt`/`confirm` stubbed, so it needs no browser and
`script.js` stays free of test code.

```bash
node tests.js
```

All 19 pass. Run it after any change to the rooms or the loop.

**Tests Included:**
*   `resetGame()` clears the key and returns to Room 1
*   Input trimming, lowercasing, and Cancel returning `null`
*   `choose()` rejecting `"banana"` and asking again
*   Left -> Key -> Door escape ending
*   Right -> locked door caught ending
*   Invalid input does not skip the key room
*   Cancel in Room 1 ends the game without throwing
*   Cancelling the welcome shows the goodbye alert and closes the page
*   Declining the replay shows the goodbye alert and closes the page
