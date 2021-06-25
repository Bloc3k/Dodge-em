class Skills {
    constructor() {
        this.cooldown = 0;
        this.ready = true;
        this.effect = false;
        this.effectTime = 0;
        this.duration = 3;
    }

    update(_sound) {
        if (this.ready == false) {
            this.cooldown += deltaTime/500;
            if (this.cooldown >= 13) {
                this.ready = true;
            }
        }
        if (keyIsPressed) {
            if (key == 'f' && this.ready == true) {
                _sound.play();
                this.effect = true;
                this.ready = false;
                this.cooldown = 0;
            }
        }
        if (this.effect == true) {
            this.effectTime += deltaTime/500;
            if (this.effectTime >= this.duration) {
                this.effect = false;
                this.effectTime = 0;
            }
        }
    }

    draw() {
        push() 
        textSize(50)
        strokeWeight(4);
        if (this.ready == true) {
            fill(242, 203, 5);
            stroke(242, 203, 5);
            text('F', innerWidth/2 - 1 , innerHeight - 50);
            fill(242, 203, 5, 100);
            stroke(242, 203, 5, 100);
            rect(innerWidth/2 - 15, innerHeight - 100, 60, 70, 7);
        } else {
            fill(242, 203, 5, 60);
            stroke(242, 203, 5, 60);
            text('F', innerWidth/2 - 1 , innerHeight - 50);
            fill(242, 203, 5, 30);
            stroke(242, 203, 5, 30);
            rect(innerWidth/2 - 15, innerHeight - 100, 60, 70, 7);
            noStroke();
            fill(242, 203, 5, 45);
            rect(innerWidth/2 - 15, innerHeight - 30, 60, -this.cooldown*5.385, 7);
        }
        pop()
    }

    reset() {
        this.cooldown = 0;
        this.ready = true;
        this.effect = false;
        this.effectTime = 0;
    }
}