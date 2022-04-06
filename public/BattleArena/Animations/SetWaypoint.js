/**
 * Animation for Right click. Set waypoint for player to go.
 */
 class SetWaypoint extends Animation {
    constructor() {  
        super(8);
        this.size = 40;
    }

    draw() {
        if (this.running) {
            push();
            noFill();
            stroke(50, 200, 50, 100);
            strokeWeight(4);
            circle(this.pos.x, this.pos.y, this.size - this.counter*3);
            pop();
        }
    }

}