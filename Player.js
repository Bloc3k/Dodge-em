const Vec2 = require('./Vec2');

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
    this.size = 40;
    this.socket = socket;
	}

  /**
   * Check for colision with other player.
   * @param {Player} other_player 
   */
  collide(other_player) {
    return Vec2.distance(this.pos, other_player.pos) <= (other_player.size/2 + this.size/2);
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
      "hp": this.hp,
      "size": this.size
    }
  }
}

module.exports = Player;