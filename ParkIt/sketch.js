car;

function setup() {
    createCanvas(innerWidth, innerHeight);
    car = new Car();
  }
  
  function draw() {
    background(0);

    fill(230);
    textSize(60);
    text("Still in progress",innerWidth/2 - 150,innerHeight/2);
    
    car.update();
    car.draw();
  }