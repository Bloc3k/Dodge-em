const Vec2 = require('./Vec2');
const Player = require('./Player');
const Projectile = require('./Projectile');

class Game {
    constructor() {
      this.MAX_SPEED = 3;
      this.players = {};
      this.projectiles = [];
      this.lastUpdateTime = Date.now();
      this.shouldSendUpdate = false;
      //--------------------------- Dummy ------------------------
      this.players['dummy_stay'] = new Player(800, 100, 800, 100, NaN);
      this.players['dummy_stay_moveble'] = new Player(200, 100, 800, 100, NaN);
      this.players['dummy_horizont'] = new Player(100, 150, 1200, 150, NaN);
      this.players['dummy_vertical'] = new Player(150, 250, 150, 800, NaN);
      //-----------------------------------------------------------
      setInterval(this.update.bind(this), 1000 / 60);
    }
    
    update() {
      
      // Calculate time elapsed
      const now = Date.now();
      const dt = (now - this.lastUpdateTime) / 1000;
      this.lastUpdateTime = now;
      
      // ----------------- Server-side calculation --------------------

      // Calculate new player positions
      for (const id in this.players) {
        let me = this.players[id];
        if (Vec2.distance(me.pos, me.waypoint) > 2) {
          // Movement
          let direction = Vec2.subtract(me.waypoint, me.pos);
          let movement = Vec2.constrain(direction, this.MAX_SPEED);
          me.pos = Vec2.add(me.pos, movement);
          me.heading = me.pos.subtract(me.waypoint).heading() - Math.PI/2;
          
          // Handle collision with other players
          for (const id in this.players) {
            let other_player = this.players[id];
            if (other_player != me) {
              // Check if me would coline with other player
              if (me.collide(other_player)) {
                // Move both away from each other
                const vec_between_players = Vec2.subtract(other_player.pos, me.pos);
                const penetration_depth = me.size/2 + other_player.size/2 - vec_between_players.len();
                movement = vec_between_players.setLength(penetration_depth/2);
                // Move other player and me by half of penetration depth
                other_player.pos = other_player.pos.add(movement);
                me.pos = me.pos.add(movement.multiply(-1));
              }
            }
          }        
        }
      }
      // --------- Dummies ----------
      let dummy_h = this.players['dummy_horizont'];
      
      if (dummy_h.pos.x < 150) {
        dummy_h.waypoint.set(1200, 150);
        dummy_h.heading = dummy_h.pos.subtract(dummy_h.waypoint).heading() - Math.PI/2;
      } else if (dummy_h.pos.x > 1150) {
        dummy_h.waypoint.set(100, 150);
        dummy_h.heading = dummy_h.pos.subtract(dummy_h.waypoint).heading() - Math.PI/2;
      }
      
      let dummy_v = this.players['dummy_vertical'];
      if (dummy_v.pos.y < 270) {
        dummy_v.waypoint.set(150, 800);
        dummy_v.heading = dummy_v.pos.subtract(dummy_v.waypoint).heading() - Math.PI/2;
      } else if (dummy_v.pos.y > 770) {
        dummy_v.waypoint.set(150, 250);
        dummy_v.heading = dummy_v.pos.subtract(dummy_v.waypoint).heading() - Math.PI/2;
      }

      let dummy_s = this.players['dummy_stay_moveble'];
      dummy_s.waypoint.set(dummy_s.pos.x,dummy_s.pos.y);

      // ----------- Projectiles ----------
      for (let i = 0; i < this.projectiles.length; i++) {
        // Move 
        this.projectiles[i].update();
        
        // Check for out of bounds & delete
        if (this.projectiles[i].pos.x < -200 ||
            this.projectiles[i].pos.x > 2000 ||
            this.projectiles[i].pos.y < -200 ||
            this.projectiles[i].pos.y > 1500) 
          {
            this.projectiles.splice(i, 1);
          }
      }
      // --------------------------------------------------------------
      
      // Send new state to players
      for (const id in this.players) {
        if (!id.includes('dummy'))
          this.players[id].socket.emit('UPDATE', this.getCurrentState(this.players[id]));
      }
    }
    
    /**
     * Called when some player sends new State.
     * @param {io.socket} socket 
     * @param {State} newState 
     */
    player_update(socket, newState) {
      // Check if player exist and create one if not
      if (socket.id in this.players) {
        // Update player properties
        let player = this.players[socket.id];
        player.waypoint.x = newState.waypoint.x;
        player.waypoint.y = newState.waypoint.y;
        player.punchLeft = newState.punchLeft;
        player.punchRight = newState.punchRight;
        player.cast = newState.cast;
        player.cast_direction = newState.cast_direction;
        if (player.cast == true) {     // cast the spell
          this.projectiles.push(new Projectile(player.pos.x, player.pos.y, player.cast_direction.x, player.cast_direction.y));
        }
      } else {
        // Add new player to Database
        this.players[socket.id] = new Player(newState.pos.x, newState.pos.y, newState.pos.x, newState.pos.y, socket);
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
        "allies": [],
        "projectiles": this.serializeProjectiles()
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

    /**
     * Serialize all projectiles to be send to players in new game state, Format: JSON
     */
    serializeProjectiles() {
      const serialized_JSON = [];
      for (const projectile of this.projectiles) {
        serialized_JSON.push(projectile.serialize());
      }

      return serialized_JSON;
    }
}  


module.exports = Game;