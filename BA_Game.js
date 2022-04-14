const Vec2 = require('./Vec2');

class Game {
    constructor() {
      this.MAX_SPEED = 3;
      this.players = {};
      this.lastUpdateTime = Date.now();
      this.shouldSendUpdate = false;
      setInterval(this.update.bind(this), 1000 / 60);
    }

    check_player_exist(socket) {
      
    }

    player_update(socket, newState) {
      // Check if player exist and create one if not

      if (socket.id in this.players) {
        // Update player properties
        let player = this.players[socket.id];
        player.waypoint.x = newState.waypoint.x;
        player.waypoint.y = newState.waypoint.y;
        player.heading = newState.heading;
      } else {
        // Add new player to Database
        this.players[socket.id] = new Player(newState.pos.x, newState.pos.y, newState.pos.x, newState.pos.y, socket);
        this.players[socket.id].heading = newState.heading;
      }    
    }

    update() {
      // Calculate time elapsed
      const now = Date.now();
      const dt = (now - this.lastUpdateTime) / 1000;
      this.lastUpdateTime = now;
  
      // Server-side calculation
      // Calculate new player positions
      for (const id in this.players) {
        let player = this.players[id];
        const direction = Vec2.subtract(player.waypoint, player.pos);
        const movement = Vec2.constrain(direction, this.MAX_SPEED);
        player.pos = Vec2.add(player.pos, movement);
      }

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
		this.pos = new Vec2(x, y);
		this.id = socket.id;
    this.waypoint = new Vec2(waypoint_x, waypoint_y);
    this.heading = NaN;   // Initialized be client
    this.hp = 100;
    this.socket = socket;
	}

  /**
   * Serialize player to JSON format.
   * @returns Serialized player
   */
  serialize() {
    return {
      "id": this.id,
      "pos": {"x": this.pos.x, "y": this.pos.y},
      "waypoint": {"x": this.waypoint.x, "y": this.waypoint.y},
      "heading": this.heading,
      "hp": this.hp
    }
  }
}

module.exports = Game;