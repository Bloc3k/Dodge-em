class Eater extends Enemy {

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        fill(this.col);
        rectMode(CENTER);
        //-------- player sprite  --------
        rect(0, 0, 60, 60);
        //--------------------------------
        pop();
    }

    update() {
        this.angle = createVector(player.pos.x - this.pos.x, player.pos.y - this.pos.y).heading();

        this.goForward();

        super.update();
    }
}