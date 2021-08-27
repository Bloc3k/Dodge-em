const agents = [];
let target;
let slider;

function setup() {
    createCanvas(innerWidth,innerHeight);
    rudolf = new Agent();
    target = new Target(createVector(300,500));
    slider = new Slider(40,40);

    for (let index = 0; index < 33; index++) {
        agents[index] = new Agent();
        agents[index].setPosition(createVector(random(10, innerWidth - 10), random(10, innerHeight - 10)))
    }

}

function draw() {
    background(33);

    slider.draw();
    slider.update();
  
    target.draw();
    target.update();

    for (let i = 0; i < agents.length; i++) {
        agents[i].seek(target.getPosition());
        agents[i].draw();
    }

  
    if (keyCode == 27)
        window.history.back();
}
