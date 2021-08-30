class AgentsHandler {
    constructor() {
        this.agents = []
        this.agents.push(new Agent());
        this.MAX_SPEED = this.agents[0].MAX_SPEED;
        this.MAX_FORCE = this.agents[0].MAX_FORCE;
        this.mass = this.agents[0].mass;
    }

    run() {
        this.populate();
        this.adjustSpeed();
        this.adjustForce();
        this.adjustMass();

        this.draw();
        this.seek();
    }

    pursuit(target_in) {
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].pursuitWithConst(target_in);
        }
    }
    
    seek() {
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

    adjustMass() {
        const newMass = slider_mass.getCur();
        if (this.mass != newMass) {
            for (const agent of this.agents) {
                agent.setMass(newMass);
                this.mass = newMass;
            }
        }
    }

    spawn() {
        this.agents.push(new Agent(this.mass, this.MAX_SPEED, this.MAX_FORCE));
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