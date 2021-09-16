class AgentsHandler {
    constructor() {
        this.agents = []
        this.agents.push(new Agent());
        this.MAX_SPEED = this.agents[0].MAX_SPEED;
        this.MAX_FORCE = this.agents[0].MAX_FORCE;
    }

    
    seek() {
        this.populate();
        this.adjustSpeed();
        this.adjustForce();
        
        this.draw();
        this.seek_in();
    }
    
    arrive() {
        this.populate();
        this.adjustSpeed();
        this.adjustForce();
        
        this.draw();
        this.arrive_in(300);
    }
    
    followPath() {
        this.populate();
        this.adjustSpeed();
        this.adjustForce();

        this.draw();
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].followPath(path);
        }
    }
    
    wander(noise) {
        this.populate();
        this.adjustSpeed();
        this.adjustForce();

        this.draw();
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].wander();
        }
    }

    pursuit(target_in) {
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].pursuitWithConst(target_in);
        }
    }

    arrive_in(radius) {
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].arrive(target.getPosition(), radius);
        }
    }
    
    seek_in() {
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].seek(target.getPosition());
        }
    }

    populate() {
        if (this.agents.length < slider_agents.getCur()) {
            while (this.agents.length < slider_agents.getCur()) {
                this.spawn();
            }
        } else if (this.agents.length > slider_agents.getCur()) {
            while (this.agents.length > slider_agents.getCur()) {
                this.destroy();
            }
        }
    }

    adjustSpeed() {
        const newSpeed = slider_speed.getCur();
        if (this.MAX_SPEED != newSpeed) {
            for (const agent of this.agents) {
                agent.setMaxSpeed(newSpeed);
                this.MAX_SPEED = newSpeed;
            }
        }
    }

    adjustForce() {
        const newForce = slider_force.getCur();
        if (this.MAX_FORCE != newForce) {
            for (const agent of this.agents) {
                agent.setMaxForce(newForce);
                this.MAX_FORCE = newForce;
            }
        }
    }

    spawn() {
        this.agents.push(new Agent(this.MAX_SPEED, this.MAX_FORCE));
        this.agents[this.agents.length-1].setPosition(createVector(random(10, innerWidth - 10), random(10, innerHeight - 10)));
    }

    destroy() {
        this.agents.pop();
    }

    draw() {
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].draw();
        }
    }

    getAgents() {
        return this.agents;
    }
}