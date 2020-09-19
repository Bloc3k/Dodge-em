class Eater extends Enemy {
    constructor(pos = createVector(innerWidth / 2, innerHeight / 2), size = 60) {
        super(pos, 0.12);
        this.size = size;
        this.dashSpeed = this.speed * 4;
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        fill(this.col);
        rectMode(CENTER);
        //-------- player sprite  --------
        rect(0, 0, this.size, this.size);
        //--------------------------------
        pop();
    }

    update() {
        this.angle = createVector(player.pos.x - this.pos.x, player.pos.y - this.pos.y).heading();
        
        this.goForward();
        
        if (dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 150) {
            this.speed = this.dashSpeed;
        } else {
            this.speed = this.dashSpeed / 3;
        }
        
        if (dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 20)
        running = false;  //---------------- Player Eaten ------- Game Over ------------------
        
        super.update();
    }

    isHit(target) {
        return dist(this.pos.x, this.pos.y, target.x, target.y) < this.size / 2;
    }

    hit() {
        if (this.size > 33)
            this.split();
        else
            this.toDestroy = true;
    }

    split() {
        this.toDestroy = true;
        enemies.push(new Eater(createVector(this.pos.x - 20, this.pos.y - 20), 33));
        enemies.push(new Eater(createVector(this.pos.x + 10, this.pos.y + 10), 33));
    }
}