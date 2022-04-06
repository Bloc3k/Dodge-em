class Animation {
    constructor(duration) {
        this.pos = createVector(NaN, NaN);
        this.DURATION = duration;
        this.counter = 0;
        this.running = false;
    }

    update() {
        if (this.running) {
            if (this.counter < this.DURATION) {
                this.counter++;
            } else {
                this.reset();
            }
        } 
    }

    start(x, y) {
        this.running = true;
        this.pos.set(x, y);
    }

    reset() {
        this.running = false;
        this.counter = 0;
    }

    isAnimating() {
        return this.running;
    }
}