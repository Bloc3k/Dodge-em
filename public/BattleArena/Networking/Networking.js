//--------------------- Receive --------------------
// Functions for receiving has to be added to coresponding
// socket.on listener in BattleArena.js in setup, after 
// socket.connect()

function update(newState) {
    gameState.gameUpdate(newState);
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
    socket.emit('LOGIN', {payload});
}
/**
 * Send updated players waypoint to server.
 * Is called from setWaypoint() in Player class.
 */
function send_update() {
    const payload = {
        x: summoner.waypoint.x,
        y: summoner.waypoint.y
    }
    socket.emit('UPDATE', payload);
}
