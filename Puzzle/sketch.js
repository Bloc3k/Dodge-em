let circle1;
let circle2;
let circle3;
let paddle;

function  setup() {
    createCanvas(innerWidth,innerHeight);
    
    circle1 = new Circle1();
    circle2 = new Circle2();
    circle3 = new Circle3();
    paddle = new Paddle();
    
}

function draw() {
    background(0);

    //Paddle
    paddle.draw();

    //Circles
    circle1.draw();
    circle2.draw();
    circle3.draw();
  

    if (keyCode == 27)
        window.history.back();                //TODO: Make it go to Main menu and to just back in history
  
}

function mousePressed() {
    paddle.click();
    circle1.click();
    circle2.click();
    circle3.click();
}