class Car {
    constructor(x = 200,y = 300, speed = 4){
        this.pos = createVector(200,300);
        this.angle = 0;

    }

    draw() {
        push();

        text(this.angle,100,100);
        fill(220,0,0);
        angleMode(DEGREES);
        rectMode(CENTER);
        translate( this.pos.x,this.pos.y)
        rotate(this.angle);
        rect(0, 0, 50 , 30, 6);

        pop();
    }

    update() {
    
        if (keyIsDown(UP_ARROW)){
         
        }
        if (keyIsDown(LEFT_ARROW))
            this.angle++;
        if (keyIsDown(RIGHT_ARROW))
            this.angle--;
    }

}