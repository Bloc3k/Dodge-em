class Agent {
    constructor(mass = 10, max_force = 30, max_speed = 20) {
        this.position = createVector(300, 200);
        this.velocity = createVector(0, 0);

        this.mass = mass;
        this.MAX_SPEED = max_force;
        this.MAX_FORCE = max_speed;

        /******* SPRITE *******/
        this.size = this.mass * 1,5;
        this.color = '#a0a';
    }

    seek(target) {
        const steering_direction = p5.Vector.sub(target, this.position);
        const steering_force = this.truncate(steering_direction, this.MAX_FORCE);
        const accleration = p5.Vector.div(steering_force, this.mass);
        this.velocity = this.truncate(p5.Vector.add(this.velocity, accleration), this.MAX_SPEED);
        this.position = p5.Vector.add(this.position, this.velocity);
    }

    flee(target) {
        const steering_direction = p5.Vector.sub(this.position, target);
        const steering_force = this.truncate(steering_direction, this.MAX_FORCE);
        const accleration = p5.Vector.div(steering_force, this.mass);
        this.velocity = this.truncate(p5.Vector.add(this.velocity, accleration), this.MAX_SPEED);
        this.position = p5.Vector.add(this.position, this.velocity);
    }

    update() { }

    draw() {
        push();

        fill(this.color);
        //angleMode(DEGREES);
        translate(this.position.x, this.position.y)
        rotate(this.velocity.heading());
        triangle(-this.size, -this.size, this.size*2.5 , 0, -this.size, this.size);
        
        pop(); 
    }

    truncate(vector, amount) {
        return vector.limit(amount);
    }
}