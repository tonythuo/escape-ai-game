# escape-ai-game
JavaScript Only - Escape the Evil AI

A browser-based JavaScript game built as part of the Practicum assignment (bonus). No DOM, no
build tools: the whole game runs through `alert()` / `prompt()` / `confirm()` and the console.

> **Status:** not playable yet. `askPlayer()` and `choose()` work, but the game state, the rooms and
> the loop are `TODO` stubs owned by Karim and Lefa — see the section banners in `script.js`.
> The story text is Tony's task.

## 🚀 How to Play
1. Open the `index.html` file in your browser.
2. **Important:** Press `F12` (or Right-Click -> Inspect -> Console) to open the Developer Console. The console narrates what is happening.
3. Follow the pop-up prompts. Press "Cancel" at any time to give up safely.

## 🗺️ The Map
```
Room 1 (Start)
├── LEFT  -> Room 2: pick up the Red Key -> back to the door -> ESCAPE
└── RIGHT -> Room 3: locked door, no key -> CAUGHT
```

## 🛡️ Special Cases & Edge Cases Handled
*   **The "Cancel" Button:** `prompt()` returns `null` on Cancel. Every room checks for it and ends the game safely instead of crashing.
*   **Invalid Inputs (e.g., "Banana"):** `choose()` re-asks the question and alerts the player. No progress is made and no room is skipped.
*   **Unnecessary Spaces & Capitalization:** `.trim()` and `.toLowerCase()` mean `"  LEFT  "` works exactly like `"left"`.
*   **Replay:** After every ending, `confirm()` asks to play again and `resetGame()` clears the player name, the current room and the Red Key, so nobody escapes with last round's key.

## 🧪 Unit Testing (Logic Verification)
`tests.js` loads `script.js` with `alert`/`prompt`/`confirm` stubbed, so it needs no browser and
`script.js` stays free of test code.

```bash
node tests.js
```

Right now 4 pass and 9 fail on purpose: the failures are exactly the stubs waiting on Karim and Lefa.

**Tests Included:**
*   `resetGame()` clears the key and returns to Room 1
*   Input trimming, lowercasing, and Cancel returning `null`
*   `choose()` rejecting `"banana"` and asking again
*   Left -> Key -> Door escape ending
*   Right -> locked door caught ending
*   Invalid input does not skip the key room
*   Cancel in Room 1 ends the game without throwing
