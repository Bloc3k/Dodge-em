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
	// ---------------------- API ------------------------
	socket.on('UPDATE', player_update);
	socket.on('LOGIN', player_login);
	socket.on('disconnect', onDisconnect);
	// ---------------------------------------------------
});

console.log("Server started...");


/** Game object that holds all game.*/
const game = new Game();

/**
 * Called when some player sends his update state.
 * @param {PlayerState} newPlayerState  New player states
 */
function player_update(newPlayerState) {
	game.player_update(this, newPlayerState);
}

/**
 * Called when some player wants to join the game. New Tab opened.
 */
function player_login() {
	game.player_login(this);
}

/**
 * Called when some player disconnects.
 */
function onDisconnect() {
	game.deletePlayer(this);
 }
