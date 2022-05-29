const Game = require('./BA_Game.js');

const express = require('express')
const app = express();
const server = app.listen(60606, () => {
	console.log('listening on 127.0.0.1:60606');
  });

app.use(express.static('public'));
  
const socket = require('socket.io');
var soc = socket(server);


soc.on('connection', socket => {
	console.log('New connection: ' + socket.id);
	// ---------------------- API ------------------------
	socket.on('UPDATE', player_update);
	socket.on('disconnect', onDisconnect);
	// ---------------------------------------------------
});

console.log("Server started...");


/** Game object that holds all game.*/
const game = new Game();

/**
 * Called when some player sends his update state.
 * @param {PlayerState} newPlayerState  New player state
 */
function player_update(newPlayerState) {
	game.player_update(this, newPlayerState);
}

/**
 * Called when some player disconnects.
 */
function onDisconnect() {
	game.deletePlayer(this);
 }
