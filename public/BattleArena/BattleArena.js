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
        send_update();
        const me = gameState.getCurrentState().me;
        if (dist(me.pos.x, me.pos.y, me.waypoint.x, me.waypoint.y) < 2) {
            player.waypoint.set(me.pos);
        }
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
    const me = gameState.getCurrentState().me;

    if (keyCode == 83) {        // 's' = 83
        player.waypoint.set(me.pos);
        animator.SetWaypoint.stop();
        keyCode = 0;
    } else if (keyCode == 68) {     // 'd' = 68
        // Right hand punch
        player.punchRight = true;   // Reset to false after sending update state to server, Networking.send_update()
        animator.Punch.start(false, true);
    } else if (keyCode == 70) {     // 'f' = 70
        // Left hand punch
        player.punchLeft = true;    // Reset to false after sending update state to server, Networking.send_update()
        animator.Punch.start(true, false);
    }
        
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Player {
    constructor() {
        this.pos = createVector(Math.random()*1500 + 100, Math.random()*800 + 100);
        this.waypoint = createVector(this.pos.x + 1, this.pos.y);
        this.punchLeft = false;
        this.punchRight = false;
    }
}

