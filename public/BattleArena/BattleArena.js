const PORT = 80;
const IP = "147.229.217.105";
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
let chat_del_hold = 0;
let short_delete = true;

let sound_volume = 1;

let options = {
    "pos": {"x": innerWidth - 25, "y": 25},
    "opened": false,
    "nickname_change": false,
    "nickname_holder": "",
    "shoot_keybind": "e",
    "shoot_change": false,
    "shoot_holder": "",
    "damage_keybind": "1",
    "damage_change": false,
    "damage_holder": "",
    "crit. chance_keybind": "2",
    "crit. chance_change": false,
    "crit. chance_holder": "",
    "max. hp_keybind": "3",
    "max. hp_change": false,
    "max. hp_holder": "",
    "max. speed_keybind": "4",
    "max. speed_change": false,
    "max. speed_holder": "",
    "bullet speed_keybind": "5",
    "bullet speed_change": false,
    "bullet speed_holder": "",
    "life steal_keybind": "6",
    "life steal_change": false,
    "life steal_holder": "",
    "WIDTH": 300,
    "HEIGHT": 500,
}

function preload() {
    glove_blue = loadImage('/BattleArena/Assets/glove_blue.png');
    glove_red = loadImage('/BattleArena/Assets/glove_red.png');
    FredokaOne_font = loadFont('/BattleArena/Assets/FredokaOne-Regular.ttf');
    // Sounds
    shoot_sfx = loadSound("/BattleArena/Assets/shoot.wav");
    keyboard_hit_sfx = loadSound("/BattleArena/Assets/keyhit.wav");
    level_up_sfx = loadSound("/BattleArena/Assets/levelup.wav");
    apply_button_sfx = loadSound("/BattleArena/Assets/apply_button.wav");
    hit_sfx = loadSound("/BattleArena/Assets/hit.wav");
    heal_sfx = loadSound("/BattleArena/Assets/heal.mp3");
    damage_taken_sfx = loadSound("/BattleArena/Assets/au.mp3");
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
            if (gameState.previousGameState) {
                level_up_audio_handler();
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
            keyboard_hit_sfx.setVolume(sound_volume);
            keyboard_hit_sfx.play();
        } else if (options.shoot_change) {
            options.shoot_change = false;
            keyboard_hit_sfx.setVolume(sound_volume);
            keyboard_hit_sfx.play();
        } else if (options.damage_change) {
            options.damage_change = false;
            keyboard_hit_sfx.setVolume(sound_volume);
            keyboard_hit_sfx.play();
        } else if (options["crit. chance_change"]) {
            options["crit. chance_change"] = false;
            keyboard_hit_sfx.setVolume(sound_volume);
            keyboard_hit_sfx.play();
        } else if (options["max. hp_change"]) {
            options["max. hp_change"] = false;
            keyboard_hit_sfx.setVolume(sound_volume);
            keyboard_hit_sfx.play();
        } else if (options["max. speed_change"]) {
            options["max. speed_change"] = false;
            keyboard_hit_sfx.setVolume(sound_volume);
            keyboard_hit_sfx.play();
        } else if (options["bullet speed_change"]) {
            options["bullet speed_change"] = false;
            keyboard_hit_sfx.setVolume(sound_volume);
            keyboard_hit_sfx.play();
        } else if (options["life steal_change"]) {
            options["life steal_change"] = false;
            keyboard_hit_sfx.setVolume(sound_volume);
            keyboard_hit_sfx.play();
        } else {
            chat.enter_handler();
        }
    } else {
        if (options["nickname_change"]) {
            // Changing nickname
            keyboard_menu_input(options, "nickname_holder", 20)
        } else if (options.shoot_change) {
            keyboard_menu_input(options, "shoot_holder", 1)
        } else if (options.damage_change) {
            keyboard_menu_input(options, "damage_holder", 1)
        } else if (options["crit. chance_change"]) {
            keyboard_menu_input(options, "crit. chance_holder", 1)
        } else if (options["max. hp_change"]) {
            keyboard_menu_input(options, "max. hp_holder", 1)
        } else if (options["max. speed_change"]) {
            keyboard_menu_input(options, "max. speed_holder", 1)
        } else if (options["bullet speed_change"]) {
            keyboard_menu_input(options, "bullet speed_holder", 1)
        } else if (options["life steal_change"]) {
            keyboard_menu_input(options, "life steal_holder", 1)
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
            if (keyCode == options.shoot_keybind.toUpperCase().charCodeAt(0)) {     // 'e' = 69
                if (me.hp > 0) {
                    player.cast = true;         // Reset to false after sending update state to server, Networking.send_update()
                    shoot_sfx.setVolume(sound_volume*2.5);
                    shoot_sfx.play();                    
                    player.waypoint.set(me.pos);
                }
            } else if (keyIsDown(options["damage_keybind"].toUpperCase().charCodeAt(0))) {   //49 = 1
                // Damage
                if (me.spell_damage < 300) { // Cap on 300 has to be set on server (BA_Game.player_update()), on clinet in Render.js render_level_up() and in BattleArena.js level_up_menu_handler()
                    player.level_up = 1;
                }
            } else if (keyIsDown(options["crit. chance_keybind"].toUpperCase().charCodeAt(0))) {    // 50 = 2
                // Crit Chance 
                if (me.crit_chance < 1) {
                    player.level_up = 2;
                }
            } else if (keyIsDown(options["max. hp_keybind"].toUpperCase().charCodeAt(0))) {    // 51 = 3
                // Max. HP
                if (me.max_hp < 200) {
                    player.level_up = 3;
                }
            } else if (keyIsDown(options["max. speed_keybind"].toUpperCase().charCodeAt(0))) {    // 52 = 4
                // Max. Speed
                if (me.max_speed < 30) {
                    player.level_up = 4;
                }
            } else if (keyIsDown(options["bullet speed_keybind"].toUpperCase().charCodeAt(0))) {    // 53 = 5
                // Max. Bullet Speed
                if (me.spell_speed < 40) {
                    player.level_up = 5;
                }
            } else if (keyCode == options["life steal_keybind"].toUpperCase().charCodeAt(0)) {    // 54 = 6
                // Life steal
                if (me.lifesteal < 1) {
                    player.level_up = 6;
                }
            } else if (keyCode == 83) {        // 's' = 83
                player.waypoint.set(me.pos);
                animator.SetWaypoint.stop();
                keyCode = 0;
            } else if (keyCode == 70) {     // 'f' = 70
                // Left hand punch
                player.punchLeft = true;    // Reset to false after sending update state to server, Networking.send_update()
                animator.Punch.start(true, false);
            } else if (keyCode == 68) {     // 'd' = 68
                // Right hand punch
                player.punchRight = true;   // Reset to false after sending update state to server, Networking.send_update()
                animator.Punch.start(false, true);
            } 
        }
    }
}

