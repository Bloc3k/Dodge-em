class Circle3 {
    constructor() {
        this.pos = createVector(innerWidth/2,innerHeight/2);
        this.socketsFill = 4;
        this.col = '#00f';
    
    }

    draw() {
        fill(this.col);
        circle(innerWidth/2, innerHeight/2, 400);
    }

    update() {

    }

    click() {
        
    }
}