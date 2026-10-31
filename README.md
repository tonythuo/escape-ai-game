# escape-ai-game
JavaScript Only - Escape the Evil AI

A browser-based JavaScript game built as part of the Practicum assignment (bonus). No DOM, no
build tools: the whole game runs through `alert()` / `prompt()` / `confirm()`.

> **Status:** playable. State, input helpers, rooms and the loop are implemented. Development,
> tests and documentation live on the `dev` branch; `main` ships without them.

## 🚀 How to Play
1. Open the `index.html` file in your browser.
2. Follow the pop-up prompts. Press "Cancel" at any time to give up safely.
3. At the end, the game shows a goodbye alert and tries to close the page — refresh the page (F5) to play again. Browsers only honour `window.close()` for windows opened by script, so in a normal tab the page simply stays open.

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
