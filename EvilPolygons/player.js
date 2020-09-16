class Player {
    constructor() {
        this.pos = createVector(innerWidth / 2, innerHeight / 2);
        this.angle = 0;
        this.angSpeed = 3;
        this.speed = .35;
        this.col = '#06f';
        this.BORDER_PADDING = 10;
        this.loaded = true;
        this.reloadTime = 50;
        this.reloadCounter = 0;
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle + 3 / 4 * Math.PI);
        fill(this.col);
        rectMode(CENTER);
        //-------- player sprite  --------
        circle(0, 0, 26);
        triangle(-13, 0, 0, -13, -13, -13);
        //--------------------------------
        pop();
    }

    update() {
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            this.goUp();
        }
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
            this.goDown();
        }
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            this.goLeft();
        }
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            this.goRight();
        }
        if (keyIsDown(32) || mouseIsPressed) {
            if (this.loaded) {
                //shoot bullet
                bullets.push(new Bullet(this.pos, createVector(1, 0).rotate(this.angle), '#06f'));
                this.loaded = false;
            }
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
        this.angle = createVector(mouseX - this.pos.x, mouseY - this.pos.y).heading();

        this.climpToBoarder();
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

    climpToBoarder() {
        if (this.pos.x < this.BORDER_PADDING)
            this.pos.x = this.BORDER_PADDING;
        else if (this.pos.y < this.BORDER_PADDING)
            this.pos.y = this.BORDER_PADDING;
        else if (this.pos.x > innerWidth - this.BORDER_PADDING)
            this.pos.x = innerWidth - this.BORDER_PADDING;
        else if (this.pos.y > innerHeight - this.BORDER_PADDING)
            this.pos.y = innerHeight - this.BORDER_PADDING;
        else if (this.pos.x < this.BORDER_PADDING)
            this.pos.x = this.BORDER_PADDING;
        else if (this.pos.y < this.BORDER_PADDING)
            this.pos.y = this.BORDER_PADDING;
        else if (this.pos.x > innerWidth - this.BORDER_PADDING)
            this.pos.x = innerWidth - this.BORDER_PADDING;
        else if (this.pos.y > innerHeight - this.BORDER_PADDING)
            this.pos.y = innerHeight - this.BORDER_PADDING;
    }

    isHit(target) {
        return dist(this.pos.x, this.pos.y , target.x, target.y) < 13;            
    }

    reset() {
        this.pos = createVector(innerWidth / 2, innerHeight / 2);
    }
}