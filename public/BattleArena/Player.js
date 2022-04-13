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
        if (keyIsPressed && keyCode == 83)      // 's' has keyCode of 83
            this.waypoint.set(this.pos.x, this.pos.y);
        const direction = p5.Vector.sub(this.waypoint, this.pos);
        this.heading = createVector(mouseX - this.pos.x, mouseY - this.pos.y).heading() + PI/2;
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
        send_waypoint_update();
        animator.SetWaypoint.start(x, y)
    }

}

class Summoner extends Player {
    constructor(x, y, id, speed = 0.3, color = '#33f') {
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

class Enemy extends Player {
    constructor(x, y, id, speed = 0.3, color = '#f33') {
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