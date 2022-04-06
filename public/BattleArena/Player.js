class Player {
    constructor(x, y, id, speed = 1, color = '#fff') {
        this.pos = createVector(x, y);
        this.speed = speed;
        this.waypoint = createVector(this.pos.x, this.pos.y);
        this.id = id;
        this.color = color;
    }

    update() {
        this.pos.add(this.waypoint.x - this.pos.x, this.waypoint.y - this.pos.y);
    }

    draw() {
        push();
        fill(this.color);
        circle(this.pos.x, this.pos.y, 30);
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
    constructor(x, y, id, speed = 1, color = '#33f') {
        super(x, y, id, speed, color);
    }
}

class Enemy extends Player {
    constructor(x, y, id, speed = 1, color = '#f33') {
        super(x, y, id, speed, color);
    }
}

class Ally extends Player {
    constructor(x, y, id, speed = 1, color = '#3f3') {
        super(x, y, id, speed, color);
    }
}