class Leaderboard {
    constructor() {
        this.width = 250;
        this.height = 300;
        this.x = 20;
        this.y = innerHeight - this.height - 20;
        this.topten = this.load();
        this.step = this.height/10 - 1;
        console.log(this.topten)
    }

    show() {
        push();
        
        noFill();
        strokeWeight(4);
        rect(this.x, this.y, this.width, this.height);
        textSize(this.height/12);
        strokeWeight(1);
        fill(255);
        for (let i = 0; i < 10; i++) {
            if (i < this.topten.length) {                                    /*show name and score*/
                if (i == 9)
                    text(i+1,this.x + 2, this.y + (i+1) * this.step);
                else 
                    text(i+1,this.x + 8, this.y + (i+1) * this.step);
                text(this.topten[i][0], this.x + 40, this.y + (i+1) * this.step);
                text(this.topten[i][1], this.x + 190, this.y + (i+1) * this.step);
            } else {
                if (i == 9)                                                 /*show dashes when doesn't have record*/
                    text(i+1,this.x + 2, this.y + (i+1) * this.step);
                else 
                    text(i+1,this.x + 8, this.y + (i+1) * this.step);
                text("  -", this.x + 40, this.y + (i+1) * this.step);
                text(" -", this.x + 190, this.y + (i+1) * this.step);
            }
        }
        
        pop();
    } 

    update(name, score) {
        const leaderboard = this.topten;
        
        /*find where to put new record, put it there and shift rest*/
        let i = 0, shift = false, previousRow;
        for (; i < this.topten.length + 1; i++) {
            if (i == this.topten.length) {
                if (previousRow == null)    /*add record at the end*/
                    this.topten.push([name, score]);
                else                        /*shifting extends list*/
                    this.topten.push(previousRow);
                break;
            } else {
                if (shift == true) {                
                    const temp = leaderboard[i];
                    leaderboard[i] = previousRow;
                    previousRow = temp;
                }
                if (score > leaderboard[i][1] && shift == false) {    
                    previousRow = leaderboard[i]; 
                    leaderboard[i] = [name, score];
                    shift = true;   /*shift all upcoming rows*/
                }
            }
        }

        while (leaderboard.length > 10) {
            leaderboard.pop();
        }
        
        /*save updated leaderboard as cookie*/
        this.save(leaderboard);
    }
   
    load() {
        const key = "leaderboard=";
        const cookies = document.cookie.split(';');
        let leaderboard_string = null;

        for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
        if (cookie.indexOf(key) === 0) {
                leaderboard_string = cookie.substring(key.length, cookie.length);
            }
        }
        
        const arrOfPlayersAndScores = leaderboard_string.split('_');      /*splits string to array of items "name-score"*/
        const _leaderboard = [];
        
        for (let i = 0; i < arrOfPlayersAndScores.length; i++) {
            _leaderboard.push(arrOfPlayersAndScores[i].split('-'));
        }

        /*refresh cookie expiration date*/
        this.save(_leaderboard);

        return _leaderboard;
    }

    save(leaderboard) {
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 1);  /*expires tomorrow*/
        let leaderboard_string = "";
        for (let record in leaderboard) {
            leaderboard_string += "_" + leaderboard[record][0] + "-" + leaderboard[record][1]
        }
        leaderboard_string = leaderboard_string.substring(1, leaderboard_string.length)
        document.cookie = "leaderboard=" + leaderboard_string + ";expires=" + expiration + ";";
    }
  
    /*Remove cookies*/
    clear() {
      document.cookie = escape("leaderboard") + "=" + "NaN" + ";expires=" + new Date(-1).toUTCString() + ";";
    }
}