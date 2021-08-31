class Agent {
    constructor(max_force = 1, max_speed = 20) {
        this.position = createVector(300, 400);
        this.velocity = createVector(this.max_force, 0);

        this.MAX_SPEED = max_force;
        this.MAX_FORCE = max_speed;

        /******* SPRITE *******/
        this.size = 14;
        this.color = '#a0a';
    }

    followPath(path) {
        const futurePos = p5.Vector.add(this.position, this.velocity.setMag(this.MAX_SPEED * 1));
        if (menu.debug) {
            circle(futurePos.x, futurePos.y, 10);
        }
        if (p5.Vector.dist(futurePos, path.getScalarProjection(futurePos)) > path.getR()) {
            const target = p5.Vector.add(path.getScalarProjection(futurePos), path.getDir().setMag(1));
            this.seek(target);
        } 
        
    }

    /**
     * Agent will pursuite target by taking its velocity vector and multiplying it by T = D*c; 
     * where D is distance from target and c is turning constant
     * It is less sophisticated calculation of T because it dosn't taking into account orientation between target and pursuer.
     * @param {} target - object to pursuit, has to have getVelocity() and getPosition() function
     */
    pursuitWithConst(target) {
        const T = dist(this.position.x, this.position.y, target.getPosition().x, target.getPosition().y) * 0.12;
        this.seekTargetInFuture = p5.Vector.add(p5.Vector.mult(target.getVelocity(), T), target.getPosition()) //remove/edit
        this.seek(this.seekTargetInFuture);
    }

    arrive(target, radius) {
        const steering_direction = p5.Vector.sub(target, this.position);
        const distance_to_target = steering_direction.mag();
        const ramped_speed = this.MAX_SPEED * (distance_to_target / radius);
        const limited_speed = Math.min(ramped_speed, this.MAX_SPEED);
        const desired_velocity = p5.Vector.mult(steering_direction, (limited_speed / distance_to_target));
        const steering_force = this.truncate(p5.Vector.sub(desired_velocity, this.velocity), this.MAX_FORCE);
        this.velocity = p5.Vector.add(steering_force, this.velocity);
        this.position = p5.Vector.add(this.position, this.velocity);
    }

    seek(target) {
        if (menu.debug)
            circle(target.x, target.y, 4);
        const steering_direction = p5.Vector.sub(target, this.position);
        const steering_force = steering_direction.limit(this.MAX_FORCE);
        this.velocity = p5.Vector.add(this.velocity, steering_force).limit(this.MAX_SPEED);
        this.position = p5.Vector.add(this.position, this.velocity);
    }

    flee(target) {
        const steering_direction = p5.Vector.sub(this.position, target);
        const steering_force = steering_direction.limit(this.MAX_FORCE);
        this.velocity = p5.Vector.add(this.velocity, steering_force).limit(this.MAX_SPEED);
        this.position = p5.Vector.add(this.position, this.velocity);
    }

    wander() {
        this.velocity = createVector(this.MAX_SPEED, cos(0.01*this.position.x)*10).limit(this.MAX_SPEED);
        this.position = p5.Vector.add(this.position, this.velocity);
        if (this.position.x > innerWidth) {
            this.position.x = -20;
            this.position.y = random(150,innerHeight-150);
        }
    }

    draw() {
        push();

        fill(this.color);
        translate(this.position.x, this.position.y)
        rotate(this.velocity.heading());
        triangle(-this.size, -this.size, this.size*2.5 , 0, -this.size, this.size); 

        pop(); 
    }

    setPosition(newPosition) {
        this.position = createVector(newPosition.x, newPosition.y);
    }

    setMaxSpeed(speed) {
        this.MAX_SPEED = speed;
    }

    setMaxForce(force) {
        this.MAX_FORCE = force;
    }
}