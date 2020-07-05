class Circle1 {
    constructor() {
        this.pos = createVector(innerWidth/2,innerHeight/2);
        this.sockets = [1, 1, 1, 1];
        this.colBody = '#ddd';
        this.colBalls = ['#d24','#d24','#d24','#d24'];
    }

    draw() {
        //body
        fill(this.colBody);
        circle(innerWidth/2, innerHeight/2, 800);

        //balls
        fill(this.colBalls[0]);
        circle(innerWidth/2 - 350, innerHeight/2, 65);
        fill(this.colBalls[1]);
        circle(innerWidth/2, innerHeight/2 - 350, 65);
        fill(this.colBalls[2]);
        circle(innerWidth/2 + 350, innerHeight/2, 65);
        fill(this.colBalls[3]);
        circle(innerWidth/2, innerHeight/2 + 350, 65);
    }

    click() {
        //click on 0 position
        if (mouseX < innerWidth/2 - 315 &&
            mouseX > innerWidth/2 - 385 && 
            mouseY < innerHeight/2 + 40 &&
            mouseY > innerHeight/2 - 40)
            {
                if (this.sockets[0] == 1){
                    if (paddle.pos == 0) {
                        if (paddle.socket == 0){
                            paddle.socket = 1;
                            this.sockets[0] = 0;
                            paddle.colBall = this.colBalls[0];
                            this.colBalls[0] = [0, 0];
                        }
                    } 
                    if (circle2.sockets[0] == 0){
                        circle2.sockets[0] = 1;
                        this.sockets[0] = 0;
                        circle2.colBalls[0] = this.colBalls[0];
                        this.colBalls[0] = [0, 0];
                    }
                } 
            }

        //click on 1 position
        else if (mouseX < innerWidth/2 + 40 &&
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
                    if (circle2.sockets[1] == 0){
                        circle2.sockets[1] = 1;
                        this.sockets[1] = 0;
                        circle2.colBalls[1] = this.colBalls[1];
                        this.colBalls[1] = [0, 0];
                    }
                }   
            }

        //click on 2 position
        else if (mouseX < innerWidth/2 + 385 &&
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
                    if (circle2.sockets[2] == 0){
                        circle2.sockets[2] = 1;
                        this.sockets[2] = 0;
                        circle2.colBalls[2] = this.colBalls[2];
                        this.colBalls[2] = [0, 0];
                    }
                }   
            }

        //click on 2 position
        else if (mouseX < innerWidth/2 + 40 &&
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
                    if (circle2.sockets[3] == 0){
                        circle2.sockets[3] = 1;
                        this.sockets[3] = 0;
                        circle2.colBalls[3] = this.colBalls[3];
                        this.colBalls[3] = [0, 0];
                    }
                }   
            }

        //rotate circle1
         else if (dist(mouseX, mouseY, innerWidth/2, innerHeight/2) < 400 &&
                 dist(mouseX, mouseY, innerWidth/2, innerHeight/2) > 300){
                let tempSocket = this.sockets[3];
                let tempColor = this.colBalls[3];

                for (let i = 3; i > 0; i--){
                    this.sockets[i] = this.sockets[i - 1];
                }
                this.sockets[0] = tempSocket;

                for (let i = 3; i > 0; i--){
                    this.colBalls[i] = this.colBalls[i - 1];
                }
                this.colBalls[0] = tempColor;
            }
    }
}