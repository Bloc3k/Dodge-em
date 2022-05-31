function render() {
    const {me, enemies, allies, projectiles} = gameState.getCurrentState();

    // Animate effects
    animator.animate();

    // Render enemies
    for (const enemy of enemies) {
        render_heath_bar(enemy);    // Health-bar
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
        render_heath_bar(ally);      // Health-bar
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
    if (me.hp > 0)
        render_heath_bar(me);               // Health-bar
    push();
        translate(me.pos.x, me.pos.y);
        rotate(me.heading);
        if (me.hp > 0)
            fill(40, 40, 255);  // Alive
        else
            fill(40, 40, 255, 240);
        circle(0, 0, me.size, 50);  // Body
        if (me.hp > 0) {
            image(glove_blue, 0, -45);  // Right glove
            scale(-1, 1);
            image(glove_blue, 0, -45);  // Left glove
        }
    pop();

    // Render projectiles
    for (const projectile of projectiles) {
        push();
            translate(projectile.pos.x, projectile.pos.y);
            fill('#f92');
            circle(0, 0, 15);   // Projectile size = 15
        pop();   
    }

}

function render_heath_bar(player) {
    noStroke();
    rectMode(CENTER);
    fill(16, 16, 16, 230);
    rect(player.pos.x, player.pos.y - 55, 87, 17, 6);
    if (player.hp > 60)
        fill(20, 255, 10, 220);
    else if (player.hp > 50)
        fill(50, 255, 10, 220);
    else if (player.hp > 40)
        fill(80, 255, 10, 220);
    else if (player.hp > 30)
        fill(111, 255, 10, 220);
    else if (player.hp > 25)
        fill(188, 255, 10, 220);
    else if (player.hp > 20)
        fill(255, 255, 10, 220);
    else if (player.hp > 15)
        fill(255, 192, 10, 220);
    else if (player.hp > 10)
        fill(255, 100, 10, 220);
    else
        fill(255, 20, 10, 220);
    rectMode(CORNER);
    rect(player.pos.x - 40, player.pos.y - 60, player.hp * 0.8, 10, 4);
    stroke(4);
}