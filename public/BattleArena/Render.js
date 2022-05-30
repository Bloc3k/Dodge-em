function render() {
    const {me, enemies, allies, projectiles} = gameState.getCurrentState();

    // Animate effects
    animator.animate();

    // Render enemies
    for (const enemy of enemies) {
        push();
            translate(enemy.pos.x, enemy.pos.y);
            rotate(enemy.heading);
            fill('#f33');
            circle(0, 0, enemy.size);  // Body
            image(glove_red, 0, -45);  // Right glove
            scale(-1, 1);
            image(glove_red, 0, -45);  // Left glove
        pop();
    }

    // Render allies
    for (const ally of allies) {
        push();
            translate(ally.pos.x, ally.pos.y);
            rotate(ally.heading);
            fill('#3f3');
            circle(0, 0, ally.size);  // Body
            image(glove_blue, 0, -45);  // Right glove
            scale(-1, 1);
            image(glove_blue, 0, -45);  // Left glove
        pop();
    }

    // Render me
    push();
        translate(me.pos.x, me.pos.y);
        rotate(me.heading);
        fill('#33f');
        circle(0, 0, me.size);  // Body
        image(glove_blue, 0, -45);  // Right glove
        scale(-1, 1);
        image(glove_blue, 0, -45);  // Left glove
    pop();

    // Render projectiles
    for (const projectile of projectiles) {
        push();
            translate(projectile.pos.x, projectile.pos.y);
            fill('#a66');
            circle(0, 0, 15);   // Projectile size = 15
        pop();   
    }

}