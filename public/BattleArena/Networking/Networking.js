//--------------------- Receive --------------------
// Functions for receiving has to be added to coresponding
// socket.on listener in BattleArena.js in setup, after 
// socket.connect()

function update(newState) {
    gameState.gameUpdate(newState);
}

/**
 * Incoming message from server.
 * @param {String} new_message 
 */
function chat_in(new_message) {
    chat.messages.push(new_message.author + ' (' + new_message.level + '. lvl): ' + new_message.message);
    while (chat.calculate_text_box_size() >= chat.HEIGHT) {
        chat.messages.shift();
    }
    chat.show_chat();
}

//---------------------- SEND ----------------------
// Functions for sending informations to server are used all
// over the client code. And has to be handled in server API section.

/**
 * Send updated players waypoint to server.
 * Is called from setWaypoint() in Player class.
 * Player is created in BattleArena.js just for strage
 * of information to be send to server.
 */
function send_update() {
    const payload = {
        "pos": {"x": player.pos.x, "y": player.pos.y},
        "waypoint": {"x": player.waypoint.x, "y": player.waypoint.y},
        "punchLeft": player.punchLeft,
        "punchRight": player.punchRight,
        "cast": player.cast,
        "cast_direction": {"x": mouseX, "y": mouseY},
        "level_up": player.level_up,
        "nickname": player.nickname
    }
    socket.emit('UPDATE', payload);

    // Punch only on one key press
    player.punchLeft = false;
    player.punchRight = false;
    player.cast = false;
    player.level_up = null;
}

/**
 * Send new message to chat.
 * @param {String} message 
 */
function chat_out(message) {
    const payload = {
        "level": gameState.getCurrentState().me.level,
        "author": gameState.getCurrentState().me.nickname,
        "message": message
    }
    socket.emit('CHAT', payload);
}