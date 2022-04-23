const PORT = 60606;
const IP = "127.0.0.1";
const FRAME_RATE = 60;

let socket;
let gameState;
let animator;

let player;
let playing = false;

function preload() {
    glove_blue = loadImage('/BattleArena/Assets/glove_blue.png');
    glove_red = loadImage('/BattleArena/Assets/glove_red.png');
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    frameRate(FRAME_RATE);

    socket = io(`${IP}:${PORT}`, {
        transports: ['websocket'],
        forceNode: true,
    });

    animator = new Animator();
    gameState = new GameState();
    player = new Player();

    // ---------- Receving API -----------
    socket.on('UPDATE', update);
    // -----------------------------------  

    send_update();

    // Disables right click's default context menu
    document.addEventListener('contextmenu', event => event.preventDefault()); 
}

function draw() {
    background(33);

    // If playing Render current game state and send UPDATE to server
    if (playing) {
        render();
        player.heading = createVector(gameState.getCurrentState().me.pos.x - mouseX, gameState.getCurrentState().me.pos.y - mouseY).heading() - PI/2;
        send_update();
    }

    // Hitting 'Esc' will take browser back in history
    if (keyCode == 27)
        window.history.back();
}

function mousePressed() {
    if(mouseButton === RIGHT) {
        player.waypoint.set(mouseX, mouseY);
        animator.SetWaypoint.start(mouseX, mouseY);
    }
}

function keyPressed() {
    if(keyCode == 83) { // 's' = 83
        // Important to set waypoint this way. Other wise it uses reference and updates in future as well.
        const pos = gameState.getCurrentState().me.pos;
        player.waypoint.set(pos.x, pos.y);
        animator.SetWaypoint.stop();
        keyCode = 0;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Player {
    constructor() {
        this.pos = createVector(Math.random()*500 + 100, Math.random()*300 + 100);
        this.waypoint = createVector(this.pos.x, this.pos.y);
        this.heading = createVector(this.pos.x - mouseX, this.pos.y - mouseY).heading() - PI/2;
    }
}

