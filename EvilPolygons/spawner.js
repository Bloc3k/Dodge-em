class Spawner {
    constructor() {
        this.tick_count = 0;

    }

    tick() {
        
        if (this.tick_count == 0)
            anim.spawnEater(createVector(innerWidth * 1 / 8, innerHeight * 1 / 8))
        
        if (this.tick_count == 128)
            anim.spawnEater(createVector(Math.random() * innerWidth, Math.random() * innerHeight));
        this.tick_count++;
        this.tick_count = this.tick_count % 256;
    }

    beginning() {
        this.spawnShooter(createVector(innerWidth * 7 / 8, innerHeight * 7 / 8));
        this.spawnShooter(createVector(innerWidth * 7 / 8, innerHeight * 6 / 8));
        this.spawnShooter(createVector(innerWidth * 6 / 8, innerHeight * 7 / 8));
    }

    spawnShooter(pos) {
        enemies.push(new Shooter(pos));
    }

    spawnEater(pos) {
        anim.spawnEater(pos);
    }

    reset() {
        this.tick_count = 0;
    }
}