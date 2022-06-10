const PORT = 80;
const IP = "192.168.0.101";
const FRAME_RATE = 60;

let socket;
let gameState;
let animator;
let chat;

let player;
let playing = false;
let dead_timestamp;

let FredokaOne_font;
let level_up_menu = false;
let short_level_up = true;
let chat_del_hold = 0;
let short_delete = true;

let options = {
    "pos": {"x": innerWidth - 25, "y": 25},
    "opened": false,
    "nickname_change": false,
    "nickname_holder": "",
    "WIDTH": 300,
    "HEIGHT": 400,
}

function preload() {
    glove_blue = loadImage('/BattleArena/Assets/glove_blue.png');
    glove_red = loadImage('/BattleArena/Assets/glove_red.png');
    FredokaOne_font = loadFont('/BattleArena/Assets/FredokaOne-Regular.ttf');
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    frameRate(FRAME_RATE);

    socket = io(`${IP}:${PORT}`, {
        transports: ['websocket'],
        forceNode: true,
    });

    chat = new Chat();
    animator = new Animator();
    gameState = new GameState();
    player = new Player();

    // ---------- Receving API -----------
    socket.on('UPDATE', update);
    socket.on('CHAT', chat_in);
    // -----------------------------------  

    send_update();

    // Disables right click's default context menu
    document.addEventListener('contextmenu', event => event.preventDefault());
    
    // Disable ctrl & alt default shortcuts
    document.body.addEventListener('keydown', event => {
        if (event.ctrlKey && 'cvxspwuaz12345'.indexOf(event.key) !== -1) {
          event.preventDefault()
        }
        if (event.altKey !== -1) {
            event.preventDefault()
          }
      }) 
}

function draw() {
    background(33);

    if (gameState.lastGameState) {
        // If playing Render current game state and send UPDATE to server
        if (playing) {
            render();
            send_update();
            const me = gameState.getCurrentState().me;
            if (dist(me.pos.x, me.pos.y, me.waypoint.x, me.waypoint.y) < 2) {
                player.waypoint.set(me.pos);
            }
        } else {
            // DEAD
            render();
            send_update();
            const me = gameState.getCurrentState().me;
            if (dist(me.pos.x, me.pos.y, me.waypoint.x, me.waypoint.y) < 2) {
                player.waypoint.set(me.pos);
            }
        }

        if (short_level_up) {
            const me = gameState.getCurrentState().me;
            if (keyIsDown(18) && keyIsDown(49)) {   // 18 = Alt, 49 = 1
                // Damage
                if (me.spell_damage < 300) { // Cap on 300 has to be set on server (BA_Game.player_update()), on clinet in Render.js render_level_up() and in BattleArena.js level_up_menu_handler()
                    player.level_up = 1;
                }
                short_level_up = false;
            } else if (keyIsDown(18) && keyIsDown(50)) {    // 50 = 2
                // Crit Chance 
                if (me.crit_chance < 1) {
                    player.level_up = 2;
                }
                short_level_up = false;
            } else if (keyIsDown(18) && keyIsDown(51)) {    // 51 = 3
                // Max. HP
                if (me.max_hp < 200) {
                    player.level_up = 3;
                }
                short_level_up = false;
            } else if (keyIsDown(18) && keyIsDown(52)) {    // 52 = 4
                // Max. Speed
                if (me.max_speed < 30) {
                    player.level_up = 4;
                }
                short_level_up = false;
            } else if (keyIsDown(18) && keyIsDown(53)) {    // 53 = 5
                // Max. Bullet Speed
                if (me.spell_speed < 40) {
                    player.level_up = 5;
                }
                short_level_up = false;
            } 
        }
    }
    if (options.nickname_change) {
        if (keyIsDown(8) && keyIsDown(17)) {     // 'Ctrl' = 17
            if (short_delete) {
                // Remove last word
                re = /[^|\s]\w*$/;
                index = options.nickname_holder.search(re);
                options.nickname_holder = options.nickname_holder.slice(0, index);
                short_delete = false;   
            }
        } else if (keyIsDown(8)) {     // 'Backspace' = 8
            if (chat_del_hold > 1.4 * deltaTime)
                options.nickname_holder = options.nickname_holder.slice(0, -1);
            chat_del_hold++;
        }
    } else if (chat.writing) {
        if (keyIsDown(8) && keyIsDown(17)) {     // 'Ctrl' = 17
            if (short_delete) {
                // Remove last word
                re = /[^|\s]\w*$/;
                index = chat.holder.search(re);
                chat.holder = chat.holder.slice(0, index);
                short_delete = false;   
            }
        } else if (keyIsDown(8)) {     // 'Backspace' = 8
            if (chat_del_hold > 1.4 * deltaTime)
                chat.holder = chat.holder.slice(0, -1);
            chat_del_hold++;
        }
    }

    // Hitting 'Esc' will take browser back in history
    if (keyCode == 27)
        window.history.back();
}

function mousePressed() {
    if (mouseButton === RIGHT) {
        player.waypoint.set(mouseX, mouseY);
        animator.SetWaypoint.start(mouseX, mouseY);
    }
    if (mouseButton === LEFT) {
        level_up_menu_handler();
        options_handler(options.pos.x, options.pos.y);
    }
}

