/**
 * Implementation of Slider used on canvas in p5.js framework
 * 
 * Usage:
 *  1) Copy this file to your working directory and include it in html file
 *  2) Make instance of Slider by calling constructor with x and y coorinates to place slider, optionaly with another paramiter to set inner properties of a slider
 *  3) Make p5.js function mousePressed() in sketche in whitch call the mousePressed() function for each instance of slider
 *  4) Call show() fucntion in p5.js draw() for every instance
 */
class Slider {
    constructor(x, y, from = 0, to = 100, roundDigits = 0, cur = round((from+to)/2, roundDigits), width = 150, height = 12) {
        this.position = createVector(x,y);
        this.FROM = from;
        this.TO = to;
        this.cur = cur;
        this.lastCur = this.cur; //cur from last frame to recognize change and play sound
        this.text = '';
        this.width = width;
        this.height = height; 
        this.color = "#444";
        this.roundDigits = roundDigits;
        this.lastClick = null;
    }

    show(click_s) {
        this.update();
        this.draw();
        this.sound(click_s);
    }

    update() {
        if (mouseIsPressed) {
            if (mouseButton === LEFT) {
                if (mouseX < this.position.x + this.width &&
                    mouseX > this.position.x && 
                    mouseY < this.position.y + this.height/1.2 &&
                    mouseY > this.position.y - this.height/1.2) {
                    if (this.clickedIn(this.lastClick)) {
                        this.cur = +(map(mouseX, this.position.x, this.position.x + this.width, this.FROM, this.TO).toFixed(this.roundDigits));
                    }
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
        text(this.text, this.position.x, this.position.y - this.height*1.5);
        pop();
    }

    clickedIn(click_pos) {
        if (click_pos.x < this.position.x + this.width &&
            click_pos.x > this.position.x && 
            click_pos.y < this.position.y + this.height/1.2 &&
            click_pos.y > this.position.y - this.height/1.2) {
            return true;
        } else {
            return false;
        }
    }

    sound(click_s) {
        if (this.cur != this.lastCur) {
            click_s.play();
            this.lastCur = this.cur;
        }
    }

    mousePressed(mouseX_in, mouseY_in) {
        this.lastClick = createVector(mouseX_in, mouseY_in);
    }

    getCur() {
        return this.cur;
    }

    setCur(position) {
        this.cur = position;
        this.lastCur = this.cur;
    }

    setText(text) {
        this.text = text;
    }
}