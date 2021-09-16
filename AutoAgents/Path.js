class PathSegment {
    constructor(x1, y1, x2, y2, r = 60) {
        this.a = createVector(x1,y1);
        this.b = createVector(x2,y2);
        this.r = r;
    }

    draw() {
        push();

        stroke(160);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
        stroke(70);
        if (menu.debug) {
            const offset = this.getNormal().setMag(this.r);
            line(this.a.x + offset.x, this.a.y + offset.y, this.b.x + offset.x, this.b.y + offset.y);
            line(this.a.x - offset.x, this.a.y - offset.y, this.b.x - offset.x, this.b.y - offset.y);    
        }

        pop();
    }

    /**
     * Returns closest point on the path segment to point passed in parameter
     * @param {} point 
     */
    getScalarProjection(point) {
        const ab = this.getDir();
        const a2point = p5.Vector.sub(point, this.a);
        return p5.Vector.add(ab.setMag(p5.Vector.dot(ab, a2point)), this.a);
    }

    getPathSegment() {
        return {a:this.a, b:this.b};
    }

    getDir() {
        return p5.Vector.sub(this.a, this.b).normalize();
    }

    getNormal() {
        const norm = this.getDir();
        const temp = -norm.x;
        norm.x = norm.y;
        norm.y = temp;
        return norm;
    }

    getR() {
        return this.r;
    }

    setA(point) {
        this.a = createVector(point.x, point.y);
    }

}