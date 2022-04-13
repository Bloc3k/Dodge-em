const PORT = 60606;
const IP = "127.0.0.1";
const FRAME_RATE = 60;
let socket;

let summoner;
const allies = {};
const enemies = {};

let gameState;
let animator;

function preload() {
    glove_blue = loadImage('/BattleArena/Assets/glove_blue.png');
    glove_red = loadImage('/BattleArena/Assets/glove_red.png');
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    frameRate(FRAME_RATE);

    socket = io('localhost:60606', {
        transports: ['websocket'],
        forceNode: true,
    });

    summoner = new Summoner(innerWidth/2, innerHeight/2, socket.id);
    animator = new Animator();
    gameState = new GameState();

    // ---------- Receving API -----------
    socket.on('UPDATE', update);
    // -----------------------------------
    
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
        enemies[enemy].update()
        enemies[enemy].draw()
    }
    for (const ally in allies) {
        allies[ally].update()
        allies[ally].draw()
    } 
    

    if (keyCode == 27)
        window.history.back();
}

function mousePressed() {
    if(mouseButton === RIGHT) {
        summoner.setWaypoint(mouseX, mouseY);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

