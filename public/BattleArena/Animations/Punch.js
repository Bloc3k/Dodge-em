class Punch extends Animation {
    constructor(x, y) {
        super(300);
        this.width = 30;
        this.heigth = 40;
        this.heading = NaN;
        this.punchLeft = false;
        this.punchRight = false;
    }

    draw() {
        push();
            translate(gameState.getCurrentState().me.pos.x, gameState.getCurrentState().me.pos.y);
            rotate(gameState.getCurrentState().me.heading);
            fill('#33f');
            if (this.punchLeft)
                rect(10, -70, this.width, this.heigth);
            scale(-1, 1);
            if (this.punchRight)
                rect(10, -70, this.width, this.heigth);
        pop();
    }

    start(left, right) {
        if (left) {
            setTimeout( () => {this.stopLeft()}, this.DURATION);
            this.punchLeft = true;
        }
        if (right) {
            setTimeout( () => {this.stopRight()}, this.DURATION);
            this.punchRight = true;
        }
    
    }

    stopLeft() {
        this.punchLeft = false;
    }

    stopRight() {
        this.punchRight = false;
    }
    
}