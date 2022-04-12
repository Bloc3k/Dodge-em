class Animator {
    constructor() {
        this.SetWaypoint = new SetWaypoint();
        this.ConnectionLost = new ConnectionLost();
    }

    animate() {
        this.SetWaypoint.draw();
        this.ConnectionLost.draw();

        if (!socket.connected) {
            this.ConnectionLost.start(250, 50);
        } else {
            this.ConnectionLost.stop();
        }

    }

}
