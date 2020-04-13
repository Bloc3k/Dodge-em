class Tank {
    constructor( tank_sprite, bullet_sprite, x = 200, y = 300, speed = 4){
        this.pos = createVector(x,y);
        this.heading = createVector(1,0);
        this.angle = 0;
        this.angSpeed = 2;
        this.speed = speed;
        this.tank_sprite = tank_sprite;
        this.bullet_sprite = bullet_sprite;
        this.reloadTime = 200;
        this.reloadCounter = 0;
        this.loaded = true;
    }

    draw() {
        push();
        
        //draw tank
        angleMode(DEGREES);
        translate( this.pos.x, this.pos.y)
        rotate(this.angle);
        image(this.tank_sprite,-40,-47);
        
        pop(); 
    }

    update() {
        if (keyIsDown(UP_ARROW)){
            //go forward
            this.pos.add(this.heading);
        }
        if (keyIsDown(DOWN_ARROW)){
            //go backwards
            this.pos.sub(this.heading);
        }
        if (keyIsDown(LEFT_ARROW)){
            //turn left
            this.angle -= this.angSpeed;
        }
        if (keyIsDown(RIGHT_ARROW)){
            //turn right
            this.angle += this.angSpeed;
        }
        if (keyIsDown(32)){
            if (this.loaded){
                //shoot bullet
                bullets.push(new Bullet(this.pos, this.heading));
                this.loaded = false;
            }
        }

        //reloading
        this.reloadCounter++;
        if (this.reloadCounter >= this.reloadTime) {
            this.loaded = true;
            this.reloadCounter = 0;
        }

        //calculate new heading
        this.heading.set(cos(this.angle - 90) * this.speed, sin(this.angle- 90) * this.speed);
    }   

}

class Bullet {
    constructor(pos, direction){
        this.pos = createVector(pos.x, pos.y);
        this.direction = createVector(direction.x / direction.mag(), direction.y / direction.mag());
       // this.direction.div(direction.mag()).mult(this.speed);
        this.speed = 10;
        this.angle = atan( this.direction.y / this.direction.x) + 90;
        if (direction.x < 0)
            this.angle = this.angle - 180;
    }

    draw(){
        push();
        translate(this.pos.x,this.pos.y);
        rotate(this.angle);
        image(bullet_sprite,-5,-10);

        pop();
    }

    update(){
        this.pos.add(this.direction);
    }

}