let bullets = [];
let tank;
function preload() {
  tank_sprite = loadImage('/ParkIt/Assets/tank_sprite.png');
  bullet_sprite = loadImage('/ParkIt/Assets/bullet_sprite.png');
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    tank = new Tank(tank_sprite, bullet_sprite);
  }
  
function draw() {
    background(0);

    fill(230,230,230);
    textSize(60);
    text("Still in progress",innerWidth/2 - 150,innerHeight/2);
  
  
    //draw bullets
    for (let bullet of bullets){
      
        bullet.draw();
        bullet.update();
    }
  
    tank.update();
    tank.draw();

}