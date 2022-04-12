class Animation {
    constructor(duration) {
        this.pos = createVector(NaN, NaN);
        this.DURATION = duration;
        this.running = false;
        this.timer_id = NaN
    }

    start(x, y) {
        this.pos.set(x, y);
        this.running = true;
        this.timer_id = setTimeout( () => {this.stop()}, this.DURATION);
    }
    
    stop() {
        this.running = false;
    }

    isAnimating() {
        return this.running;
    }
}