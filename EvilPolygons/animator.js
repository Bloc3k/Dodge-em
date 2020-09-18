class Animator {
    constructor() {
        this.tick_count = 0;
        
        this.isEaterSpawning = false;
        this.eaterSpawnPos;
        this.eaterSpawn_TIME;

    }

    tick() {
        if (this.isEaterSpawning){
            //------------ Eater Spawning Animation -----------
            push()
            fill( 255,0,0, 90);
            noStroke();
            circle(this.eaterSpawnPos.x, this.eaterSpawnPos.y, (this.tick_count - this.eaterSpawn_TIME) * 2);
            pop();
            if (this.tick_count == this.eaterSpawn_TIME + 40){
                this.isEaterSpawning = false;
                enemies.push(new Eater(createVector(this.eaterSpawnPos.x, this.eaterSpawnPos.y)));
            }
        } 
            
        this.tick_count++;
        this.tick_count = this.tick_count % 256;
    }

    spawnEater(pos) {
        this.eaterSpawn_TIME = this.tick_count;
        this.eaterSpawnPos = createVector(pos.x, pos.y);

        this.isEaterSpawning = true;
    }

    reset() {
        this.tick_count = 0;
    }
}