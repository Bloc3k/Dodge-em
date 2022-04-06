class Agent {
    constructor(max_force = 1, max_speed = 4) {
        this.position = createVector(300, 400);
        this.velocity = createVector(this.max_force, 0);

        this.MAX_SPEED = max_force;
        this.MAX_FORCE = max_speed;

        /******* SPRITE *******/
        this.size = 14;
        this.color = '#a0a';

        this.wandertheta = 0;
    }

    followPath(path) {
        const futurePos = p5.Vector.add(this.position, this.velocity.setMag(this.MAX_SPEED * 1));
        if (menu.debug) {
            circle(futurePos.x, futurePos.y, 10);
        }
        if (p5.Vector.dist(futurePos, path.getScalarProjection(futurePos)) > path.getR()) {
            const target = p5.Vector.add(path.getScalarProjection(futurePos), path.getDir().setMag(10));
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
        if (menu.debug) circle(target.x, target.y, 4);
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
        this.MAX_SPEED = 4;
        const wanderR = 30;         // Radius for our "wander circle"
        const wanderD = 30;         // Distance for our "wander circle"
        const change = 0.3;
        this.wandertheta += random(-change,change);     // Randomly change wander theta

        // Now we have to calculate the new position to steer towards on the wander circle
        let circlepos = this.velocity.setMag(wanderD);    // Start with velocity
        circlepos = p5.Vector.add(circlepos, this.position);               // Make it relative to boid's position

        const h = this.velocity.heading();        // We need to know the heading to offset wandertheta

        const circleOffSet = createVector(wanderR*cos(this.wandertheta),wanderR*sin(this.wandertheta));
        this.seek(p5.Vector.add(circlepos,circleOffSet));

        this.climpToBorders();

        if (menu.debug) {
            stroke(222)
            circle(circlepos.x, circlepos.y , wanderR);
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

    climpToBorders() {
        if (this.position.x < -100) this.position.x = innerWidth + 100;
        if (this.position.x > innerWidth+100) this.position.x = -100;
        if (this.position.y < -100) this.position.y = innerHeight + 100;
        if (this.position.y > innerHeight+100) this.position.y = -100;
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