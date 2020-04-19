let bullets = [];
let tanks = [];
let sandbags = [];

function preload() {
  tank_sprite = loadImage('/ParkIt/Assets/tank_sprite.png');
  tankEnemy = loadImage('/ParkIt/Assets/enemyTank_sprite.png');
  bullet_sprite = loadImage('/ParkIt/Assets/bulletPlayer_sprite.png');
  sandbag_sprite = loadImage('/ParkIt/Assets/sandbagBrown.png');
}

function setup() {
    createCanvas(innerWidth, innerHeight);

    for (let i = 0; i < 2; i++) {
      tanks.push(new Tank(tankEnemy, bullet_sprite, i * 300 + 100, 500));
    }
    tanks.push(new Tank(tank_sprite,bullet_sprite, 250,300));
    tanks.push(new Tank(tank_sprite,bullet_sprite, 800,600));

    sandbags.push(new Sandbag(300,300, 90));

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
        }
      }
      for (let k = sandbags.length - 1; k >= 0; k--) {
        if (sandbags[k].hit(bullets[i]))
          bullets[i].toDestroy = true;
      }
      if (bullets[i].toDestroy)
        bullets.splice(i,1);
    }

    for (let i = 0; i < tanks.length; i++) {
      tanks[i].draw();
      tanks[i].update();
    }

    for (let sandbag of sandbags) {
      sandbag.draw();
    }

    if (keyCode == 27)
      window.history.back();                //TODO: Make it go to Main menu and to just back in history
    
}