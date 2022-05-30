const Vec2 = require('./Vec2');

/**
 * Class for holding server information about each player.
 */
 class Player {
	constructor(x, y, waypoint_x, waypoint_y, socket) {
		this.pos = new Vec2(x, y);
    this.waypoint = new Vec2(waypoint_x, waypoint_y);
    this.heading = this.pos.subtract(this.waypoint).heading() - Math.PI/2;  
    this.hp = 100;
    this.size = 40;
		this.id = socket.id;
    this.socket = socket;
    this.punchLeft = false;
    this.punchRight = false;
    // Spell Cooldowns
    this.COOLDOWN = 3;
    this.isSpellUp = false;
    this.cast = false;   // True when wants to cast
    this.cast_direction = null;   // Set in player_update, from player updateded state
	}

  /**
   * Called when player take damage.
   * @param {int} damage 
   */
  takeDamage(damage) {
    this.hp -= damage;
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
      "size": this.size,
      "punchLeft": this.punchLeft,
      "punchRight": this.punchRight
    }
  }
}

module.exports = Player;