let rudolf

function setup() {
    createCanvas(innerWidth,innerHeight);
    rudolf = new Agent();
}

function draw() {
    background(33);
  
    rudolf.draw();
    rudolf.seek(createVector(mouseX, mouseY));
    

    if (keyCode == 27)
        window.history.back();
  
}
