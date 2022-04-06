class Player {
  constructor() {
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
    this.speed = 6;
    this.width = 60;
    this.height = 70;
    this.padding = 5;
  }
  
  draw() {
    fill('#F2CB05');
    stroke('#F2CB05');
    rect(this.x, this.y, this.width, this.height , 4);
  }

  drawEffect(_duration, _effectTime) {
    fill(242,	203,	5, 60);
    stroke(242,	203,	5, 60);
    rect(this.x, this.y, this.width, this.height , 4);
    fill(242,	203,	5, 90);
    stroke(242,	203,	5, 100);
    rect(this.x, this.y + this.height, this.width, -(this.height/_duration)*_effectTime, 4);
  }

  update() {
    //ToDo: Handle shaking, so far it handle this if below, but than player position is not precise
    if (dist(mouseX - this.width/2 , mouseY- this.height/2, this.x, this.y) >= this.speed){
      let vMx = mouseX - this.width/2 - this.x;
      let vMy = mouseY - this.height/2 - this.y;

      let vNx = vMx / dist(mouseX - this.width/2, mouseY - this.height /2 , this.x, this.y);
      let vNy = vMy / dist(mouseX - this.width/2, mouseY- this.height /2 , this.x, this.y);

      let vDx = vNx * this.speed;
      let vDy = vNy * this.speed;

      this.x += vDx * deltaTime/11;
      this.y += vDy * deltaTime/11;

    }
    
    if (this.x <= this.padding)
      this.x = this.padding;
    if (this.x + this.width >= innerWidth - this.padding)
      this.x = innerWidth - this.width - this.padding;
    if (this.y <= this.padding)
      this.y = this.padding;
    if (this.y + this.height >= innerHeight - this. padding)
      this.y = innerHeight - this.height - this. padding;
  }

  reset(){
   this.x = innerWidth / 2;
    this.y = innerHeight / 2;
  }

}
