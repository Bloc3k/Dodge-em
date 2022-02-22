const API_URL_GET = "https://games.nohavovi.cz/api/leaderboard";   //GET api url
const API_URL_POST = "https://games.nohavovi.cz/api/update";   //POST api url
var player;
var leaderboard_json;
var bullets = [];
var lassers = [];
var coin;
var running = false;
var leaderboard;
let scoring = false;
let reseter;
let skill_f;
let skill_d;
let stealth_s, coin_s, reset_s, gameover_s, click_s, placed_s, port_s;

function preload() {
  leaderboard_json = loadJSON(API_URL_GET);   //preload leaderboard
  stealth_s = loadSound("/DodgeEm/Assests/stelth.wav");
  coin_s = loadSound("/DodgeEm/Assests/pop.wav");
  reset_s = loadSound("/DodgeEm/Assests/pop1.wav");
  gameover_s = loadSound("/DodgeEm/Assests/gameover.wav");
  click_s = loadSound("/DodgeEm/Assests/click.wav");
  placed_s = loadSound("/DodgeEm/Assests/placed.wav");
  port_s = loadSound("/DodgeEm/Assests/port.wav");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  leaderboard = new Leaderboard(leaderboard_json);
  player = new Player();
  coin = new Coin();
  reseter = new Reseter();
  skill_f = new Skills();
  
  for (let i = 0; i < innerWidth*innerHeight / 121000; i++) { //11
    bullets[i] = new Bullet(i % 2);
  }

}

function draw() {
  background(30);
  
  if (running) {
    //------------------ Game is Running ------------------
    skill_f.drawPortal();
    reseter.draw();
    reseter.update();
    skill_f.update(stealth_s, click_s, player, placed_s, port_s);
    
    for (let bullet of bullets) {
      bullet.draw();
      bullet.update();
      if (skill_f.effect == false && skill_f.effect_d == false) { /*Not detecting if skill is on*/
        if (bullet.colision(player)){
          running = false;
          gameover_s.play();
          gameover_s.setVolume(0.4);
        }
      }
    }
    if (coin.colected(player)) {
      coin_s.play();
      coin.coinCount++;
      coin.respawn();
      reseter.reset();
    }
    coin.draw();
    if (skill_f.effect == true)
      player.drawEffect(skill_f.duration, skill_f.effectTime);
    else if (skill_f.effect_d)
      player.drawEffect(skill_f.duration_Tel, skill_f.effectTime_d)
    else
      player.draw();
    player.update();

    if (reseter.colected(player)) {
      reset_s.play();
      coin.respawn();
      reseter.timer = 0;
      reseter.done = false;
    }

    skill_f.draw();

    scoring = true;
  } else {
    //----------------------- LOBBY -----------------------
    skill_f.drawPortal();
    reseter.draw();
    reseter.timer = 0;
    reseter.done = false;
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
      text("Keep up <3", player.x, player.y);
    text("Press ESC to get back to main menu", innerWidth / 2 - 250, 40);
    text("Press Left Mouse button to play again", innerWidth / 2 - 250, 80);

    /*add new record*/
    if (coin.coinCount > leaderboard.topten[leaderboard.topten.length - 1].score) {
      if (scoring) { 
        nickname = null;
        nickname = prompt("You're one of the best. You've earned a place in the Hell of Flame <3 \nMax length: 10 ", "What's your nickname, sir?");
        if (nickname != null) 
          leaderboard.update(nickname.substring(0, 10), coin.coinCount);
        scoring = false;
      }
    }
    
    /*Game is restarted in mousePressed() function 
      at the end of this file*/
    
  }
  if (keyCode == 27)
    window.history.back();

  coin.drawScore();
  skill_f.draw();
}

/*Restart game*/
function mousePressed() {
  if (!running) {
    running = true;
    coin.coinCount = 0;
    player.reset();
    bullets.forEach(function(entry) {
      entry.reset();
    });
    skill_f.reset();
  }
}
