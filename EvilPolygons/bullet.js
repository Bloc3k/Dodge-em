class Bullet {
    constructor(pos, direction, col) {
        this.pos = createVector(pos.x, pos.y);
        this.speed = 1;
        this.direction = createVector(direction.x / direction.mag() * this.speed * deltaTime, direction.y / direction.mag() * this.speed * deltaTime);
        this.angle = atan(this.direction.y / this.direction.x) + 90;
        this.col = col
        this.toDestroy = false;

        for (let i = 0; i < 2; i++)
            this.pos.add(this.direction);
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        //----------Bullet sprite-----------
        fill(this.col);
        circle(0, 0, 8);
        //----------------------------------
        pop();
    }

    update() {
        if (this.pos.x < -20 ||
            this.pos.x > innerWidth + 20 ||
            this.pos.y < -20 ||
            this.pos.y > innerHeight + 20) {
            this.toDestroy = true;
        }
        this.pos.add(this.direction);
    }

}