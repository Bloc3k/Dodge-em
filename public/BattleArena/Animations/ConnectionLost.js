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
            rect(innerWidth/2-100, 13, 200, 40, 5);
            fill('#ccc');
            textSize(26);
            text('Connection lost', innerWidth/2-90, 40);
            pop();
        }
    }

}