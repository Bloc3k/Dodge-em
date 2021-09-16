class Target {
    constructor(position) {
        this.position = createVector(position.x, position.y);
        this.radius = 15;
        this.move = false;
        this.color = "#fa0";
    }

    update() {
        if (mouseIsPressed) {
            if (mouseButton === LEFT) {
                if (dist(mouseX, mouseY, this.position.x, this.position.y) < this.radius + 3) {
                    this.move = true;
                    this.position = createVector(mouseX, mouseY);
                }
                else if (this.move === true) {
                    this.position = createVector(mouseX, mouseY);
                }
            } 
        } else {
            this.move = false;
        }
    }

    draw() {
        push();

        fill(this.color);
        circle(this.position.x, this.position.y, this.radius);

        pop();
    }

    getPosition() {
        return this.position;
    }
}