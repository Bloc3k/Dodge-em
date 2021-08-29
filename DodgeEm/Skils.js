class Skills {
    constructor() {
        //----------------- F ---------------
        this.cooldown = 0;
        this.ready = true;
        this.effect = false;
        this.effectTime = 0;
        this.duration = 3;
        //----------------- E ---------------
        this.cooldown_d = 0;
        this.ready_d = true;
        this.ready_to_place = true;
        this.cooldown_to_place = 0;
        this.portalPlaced = false;
        this.portalPos = createVector(0, 0);
    }

    update(_use, _ready, player, _placed, _port) {
        if (this.ready == false) {
            this.cooldown += deltaTime/500;
            if (this.cooldown >= 13) {
                this.ready = true;
                _ready.play();
                _ready.setVolume(1.2);
            }
        }
        /*update D*/
        if (this.ready_d == false) {
            this.cooldown_d += deltaTime/500;
            if (this.cooldown_d >= 2) {
                this.ready_d = true;
            }
        }
        if (this.ready_to_place == false) {
            this.cooldown_to_place += deltaTime/500;
            if (this.cooldown_to_place >= 1) {
                this.ready_to_place = true;
                //----------- End of invincibility after teleporting ----------------
                this.effect = false;
                this.effectTime = 0;
                this.duration = 3;         //Set this.duration back to original value
                //-------------------------------------------------------------------
            }
        }
        if (keyIsPressed) {
            if (key == 'f' && this.ready == true) {
                _use.play();
                this.effect = true;
                this.ready = false;
                this.cooldown = 0;
            }
        }
        if (keyIsPressed) {
            if (this.portalPlaced == true && this.ready_d == true && key == 'd') {
                _port.play();
                _port.setVolume(0.1);
                player.x = this.portalPos.x;
                player.y = this.portalPos.y;
                //--------- Invincibility after teleporting ------------
                this.effect = true;
                this.duration = 1;              // Changes this.duration
                //------------------------------------------------------
                this.portalPlaced = false;
                this.ready_to_place = false;
                this.cooldown_to_place = 0;
            } else if (key == 'd' && this.ready_to_place == true && this.portalPlaced == false) {
                _placed.play();
                _port.setVolume(0.1);
                this.portalPlaced = true;
                this.portalPos = createVector(player.x, player.y);
                this.cooldown_d = 0;
                this.ready_d = false;
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
        if (this.ready_d == true) {
            if (this.ready_to_place == false) {
                fill(242, 203, 5, 60);
                stroke(242, 203, 5, 60);
                text('D', innerWidth/2 - 3, innerHeight - 50);
                fill(242, 203, 5, 30);
                stroke(242, 203, 5, 30);
                rect(innerWidth/2 - 15, innerHeight - 100, 60, 70, 7);
                noStroke();
                fill(242, 203, 5, 45);
                rect(innerWidth/2 - 15, innerHeight - 30, 60, -this.cooldown_to_place*70, 7);
            } else {
                fill(242, 203, 5);
                stroke(242, 203, 5);
                text('D', innerWidth/2 - 3, innerHeight - 50);
                stroke(242, 203, 5, 100);
                fill(242, 203, 5, 100);
                rect(innerWidth/2 - 15, innerHeight - 100, 60, 70, 7);
            }
        } else {
            fill(242, 203, 5, 60);
            stroke(242, 203, 5, 60);
            text('D', innerWidth/2 - 3, innerHeight - 50);
            fill(242, 203, 5, 30);
            stroke(242, 203, 5, 30);
            rect(innerWidth/2 - 15, innerHeight - 100, 60, 70, 7);
            noStroke();
            fill(242, 203, 5, 45);
            rect(innerWidth/2 - 15, innerHeight - 30, 60, -this.cooldown_d*37, 7);
        }
        if (this.ready == true) {
            fill(242, 203, 5);
            stroke(242, 203, 5);
            text('F', innerWidth/2 + 82 , innerHeight - 50);
            fill(242, 203, 5, 100);
            stroke(242, 203, 5, 100);
            rect(innerWidth/2 + 70, innerHeight - 100, 60, 70, 7);
        } else {
            fill(242, 203, 5, 60);
            stroke(242, 203, 5, 60);
            text('F', innerWidth/2 + 82, innerHeight - 50);
            fill(242, 203, 5, 30);
            stroke(242, 203, 5, 30);
            rect(innerWidth/2 + 70, innerHeight - 100, 60, 70, 7);
            noStroke();
            fill(242, 203, 5, 45);
            rect(innerWidth/2 + 70, innerHeight - 30, 60, -this.cooldown*5.385, 7);
        }
        pop()
    }

    drawPortal() {
        push();
        if (this.portalPlaced == true) {
            strokeWeight(4);
            stroke(242, 203, 5, 60);
            fill(30);
            rect(this.portalPos.x, this.portalPos.y, 60, 70, 10);
        }
        pop();
    }

    reset() {
        this.cooldown = 0;
        this.ready = true;
        this.effect = false;
        this.effectTime = 0;
        this.cooldown_d = 0;
        this.ready_d = true;
        this.ready_to_place = true;
        this.cooldown_to_place = 0;
        this.portalPlaced = false;
        this.portalPos = createVector(0, 0);
    }
}