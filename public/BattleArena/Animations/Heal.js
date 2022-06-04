/**
 * Animation for Healing on healing pad.
 */
 class SetWaypoint extends Animation {
    constructor() {  
        super(250);
        this.size = 18;
        this.counter = 0;
    }

    draw() {
        if (this.running) {
            push();
                noFill();
                stroke(50, 200, 50, 100);
                strokeWeight(2);
                for (let i = 0; i < 30; i++) {
                    circle(
                        this.pos.x + (Math.random()*2 - 1) * this.size, 
                        this.pos.y + (Math.random()*2 - 1) * this.size, 
                        this.size - this.counter*deltaTime*0.04
                    );
                }
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