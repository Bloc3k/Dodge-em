/**
 * Animation for Right click. Set waypoint for player to go.
 */
 class SetWaypoint extends Animation {
    constructor() {  
        super(400);
        this.size = 18;
        this.counter = 0;
    }

    draw() {
        if (this.running) {
            push();
            noFill();
            stroke(50, 200, 50, 100);
            strokeWeight(2);
            circle(this.pos.x, this.pos.y, this.size - this.counter*deltaTime*0.04);
            this.counter++;
            pop();
        } else {
            this.counter = 0;
        }
    }

    start(x, y) {
        clearTimeout(this.timer_id);
        this.counter = 0;
        super.stop();
        super.start(x, y);
    }



}