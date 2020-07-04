class Paddle {
    constructor() {
        this.pos = 0;
        this.socketsFill = 0;
        this.colBody = '#a6a';
        this.colBall = '#a6a';
    
    }

    draw() {
        //body
        rectMode(CENTER);
        if (this.pos == 0) {
            fill(this.colBody);
            rect(innerWidth/2 - 435, innerHeight/2, 120, 100, 25);
        } else if ( this.pos == 1) {
            fill(this.colBody);     
            rect(innerWidth/2, innerHeight/2 - 435, 100, 120, 25);
        } else if (this.pos == 2) {
            fill(this.colBody);     
            rect(innerWidth/2 + 435, innerHeight/2, 120, 100, 25);    
        } else if ( this.pos == 3) {
            fill(this.colBody);
            rect(innerWidth/2, innerHeight/2 + 435, 120, 100, 25);
        }

        //ball
        if (this.pos == 0) {
            fill(this.colBall);
            circle(innerWidth/2 - 440, innerHeight/2, 65);
        } else if ( this.pos == 1) {
            fill(this.colBall);        
            circle(innerWidth/2, innerHeight/2 - 440, 65);
        } else if (this.pos == 2) {
            fill(this.colBall);        
            circle(innerWidth/2 + 440, innerHeight/2, 65);    
        } else if ( this.pos == 3) {
            fill(this.colBall);
            circle(innerWidth/2, innerHeight/2 + 440, 65);
        }
    }

    update() {

    }

    click() {
        if (this.pos == 0) {
            if (mouseX < innerWidth/2 - 400 &&
                mouseX > innerWidth/2 - 495 &&
                mouseY < innerHeight/2 + 60 &&
                mouseY > innerHeight/2 - 60
                ) {
                this.pos++;
                this.pos = this.pos % 4;
            }
        } else if ( this.pos == 1) {
            if (mouseX < innerWidth/2 + 60 &&
                mouseX > innerWidth/2 - 60 &&
                mouseY < innerHeight/2 - 400 &&
                mouseY > innerHeight/2 - 495
                ) {
                this.pos++;
                this.pos = this.pos % 4;
            }
        } else if (this.pos == 2) {
            if (mouseX < innerWidth/2 + 495 &&
                mouseX > innerWidth/2 + 400 &&
                mouseY < innerHeight/2 + 60 &&
                mouseY > innerHeight/2 - 60
                ) {
                this.pos++;
                this.pos = this.pos % 4;
            }
        } else if ( this.pos == 3) {
            if (mouseX < innerWidth/2 + 60 &&
                mouseX > innerWidth/2 - 60 &&
                mouseY < innerHeight/2 + 495 &&
                mouseY > innerHeight/2 + 400
                ) {
                this.pos++;
                this.pos = this.pos % 4;
            }
        }
        
         
    }
}