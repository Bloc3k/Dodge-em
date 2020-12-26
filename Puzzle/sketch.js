let circle1;
let circle2;
let circle3;
let paddle;
let circle_Green;

function preload() {
    scale = 0;
    if (innerWidth <= innerHeight)
        scale = innerWidth;
    else
        scale = innerHeight;
    //--------------------  stones  -------------------------
    stone_Yellow = loadImage('/Puzzle/Assets/stoneY.png', img => {
        img.resize(scale/11 ,scale/11);
      });                                                             
    stone_Red = loadImage('/Puzzle/Assets/stoneR.png', img => {
        img.resize(scale/11 ,scale/11);
      });
    stone_Green = loadImage('/Puzzle/Assets/stoneG.png', img => {
        img.resize(scale/11 ,scale/11);
      });
    //-------------------  cylinders  -------------------------
    circle_Yellow = loadImage('/Puzzle/Assets/cirY.png', img => {
        img.resize(scale/4.2 ,scale/4.2);
      });
    circle_Red = loadImage('/Puzzle/Assets/cirR.png', img => {
        img.resize(scale/2.2 ,scale/2.2);
      });
    circle_Green = loadImage('/Puzzle/Assets/cirG.png', img => {
        img.resize(scale/1.5 ,scale/1.5);
      });                                                           
    circle_Purple = loadImage('/Puzzle/Assets/cirP.png', img => {
        img.resize(scale/1.13, scale/1.13);
      });
}

function  setup() {
    createCanvas(innerWidth,innerHeight);
    
    circle1 = new Circle1();
    circle2 = new Circle2();
    circle3 = new Circle3();
    paddle = new Paddle();
    
}

function draw() {
    background(0);
    imageMode(CENTER);

    //Paddle
    paddle.draw();

    //Circles
    circle1.draw();
    circle2.draw();
    circle3.draw();

    if (keyCode == 27)
        window.history.back();                //TODO: Make it go to Main menu and to just back in history
  
}

function mousePressed() { //TODO: Make images
    paddle.click();
    circle1.click();
    circle2.click();
    circle3.click();
} //TODO: Make winnig screen & winner board