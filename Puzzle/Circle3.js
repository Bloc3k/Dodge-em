class Circle3 {
    constructor() {
        this.pos = createVector(innerWidth/2,innerHeight/2);
        this.sockets = [1, 1, 1, 1];
        this.colBody = '#00f';
        this.colBalls = ['#ddd', '#ddd', '#ddd', '#ddd'];
    
    }

    draw() {
        //body
        fill(this.colBody);
        circle(innerWidth/2, innerHeight/2, 400);

        //balls
        fill(this.colBalls[0]);
        circle(innerWidth/2 - 150, innerHeight/2, 65);
        fill(this.colBalls[1]);
        circle(innerWidth/2 + 150, innerHeight/2, 65);
        fill(this.colBalls[2]);
        circle(innerWidth/2, innerHeight/2 - 150, 65);
        fill(this.colBalls[3]);
        circle(innerWidth/2, innerHeight/2 + 150, 65);
    }

    update() {

    }

    click() {
        
    }
}