class Polygon {
    constructor() {
        this.pos = createVector(innerWidth / 2 + 30, innerHeight / 2);
        this.heading = createVector(1, 0);
        this.angle = 0;
        this.angSpeed = .01;
        this.speed = .2;
        this.destroyed = false;
        this.col = '#f60';
        this.BORDER_PADDING = 10;
        this.loaded = true;
        this.reloadTime = 100;
        this.reloadCounter = 0;
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle  + 3/4 * Math.PI);
        fill(this.col);
        rectMode(CENTER);
        //-------- player sprite  --------
        circle(0, 0, 26);
        triangle(-13, 0, 0, -13, -13, -13);
        //--------------------------------
        pop();
    }

    update() {
        this.turnLeft();
        
        if( this.loaded ){
            this.shoot();
            this.loaded = false;
        }

        //reloading
        if (this.loaded == false) {
            this.reloadCounter++;
            if (this.reloadCounter >= this.reloadTime) {
                this.loaded = true;
                this.reloadCounter = 0;
            }
        }

        //calculate new heading
        this.heading.set(cos(this.angle) * this.speed * deltaTime, sin(this.angle) * this.speed * deltaTime);
    }

    shoot() {
        bullets.push(new Bullet(this.pos, this.heading, '#f60'));
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
        this.pos.add(this.heading);
    }

    goBackward() {
        this.pos.sub(this.heading);
    }

    turnLeft() {
        this.angle -= this.angSpeed;
    }

    turnRight() {
        this.angle += this.angSpeed;
    }
}