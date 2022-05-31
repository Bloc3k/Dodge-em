function render() {
    const {me, enemies, allies, projectiles} = gameState.getCurrentState();

    // Animate effects
    animator.animate();

    render_stats(me);

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
        render_heath_bar(me);           // Health-bar

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

    if (me.hp <= 0) {
        render_death_counter(me);       // Countdown when player dead
    }


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
    // Backgroud rect
    rect(player.pos.x, player.pos.y - 55, player.max_hp*0.87, 17, player.max_hp * 0.06);
    if (player.hp > player.max_hp * 0.6)
        fill(20, 255, 10, 220);
    else if (player.hp > player.max_hp * 0.5)
        fill(50, 255, 10, 220);
    else if (player.hp > player.max_hp * 0.4)
        fill(90, 255, 10, 220);
    else if (player.hp > player.max_hp * 0.3)
        fill(122, 255, 10, 220);
    else if (player.hp > player.max_hp * 0.25)
        fill(188, 255, 10, 220);
    else if (player.hp > player.max_hp * 0.2)
        fill(255, 255, 10, 220);
    else if (player.hp > player.max_hp * 0.15)
        fill(255, 192, 10, 220);
    else if (player.hp > player.max_hp * 0.1)
        fill(255, 100, 10, 220);
    else
        fill(255, 20, 10, 220);
    rectMode(CORNER);
    //Health foregroud rect
    rect(player.pos.x - player.max_hp*0.4, player.pos.y - 60, player.hp * 0.8, 10, player.max_hp * 0.04);
    textSize(12);
    textAlign(CENTER, CENTER);
    if (player.hp > 0.74 * player.max_hp) {
        fill(0,0,0,220);
        textSize(13);
        text(Math.ceil(player.hp), player.pos.x, player.pos.y - 57);
    } else if (player.hp > 0.4 * player.max_hp) {
        textAlign(LEFT, CENTER);
        text(Math.ceil(player.hp), player.pos.x + player.hp * 0.8 - player.max_hp * 0.36, player.pos.y - 57);
    } else {
        text(Math.ceil(player.hp), player.pos.x, player.pos.y - 57);
    }
    stroke(4);
}

function render_stats(player) {
    textFont(FredokaOne_font);
    textSize(20);
    textAlign(LEFT, CENTER)
    fill(230,230,0,200);
    text("Damage: " + player.spell_damage, 10, innerHeight - 95);
    text("Max. HP: " + player.max_hp, 10, innerHeight - 70);
    text("Max. Speed: " + player.max_speed, 10, innerHeight - 45);
    text("Bullet Speed: " + player.spell_speed, 10, innerHeight - 20);
}

function render_death_counter(player) {
    textFont(FredokaOne_font);
    textSize(34);
    textAlign(CENTER, CENTER)
    fill(230,230,0,200);
    text(Math.floor(((dead_timestamp - Date.now())/1000)) + 5, player.pos.x, player.pos.y - 4);
}