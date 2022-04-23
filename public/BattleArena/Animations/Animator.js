class Animator {
    constructor() {
        this.SetWaypoint = new SetWaypoint();
        this.ConnectionLost = new ConnectionLost();
        this.Punch = new Punch();
    }

    animate() {
        this.SetWaypoint.draw();
        this.ConnectionLost.draw();
        this.Punch.draw()

        if (!socket.connected) {
            this.ConnectionLost.start(250, 50);
        } else {
            this.ConnectionLost.stop();
        }

    }

}
