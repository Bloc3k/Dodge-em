class Chat {
    constructor() {
        this.messages = [];
        this.holder = '';
        this.writing = false;
        this.WIDHT = 420;
        this.HEIGHT = 200;
        this.TEXT_SIZE = 16;
        this.LEFT_PADDING = 7;
        this.show = false;
        this.hide_timer = 3.5;  // seconds
        this.hide_timer_reset;
        this.pos = createVector(25, innerHeight - this.HEIGHT - 270);
        this.text_box_height = this.calculate_text_box_size();
    }

    render() {
        push();
        if (this.show) {
            // Chat text-box
            fill(20,20,20, 75);
            noStroke();
            rectMode(CORNER);
            rect(this.pos.x, this.pos.y, this.WIDHT, this.HEIGHT, 10);
            textAlign(LEFT, TOP);
            fill(220,220,220, 240);
            textSize(this.TEXT_SIZE);
            let padding = 3;   // Initialize padding back
            for (let i = 0; i < this.messages.length; i++) {
                text(this.messages[i], 
                    this.pos.x + this.LEFT_PADDING, 
                    this.pos.y + padding,
                    this.WIDHT);
                if (textWidth(this.messages[i]) >= this.WIDHT){
                    padding += (this.TEXT_SIZE + 3) * 2;
                }
                else
                    padding += this.TEXT_SIZE + 3;
            }
        }
        if (this.writing) {
            // Console line
            this.show_chat();
            fill(20,20,20, 210);
            rect(this.pos.x,
                 this.pos.y + this.HEIGHT + 10, 
                 this.WIDHT, 
                 this.TEXT_SIZE + 10, 
                 8);
            fill(220,220,220, 240);
            text(this.holder,
                 this.pos.x + this.LEFT_PADDING,
                 this.pos.y + this.HEIGHT + 13,
                 this.WIDHT);
            stroke(200 * Math.round(frameCount*0.02 % 1));
            strokeWeight(2);
            line(this.pos.x + this.LEFT_PADDING + textWidth(this.holder) + 4,
                    this.pos.y + this.HEIGHT + 13,
                    this.pos.x + this.LEFT_PADDING + textWidth(this.holder) + 4,
                    this.pos.y + this.HEIGHT + 14 + this.TEXT_SIZE);
        }
        pop();
    }

    enter_handler() {
        if (this.writing) {
            if (this.holder != '') {
                chat_out(this.holder);
                this.messages.push('Me (' + gameState.getCurrentState().me.level + '. lvl): ' + this.holder);
                while (this.calculate_text_box_size() >= this.HEIGHT) {
                    this.messages.shift();
                }
                this.holder = '';
            }
            this.writing = false;
        } else {
            this.writing = true;
            this.show_chat();
        }
    }

    show_chat() {
        clearTimeout(this.hide_timer_reset);
        this.hide_timer_reset = setTimeout(
             () => {this.show = false;},
             this.hide_timer*1000);
        this.show = true;
    }

    calculate_text_box_size() {
        textSize(this.TEXT_SIZE);
        let text_box_size = 3;
        for (let i = 0; i < this.messages.length; i++) {
            if (textWidth(this.messages[i]) >= this.WIDHT) {
                text_box_size += (this.TEXT_SIZE + 3) * 2;
            } else {
                text_box_size += this.TEXT_SIZE + 3;
            }
        }
        return text_box_size;
    }

}