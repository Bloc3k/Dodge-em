class Paddle {
    constructor() {
        this.pos = 0;
        this.socket = 0;
        this.colBody = '#a6a';
        this.colBall = [0,0];
    
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
            rect(innerWidth/2, innerHeight/2 + 425, 120, 100, 25);
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
            //pass the ball
            if (mouseX < innerWidth/2 - 410 &&
                mouseX > innerWidth/2 - 478 && 
                mouseY < innerHeight/2 + 40 &&
                mouseY > innerHeight/2 - 40){
                    if (this.socket == 1){
                        if (circle1.sockets[0] == 0) {

                                this.socket = 0;
                                circle1.sockets[0] = 1;
                                circle1.colBalls[0] = this.colBall;
                                this.colBall = [0, 0];

                        }
                    }
                }

            //movement
            else if (mouseX < innerWidth/2 - 400 &&
                mouseX > innerWidth/2 - 495 &&
                mouseY < innerHeight/2 + 60 &&
                mouseY > innerHeight/2 - 60
                ) {
                this.pos++;
                this.pos = this.pos % 4;
            }
        } else if ( this.pos == 1) {
            //pass the ball
            if (mouseX < innerWidth/2 + 40 &&
                mouseX > innerWidth/2 - 40 && 
                mouseY < innerHeight/2 - 410 &&
                mouseY > innerHeight/2 - 478){
                    if (this.socket == 1){
                        if (circle1.sockets[1] == 0) {
                            this.socket = 0;
                            circle1.sockets[1] = 1;
                            circle1.colBalls[1] = this.colBall;
                            this.colBall = [0, 0];
                        }
                    }
                }

            //movement
            else if (mouseX < innerWidth/2 + 60 &&
                     mouseX > innerWidth/2 - 60 &&
                     mouseY < innerHeight/2 - 400 &&
                     mouseY > innerHeight/2 - 495
                ) {
                this.pos++;
                this.pos = this.pos % 4;
            }
        } else if (this.pos == 2) {
            //pass the ball
            if (mouseX < innerWidth/2 + 478 &&
                mouseX > innerWidth/2 + 410 && 
                mouseY < innerHeight/2 + 40 &&
                mouseY > innerHeight/2 - 40){
                    if (this.socket == 1){
                        if (circle1.sockets[2] == 0) {
                            this.socket = 0;
                            circle1.sockets[2] = 1;
                            circle1.colBalls[2] = this.colBall;
                            this.colBall = [0, 0];
                        }
                    }
                }
            //movement
            else if (mouseX < innerWidth/2 + 495 &&
                mouseX > innerWidth/2 + 400 &&
                mouseY < innerHeight/2 + 60 &&
                mouseY > innerHeight/2 - 60
                ) {
                this.pos++;
                this.pos = this.pos % 4;
            }
        } else if ( this.pos == 3) {
              //pass the ball
              if (mouseX < innerWidth/2 + 40 &&
                    mouseX > innerWidth/2 - 40 && 
                    mouseY < innerHeight/2 + 478 &&
                    mouseY > innerHeight/2 + 410)
                    {

                    if (this.socket == 1){
                        if (circle1.sockets[3] == 0) {
                            this.socket = 0;
                            circle1.sockets[3] = 1;
                            circle1.colBalls[3] = this.colBall;
                            this.colBall = [0, 0];
                        }
                    }
                }
            //movement
            else if (mouseX < innerWidth/2 + 60 &&
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