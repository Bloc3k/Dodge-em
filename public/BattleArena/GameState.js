class GameState {
    constructor() {
        this.lastGameState = null;
    }

    /**
     * Update current clinet game state base on new state received from server.
     * @param {GameState} newState 
     */
    gameUpdate(newState) {
        this.lastGameState = newState;

        // Is player dead???
        if (newState.me.hp > 0) {
            playing = true;
            if (player.dead) 
                player.dead = false;
        } else {
            playing = false;
            if (!player.dead) {
                dead_timestamp = Date.now();
                player.dead = true;
            }
        }
    }

    getCurrentState() {
        const me = this.lastGameState.me;
        const enemies = this.lastGameState.enemies;
        const allies = this.lastGameState.allies;
        const projectiles = this.lastGameState.projectiles;
        return {me, enemies, allies, projectiles};
    }
}

/**
 * Game state looks like this:
 * 
 * {
 *      "time": <time>
 *      "me": {
 *          "id": <id>
 *          "pos": {"x": <pos.x>, "y": <pos.y>},
 *          "heading": <rad>,
 *          "hp": <hp>,
 *          "size": this.size,
 *          "punchLeft": this.punchLeft,
 *          "punchRight": this.punchRight,
 *          "spell_damage": this.SPELL_DAMAGE,
 *          "max_hp": this.MAX_HP,
 *          "max_speed": this.MAX_SPEED,
 *          "spell_speed": this.SPELL_SPEED
 *      },
 *      "enemies": [
 *          {
 *              "id": <id>,
 *              "pos": {"x": <pos.x>, "y": <pos.y>},
 *              "waypoint": {"x": <pos.x>, "y": <pos.y>},
 *              "heading": this.heading,
 *              "hp": <hp>,
 *              "size": this.size,
 *              "punchLeft": this.punchLeft,
 *              "punchRight": this.punchRight,
 *              "spell_damage": this.SPELL_DAMAGE,
 *              "max_hp": this.MAX_HP,
 *              "max_speed": this.MAX_SPEED,
 *              "spell_speed": this.SPELL_SPEED,
 *              "crit_chance": this.CRIT_CHANCE
 *          }    
 *      ],
 *      "allies": [],
 *      "projectiles": {
 *              "pos": {"x": <pos.x>, "y": <pos.y>}
 *      }
 * } 
 * 
 */