class Circle1 {
    constructor() {
        this.pos = 0;
        this.sockets = [stone_Red, stone_Yellow, stone_Yellow, stone_Yellow];
    }

    draw() {
        //body
        if (this.pos == 0) {
            push();
            translate(innerWidth/2 ,innerHeight/2);
            rotate(0);
            image(circle_Green, 0, 0);
           pop();
        } else if (this.pos == 1) {
            push();
            translate(innerWidth/2, innerHeight/2 );
            rotate(PI/2);
            image(circle_Green, 0, 0);
            pop();
        } else if (this.pos == 2) {
            push();
            translate(innerWidth/2 , innerHeight/2 );
            rotate(PI);
            image(circle_Green, 0, 0);
            pop();
        } else if (this.pos == 3) {
            push();
            translate(innerWidth/2, innerHeight/2);
            rotate(3*PI/2);
            image(circle_Green, 0, 0);
            pop();
        }
        //stones
        if (this.sockets[0]) 
            image(this.sockets[0], innerWidth/2 - (scale/3.55) , innerHeight/2);
        if (this.sockets[1]) 
            image(this.sockets[1], innerWidth/2, innerHeight/2 - (scale/3.55));
        if (this.sockets[2]) 
            image(this.sockets[2], innerWidth/2 + (scale/3.55), innerHeight/2); 
        if (this.sockets[3]) 
            image(this.sockets[3], innerWidth/2, innerHeight/2 + (scale/3.55)); 
    }

    click() {
        //click on 0 position
        console.log()
        if (mouseX < innerWidth/2 - (scale/3.55) + (scale/20) &&
            mouseX > innerWidth/2 - (scale/3.55) - (scale/20) && 
            mouseY < innerHeight/2 + (scale/20) &&
            mouseY > innerHeight/2 - (scale/20))
            {
                if (this.sockets[0]){
                    if (paddle.pos == 0) {
                        if (paddle.socket == null){
                            paddle.socket = this.sockets[0];
                            this.sockets[0] = null;
                        }
                    } 
                    if (circle2.sockets[0] == null){
                        circle2.sockets[0] = this.sockets[0];
                        this.sockets[0] = null;
                    }
                } 
            }

        //click on 1 position
        else if (mouseX < innerWidth/2 + (scale/20) &&
            mouseX > innerWidth/2 - (scale/20) && 
            mouseY < innerHeight/2 - (scale/3.55) + (scale/20) &&
            mouseY > innerHeight/2 - (scale/3.55) - (scale/20))
            {
                if (this.sockets[1]){
                    if (paddle.pos == 1) {
                        if (paddle.socket == null){
                            paddle.socket = this.sockets[1];
                            this.sockets[1] = null;
                        }
                    }
                    if (circle2.sockets[1] == null){
                        circle2.sockets[1] = this.sockets[1];
                        this.sockets[1] = null;
                    }
                }   
            }

        //click on 2 position
        else if (mouseX < innerWidth/2 + (scale/3.55) + (scale/20) &&
            mouseX > innerWidth/2 + (scale/3.55) - (scale/20) && 
            mouseY < innerHeight/2 + (scale/20) &&
            mouseY > innerHeight/2 - (scale/20))
            {
                if (this.sockets[2]){
                    if (paddle.pos == 2) {
                        if (paddle.socket == null){
                            paddle.socket = this.sockets[2];
                            this.sockets[2] = null;
                        }
                    }
                    if (circle2.sockets[2] == null){
                        circle2.sockets[2] = this.sockets[2];
                        this.sockets[2] = null;
                    }
                }   
            }

        //click on 3 position
        else if (mouseX < innerWidth/2 + (scale/20) &&
            mouseX > innerWidth/2 - (scale/20) && 
            mouseY < innerHeight/2 + (scale/3.55) + (scale/20) &&
            mouseY > innerHeight/2 + (scale/3.55) - (scale/20))
            {
                if (this.sockets[3]){
                    if (paddle.pos == 3) {
                        if (paddle.socket == null){
                            paddle.socket = this.sockets[3];
                            this.sockets[3] = null;
                        }
                    }
                    if (circle2.sockets[3] == null){
                        circle2.sockets[3] = this.sockets[3];
                        this.sockets[3] = null;
                    }
                }   
            }

        //rotate circle1
         else if (dist(mouseX, mouseY, innerWidth/2, innerHeight/2) < (scale/1.5)/2 &&
                 dist(mouseX, mouseY, innerWidth/2, innerHeight/2) > (scale/2.2)/2){
                let tempSocket = this.sockets[3];
                console.log("rotate Green cylinder...");

                for (let i = 3; i > 0; i--){
                    this.sockets[i] = this.sockets[i - 1];
                }
                this.sockets[0] = tempSocket;

                this.pos =(this.pos + 1) % 4;
            }
    }
}