function keyboard_menu_input(options_obj, buffer_name, buffer_length) {
    if (key == 'Backspace') {
        options_obj[buffer_name] = options_obj[buffer_name].slice(0, -1); 
        keyboard_hit_sfx.setVolume(sound_volume);
        keyboard_hit_sfx.play();
    } else if (key == '?' || key == '+') {
        if (options_obj[buffer_name].length < buffer_length) {
            options_obj[buffer_name] += key;
            keyboard_hit_sfx.setVolume(sound_volume);
            keyboard_hit_sfx.play();
        }
    } else if ('abcdefghijklmnopqrstuvwxyz1234567890,.#%^&*()@~`<> !:?/\\|-_+="\';'.search(key.toLowerCase()) !== -1) {
        if (options_obj[buffer_name].length < buffer_length) {
            options_obj[buffer_name] += key;
            keyboard_hit_sfx.setVolume(sound_volume);
            keyboard_hit_sfx.play();
        }   
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
} 

function keyReleased() {
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
        mouseY < innerHeight - 140 &&
        mouseY > innerHeight - 165 ) {
            // Damage
            if (me.spell_damage < 300) { // Cap on 300 has to be set on server (BA_Game.player_update()), on clinet in Render.js render_level_up() and in BattleArena.js level_up_menu_handler()
                player.level_up = 1;
            }
    } else if (mouseX > 205 &&
        mouseX < 225 &&
        mouseY < innerHeight - 115 &&
        mouseY > innerHeight - 140 ) {
            // Crit Chance 
            if (me.crit_chance < 1) {
                player.level_up = 2;
            }
    } else if (mouseX > 205 &&
        mouseX < 225 &&
        mouseY < innerHeight - 95 &&
        mouseY > innerHeight - 115 ) {
            // Max. HP
            if (me.max_hp < 200) {
                player.level_up = 3;
            }
    } else if (mouseX > 205 &&
        mouseX < 225 &&
        mouseY < innerHeight - 70 &&
        mouseY > innerHeight - 90 ) {
            // Max. Speed
            if (me.max_speed < 30) {
                player.level_up = 4;
            }
    } else if (mouseX > 205 &&
        mouseX < 225 &&
        mouseY < innerHeight - 45 &&
        mouseY > innerHeight - 65 ) {
            // Max. Bullet Speed
            if (me.spell_speed < 40) {
                player.level_up = 5;
            }
    } else if (mouseX > 205 &&
        mouseX < 225 &&
        mouseY < innerHeight - 20 &&
        mouseY > innerHeight - 40 ) {
            // Max. Bullet Speed
            if (me.spell_speed < 40) {
                player.level_up = 6;
            }
    }
        
}

