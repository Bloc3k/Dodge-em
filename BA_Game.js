class Game {
    constructor() {
      this.MAX_SPEED = 0.3;
      this.players = {};
      this.lastUpdateTime = Date.now();
      this.shouldSendUpdate = false;
      setInterval(this.update.bind(this), 1000 / 60);
    }

    check_player_exist(socket) {
      if (!(socket.id in this.players)){
        // Add new player to Database
        const x = Math.random()*300 + 100;
        const y = Math.random()*300 + 100;
        this.players[socket.id] = new Player(x, y, x, y, socket);
      }
    }

    player_update(socket, newState) {
      // Check if player exist and create one if not
      this.check_player_exist(socket);
      
      // Update player properties
      let player = this.players[socket.id];
      player.waypoint_x = newState.waypoint.x;
      player.waypoint_y = newState.waypoint.y;
      player.heading = newState.heading;
    }

    update() {
      // Calculate time elapsed
      const now = Date.now();
      const dt = (now - this.lastUpdateTime) / 1000;
      this.lastUpdateTime = now;
  
      // Server-side calculation
      for (const id in this.players) {
        let player = this.players[id];
        const direction = new Vec2(player.waypoint_x - player.x, player.waypoint_y - player.y);
        //direction.constrain(this.MAX_SPEED);
        player.x += direction.x;
        player.y += direction.y;
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
		this.x = x;
		this.y = y;
		this.id = socket.id;
    this.waypoint_x = waypoint_x;
    this.waypoint_y = waypoint_y;
    this.heading = NaN  // TODO: Work in headigs
    this.hp = 100;    // TODO: Working with HP
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

class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Add vectors together.
   * @param {Vec2} Vec2 
   */
  add(Vec2) {
    this.x + Vec2.x;
    this.y + Vec2.y;
  }

  mult(c) {
    this.x * c;
    this.y * c;
  }

  len() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  norm() {
    this.x /= this.len();
    this.y /= this.y / this.len();
  }

  constrain(lenght) {
    this.norm();
    this.mult(lenght);
  }

}

module.exports = Game;