class Vec2 {
    /**
     * @param {int} x 
     * @param {int} y 
     */
    constructor(x, y) {
      this.x = x;
      this.y = y; 
    }

    /**
     * @param {Vec2} vec1 
     * @param {Vec2} vec2 
     * @returns {Vec2} Addition of vec1 and vec2.
     */
    static add(vec1, vec2) {
        return new Vec2(vec1.x + vec2.x, vec1.y + vec2.y)
    }

    /**
     * @param {Vec2} vec1 
     * @returns {Vec2} Addition of this and vec1.
     */
     add(vec1) {
      return new Vec2(this.x + vec1.x, this.y + vec1.y)
    }

    /**
     * @param {Vec2} vec1 
     * @param {Vec2} vec2 
     * @returns {Vec2} Subtraction of vec1 and vec2.
     */
    static subtract(vec1, vec2) {
        return new Vec2(vec1.x - vec2.x, vec1.y - vec2.y);
    }

    /**
     * @param {Vec2} vec1 
     * @returns {Vec2} Subtraction of this and vec1.
     */
     subtract(vec1) {
      return new Vec2(this.x - vec1.x, this.y - vec1.y);
  }

    /**
     * @param {Vec2} vec1 
     * @param {float} constant
     * @returns {Vec2} Vec1 multiplied by constant.
     */
    static multiply(vec1, constant) {
        return new Vec2(vec1.x * constant, vec1.y * constant);
    }

    /**
     * @param {float} constant
     * @returns {Vec2} This multiplied by constant.
     */
     multiply(constant) {
      return new Vec2(this.x * constant, this.y * constant);
    }

    /**
     * @param {Vec2} vec1 
     * @param {float} constant 
     * @returns {Vec2} Vec1 devided by constant.
     */
    static devide(vec1, constant) {
        return new Vec2(vec1.x / constant, vec1.y / constant);
    }

    /**
     * @param {float} constant 
     * @returns {Vec2} This devided by constant.
     */
     devide(vec1, constant) {
      return new Vec2(this.x / constant, this.y / constant);
    }

    /**
     * @param {Vec2} vec1
     * @returns {Vec2} Normalized vec1.
     */
    static normalize(vec1) {
      const length = vec1.len();
      return new Vec2(vec1.x / length, vec1.y / length);
    }

    /**
     * @returns {Vec2} Normalized vector.
     */
     normalize() {
      const length = this.len();
      return new Vec2(this.x / length, this.y / length);
    }

    /**
     * @param {Vec2} vec1
     * @param {float} max_length
     * @returns {Vec2} Vec1 with constrained length.
     */
    static constrain(vec1, max_length) {
      if (vec1.len() > max_length) {
        return vec1.setLength(max_length);
      } else {
        return vec1;
      }
    }

    /**
     * @param {float} length
     * @returns {Vec2} This with constrained length.
     */
     constrain(length) {
      if (this.len() > length) {
        return this.setLength(length);
      } else {
        return this;
      }
    }

    /**
     * @param {Vec2} vec1
     * @param {Vec2} vec2
     * @returns {float} Distance between vec1 and vec2.
     */
    static distance(vec1, vec2) {
        return new Vec2(vec1.x - vec2.x, vec1.y - vec2.y).len();
    }

    /**
     * @param {Vec2} vec1
     * @returns {float} Length of vec1.
     */
     static length(vec1) {
      return vec1.len()
    }

    len() {
      return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    /**
     * @param {float} length
     * @returns {Vec2} This with set length.
     */
    setLength(length) {
      const me_norm = this.normalize();
      return me_norm.multiply(length);
    }

    set(x, y) {
      this.x = x;
      this.y = y;
    }

    heading() {
      return Math.atan2(this.y, this.x);
    }

  }

  module.exports = Vec2;