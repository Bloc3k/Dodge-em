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
            for (let i = 0; i < this.messages.length; i++) {
                text(this.messages[i], 
                    this.pos.x + this.LEFT_PADDING, 
                    this.pos.y + i * this.TEXT_SIZE + 3,
                    this.WIDHT);
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
                if (chat.messages.length > 11) {
                    chat.messages.shift();
                    this.messages.push('me (' + gameState.getCurrentState().me.level + '. lvl): ' + this.holder);
                } else {
                    this.messages.push('me (' + gameState.getCurrentState().me.level + '. lvl): ' + this.holder);
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
}