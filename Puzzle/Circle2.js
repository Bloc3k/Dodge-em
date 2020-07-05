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
        circle(innerWidth/2, innerHeight/2 - 250, 65);
        fill(this.colBalls[2]);
        circle(innerWidth/2 + 250, innerHeight/2, 65);
        fill(this.colBalls[3]);
        circle(innerWidth/2, innerHeight/2 + 250, 65);
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
                        circle3.sockets[0] = 1;
                        this.sockets[0] = 0;
                        circle3.colBalls[0] = this.colBalls[0];
                        this.colBalls[0] = [0, 0];
                    }
                }   
            }

        //click on 1 position
        else if (mouseX < innerWidth/2 + 40 &&
            mouseX > innerWidth/2 - 40 && 
            mouseY < innerHeight/2 - 215 &&
            mouseY > innerHeight/2 - 285)
            {
                if (this.sockets[1] == 1){
                    if (circle1.sockets[1]  == 0){
                        //pass to circle 1 (bigger one)
                        circle1.sockets[1] = 1;
                        this.sockets[1] = 0;
                        circle1.colBalls[1] = this.colBalls[1];
                        this.colBalls[1] = [0, 0];
                    } else if (circle3.sockets[1] == 0) {
                        //pass to circle 3 (the smallest)
                        circle3.sockets[1] = 1;
                        this.sockets[1] = 0;
                        circle3.colBalls[1] = this.colBalls[1];
                        this.colBalls[1] = [0, 0];
                    }
                }    
            }

        //click on 2 position
        else if (mouseX < innerWidth/2 + 285 &&
            mouseX > innerWidth/2 + 215 && 
            mouseY < innerHeight/2 + 40 &&
            mouseY > innerHeight/2 - 40)
            {
                if (this.sockets[2] == 1){
                    if (circle1.sockets[2]  == 0){
                        //pass to circle 1 (bigger one)
                        circle1.sockets[2] = 1;
                        this.sockets[2] = 0;
                        circle1.colBalls[2] = this.colBalls[2];
                        this.colBalls[2] = [0, 0];
                    } else if (circle3.sockets[2] == 0) {
                        //pass to circle 3 (the smallest)
                        circle3.sockets[2] = 1;
                        this.sockets[2] = 0;
                        circle3.colBalls[2] = this.colBalls[2];
                        this.colBalls[2] = [0, 0];
                    }
                }   
            }

        //click on 3 position
        else if (mouseX < innerWidth/2 + 40 &&
            mouseX > innerWidth/2 - 40 && 
            mouseY < innerHeight/2 + 285 &&
            mouseY > innerHeight/2 + 215)
            {
                if (this.sockets[3] == 1){
                    if (circle1.sockets[3]  == 0){
                        //pass to circle 1 (bigger one)
                        circle1.sockets[3] = 1;
                        this.sockets[3] = 0;
                        circle1.colBalls[3] = this.colBalls[3];
                        this.colBalls[3] = [0, 0];
                    } else if (circle3.sockets[3] == 0) {
                        //pass to circle 3 (the smallest)
                        circle3.sockets[3] = 1;
                        this.sockets[3] = 0;
                        circle3.colBalls[3] = this.colBalls[3];
                        this.colBalls[3] = [0, 0];
                    } 
                }   
            }

        //rotate circle1
        else if (dist(mouseX, mouseY, innerWidth/2, innerHeight/2) < 300 &&
                 dist(mouseX, mouseY, innerWidth/2, innerHeight/2) > 200){
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