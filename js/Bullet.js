export class Bullet {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.baseSpeed = 400; // Units per second
        this.emoji = '⚡';
        this.fontSize = 16;
        
        // Calculate direction
        const dx = targetX - x;
        const dy = targetY - y;
        const angle = Math.atan2(dy, dx);
        
        this.angle = angle;
    }

    update(deltaTime) {
        // Convert speed to pixels per frame using deltaTime
        const frameSpeed = this.baseSpeed * deltaTime;
        
        this.x += Math.cos(this.angle) * frameSpeed;
        this.y += Math.sin(this.angle) * frameSpeed;
    }

    draw(ctx) {
        ctx.font = `${this.fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, this.x, this.y);
    }

    isOffScreen(canvasWidth, canvasHeight) {
        return this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight;
    }
}
