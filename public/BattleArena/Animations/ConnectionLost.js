/**
 * Animation when connection to server is lost.
 */
class ConnectionLost extends Animation {
    constructor() {  
        super(25000);
    }

    draw() {
        if (this.running) {
            push();
            fill(20, 20, 20, 200);
            noStroke();
            rectMode(CORNER)
            rect(innerWidth/2-100, 25, 220, 40, 5);
            fill('#ccc');
            textSize(26);
            textAlign(LEFT, CENTER)
            text('Connection lost', innerWidth/2-90, 40);
            pop();
        }
    }

}