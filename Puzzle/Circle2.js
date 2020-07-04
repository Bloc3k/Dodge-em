class Circle2 {
    constructor() {
        this.pos = createVector(innerWidth/2,innerHeight/2);
        this.socketsFill = 4;
        this.col = '#f00';
    
    }

    draw() {
        fill(this.col);
        circle(innerWidth/2, innerHeight/2, 600);
    }

    update() {

    }

    click() {
        
    }
}