let agentsHandler;
let target;
let slider_agents;
let slider_speed;
let slider_force;
let rightButton = {clicked:false, x:null, y:null};

function preload() {
    click_s = loadSound("/AutoAgents/Assets/click.wav");
}

function setup() {
    createCanvas(innerWidth,innerHeight);
    agentsHandler = new AgentsHandler();
    target = new Target(createVector(300,500));

    //--------------- Sliders ----------------
    slider_agents = new Slider(30,50, 1, 200);
    slider_agents.setCur(1);
    slider_agents.setText("Amount of Agents");
    slider_speed = new Slider(30, 100, 1, 50);
    slider_speed.setText("Max Speed");
    slider_force = new Slider(30, 150, 0.1, 15);
    slider_force.setCur(12);
    slider_force.setText("Max Force");
    //----------------------------------------
    //Disables right click's default context menu
    document.addEventListener('contextmenu', event => event.preventDefault()); 
}

function draw() {
    background(33);

    agentsHandler.seek();
    //agentsHandler.arrive();

    slider_agents.show(click_s);
    slider_speed.show(click_s);
    slider_force.show(click_s);
  
    target.draw();
    target.update();

    if (rightButton.clicked) {
        contextMenu();
   } 
  
    if (keyCode == 27)
        window.history.back();
}

function mousePressed() {
    slider_agents.mousePressed(mouseX, mouseY);
    slider_speed.mousePressed(mouseX, mouseY);
    slider_force.mousePressed(mouseX, mouseY);
    
    if(mouseButton === RIGHT) {
        rightButton.clicked = true;
        rightButton.x = mouseX;
        rightButton.y = mouseY;
    }
}

function contextMenu() {
    push();

    fill(24);
    noStroke();
    rect(rightButton.x, rightButton.y, 200, 80);
    fill(220);
    textSize(18);
    text("Options pičo...", rightButton.x + 6, rightButton.y + 18);

    //------- This prevents it from appearing -------
    rightButton.clicked = false; 
    //-----------------------------------------------

    pop();
}
