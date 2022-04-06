class Enemy {
    constructor(pos = createVector(innerWidth / 2, innerHeight / 2), speed = 0.1, col = '#f30', angSpeed = 0.01, angle = 0) {
        this.pos = pos;
        this.dir = createVector(1, 0);
        this.speed = speed;
        this.angle = angle;
        this.angSpeed = angSpeed;
        this.col = col;
        this.toDestroy = false;
    }

    update() {
        //calculate new heading
        this.dir.set(cos(this.angle), sin(this.angle));
    }

    goUp() {
        this.pos.y -= this.speed * deltaTime;
    }

    goDown() {
        this.pos.y += this.speed * deltaTime;
    }

    goLeft() {
        this.pos.x -= this.speed * deltaTime;
    }

    goRight() {
        this.pos.x += this.speed * deltaTime;
    }

    goForward() {
        this.pos.add(this.dir.mult(this.speed * deltaTime));
    }

    goBackward() {
        this.pos.sub(this.dir.mult(this.speed * deltaTime));
    }

    turnLeft() {
        this.angle -= this.angSpeed;
    }

    turnRight() {
        this.angle += this.angSpeed;
    }

    isHit() {
        console.error('isHit() function is not override...        enemy.js:50');
    }

    hit() {
        console.error('hit() function is not override...        enemy.js:54');
    }

    getPos() {
        return this.pos;
    }

}