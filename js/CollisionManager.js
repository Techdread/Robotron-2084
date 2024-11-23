export class CollisionManager {
    static checkCollisions(player, bullets, enemies) {
        const collisions = {
            bulletHits: [],
            playerHit: false
        };

        // Check bullet-enemy collisions
        bullets.forEach((bullet, bulletIndex) => {
            enemies.forEach((enemy, enemyIndex) => {
                const dx = bullet.x - enemy.x;
                const dy = bullet.y - enemy.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < enemy.size + bullet.size) {
                    collisions.bulletHits.push({
                        bulletIndex,
                        enemyIndex
                    });
                }
            });
        });

        // Check player-enemy collisions
        enemies.some(enemy => {
            const dx = player.x - enemy.x;
            const dy = player.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < player.size + enemy.size) {
                collisions.playerHit = true;
                return true;
            }
            return false;
        });

        return collisions;
    }
}
