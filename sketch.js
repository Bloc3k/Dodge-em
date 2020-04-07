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
  if (running) {
    //game is running

    background('#260B02');
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

    fill(240);
    textSize(34);
    text("You Fucked Up Bruh xD", player.x, player.y);
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