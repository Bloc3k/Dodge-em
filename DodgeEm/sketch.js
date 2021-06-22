var player;
var bullets = [];
var lassers = [];
var coin;
var running = false;
var leaderboard;
let scoring = false;

function setup() {
  createCanvas(innerWidth, innerHeight);
  player = new Player();
  coin = new Coin();
  leaderboard = new Leaderboard();

  for (let i = 0; i < innerWidth / 110; i++) {
    bullets[i] = new Bullet(i % 2);
  }
  document.cookie = "leaderboard=Yakub-69_LuckyBoy-31_PEPEE-21_OMEGALUL-19_KEKW-16_toddler-15_newbie-11_noob-7_rookie-6_pleb-3";
}

function draw() {
  background(0);
  
  if (running) {
    //------------------ Game is Running ------------------
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

    scoring = true;
  } else {
    //----------------------- LOBBY -----------------------
    for (let bullet of bullets) {
      bullet.draw();
    }
    coin.draw();
    player.draw();
    leaderboard.show();
    fill(240);
    textSize(34);
    if (floor(player.y % 3) == 0)
      text("You Died LOL xD", player.x, player.y);
    else if (floor(player.y % 3) == 1)
      text("I said withou dying OMG!!!", player.x, player.y);
    else
      text("Keep up <3", player.x, player.y);
    text("Press ESC to get back to main menu", innerWidth / 2 - 250, 40);
    text("Press any other key or mouse button to play again", innerWidth / 2 - 350, 80);
    text("Try to collect as many coins as possible without dying", innerWidth/2 - 300, innerHeight - 40);

    /*add new record*/
    if (coin.coinCount > leaderboard.topten[leaderboard.topten.length - 1][1]) {
      if (scoring) { 
        nickname = null;
        while (nickname == null)
        nickname = prompt("You're one of the best. You've earned a place in the Hell of Flame <3", "What's your nickname, sir?");
        leaderboard.update(nickname, coin.coinCount);
        scoring = false;
      }
    }

    /*Restart game*/
    if (keyIsPressed || mouseIsPressed) {
      running = true;
      coin.coinCount = 0;
      player.reset();
      bullets.forEach(function(entry) {
        entry.reset();
      });
    }
  }
  if (keyCode == 27)
    window.history.back();
  coin.drawScore();

}

function newRecord() {
  console.log(this.value);
}