class Circle3 {
    constructor() {
        this.pos = 0;
        this.sockets = [stone_Green, stone_Red, stone_Red, stone_Red];
    }

    draw() {
        //body
        if (this.pos == 0) {
            push();
            translate(innerWidth/2 ,innerHeight/2);
            rotate(0);
            image(circle_Yellow, 0, 0); //(scale/4.2)/2
            pop();
        } else if (this.pos == 1) {
            push();
            translate(innerWidth/2, innerHeight/2 );
            rotate(PI/2);
            image(circle_Yellow, 0, 0); //(scale/4.2)/2
            pop();
        } else if (this.pos == 2) {
            push();
            translate(innerWidth/2 , innerHeight/2 );
            rotate(PI);
            image(circle_Yellow, 0, 0); //(scale/4.2)/2
            pop();
        } else if (this.pos == 3) {
            push();
            translate(innerWidth/2, innerHeight/2);
            rotate(3*PI/2);
            image(circle_Yellow, 0, 0); //(scale/4.2)/2
            pop();
        }

        //balls     
        if (this.sockets[0])  
            image(this.sockets[0], innerWidth/2 - (scale/14.8), innerHeight/2); //(scale/4.2)/2
        if (this.sockets[1]) 
            image(this.sockets[1], innerWidth/2, innerHeight/2 - (scale/14.8));
        if (this.sockets[2]) 
            image(this.sockets[2], innerWidth/2 + (scale/14.8), innerHeight/2);
        if (this.sockets[3]) 
            image(this.sockets[3], innerWidth/2, innerHeight/2 + (scale/15.5));
    }

    click() {
         //click on 0 position
        if (mouseX < innerWidth/2 - (scale/14.8) + (scale/20) &&
            mouseX > innerWidth/2 - (scale/14.8) - (scale/20) && 
            mouseY < innerHeight/2 + (scale/20) &&
            mouseY > innerHeight/2 - (scale/20))
            {
                if (this.sockets[0]){
                    if (circle2.sockets[0] == null){
                        circle2.sockets[0] = this.sockets[0];
                        this.sockets[0] = null;
                        move_s.play();
                    }
                } 
            }

        //click on 1 position
        else if (mouseX < innerWidth/2 + (scale/20) &&
            mouseX > innerWidth/2 - (scale/20) && 
            mouseY < innerHeight/2 - (scale/14.8) + (scale/20) &&
            mouseY > innerHeight/2 - (scale/14.8) - (scale/20))
            {
                if (this.sockets[1]){
                    if (circle2.sockets[1] == null){
                        circle2.sockets[1] = this.sockets[1];
                        this.sockets[1] = null;
                        move_s.play();
                    }
                }   
            }

        //click on 2 position
        else if (mouseX < innerWidth/2 + (scale/14.8) + (scale/20) &&
            mouseX > innerWidth/2 + (scale/14.8) - (scale/20) && 
            mouseY < innerHeight/2 + (scale/20) &&
            mouseY > innerHeight/2 - (scale/20))
            {
                if (this.sockets[2]){
                    if (circle2.sockets[2] == null){
                        circle2.sockets[2] = this.sockets[2];
                        this.sockets[2] = null;
                        move_s.play();
                    }
                }   
            }

        //click on 3 position
        else if (mouseX < innerWidth/2 + (scale/20) &&
            mouseX > innerWidth/2 - (scale/20) && 
            mouseY < innerHeight/2 + (scale/14.8) + (scale/20) &&
            mouseY > innerHeight/2 + (scale/14.8) - (scale/20))
            {
                if (this.sockets[3]){
                    if (circle2.sockets[3] == null){
                        circle2.sockets[3] = this.sockets[3];
                        this.sockets[3] = null;
                        move_s.play();
                    }
                }   
            }
        //rotate circle1
        else if (dist(mouseX, mouseY, innerWidth/2, innerHeight/2) < (scale/4.2)/2){
                let tempSocket = this.sockets[3];

                for (let i = 3; i > 0; i--){
                    this.sockets[i] = this.sockets[i - 1];
                }
                this.sockets[0] = tempSocket;

                this.pos =(this.pos + 1) % 4;
                stone_slide_s.play();
            }
    }
}