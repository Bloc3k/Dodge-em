class GameState {
    constructor() {
        this.lastGameState = null;
        this.previousGameState = null;
    }

    /**
     * Update current clinet game state base on new state received from server.
     * @param {GameState} newState 
     */
    gameUpdate(newState) {
        this.previousGameState = this.lastGameState;
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

        // Sounds
        if (newState.me.healed) {
            heal_sfx.setVolume(sound_volume);
            heal_sfx.play();
        }
        if (newState.me.damage_taken) {
            damage_taken_sfx.setVolume(sound_volume*4);
            damage_taken_sfx.play(); 
            hit_sfx.setVolume(sound_volume*0.2);
            hit_sfx.play();
        }
        if (newState.me.revive) {
            revive_sfx.setVolume(sound_volume);
            revive_sfx.play();
        }

        for (const ally of newState.allies) {
            if (ally.healed) {
                heal_sfx.setVolume(sound_volume);
                heal_sfx.play();
            }
            if (ally.damage_taken) {
                hit_sfx.setVolume(sound_volume);
                hit_sfx.play();
            }
            if (ally.revive) {
                revive_sfx.setVolume(sound_volume);
                revive_sfx.play();
            }
        }

        for (const enemy of newState.enemies) {
            if (enemy.healed) {
                heal_sfx.setVolume(sound_volume);
                heal_sfx.play();
            }
            if (enemy.damage_taken) {
                hit_sfx.setVolume(sound_volume);
                hit_sfx.play();
            }
            if (enemy.revive) {
                revive_sfx.setVolume(sound_volume);
                revive_sfx.play();
            }
        }

        for (const kill of newState.kills) {
            die_sfx.setVolume(sound_volume);
            die_sfx.play();
        }
    }

    getCurrentState() {
        const me = this.lastGameState.me;
        const enemies = this.lastGameState.enemies;
        const allies = this.lastGameState.allies;
        const projectiles = this.lastGameState.projectiles;
        const gadgets = this.lastGameState.gadgets;
        return {me, enemies, allies, projectiles, gadgets};
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