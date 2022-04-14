class Vec2 {
    constructor(x, y) {
      this.x = x;
      this.y = y; 
    }
  
    len() {
      return Math.sqrt(this.x*this.x + this.y*this.y);
    }
  
    norm() {
      if (this.len() != 0) {
        this.x /= this.len();
        this.y /= this.len();
      }
    }
  
    constrain(length) {
      if (this.len() > length){
        this.norm();
        this.mult(length);
      }
    }

    static add(vec1, vec2) {
        return new Vec2(vec1.x + vec2.x, vec1.y + vec2.y)
    }

    static subtract(vec1, vec2) {
        return new Vec2(vec1.x - vec2.x, vec1.y - vec2.y);
    }

    static multiply(vec1, constant) {
        return new Vec2(vec1.x * constant, vec1.y * constant);
    }

    static devide(vec1, constant) {
        return new Vec2(vec1.x / constant, vec1.y / constant);
    }

    static normalize(vec1) {
      const length = vec1.len();
      return new Vec2(vec1.x / length, vec1.y / length);
    }

    static constrain(vec1, length) {
      if (vec1.len() > 0) {
        const vec1_norm = Vec2.normalize(vec1);
        return Vec2.multiply(vec1_norm, length);
      } else {
        return vec1;
      }
  }
  
  }

  module.exports = Vec2;