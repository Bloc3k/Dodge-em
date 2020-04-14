let bullets = [];
let tanks = [];

function preload() {
  tank_sprite = loadImage('/ParkIt/Assets/tank_sprite.png');
  tankEnemy = loadImage('/ParkIt/Assets/enemyTank_sprite.png');
  bullet_sprite = loadImage('/ParkIt/Assets/bulletPlayer_sprite.png');
}

function setup() {
    createCanvas(innerWidth, innerHeight);

    for (let i = 0; i < 2; i++) {
      tanks.push(new Tank(tankEnemy, bullet_sprite, i * 300 + 100, 500));
    }
    tanks.push(new Tank(tank_sprite,bullet_sprite, 250,300));
    tanks.push(new Tank(tank_sprite,bullet_sprite, 800,600));
  }
  
function draw() {
    background(0);

    fill(230,230,230);
    textSize(60);
    text("Still in progress",innerWidth/2 - 150,innerHeight/2);
  
    //draw bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].draw();
      bullets[i].update();
      for (let j = tanks.length - 1; j >= 0; j--) {
        tanks[j].hit(bullets[i]);
        if (tanks[j].destroyed){
          tanks.splice(j,1);
          bullets.splice(i,1);
        }
      }
    }
    for (let i = 0; i < tanks.length; i++) {
      tanks[i].draw();
      tanks[i].update();
    }

}