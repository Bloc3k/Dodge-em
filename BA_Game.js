class Game {
    constructor() {
      this.players = {};
      this.lastUpdateTime = Date.now();
      this.shouldSendUpdate = false;
      setInterval(this.update.bind(this), 1000 / 60);
    }

    player_login(socket) {
      console.log('New player: ' + socket.id);

      // Add new player to Database
      const x = Math.random()*300 + 100;
      const y = Math.random()*300 + 100;
      this.players[socket.id] = new Player(x, y, x, y, socket);

      // Send game state to new player
      socket.emit('LOGIN', this.getCurrentState);
    }

    player_update(socket, data) {
      
    }

    update() {
      // Calculate time elapsed
      const now = Date.now();
      const dt = (now - this.lastUpdateTime) / 1000;
      this.lastUpdateTime = now;
  
      // Server-side calculation
      // ...

      // Send new state to players
      for (const id in this.players) {
        this.players[id].socket.emit('UPDATE', this.getCurrentState(this.players[id]));
      }
    }

    /**
     * Detele player.
     * @param {io.socket} socket 
     */
    deletePlayer(socket) {
      console.log('Player disconnected: ' + socket.id);
      delete this.players[socket.id];
    }

    /**
     * Get current game state for specified player.
     * @param {Player} player Player to generate state for
     * @returns Game state for player
     */
    getCurrentState(player) {
      return {
        "time": Date.now(),
        "me": player.serialize(),
        "enemies": this.serializePlayersExcept(player),
        "allies": []
      }
    }

    /**
     * Serialize all player except player specified in parameter. Format: JSON
     * @param {Player} player_excluded Player to exclude from serialization
     * @returns {List} Serialized players
     */
    serializePlayersExcept(player_excluded) {
      const serialized_JSON = [];

      for (const id in this.players) {
        if (this.players[id] != player_excluded) {
          serialized_JSON.push(this.players[id].serialize());
        }
      }

      return serialized_JSON;
    }
}  

/**
 * Class for holding server information about each player.
 */
class Player {
	constructor(x, y, waypoint_x, waypoint_y, socket) {
		this.x = x;
		this.y = y;
		this.id = socket.id;
    this.waypoint_x = waypoint_x;
    this.waypoint_y = waypoint_y;
    this.heading = NaN  // TODO: Work in headigs
    this.hp = NaN;    // TODO: Working with HP
    this.socket = socket;
	}

  /**
   * Serialize player to JSON format.
   * @returns Serialized player
   */
  serialize() {
    return {
      "id": this.id,
      "pos": {"x": this.x, "y": this.y},
      "waypoint": {"x": this.waypoint_x, "y": this.waypoint_y},
      "heading": this.heading,
      "hp": this.hp
    }
  }
}

module.exports = Game;