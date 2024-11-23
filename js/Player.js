export class Player {
    constructor(canvasWidth, canvasHeight) {
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.size = 20;
        this.baseSpeed = 250; // Units per second instead of per frame
        this.dx = 0;
        this.dy = 0;
        this.emoji = '😎';
        this.fontSize = 30;
    }

    update(keys, canvasWidth, canvasHeight, deltaTime) {
        // Handle keyboard input for 8-directional movement
        // Convert speed to pixels per frame using deltaTime (in seconds)
        const frameSpeed = this.baseSpeed * deltaTime;
        
        if (keys['ArrowUp'] || keys['w']) this.dy = -frameSpeed;
        if (keys['ArrowDown'] || keys['s']) this.dy = frameSpeed;
        if (keys['ArrowLeft'] || keys['a']) this.dx = -frameSpeed;
        if (keys['ArrowRight'] || keys['d']) this.dx = frameSpeed;
        
        // Update player position
        this.x += this.dx;
        this.y += this.dy;
        
        // Reset velocity
        this.dx = 0;
        this.dy = 0;
        
        // Keep player in bounds
        this.x = Math.max(this.size, Math.min(canvasWidth - this.size, this.x));
        this.y = Math.max(this.size, Math.min(canvasHeight - this.size, this.y));
    }

    draw(ctx) {
        ctx.font = `${this.fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, this.x, this.y);
    }

    reset(canvasWidth, canvasHeight) {
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
    }
}
