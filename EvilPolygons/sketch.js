let player;
let bullets = [];
let enemies = [];
let running = true;
let lobbyTime = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  player = new Player();
  enemies.push(new Shooter(createVector(innerWidth * 7 / 8, innerHeight * 7 / 8)));
  enemies.push(new Shooter(createVector(innerWidth * 7 / 8, innerHeight * 6 / 8)));
  enemies.push(new Shooter(createVector(innerWidth * 6 / 8, innerHeight * 7 / 8)));
  enemies.push(new Eater(createVector(innerWidth * 1 / 8, innerHeight * 1 / 8)));
}

function draw() {
  background(220);

  if (running) {
    //-------------------- Game State  --------------------
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

    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].draw();
      enemies[i].update();
      if (enemies[i].toDestroy)
        enemies.splice(i, 1);

    }
    if (enemies.length == 0)
      running = false;
    player.draw();
    player.update();

  } else {
    //---------------------- Lobby  -----------------------
    fill(240);
    textSize(34);
    text("You Fucked Up Bruh xD", player.x, player.y);
    text("Press ESC to get back to main menu", innerWidth / 2 - 250, 40);
    text("Press any other key or mouse button to play again", innerWidth / 2 - 350, 80);

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
        player.reset();
        bullets = [];
        enemies = [];
        enemies.push(new Shooter(createVector(innerWidth * 7 / 8, innerHeight * 7 / 8)));
        enemies.push(new Shooter(createVector(innerWidth * 7 / 8, innerHeight * 6 / 8)));
        enemies.push(new Shooter(createVector(innerWidth * 6 / 8, innerHeight * 7 / 8)));
        enemies.push(new Eater(createVector(innerWidth * 1 / 8, innerHeight * 1 / 8)));
        lobbyTime = 0;
      }

    } else {
      lobbyTime++;
    }

  }
  if (keyCode == 27)
    window.history.back();
}