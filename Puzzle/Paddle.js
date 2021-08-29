class Paddle {
    constructor() {
        this.pos = 0;
        this.socket = null;
    
    }

    draw() { 
        if (this.pos == 0) {
            push();
            translate(innerWidth/2 ,innerHeight/2);
            rotate(0);
            image(circle_Purple, 0 ,0);
            if (this.socket)
                image(this.socket, -(scale/2.575), 0);
            pop();
        } else if (this.pos == 1) {
            push();
            translate(innerWidth/2, innerHeight/2 );
            rotate(PI/2);
            image(circle_Purple, 0 ,0);
            if (this.socket)
                image(this.socket, -(scale/2.575), 0);
            pop();
        } else if (this.pos == 2) {
            push();
            translate(innerWidth/2 , innerHeight/2 );
            rotate(PI);
            image(circle_Purple, 0 ,0);
            if (this.socket)
                image(this.socket, - (scale/2.575), 0);
            pop();
        } else if (this.pos == 3) {
            push();
            translate(innerWidth/2, innerHeight/2);
            rotate(3*PI/2);
            image(circle_Purple, 0 ,0);
            if (this.socket)
                image(this.socket, - (scale/2.575), 0);
            pop();
        }

    }

    click() {
        if (this.pos == 0) {
            //pass the ball
            if (mouseX < innerWidth/2 - (scale/2.575) + (scale/20) &&
                mouseX > innerWidth/2 - (scale/2.575) - (scale/20) && 
                mouseY < innerHeight/2 + (scale/20) &&
                mouseY > innerHeight/2 - (scale/20)){
                    if (this.socket){
                        if (circle1.sockets[0] == null) {
                            circle1.sockets[0] = this.socket;
                            this.socket = null;
                            move_s.play();
                        }
                    }
                }
            //rotate
            else if (dist(mouseX, mouseY, innerWidth/2, innerHeight/2) < (scale/1.13)/2 &&
                     dist(mouseX, mouseY, innerWidth/2, innerHeight/2) > (scale/1.5)/2) {
                this.pos++;
                this.pos = this.pos % 4;
                stone_slide_s.play();
            }
        } else if (this.pos == 1) {
            //pass the ball
            if (mouseX < innerWidth/2 + (scale/20) &&
                mouseX > innerWidth/2 - (scale/20) && 
                mouseY < innerHeight/2 - (scale/2.575) + (scale/20) &&
                mouseY > innerHeight/2 - (scale/2.575) - (scale/20)){
                    if (this.socket){
                        if (circle1.sockets[1] == null) {
                            circle1.sockets[1] = this.socket;
                            this.socket = null;
                            move_s.play();
                        }
                    }
                }

          //rotate
          else if (dist(mouseX, mouseY, innerWidth/2, innerHeight/2) < (scale/1.13)/2 &&
                   dist(mouseX, mouseY, innerWidth/2, innerHeight/2) > (scale/1.5)/2) {
                this.pos++;
                this.pos = this.pos % 4;
                stone_slide_s.play();
            }
        } else if (this.pos == 2) {
            //pass the ball
            if (mouseX < innerWidth/2 + (scale/2.575) + (scale/20) &&
                mouseX > innerWidth/2 + (scale/2.575) - (scale/20) && 
                mouseY < innerHeight/2 + (scale/20) &&
                mouseY > innerHeight/2 - (scale/20)){
                    if (this.socket){
                        if (circle1.sockets[2] == null) {
                            circle1.sockets[2] = this.socket;
                            this.socket = null;
                            move_s.play();
                        }
                    }
                }
           //rotate
           else if (dist(mouseX, mouseY, innerWidth/2, innerHeight/2) < (scale/1.13)/2 &&
                    dist(mouseX, mouseY, innerWidth/2, innerHeight/2) > (scale/1.5)/2) {
                this.pos++;
                this.pos = this.pos % 4;
                stone_slide_s.play();
            }
        } else if ( this.pos == 3) {
              //pass the ball
              if (mouseX < innerWidth/2 + (scale/20) &&
                    mouseX > innerWidth/2 - (scale/20) && 
                    mouseY < innerHeight/2 + (scale/2.575) + (scale/20) &&
                    mouseY > innerHeight/2 + (scale/2.575) - (scale/20)) {
                    if (this.socket){
                        if (circle1.sockets[3] == null) {
                            circle1.sockets[3] = this.socket;
                            this.socket = null;
                            move_s.play();
                        }
                    }
                }
            //rotate
            else if (dist(mouseX, mouseY, innerWidth/2, innerHeight/2) < (scale/1.13)/2 &&
                     dist(mouseX, mouseY, innerWidth/2, innerHeight/2) > (scale/1.5)/2) {
                this.pos++;
                this.pos = this.pos % 4;
                stone_slide_s.play();
            }
        }
    }
}