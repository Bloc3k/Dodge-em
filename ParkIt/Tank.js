class Tank {
    constructor(x = 200,y = 300, speed = 4){
        this.pos = createVector(200,300);
        this.heading = createVector(1,0);
        this.angle = 0;
        this.angSpeed = 2;
        this.speed = 4;

    }

    draw() {
        push();

        //draw tank
        fill(220,0,0);
        angleMode(DEGREES);
        rectMode(CENTER);
        translate( this.pos.x,this.pos.y)
        rotate(this.angle);
        rect(0, 0, 50 , 50,6);
            
        pop();
    }

    update() {
        if (keyIsDown(UP_ARROW)){
            this.pos.add(this.heading);
        }
        if (keyIsDown(LEFT_ARROW)){
            this.angle -= this.angSpeed;
        }
        if (keyIsDown(RIGHT_ARROW)){
            this.angle += this.angSpeed;
        }
        this.heading.set(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
    }

}