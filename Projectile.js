const Vec2 = require('./Vec2');

class Projectile {
    constructor(x, y, direction_x, direction_y, spell_damage, spell_speed, crit_chance) {
        this.pos = new Vec2(x, y);
        this.direction = new Vec2(direction_x - x, direction_y - y);
        this.CRIT_CHANCE = crit_chance;
        if (Math.random() > this.CRIT_CHANCE) {
            this.DAMAGE = (Math.random() - 0.5) * 2 * 0.1 * spell_damage + spell_damage; // rand() - 0.5 => [-0.5, 0.5]; *2 => [-1, 1]; than 10% from spell damage
        } else {
            this.DAMAGE = (Math.random() - 0.5) * 2 * 0.1 * spell_damage * 2 + spell_damage * 2; // rand() - 0.5 => [-0.5, 0.5]; *2 => [-1, 1]; than 10% from spell damage
        }
        this.SPEED = spell_speed;
        this.SIZE = 15;   // Size of has to match in Render.js on clietn-side (line: 49)
        this.toBeDeleted = false;
    }

    update() {
        this.pos = Vec2.add(this.pos, this.direction.setLength(this.SPEED));
    }

    /**
     * Serialize projectile to JSON format.
    * @returns Serialized projectile
    */
    serialize() {
        return {
            "pos": {"x": this.pos.x, "y": this.pos.y}
          }
    }
}

module.exports = Projectile;