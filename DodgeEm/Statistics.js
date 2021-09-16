class Leaderboard {
    constructor(leaderboard_json) {
        this.width = 250;
        this.height = 300;
        this.x = 20;
        this.y = innerHeight - this.height - 20;
        this.topten = leaderboard_json.leaderboard;
        this.step = this.height/10 - 1;
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
                text(this.topten[i].name, this.x + 40, this.y + (i+1) * this.step);
                text(this.topten[i].score, this.x + 190, this.y + (i+1) * this.step);
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

    /**
     * Public method to add new record to leaderboard.
     */
    update(name, score) {
        this.fetch().then(()=> {
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
                    if (score > leaderboard[i].score && shift == false) {    
                        previousRow = leaderboard[i]; 
                        leaderboard[i] = {"name":name, "score":score};
                        shift = true;   /*shift all upcoming rows*/
                    }
                }
            }
            
            /*cromp back to 10 records*/
            while (leaderboard.length > 10) {
                leaderboard.pop();
            }
            
            /*update local leaderboard*/
            this.topten = leaderboard;
            
            /*update remote leaderboard*/
            this.save();
        });
    }

    async fetch() {
        const response = await fetch(API_URL_GET);
        const data = await response.json().then(data=>{
            this.topten = data.leaderboard;
        });
    }

    save() {
        /*Encapsolate to original format*/
        const data = {leaderboard:this.topten};

        /*Make POST request to remote server*/
        fetch(API_URL_POST, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    reset() {
        const data = {leaderboard:[{"name":"Yakub", "score":16},
            {"name":"josef", "score":13},
            {"name":"pochutina", "score":12},
            {"name":"panhoch", "score":10},
            {"name":"jinoch", "score":8},
            {"name":"kluk", "score":7},
            {"name":"chlapec", "score":6},
            {"name":"chalan", "score":4},
            {"name":"trapak", "score":3},
            {"name":"nicka", "score":2}]};

        fetch(API_URL_POST, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
  
}