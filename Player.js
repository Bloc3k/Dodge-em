const Vec2 = require('./Vec2');

/**
 * Class for holding server information about each player.
 */
 class Player {
	constructor(x, y, waypoint_x, waypoint_y, socket) {
		this.pos = new Vec2(x, y);
    this.waypoint = new Vec2(waypoint_x, waypoint_y);
    this.heading = this.pos.subtract(this.waypoint).heading() - Math.PI/2;  
    this.MAX_HP = 100;    // Max. HP
    this.MAX_SPEED = 3;   // Max. Speed
    this.hp = this.MAX_HP;
    this.size = 40;
		this.id = socket.id;
    this.socket = socket;
    this.punchLeft = false;
    this.punchRight = false;
    this.level_up = 0;
    // ------ Spell -------
    this.cast = false;   // True when wants to cast
    this.cast_direction = null;   // Set in player_update, from player updateded state
    this.SPELL_DAMAGE = 15;
    this.SPELL_SPEED = 10;
    this.CRIT_CHANCE = 0.1;
	}

  /**
   * Called when player take damage.
   * @param {int} damage 
   */
  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      setTimeout( () => {this.revive()}, 4000);
      this.pos = new Vec2(Math.random()*(1600) + 55, Math.random()*(870) + 55);
      this.waypoint = new Vec2(this.pos.x, this.pos.y);
      return true;
    }
    return false;
  }

  /**
   * Revive player.
   */
  revive() {
    this.hp = this.MAX_HP;
  }

  /**
   * Called when player kills someone.
   */
  kill() {
    this.level_up++;
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
      "punchRight": this.punchRight,
      "spell_damage": this.SPELL_DAMAGE,
      "max_hp": this.MAX_HP,
      "max_speed": this.MAX_SPEED,
      "spell_speed": this.SPELL_SPEED,
      "crit_chance": this.CRIT_CHANCE,
      "level_up": this.level_up
    }
  }
}

module.exports = Player;