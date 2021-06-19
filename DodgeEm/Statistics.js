class Leaderboard {
    constructor() {
        this.width = 250;
        this.height = 300;
        this.x = 20;
        this.y = innerHeight - this.height - 20;
        this.topten = [["yakub", 14],["kaspis", 13], ["yakub", 14],["kaspis", 13], ["yakub", 14],["kaspis", 13], ["yakub", 14],["kaspis", 13], ["sefis", 11], ["sefis", 11]];
        this.step = this.height/11;
    }

    show() {
        push();
        
        noFill();
        strokeWeight(4);
        rect(this.x, this.y, this.width, this.height);
        textSize(this.height/12);
        strokeWeight(1);
        fill(255);
        for (let i = 0; i < this.topten.length || i < 9; i++) {
            if (i == 9)
                text(i+1,this.x + 2, this.y + (i+1) * this.step);
            else 
                text(i+1,this.x + 8, this.y + (i+1) * this.step);
            text(this.topten[i][0], this.x + 40, this.y + (i+1) * this.step);
            text(this.topten[i][1], this.x + 190, this.y + (i+1) * this.step);
        }
        

        pop();
    }   
}