function options_handler(x, y) {
    if (click_in(x, y, 29, 27)) {
        // Open Main Menu
        options.opened = true;
    } else if (options.opened) {
        // --------- Main Menu ----------
        if (click_in(
            options.pos.x - options.WIDTH/2, 
            options.pos.y + options.HEIGHT/7, 
            options.WIDTH - options.WIDTH/4, 
            30
        )) {
            // Change Nickname
            options.nickname_change = true;
            options.nickname_holder = '';
            // Reset changing other bindins
            options.shoot_change = false;
            options.damage_change = false;
            options["crit. chance_change"] = false;
            options["max. hp_change"] = false;
            options["max. speed_change"] = false;
            options["bullet speed_change"] = false;
            options["life steal_change"] = false;
        } else if (click_in(
            options.pos.x - options.WIDTH/2, 
            options.pos.y + options.HEIGHT/3.3, 
            options.WIDTH - options.WIDTH/4, 
            20
        )) {
            // Change Shoot binding
            options["shoot_change"] = true;
            options["shoot_holder"] = '';
            // Reset changing other bindins
            options.nickname_change = false;
            options.damage_change = false;
            options["crit. chance_change"] = false;
            options["max. hp_change"] = false;
            options["max. speed_change"] = false;
            options["bullet speed_change"] = false;
            options["life steal_change"] = false;
        } else if (click_in(
            options.pos.x - options.WIDTH/2, 
            options.pos.y + options.HEIGHT/2.45, 
            options.WIDTH - options.WIDTH/6, 
            25
        )) {
            // Change Damage level up binding
            options["damage_change"] = true;
            options["damage_holder"] = '';
            // Reset changing other bindins
            options.nickname_change = false;
            options.shoot_change = false;
            options["crit. chance_change"] = false;
            options["max. hp_change"] = false;
            options["max. speed_change"] = false;
            options["bullet speed_change"] = false;
            options["life steal_change"] = false;
        } else if (click_in(
            options.pos.x - options.WIDTH/2, 
            options.pos.y + options.HEIGHT/2.16, 
            options.WIDTH - options.WIDTH/6,  
            30
        )) {
            // Change Crit. Chance level up binding
            options["crit. chance_change"] = true;
            options["crit. chance_holder"] = '';
            // Reset changing other bindins
            options.nickname_change = false;
            options.shoot_change = false;
            options.damage_change = false;
            options["max. hp_change"] = false;
            options["max. speed_change"] = false;
            options["bullet speed_change"] = false;
            options["life steal_change"] = false;
        } else if (click_in(
            options.pos.x - options.WIDTH/2, 
            options.pos.y + options.HEIGHT/1.928, 
            options.WIDTH - options.WIDTH/6, 
            30
        )) {
            // Change Max. HP level up binding
            options["max. hp_change"] = true;
            options["max. hp_holder"] = '';
            // Reset changing other bindins
            options.nickname_change = false;
            options.shoot_change = false;
            options.damage_change = false;
            options["crit. chance_change"] = false;
            options["max. speed_change"] = false;
            options["bullet speed_change"] = false;
            options["life steal_change"] = false;
        } else if (click_in(
            options.pos.x - options.WIDTH/2, 
            options.pos.y + options.HEIGHT/1.745, 
            options.WIDTH - options.WIDTH/6,  
            30
        )) {
            // Change Max. Speed level up binding
            options["max. speed_change"] = true;
            options["max. speed_holder"] = '';
            // Reset changing other bindins
            options.nickname_change = false;
            options.shoot_change = false;
            options.damage_change = false;
            options["crit. chance_change"] = false;
            options["max. hp_change"] = false;
            options["bullet speed_change"] = false;
            options["life steal_change"] = false;
        } else if (click_in(
            options.pos.x - options.WIDTH/2, 
            options.pos.y + options.HEIGHT/1.59, 
            options.WIDTH - options.WIDTH/6,  
            30
        )) {
            // Change Bullet Speed level up binding
            options["bullet speed_change"] = true;
            options["bullet speed_holder"] = '';
            // Reset changing other bindins
            options.nickname_change = false;
            options.shoot_change = false;
            options.damage_change = false;
            options["crit. chance_change"] = false;
            options["max. hp_change"] = false;
            options["max. speed_change"] = false;
            options["life steal_change"] = false;
        } else if (click_in(
            options.pos.x - options.WIDTH/2, 
            options.pos.y + options.HEIGHT/1.46, 
            options.WIDTH - options.WIDTH/6,  
            30
        )) {
            // Change Life Steal level up binding
            options["life steal_change"] = true;
            options["life steal_holder"] = '';
            // Reset changing other bindins
            options.nickname_change = false;
            options.shoot_change = false;
            options.damage_change = false;
            options["crit. chance_change"] = false;
            options["max. hp_change"] = false;
            options["max. speed_change"] = false;
            options["bullet speed_change"] = false;
        } else if (click_in(
            options.pos.x - options.WIDTH/6, 
            options.pos.y + options.HEIGHT/1.1, 
            options.WIDTH/5, 
            30
        )) {
            // Apply Button
            apply_button_sfx.setVolume(sound_volume);
            apply_button_sfx.play();

            options.opened = false;
            player.nickname = options.nickname_holder;
            options.nickname_holder = '';
            options.nickname_change = false;
            if (options.shoot_holder.length > 0)
                options.shoot_keybind = options.shoot_holder;
            options.shoot_change = false;
            if (options.damage_holder.length > 0)
                options.damage_keybind = options.damage_holder;
            options.damage_change = false;
            if (options["crit. chance_holder"].length > 0)
                options["crit. chance_keybind"] = options["crit. chance_holder"];
            options["crit. chance_change"] = false;
            if (options["max. hp_holder"].length > 0)
                options["max. hp_keybind"] = options["max. hp_holder"];
            options["max. hp_change"] = false;
            if (options["max. speed_holder"].length > 0)
                options["max. speed_keybind"] = options["max. speed_holder"];
            options["max. speed_change"] = false;
            if (options["bullet speed_holder"].length > 0)
                options["bullet speed_keybind"] = options["bullet speed_holder"];
            options["bullet speed_change"] = false;
            options["life steal_change"] = false;
            if (options["life steal_holder"].length > 0)
                options["life steal_keybind"] = options["life steal_holder"];
        } else {
            // Click outside menu
            options.opened = false;
            options.shoot_holder = options.shoot_keybind;
            options.shoot_change = false;
            options.damage_holder = options.damage_keybind;
            options.damage_change = false;
            options["crit. chance_holder"] = ''
            options["crit. chance_change"] = false;
            options["max. hp_holder"] = ''
            options["max. hp_change"] = false;
            options["max. speed_holder"] = ''
            options["max. speed_change"] = false;
            options["bullet speed_holder"] = ''
            options["bullet speed_change"] = false;
            options["life steal_holder"] = ''
            options["life steal_change"] = false;
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

function level_up_audio_handler() {
    if (gameState.previousGameState.me.level !== gameState.lastGameState.me.level) {
        level_up_sfx.setVolume(sound_volume);
        level_up_sfx.play();        
    }
}
