let agentsHandler;
let target;
let slider_agents;
let slider_speed;
let slider_force;
let slider_mass;

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
    slider_force = new Slider(30, 150, 1, 30);
    slider_force.setCur(12);
    slider_force.setText("Max Force");
    slider_mass = new Slider(30, 200, 1, 50);
    slider_mass.setCur(10);
    slider_mass.setText("Mass");
    //----------------------------------------
}

function draw() {
    background(33);

    agentsHandler.run();

    slider_agents.show();
    slider_speed.show();
    slider_force.show();
    slider_mass.show();
  
    target.draw();
    target.update();
  
    if (keyCode == 27)
        window.history.back();
}
