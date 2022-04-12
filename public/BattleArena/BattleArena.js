const PORT = 60606;
const IP = "127.0.0.1";
let socket;

let summoner;
const allies = {};
const enemies = {};

let animator;

function setup() {
    createCanvas(innerWidth, innerHeight);

    socket = io('localhost:60606', {
        transports: ['websocket'],
        forceNode: true,
    });

    summoner = new Summoner(innerWidth/2, innerHeight/2, socket.id);
    animator = new Animator();

    socket.on('player login', player_login);
    socket.on('new player', add_new_player);
    socket.on('player logoff', player_logoff);
    socket.on('waypoint update', waypoint_update);
    
    send_login();

    //Disables right click's default context menu
    document.addEventListener('contextmenu', event => event.preventDefault()); 
}

function draw() {
    background(33);

    animator.animate();
    
    summoner.update();
    summoner.draw();
    for (const enemy in enemies) {
        enemies[enemy].draw()
        enemies[enemy].update()
    }
    for (const ally in allies) {
        allies[ally].draw()
        allies[ally].update()
    } 
    

    if (keyCode == 27)
        window.history.back();
}

function mousePressed() {
    if(mouseButton === RIGHT) {
        summoner.setWaypoint(mouseX, mouseY);
    }
}

