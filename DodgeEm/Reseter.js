class Reseter {
    constructor() {
        this.x = innerWidth - 120;
        this.y = innerHeight - 100;
        this.timer = 0;
        this.done = false;
        this.size = 27;
    }

    update() {
        if (this.timer < 6.26) {
            this.timer += deltaTime / 500;
        } else {
            this.done = true;
        }

    }

    draw() {
        push();
        noFill();
        stroke(0, 70, 0);
        if (this.done){
            stroke(0, 163, 0);
            fill(0, 50, 0);
        }
        strokeWeight(7);
        arc(this.x, this.y, this.size, this.size, 0, this.timer);
        pop();
    }

    colected(player) {
        return ((player.x < this.x + this.size / 2 &&
            player.x + player.width > this.x - this.size / 2 &&
            player.y < this.y + this.size / 2 &&
            player.y + player.height > this.y - this.size/ 2) && this.done == true);
     }

     reset() {
         this.timer = 0;
         this.done = false;
     }
}