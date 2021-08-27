let rudolf;
let target;

function setup() {
    createCanvas(innerWidth,innerHeight);
    rudolf = new Agent();
    target = new Target(createVector(300,500));
}

function draw() {
    background(33);
  
    target.draw();
    target.update();

    rudolf.draw();
    rudolf.seek(target.getPosition());
    

    if (keyCode == 27)
        window.history.back();
  
}
