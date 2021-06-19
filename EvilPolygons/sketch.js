let spawner;
let anim;
let player;
let bullets = [];
let enemies = [];
let running = false;
let lobbyTime = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  spawner = new Spawner();
  anim = new Animator();
  player = new Player();

  spawner.beginning();
}

function draw() {
  background(220);
  
  if (running) {
    //-------------------- Game State  --------------------
    spawner.tick();
    anim.tick();
    
    /*Check hits by bullets*/
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].draw();
      bullets[i].update();
      enemies.forEach(enemy => {
        if (enemy.isHit(bullets[i].getPos())) {
          enemy.hit();
          bullets[i].hit();
        }
      });

      if (player.isHit(bullets[i].getPos()))
        running = false;

      if (bullets[i].toDestroy)
        bullets.splice(i, 1);
    }

    /*Draw and Update enemies*/
    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].draw();
      enemies[i].update();
      if (enemies[i].toDestroy)
        enemies.splice(i, 1);
    }

    /*Check if game ends*/
    if (enemies.length == 0)
      running = false;

    player.draw();
    player.update();

  } else {
    //---------------------- Lobby  -----------------------
    keyCode = null;

    player.draw();
    for (let bullet of bullets) {
      bullet.draw();
    }
    for (let enemy of enemies) {
      enemy.draw();
    }

    if (lobbyTime >= 50) {
      if (keyIsPressed || mouseIsPressed) {
        running = true;
        spawner.reset();
        anim.reset();
        player.reset();
        bullets = [];
        enemies = [];

        spawner.beginning();

        lobbyTime = 0;
      }

    } else {
      lobbyTime++;
    }

    fill(40);
    textSize(34);
    text("Keep peace in your heart xD", player.pos.x, player.pos.y);
    text("Press ESC to get back to main menu.", innerWidth / 2 - 250, 40);
    text("Press any other key or mouse button to play.", innerWidth / 2 - 300, 80);
    text("Use 'w' 'a' 's' 'd' to move and 'space' or 'left mouse button' to shoot.", innerWidth / 2 - 430 , innerHeight - 40);
  }
  if (keyCode == 27)
    window.history.back();
}