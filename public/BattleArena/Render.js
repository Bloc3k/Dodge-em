function render() {
    const {me, enemies, allies} = gameState.getCurrentState();

    // Animate effects
    animator.animate();

    // Render me
    push();
        translate(me.pos.x, me.pos.y);
        rotate(me.heading);
        fill('#33f');
        circle(0, 0, 40);  // Body
        image(glove_blue, 0, -45);  // Right glove
        scale(-1, 1);
        image(glove_blue, 0, -45);  // Left glove
    pop();

    // Render enemies
    for (const enemy of enemies) {
        push();
            translate(enemy.pos.x, enemy.pos.y);
            rotate(enemy.heading);
            fill('#f33');
            circle(0, 0, 40);  // Body
            image(glove_blue, 0, -45);  // Right glove
            scale(-1, 1);
            image(glove_blue, 0, -45);  // Left glove
        pop();
    }

    // Render allies
    for (const ally of allies) {
        push();
            translate(ally.pos.x, ally.pos.y);
            rotate(ally.heading);
            fill('#3f3');
            circle(0, 0, 40);  // Body
            image(glove_blue, 0, -45);  // Right glove
            scale(-1, 1);
            image(glove_blue, 0, -45);  // Left glove
        pop();
    }

}