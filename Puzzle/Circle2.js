class Circle2 {
    constructor() {
        this.pos = createVector(innerWidth/2,innerHeight/2);
        this.sockets = [1, 1, 1, 1];
        this.colBody = '#f00';
        this.colBalls = ['#24d','#24d','#24d','#24d'];
    
    }

    draw() {
        //body
        fill(this.colBody);
        circle(innerWidth/2, innerHeight/2, 600);

        //balls
        fill(this.colBalls[0]);
        circle(innerWidth/2 - 250, innerHeight/2, 65);
        fill(this.colBalls[1]);
        circle(innerWidth/2 + 250, innerHeight/2, 65);
        fill(this.colBalls[2]);
        circle(innerWidth/2, innerHeight/2 - 250, 65);
        fill(this.colBalls[3]);
        circle(innerWidth/2, innerHeight/2 + 250, 65);
    }

    update() {

    }

    click() {
         //click on 0 position
         if (mouseX < innerWidth/2 - 215 &&
            mouseX > innerWidth/2 - 285 && 
            mouseY < innerHeight/2 + 40 &&
            mouseY > innerHeight/2 - 40)
            {
                if (this.sockets[0] == 1){
                    if (circle1.sockets[0]  == 0){
                        //pass to circle 1 (bigger one)
                        circle1.sockets[0] = 1;
                        this.sockets[0] = 0;
                        circle1.colBalls[0] = this.colBalls[0];
                        this.colBalls[0] = [0, 0];
                    } else if (circle3.sockets[0] == 0) {
                        //pass to circle 3 (the smallest)

                    }
                }   
            }

        //click on 1 position
        if (mouseX < innerWidth/2 + 40 &&
            mouseX > innerWidth/2 - 40 && 
            mouseY < innerHeight/2 - 315 &&
            mouseY > innerHeight/2 - 385)
            {
                if (this.sockets[1] == 1){
                    if (paddle.pos == 1) {
                        if (paddle.socket == 0){
                            paddle.socket = 1;
                            this.sockets[1] = 0;
                            paddle.colBall = this.colBalls[1];
                            this.colBalls[1] = [0, 0];
                        }
                    }
                }   
            }

        //click on 2 position
        if (mouseX < innerWidth/2 + 385 &&
            mouseX > innerWidth/2 + 315 && 
            mouseY < innerHeight/2 + 40 &&
            mouseY > innerHeight/2 - 40)
            {
                if (this.sockets[2] == 1){
                    if (paddle.pos == 2) {
                        if (paddle.socket == 0){
                            paddle.socket = 1;
                            this.sockets[2] = 0;
                            paddle.colBall = this.colBalls[2];
                            this.colBalls[2] = [0, 0];
                        }
                    }
                }   
            }

        //click on 2 position
        if (mouseX < innerWidth/2 + 40 &&
            mouseX > innerWidth/2 - 40 && 
            mouseY < innerHeight/2 + 385 &&
            mouseY > innerHeight/2 + 315)
            {
                if (this.sockets[3] == 1){
                    if (paddle.pos == 3) {
                        if (paddle.socket == 0){
                            paddle.socket = 1;
                            this.sockets[3] = 0;
                            paddle.colBall = this.colBalls[3];
                            this.colBalls[3] = [0, 0];
                        }
                    }
                }   
            }
    }
}