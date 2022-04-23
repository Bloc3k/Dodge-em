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

        // Is player dead???
        if (newState.me.hp > 0) {
            playing = true;
        } else {
            playing = false;
        }
    }

    getCurrentState() {
        const me = this.lastGameState.me;
        const enemies = this.lastGameState.enemies;
        const allies = this.lastGameState.allies;
        return {me, enemies, allies};
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
 *          "punchRight": this.punchRight
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
 *              "punchRight": this.punchRight
 *          }    
 *      ],
 *      "allies": []
 * } 
 * 
 */