const express = require('express')
const app = express();
const server = app.listen(60606, () => {
	console.log('listening on 127.0.0.1:60606');
  });

app.use(express.static('public'));
  
const socket = require('socket.io');
var soc = socket(server);

class Player {
	constructor(x, y, id) {
		this.x = x;
		this.y = y;
		this.id = id;
	}
}

// -------------- Storage ---------------
players = {}
// --------------------------------------


soc.on('connection', socket => {
	// ---------------------- API ------------------------
	socket.on('waypoint update', waypoint_update);
	socket.on('player login', player_login);
	
	//****************************************************/
	// ----------------- API DEFINITION ------------------
	//****************************************************/
	function waypoint_update(data) {
		const payload = {
			x: data.x,
			y: data.y,
			id: socket.id
		}
		players[socket.id] = new Player(data.x, data.y, socket.id);
		socket.broadcast.emit('waypoint update', payload);
	}

	function player_login(data) {
		console.log('New player: ' + socket.id);
		
		// Send all information about current player to new player, so that he can draw them
		socket.emit('player login', {playersDB: players}); 
		
		// Add new player to Database
		players[socket.id] = new Player(data.x, data.y, socket.id);
		
		// Inform rest of player about new player
		socket.broadcast.emit('new player', players[socket.id]);
	}

	socket.on('disconnect', () => {
		console.log('Player disconnected: ' + socket.id);
		socket.broadcast.emit('player logoff', {id:socket.id});
		delete players[socket.id];
		socket.removeAllListeners();
	 });
	//****************************************************/
});



console.log("Server started...");



