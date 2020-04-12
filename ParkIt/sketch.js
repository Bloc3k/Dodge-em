function setup() {
    createCanvas(innerWidth, innerHeight);
    tank = new Tank();
  }
  
  function draw() {
    background(0);

    fill(230,230,230);
    textSize(60);
    text("Still in progress",innerWidth/2 - 150,innerHeight/2);
    
    
    tank.update();
    tank.draw();

  }