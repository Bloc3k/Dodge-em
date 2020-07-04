class Circle1 {
    constructor() {
        this.pos = createVector(innerWidth/2,innerHeight/2);
        this.sockets = [1,1,1,1];
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
        circle(innerWidth/2 + 350, innerHeight/2, 65);
        fill(this.colBalls[2]);
        circle(innerWidth/2, innerHeight/2 - 350, 65);
        fill(this.colBalls[3]);
        circle(innerWidth/2, innerHeight/2 + 350, 65);
    }

    update() {

    }

    click() {

    }
}