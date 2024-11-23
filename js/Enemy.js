export class Enemy {
    constructor(canvasWidth, canvasHeight) {
        this.types = ['grunt', 'hulk', 'brain', 'spheroid', 'enforcer'];
        this.type = this.types[Math.floor(Math.random() * this.types.length)];
        
        // Spawn enemy at random edge position
        if (Math.random() < 0.5) {
            this.x = Math.random() < 0.5 ? 0 : canvasWidth;
            this.y = Math.random() * canvasHeight;
        } else {
            this.x = Math.random() * canvasWidth;
            this.y = Math.random() < 0.5 ? 0 : canvasHeight;
        }
        
        this.size = 20;
        this.baseSpeed = this.getBaseSpeed(); // Units per second
        this.emoji = this.getEmoji();
        this.fontSize = 30;
    }

    getBaseSpeed() {
        switch(this.type) {
            case 'hulk': return 100; // Slower
            case 'brain': return 200;
            case 'spheroid': return 150;
            case 'enforcer': return 180;
            default: return 150; // grunt
        }
    }

    getEmoji() {
        switch(this.type) {
            case 'hulk': return '🤖';
            case 'brain': return '👾';
            case 'spheroid': return '👻';
            case 'enforcer': return '💀';
            default: return '👿'; // grunt
        }
    }

    update(playerX, playerY, deltaTime) {
        // Basic AI: move towards player
        const dx = playerX - this.x;
        const dy = playerY - this.y;
        const angle = Math.atan2(dy, dx);
        
        // Convert speed to pixels per frame using deltaTime
        const frameSpeed = this.baseSpeed * deltaTime;
        
        this.x += Math.cos(angle) * frameSpeed;
        this.y += Math.sin(angle) * frameSpeed;
    }

    draw(ctx) {
        ctx.font = `${this.fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, this.x, this.y);
    }

    static spawn(canvasWidth, canvasHeight) {
        return new Enemy(canvasWidth, canvasHeight);
    }
}
