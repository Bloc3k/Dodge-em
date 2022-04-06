//--------------------- Receive --------------------
// Functions for receiving has to be added to coresponding
// socket.on listener in BattleArena.js in setup, after 
// socket.connect()

/**
 * Function for handling incoming players logins.
 * @param {*} data Data send with login from server
 */
function player_login(data) {
    players = data.playersDB;
    for (const playerID in players) {
        enemies[playerID] = new Enemy(players[playerID].x, players[playerID].y, players[playerID].id);
    }
}

function add_new_player(data) {
    enemies[data.id] = new Enemy(data.x, data.y, data.id);
}

function waypoint_update(data) {
    enemies[data.id].waypoint.set(data.x, data.y);
}

function player_logoff(data) {
    delete enemies[data.id];
}

//---------------------- SEND ----------------------
// Functions for sending informations to server are used all
// over the client code. And has to be handled in server API section.

/**
 * Send server login request.
 */
 function send_login() {
    const payload = {
        x: summoner.pos.x,
        y: summoner.pos.y
    }
    socket.emit('player login', payload);
}
/**
 * Send updated players waypoint to server.
 * Is called from setWaypoint() in Player class.
 */
function send_waypoint_update() {
    const payload = {
        x: summoner.waypoint.x,
        y: summoner.waypoint.y
    }
    socket.emit('waypoint update', payload);
}
