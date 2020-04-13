let bullets = [];
let tank;
let enemies = [];

function preload() {
  tank_sprite = loadImage('/ParkIt/Assets/tank_sprite.png');
  tankEnemy = loadImage('/ParkIt/Assets/enemyTank_sprite.png');
  bullet_sprite = loadImage('/ParkIt/Assets/bulletPlayer_sprite.png');
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    tank = new Tank(tank_sprite, bullet_sprite);
    for (let i = 0; i < 2; i++) {
      enemies.push(new Tank(tankEnemy, null, i * 300 + 100, 500));
    }
  }
  
function draw() {
    background(0);

    fill(230,230,230);
    textSize(60);
    text("Still in progress",innerWidth/2 - 150,innerHeight/2);
  
  
    //draw bullets
    for (let bullet of bullets) {
        bullet.draw();
        bullet.update();
    }

    for (let enemy of enemies) {
        enemy.draw();
        enemy.update();
    }
  
    tank.update();
    tank.draw();

}