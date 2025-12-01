# CTB Battle System Vertical Slice

A vertical slice implementation of a Conditional Turn-Based (CTB) battle system, inspired by Final Fantasy X. This project demonstrates a deterministic combat engine where turn frequency is based on character Agility and action costs, visualized with a predictive timeline.

## Project Structure

```
├── index.html          # Main entry point
├── style.css           # Styling
├── spec/
│   └── battle-system.md # Technical specification
├── src/
│   ├── main.js         # Entry point
│   ├── Game.js         # Game loop and Input/Rendering orchestration
│   ├── assets.js       # SVG icon paths
│   └── battle/
│       ├── BattleSystem.js    # Core CTB engine, turn queue, and prediction
│       ├── BattleUnit.js      # Character stats, status effects, and rendering
│       └── BattleConstants.js # Configuration tables (Agility curves, Action Ranks)
└── README.md
```

## Features

### Battle Mechanics (CTB)
- **Tick-Based Time**: Unlike standard round-based systems, time is handled in discrete "ticks".
- **Agility Step-Function**: Implements a tiered agility system where specific thresholds grant better "Tick Speed" (lower is better).
- **Action Ranks**: Actions have different time costs. A "Quick Hit" (Rank 1) recovers much faster than a standard "Attack" (Rank 3).
- **Predictive Timeline**: A "Ghost Simulation" runs in the background to calculate and display the turn order for the next 10 turns, allowing for deep strategic planning.
- **Turn Lapping**: Fast characters can act multiple times before a slow enemy acts once.

### Visuals & UI
- **SVG Entities**: Lightweight SVG paths are used to render distinct icons for each character class (Fighter, Mage, Healer) and enemies.
- **Interactive Menu**: Context-sensitive command menu for player turns.
- **Targeting System**: Mouse-based selection for actions and targets.

## Characters

**Players:**
- **Fighter (Sword)**: Balanced stats. Good attack, decent speed.
- **Mage (Staff)**: Low speed, but visually distinct.
- **Healer (Heart)**: High Agility (Fast). Can often act twice before enemies.

**Enemies:**
- **Goblin (Monster)**: Fast but weak.
- **Big Boss (Skull)**: Very slow, high HP and damage.

## Controls

- **Mouse**: Click menu buttons to select actions, then click a target unit to execute.
- **Timeline**: Observe the top bar to see the predicted turn order.
- **Restart**: Click anywhere on the "Victory" or "Game Over" screen to restart.

## How to Run

Since this project uses ES6 Modules (`type="module"` in `index.html`), you cannot run it by simply opening the HTML file directly in the browser due to CORS security restrictions on local files.

You must serve the files using a local web server.

### Options:

1.  **VS Code / Cursor (Recommended)**:
    -   Install the "Live Server" extension.
    -   Right-click `index.html` and select "Open with Live Server".

2.  **Python 3**:
    -   Run the following command in the project root:
        ```bash
        python3 -m http.server
        ```
    -   Open `http://localhost:8000` in your browser.

3.  **Node.js (http-server)**:
    -   If you have `npx` installed:
        ```bash
        npx http-server .
        ```
