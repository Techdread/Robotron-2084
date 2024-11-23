# Robotron 2084 Remake 🎮

A modern, emoji-based remake of the classic arcade game Robotron 2084, built with HTML5, CSS, and JavaScript. This version features smooth gameplay, progressive difficulty, and a fun, modern twist using emojis as game characters.

## 🎯 Game Overview

Save humanity from the robot invasion! As the last human defender (😎), fight against waves of robotic enemies while trying to achieve the highest score possible.

### Features

- 🎮 Smooth 8-directional movement
- 🎯 Mouse-aimed shooting
- 📈 Progressive difficulty levels
- 🤖 Multiple enemy types
- 💾 High score system
- 🎨 Emoji-based graphics

## 🎮 How to Play

1. Use WASD or Arrow Keys to move your character (😎)
2. Your character automatically shoots (⚡) towards your mouse cursor
3. Destroy enemies to score points
4. Survive waves of enemies to progress through levels
5. Each level brings more enemies and faster spawns

### Enemy Types

- Grunt (👿): Basic enemy
- Hulk (🤖): Slow but tough
- Brain (👾): Fast and aggressive
- Spheroid (👻): Unpredictable movement
- Enforcer (💀): Dangerous and precise

## 🚀 Getting Started

### Prerequisites

- A modern web browser with ES6 module support
- No additional dependencies required

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Open `index.html` in your web browser

### Running Locally

Due to ES6 modules security requirements, you'll need to serve the game through a local web server. You can use any of these methods:

- Python 3: `python -m http.server`
- Node.js: `npx serve`
- VS Code: Use the "Live Server" extension

## 🎮 Game Mechanics

### Scoring System
- Each enemy destroyed: 100 points
- High scores are saved locally

### Level Progression
- Start at Level 1
- Defeat 10 enemies to reach Level 2
- Each subsequent level requires 50% more enemies
- Enemy spawn rate increases by 20% per level

### Player Abilities
- Movement Speed: 250 units/second
- Shooting Rate: 2 shots/second
- Bullet Speed: 400 units/second

## 🏗️ Project Structure

```
robotron/
├── index.html          # Main game page
├── styles.css          # Game styling
├── js/
│   ├── Game.js         # Main game logic
│   ├── Player.js       # Player mechanics
│   ├── Enemy.js        # Enemy types and behavior
│   ├── Bullet.js       # Projectile mechanics
│   └── CollisionManager.js  # Collision detection
└── README.md
```

## 🛠️ Technical Implementation

- Built with vanilla JavaScript using ES6 modules
- HTML5 Canvas for rendering
- Responsive design that works on various screen sizes
- Delta time implementation for consistent game speed
- Collision detection using distance calculations
- Time-based enemy spawning and shooting mechanics

## 🎨 Styling

- Retro-inspired design
- Neon color scheme
- Responsive layout
- Press Start 2P font for authentic arcade feel

## 🔄 Future Enhancements

- [ ] Power-up system
- [ ] Sound effects and background music
- [ ] Additional enemy types
- [ ] Multiplayer support
- [ ] Online leaderboard
- [ ] Mobile touch controls
- [ ] Special weapons and abilities

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Original Robotron 2084 by Eugene Jarvis and Larry DeMar
- Press Start 2P font by CodeMan38
- Emoji graphics provided by Unicode Standard
