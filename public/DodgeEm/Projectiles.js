class Bullet {
  constructor(t) {
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.type = t;
    this.maxSpeed = 9;
    this.minSpeed = 5;
    this.dim = [90, 50]; //Height and width of projectils
    this.tolerance = 4;
    
    switch (this.type) {
      case 0:
        //Going down
        this.x = random(0, innerWidth - 50);
        this.y = random(-450, -100);
        this.dy = random(this.minSpeed, this.maxSpeed);
        this.width = this.dim[1];
        this.height = this.dim[0];
        break;
      case 1:
        //Going right
        this.y = random(100, innerHeight - 100);
        this.x = random(-450, -100);
        this.dx = random(this.minSpeed, this.maxSpeed);
        this.width = this.dim[0];
        this.height = this.dim[1];
        break;
  
    }
  }

  draw() {
    fill('#4BB2F2');
    stroke('#4BB2F2');
    rect(this.x, this.y, this.width, this.height, 8);
  }

  update() {
    this.x += this.dx * deltaTime/11;
    this.y += this.dy * deltaTime/11;

    if (this.x > innerWidth) {
      this.x = -250;
      this.y = random(mouseY - innerHeight/6, mouseY + innerHeight/6);
    }
    if (this.y > innerHeight) {
      this.y = -250;
      this.x = random(mouseX - innerWidth/9, mouseX + innerWidth/9);
    }

  }

  reset() {    
    switch (this.type) {
      case 0:
        //Going down
        this.x = random(0, innerWidth - 50);
        this.y = random(-450, -100);
        this.dy = random(4, 7);
        this.width = this.dim[1];
        this.height = this.dim[0];
        break;
      case 1:
        //Going right
        this.y = random(100, innerHeight - 100);
        this.x = random(-600, -70);
        this.dx = random(4, 7);
        this.width = this.dim[0];
        this.height = this.dim[1];
        break;
  
    }
    
  }

  colision(player) {
    if (player.x <= this.x + this.width - this.tolerance &&
      player.x + player.width >= this.x + this.tolerance &&
      player.y <= this.y + this.height - this.tolerance &&
      player.y + player.height >= this.y + this.tolerance ) {
      return true;
    } else {
      return false;
    }
  }
}

class Lasser {
  constructor() {
    this.x = 200;
    this.y = 400;
    this.dx = 4;
    this.dy = 0;
  }

  draw() {
    fill('#4BB2F2');
    stroke('#4BB2F2');
    rect(this.x, this.y, 30, 70, 8);
  }

  update() {

  }

  reset() {

  }

  colision(player) {

  }

}