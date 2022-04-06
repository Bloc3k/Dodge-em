let menu = {procedure:"seek", debug: false};//Opetions: 'seek','arrive','followPath','wander'
let agentsHandler;
let target;
let path;
let slider_agents;
let slider_speed;
let slider_force;
let rightButton = {clicked:false, x:null, y:null};

function preload() {
    click_s = loadSound("/AutoAgents/Assets/click.wav");
}

function setup() {
    createCanvas(innerWidth,innerHeight);
    noFill()
    agentsHandler = new AgentsHandler();
    target = new Target(createVector(300,500));
    path = new PathSegment(100,800,500,700);

    //--------------- Sliders ----------------
    slider_agents = new Slider(30,50, 1, 200);
    slider_agents.setCur(30);
    slider_agents.setText("Amount of Agents");
    slider_speed = new Slider(30, 100, 1, 50);
    slider_speed.setCur(18);
    slider_speed.setText("Max Speed");
    slider_force = new Slider(30, 150, 0.01, 5, 2);
    slider_force.setCur(0.6);
    slider_force.setText("Max Force");
    //----------------------------------------
    //Disables right click's default context menu
    document.addEventListener('contextmenu', event => event.preventDefault()); 
}

function draw() {
    background(33);
    
    //path.draw();
    //path.setA(target.getPosition());

    //--- What procedure does Agant follow ---
    switch (menu.procedure) {
        case "seek":
            agentsHandler.seek();
            break;
        case "arrive":
            agentsHandler.arrive();
            break;
        case "followPath":
            agentsHandler.followPath();
            agentsHandler.wander();
            break;
        case "wander":
            agentsHandler.wander();
            break;
    }
    //----------------------------------------

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
