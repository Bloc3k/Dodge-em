class Coin {
  constructor() {
    this.x = random(90, innerWidth - 90);
    this.y = random(90, innerHeight - 90);
    this.coinCount = 0;
    this.size = 30
  }
  draw() {
    fill('#F24130');
    stroke('#F24130');
    circle(this.x, this.y, this.size);
  }

  respawn() {
    this.x = random(90, innerWidth - 90);
    this.y = random(90, innerHeight - 90);
  }

  colected(player) {
     return (player.x < this.x + this.size / 2 &&
         player.x + player.width > this.x - this.size / 2 &&
         player.y < this.y + this.size / 2 &&
         player.y + player.height > this.y - this.size/ 2);
  }

  drawScore() {
    fill(240);
    textSize(60);
    text(this.coinCount, 15, 60);
  }
}