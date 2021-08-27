class Slider {
    constructor(x, y, from = 0, to = 100, cur = (from+to)/2, width = 150, height = 12) {
        this.position = createVector(x,y);
        this.FROM = from;
        this.TO = to;
        this.cur = cur;
        this.width = width;
        this.height = height;
        this.color = "#444";
    }

    update() {
        if (mouseIsPressed) {
            if (mouseButton === LEFT) {
                if (mouseX < this.position.x + this.width &&
                    mouseX > this.position.x && 
                    mouseY < this.position.y + this.height/1.2 &&
                    mouseY > this.position.y - this.height/1.2) {
                        this.cur = round(map(mouseX, this.position.x, this.position.x + this.width, this.FROM, this.TO));
                }
            }
        }
    }

    draw() {
        push();
        stroke(this.color);
        strokeWeight(this.height);
        line(this.position.x, this.position.y, this.position.x + this.width, this.position.y);
        stroke(33);
        fill(220);
        textSize(this.height*1.5)
        text(this.cur, this.position.x + this.width + 15, this.position.y + this.height/2);
        strokeWeight(this.height/3);
        circle(map(this.cur, this.FROM, this.TO, this.position.x, this.position.x + this.width), this.position.y, this.height*1.5)
        pop();
    }

    getCur() {
        return this.cur;
    }
}