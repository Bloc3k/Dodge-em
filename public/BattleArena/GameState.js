class GameState {
    constructor() {
        this.lastGameState = NaN;
    }

    /**
     * Update current clinet game state base on new state received from server.
     * @param {GameState} newState 
     */
    gameUpdate(newState) {
        this.lastGameState = newState;

        if (newState.me.hp > 0) {
            playing = true;
        } else {
            playing = false;
        }

        // Update enemies
        for (const id in enemies)   
            delete enemies[id];
        for (const enemy of newState.enemies) {
            enemies[enemy.id] = new Enemy(enemy.pos.x, enemy.pos.y, enemy.id);
            enemies[enemy.id].waypoint.set(enemy.waypoint.x, enemy.waypoint.y);
            enemies[enemy.id].heading = enemy.heading;
        }

        // Update allies
        for (const id in allies)   
            delete allies[id];
        for (const ally of newState.allies) {
            enemies[ally.id] = new Ally(ally.pos.x, ally.pos.y, ally.id);
            enemies[ally.id].waypoint.set(ally.waypoint.x, ally.waypoint.y);
        }

        // Update player
        summoner.pos.set(newState.me.pos.x, newState.me.pos.y);
        summoner.waypoint.set(newState.me.waypoint.x, newState.me.waypoint.y);
        summoner.heading = newState.me.heading;

    }

    getCurrentState() {
        return this.lastGameState;
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
 *          "hp": <hp>
 *      },
 *      "enemies": [
 *          {
 *              "id": <id>,
 *              "pos": {"x": <pos.x>, "y": <pos.y>},
 *              "waypoint": {"x": <pos.x>, "y": <pos.y>},
 *              "heading": this.heading,
 *              "hp": <hp>
 *          }    
 *      ],
 *      "allies": []
 * } 
 * 
 */