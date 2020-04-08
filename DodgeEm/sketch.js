var player;
var bullets = [];
var lassers = [];
var coin;
var running = true;

function setup() {
  createCanvas(innerWidth, innerHeight);
  player = new Player();
  coin = new Coin();

  for (let i = 0; i < innerWidth / 110; i++) {
    bullets[i] = new Bullet(i % 2);
  }
}

function draw() {
  background(0);
  
  if (running) {
    //game is running
    player.update();

    for (let bullet of bullets) {
      bullet.draw();
      bullet.update();
      if (bullet.colision(player))
        running = false;
    }
    if (coin.colected(player)) {
      coin.coinCount++;
      coin.respawn();
    }

    coin.draw();
    player.draw();

  } else {
    //game is not running
    for (let bullet of bullets) {
      bullet.draw();
    }
    if (keyCode == 27)
      window.history.back();
    coin.draw();
    player.draw();
    fill(240);
    textSize(34);
    text("You Fucked Up Bruh xD", player.x, player.y);
    text("Press ESC to get back to main menu", innerWidth / 2 - 250, 40);
    text("Press any other key or mouse botton to play again", innerWidth / 2 - 350, 80);
    if (keyIsPressed || mouseIsPressed) {
      running = true;
      coin.coinCount = 0;
      player.reset();
      bullets.forEach(function(entry) {
      entry.reset();
      });
    }
  }
  coin.drawScore();
}