function keyPressed() {
    const me = gameState.getCurrentState().me;

    if (keyCode == 13) {        // 'Enter' = 13
        if (options.nickname_change) {
            options.nickname_change = false;
            player.nickname = options.nickname_holder;
        } else {
            chat.enter_handler();
        }
    } else {
        if (options.nickname_change) {
            // Changing nickname
            textSize(16);
            if (key == 'Backspace') {
                options.nickname_holder = options.nickname_holder.slice(0, -1); 
            } else if (key == '?' || key == '+') {
                if (options.nickname_holder.length < 20) 
                    options.nickname_holder += key;
            } else if ('abcdefghijklmnopqrstuvwxyz1234567890,.#%^&*()@~`<>!:?|-_+="\';'.search(key.toLowerCase()) !== -1) {
                if (options.nickname_holder.length < 20)
                    options.nickname_holder += key;
            } 
        } else if (chat.writing) {
            // Typing in chat
            textSize(chat.TEXT_SIZE);
            if (key == 'Backspace') {
                chat.holder = chat.holder.slice(0, -1); 
            } else if (key == '?' || key == '+') {
                if (textWidth(chat.holder) < chat.WIDHT - 30)      chat.holder += key;
            } else if ('abcdefghijklmnopqrstuvwxyz1234567890,.#%^&*()@~`<> !:?/\\|-_+="\';'.search(key.toLowerCase()) !== -1) {
                if (textWidth(chat.holder) < chat.WIDHT - 30)      chat.holder += key;
            } 
        } else {
            // Handle input
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
        } else if (keyCode == 69) {     // 'e' = 69
                if (me.hp > 0) {
                    player.cast = true;         // Reset to false after sending update state to server, Networking.send_update()
                    player.waypoint.set(me.pos);
                }
            }
        }
    }
    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
} 

function keyReleased() {
    short_level_up = true;
    short_delete = true;
    chat_del_hold = 0;
}

class Player {
    constructor() {
        this.pos = createVector(Math.random()*1500 + 100, Math.random()*800 + 100);
        this.waypoint = createVector(this.pos.x + 1, this.pos.y);
        this.punchLeft = false;
        this.punchRight = false;
        this.dead = false;
        this.level_up = null;  // Damage=1, Crit=2, HP=3, Speed=4, bullet_speed=5
        this.nickname = null;
    }
}

function level_up_menu_handler() {
    const me = gameState.getCurrentState().me;
    
    if (mouseX > 205 &&
        mouseX < 225 &&
        mouseY < innerHeight - 115 &&
        mouseY > innerHeight - 140 ) {
            // Damage
            if (me.spell_damage < 300) { // Cap on 300 has to be set on server (BA_Game.player_update()), on clinet in Render.js render_level_up() and in BattleArena.js level_up_menu_handler()
                player.level_up = 1;
            }
    } else if (mouseX > 205 &&
        mouseX < 225 &&
        mouseY < innerHeight - 95 &&
        mouseY > innerHeight - 115 ) {
            // Crit Chance 
            if (me.crit_chance < 1) {
                player.level_up = 2;
            }
    } else if (mouseX > 205 &&
        mouseX < 225 &&
        mouseY < innerHeight - 70 &&
        mouseY > innerHeight - 90 ) {
            // Max. HP
            if (me.max_hp < 200) {
                player.level_up = 3;
            }
    } else if (mouseX > 205 &&
        mouseX < 225 &&
        mouseY < innerHeight - 45 &&
        mouseY > innerHeight - 65 ) {
            // Max. Speed
            if (me.max_speed < 30) {
                player.level_up = 4;
            }
    } else if (mouseX > 205 &&
        mouseX < 225 &&
        mouseY < innerHeight - 20 &&
        mouseY > innerHeight - 40 ) {
            // Max. Bullet Speed
            if (me.spell_speed < 40) {
                player.level_up = 5;
            }
    } 
        
}

function options_handler(x, y) {
    if (click_in(x, y, 29, 27)) {
        // Open Main Menu
        options.opened = true;
    } else if (options.opened) {
        // --------- Main Menu -
        if (click_in(
            options.pos.x - options.WIDTH/2, 
            options.pos.y + options.HEIGHT/7, 
            options.WIDTH - options.WIDTH/4, 
            30
        )) {
            // Change Nickname
            options.nickname_change = true;
            options.nickname_holder = '';
        } else if (click_in(
            options.pos.x - options.WIDTH/6, 
            options.pos.y + options.HEIGHT/1.1, 
            options.WIDTH/5, 
            30
        )) {
            // Apply button
            options.opened = false;
            player.nickname = options.nickname_holder;
            options.nickname_holder = '';
            options.nickname_change = false;
        } else {
            options.opened = false;
        }
    }
}

function click_in(x, y, width, height) {
    if (mouseX > x - width/2  &&
        mouseX < x + width/2  &&
        mouseY < y + height/2 &&
        mouseY > y - height/2 ) {
            return true;
    } else {
        return false;
    }
}