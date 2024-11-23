import { Player } from './Player.js';
import { Enemy } from './Enemy.js';
import { Bullet } from './Bullet.js';
import { CollisionManager } from './CollisionManager.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        
        // Game state
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.gameOver = false;
        this.gameStarted = false;
        this.levelTransitioning = false;
        this.lastTime = 0;
        
        // Level settings
        this.enemiesForNextLevel = 10;
        this.enemiesDefeated = 0;
        
        // Game objects
        this.player = new Player(this.canvas.width, this.canvas.height);
        this.bullets = [];
        this.enemies = [];
        
        // Input handling
        this.keys = {};
        this.mouse = { x: 0, y: 0 };
        
        // Spawn rate (enemies per second)
        this.baseSpawnRate = 0.5;
        this.spawnRate = this.baseSpawnRate;
        this.timeSinceLastSpawn = 0;
        
        // Shooting rate (shots per second)
        this.shootRate = 2;
        this.timeSinceLastShot = 0;
        
        this.bindEvents();
        this.setupGameScreens();
    }
    
    setupCanvas() {
        // Set canvas size to match CSS dimensions
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    }
    
    setupGameScreens() {
        document.getElementById('start-button').addEventListener('click', () => this.startGame());
        document.getElementById('restart-button').addEventListener('click', () => this.restartGame());
    }
    
    bindEvents() {
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.setupCanvas();
        });
    }
    
    startGame() {
        document.getElementById('start-screen').classList.add('hidden');
        this.gameStarted = true;
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }
    
    restartGame() {
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.enemiesForNextLevel = 10;
        this.enemiesDefeated = 0;
        this.gameOver = false;
        this.levelTransitioning = false;
        this.enemies = [];
        this.bullets = [];
        this.spawnRate = this.baseSpawnRate;
        this.player.reset(this.canvas.width, this.canvas.height);
        document.getElementById('game-over').classList.add('hidden');
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }
    
    shoot() {
        const bullet = new Bullet(
            this.player.x,
            this.player.y,
            this.mouse.x,
            this.mouse.y
        );
        this.bullets.push(bullet);
    }
    
    async levelUp() {
        this.levelTransitioning = true;
        this.level++;
        this.enemiesForNextLevel = Math.floor(this.enemiesForNextLevel * 1.5);
        this.enemiesDefeated = 0;
        this.spawnRate = this.baseSpawnRate * (1 + (this.level - 1) * 0.2);
        
        // Show level up screen
        const levelUpScreen = document.getElementById('level-up');
        document.getElementById('current-level').textContent = this.level;
        levelUpScreen.classList.remove('hidden');
        
        // Wait 2 seconds before continuing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        levelUpScreen.classList.add('hidden');
        this.levelTransitioning = false;
    }
    
    update(deltaTime) {
        if (this.levelTransitioning) return;
        
        this.player.update(this.keys, this.canvas.width, this.canvas.height, deltaTime);
        
        // Update bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.update(deltaTime);
            return !bullet.isOffScreen(this.canvas.width, this.canvas.height);
        });
        
        // Update enemies
        this.enemies.forEach(enemy => {
            enemy.update(this.player.x, this.player.y, deltaTime);
        });
        
        // Check collisions
        const collisions = CollisionManager.checkCollisions(
            this.player,
            this.bullets,
            this.enemies
        );
        
        // Handle bullet hits
        collisions.bulletHits.forEach(({ bulletIndex, enemyIndex }) => {
            this.score += 100;
            this.enemiesDefeated++;
            this.bullets.splice(bulletIndex, 1);
            this.enemies.splice(enemyIndex, 1);
            
            // Check for level up
            if (this.enemiesDefeated >= this.enemiesForNextLevel) {
                this.levelUp();
            }
        });
        
        // Handle player hit
        if (collisions.playerHit) {
            this.lives--;
            if (this.lives <= 0) {
                this.gameOver = true;
                this.showGameOver();
            }
            this.player.reset(this.canvas.width, this.canvas.height);
        }
        
        // Spawn enemies based on time
        this.timeSinceLastSpawn += deltaTime;
        if (this.timeSinceLastSpawn >= 1 / this.spawnRate) {
            this.enemies.push(Enemy.spawn(this.canvas.width, this.canvas.height));
            this.timeSinceLastSpawn = 0;
        }
        
        // Auto-shoot based on time
        this.timeSinceLastShot += deltaTime;
        if (this.timeSinceLastShot >= 1 / this.shootRate) {
            this.shoot();
            this.timeSinceLastShot = 0;
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw game objects
        this.player.draw(this.ctx);
        this.bullets.forEach(bullet => bullet.draw(this.ctx));
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        
        // Update HUD
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('lives').textContent = `Lives: ${this.lives}`;
        document.getElementById('level').textContent = `Level: ${this.level}`;
    }
    
    showGameOver() {
        document.getElementById('game-over').classList.remove('hidden');
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-level').textContent = this.level;
        const highScore = localStorage.getItem('highScore') || 0;
        if (this.score > highScore) {
            localStorage.setItem('highScore', this.score);
        }
        document.getElementById('high-score').textContent = Math.max(highScore, this.score);
    }
    
    gameLoop(currentTime) {
        if (!this.gameOver && this.gameStarted) {
            const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
            this.lastTime = currentTime;
            
            this.update(deltaTime);
            this.draw();
            requestAnimationFrame((time) => this.gameLoop(time));
        }
    }
}

// Start the game when the page loads
window.onload = () => {
    new Game();
};
