class Animator {
    constructor() {
        this.SetWaypoint = new SetWaypoint();
        this.ConnectionLost = new ConnectionLost();
    }

    animate() {
        this.SetWaypoint.update();
        this.SetWaypoint.draw();
        this.ConnectionLost.update();
        this.ConnectionLost.draw();

        if (!socket.connected) {
            console.log('Connection lost, starting animation');
            this.ConnectionLost.start(250, 50);
        } else {
            this.ConnectionLost.stop();
        }

    }

}
