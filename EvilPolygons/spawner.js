class Spawner {
    start() {
        this.beginning();
    }

    beginning() {
        this.spawnShooter(createVector(innerWidth * 7 / 8, innerHeight * 7 / 8));
        this.spawnShooter(createVector(innerWidth * 7 / 8, innerHeight * 6 / 8));
        this.spawnShooter(createVector(innerWidth * 6 / 8, innerHeight * 7 / 8));
        this.spawnEater(createVector(innerWidth * 1 / 8, innerHeight * 1 / 8));
    }

    spawnShooter(pos) {
        enemies.push(new Shooter(pos));
    }

    spawnEater(pos) {
        enemies.push(new Eater(pos));
    }
}