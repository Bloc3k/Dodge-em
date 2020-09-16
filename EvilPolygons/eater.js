class Eater extends Enemy {
    constructor(size = 60, pos = createVector(60, 60)) {
        super(pos);
        this.size = size;
        this.boostSpeed = this.speed * 2.5;
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
            this.speed = player.speed * 2;
        } else {
            this.speed = this.speed;
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
        enemies.push(new Eater(33, createVector(this.pos.x - 20, this.pos.y - 20)));
        enemies.push(new Eater(33, createVector(this.pos.x + 10, this.pos.y + 10)));
    }
}