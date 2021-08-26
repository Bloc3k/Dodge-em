class Agent {
    constructor() {
        this.position = createVector(300, 200);
        this.velocity = createVector(0, 0);

        this.mass = 10;
        this.MAX_SPEED = 30;
        this.MAX_FORCE = 20;

        /******* SPRITE *******/
        this.size = this.mass * 2;
        this.color = '#a0a';
    }

    seek(target) {
        const steering_direction = p5.Vector.sub(target, this.position);
        const steering_force = this.truncate(steering_direction, this.MAX_FORCE);
        const accleration = p5.Vector.div(steering_force, this.mass);
        this.velocity = this.truncate(p5.Vector.add(this.velocity, accleration), this.MAX_SPEED);
        this.position = p5.Vector.add(this.position, this.velocity);
    }

    update() {
    }

    draw() {
        push();

        fill(this.color);
        //angleMode(DEGREES);
        translate(this.position.x, this.position.y)
        rotate(this.velocity.heading());
        triangle(-this.size, -this.size, this.size*2.5 , 0, -this.size, this.size);
        
        pop(); 
    }

    calculateNextPos() {
        let temp = createVector(cos(this.heading) , sin(this.heading));
        temp.mult(this.baseLenght/2);
        let frontWheel = createVector(0,0);
        p5.Vector.add(this.pos, temp, frontWheel);
        let backWheel = createVector(0,0);
        p5.Vector.sub(this.pos, temp, backWheel);
        
        temp.normalize();
        p5.Vector.mult(temp, deltaTime/11, temp);
        p5.Vector.mult(temp, this.speed, temp);
        p5.Vector.sub(backWheel, temp, backWheel);
        temp = createVector(cos(this.heading + this.steerAngle) , sin(this.heading + this.steerAngle));
        p5.Vector.mult(temp, deltaTime/11, temp);
        p5.Vector.mult(temp, this.speed, temp);
        p5.Vector.sub(frontWheel, temp, frontWheel);

        p5.Vector.add(frontWheel, backWheel, this.pos);
        p5.Vector.mult(this.pos, 1/2, this.pos);
        this.heading = atan2(frontWheel.y - backWheel.y, frontWheel.x - backWheel.x);
    }

    truncate(vector, amount) {
        return vector.limit(amount);
    }
}