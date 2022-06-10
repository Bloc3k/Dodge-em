const Vec2 = require('./Vec2');

/**
 * Class for holding server information about each gadget.
 */
 class Gadget {
	constructor(x, y, heal_value = 50, charged = true) {
		this.pos = new Vec2(x, y);
        this.charged = charged;
        this.COOLDOWN = 11;
        this.HEAL_VALUE = heal_value;
        this.SIZE = heal_value*0.02;
    }

    /**
     * Run on player interaction.
     */
    use() {

    }

    /**
     * Serialize gadget to JSON format.
     * @returns Serialized gadget
     */
    serialize() {
        return {
            "pos": {"x": this.pos.x, "y": this.pos.y},
            "charged": this.charged,
            "heal": this.HEAL_VALUE
        }
    }
}

module.exports = Gadget;