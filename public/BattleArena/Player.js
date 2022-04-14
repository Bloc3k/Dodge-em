class Player {
    constructor(x, y, id, speed = 0.5, color = '#fff') {
        this.pos = createVector(x, y);
        this.speed = speed;
        this.waypoint = createVector(this.pos.x, this.pos.y);
        this.weight = 40;
        this.heading = 0;
        this.id = id;
        this.color = color;
    }

    update() {
        if (keyIsPressed && keyCode == 83) {      // 's' has keyCode of 83
            this.waypoint.set(this.pos.x, this.pos.y);
            animator.SetWaypoint.stop();
        }
        const direction = p5.Vector.sub(this.waypoint, this.pos);
        this.pos.add(direction.limit(this.speed * deltaTime));
    }

    draw() {
        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.heading);
            fill(this.color);
            circle(0, 0, this.weight);
        pop();
    }

    /**
     * Set waypoint with Right Mouse click.
     */
    setWaypoint(x, y) {
        this.waypoint.set(x, y);
        animator.SetWaypoint.start(x, y)
    }

}

class Summoner extends Player {
    // Max speed is also set in Game object in BA_Game.js
    constructor(x, y, id, speed = 0.3, color = '#33f') {
        super(x, y, id, speed, color);
    }

    update() {
        super.update();
        this.heading = createVector(mouseX - this.pos.x, mouseY - this.pos.y).heading() + PI/2;
    }

    draw() {
        super.draw();
        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.heading);
            image(glove_blue, 0, -45);
            scale(-1,1);
            image(glove_blue, 0 , -45);
        pop();
    }
}

class Enemy extends Player {
    /**
     * Constructor of Enemy object.
     * @param {float} x 
     * @param {float} y 
     * @param {Socket.id} id 
     * @param {float} speed 
     * @param {String} color 
     */
    constructor(x, y, id, speed = 0.3, color = '#f33') {
        // Max speed is also set in Game object in BA_Game.js
        super(x, y, id, speed, color);
    }

    draw() {
        super.draw();
        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.heading);
            image(glove_red, 0, -45);
            scale(-1,1);
            image(glove_red, 0 , -45);
        pop();
    }
}

class Ally extends Player {
    // Max speed is also set in Game object in BA_Game.js
    constructor(x, y, id, speed = 0.3, color = '#3f3') {
        super(x, y, id, speed, color);
    }

    draw() {
        super.draw();
        push();
            translate(this.pos.x, this.pos.y);
            rotate(this.heading);
            image(glove_blue, 0, -45);
            scale(-1,1);
            image(glove_blue, 0 , -45);
        pop();
    }
}