function render() {
    const {me, enemies, allies, projectiles, gadgets} = gameState.getCurrentState();

    // Level-up menu
    if (me.level_up > 0)      render_level_up(me);
    
    // Gadgets
    for (const gadget of gadgets) {
        render_heal_pad(gadget.pos.x, gadget.pos.y, gadget.charged, gadget.heal);
    }
    
    // Player stats in left bottom corner
    render_stats(me);

    // Animate effects
    animator.animate();

    // Render enemies
    for (const enemy of enemies) {
        render_heath_bar(enemy);    // Health-bar
        push();
            translate(enemy.pos.x, enemy.pos.y);
            rotate(enemy.heading);
            fill('#f33');
            circle(0, 0, enemy.size + Math.sin(frameCount*0.05)*0.035*deltaTime);  // Body
            image(glove_red, Math.sin(frameCount*0.05)*0.025*deltaTime, -45);  // Right glove
            scale(-1, 1);
            image(glove_red, Math.sin(frameCount*0.05)*0.025*deltaTime, -45);  // Left glove
        pop();
    }

    // Render allies
    for (const ally of allies) {
        render_heath_bar(ally);      // Health-bar
        push();
            translate(ally.pos.x, ally.pos.y);
            rotate(ally.heading);
            fill('#3f3');
            circle(0, 0, ally.size + Math.sin(frameCount*0.05)*0.035*deltaTime);  // Body
            image(glove_blue, Math.sin(frameCount*0.05)*0.025*deltaTime, -45);  // Right glove
            scale(-1, 1);
            image(glove_blue, Math.sin(frameCount*0.05)*0.025*deltaTime, -45);  // Left glove
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
        circle(0, 0, me.size + Math.sin(frameCount*0.05)*0.035*deltaTime, 50);  // Body
        if (me.hp > 0) {
            image(glove_blue, Math.sin(frameCount*0.05)*0.025*deltaTime, -45);  // Right glove
            scale(-1, 1);
            image(glove_blue, Math.sin(frameCount*0.05)*0.0225*deltaTime, -45);  // Left glove
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
    
    // Render Chat
    chat.render();

}

function render_heath_bar(player) {
    noStroke();
    rectMode(CENTER);
    fill(16, 16, 16, 230);
    // Backgroud rect
    rect(player.pos.x, player.pos.y - 55, player.max_hp*0.87, 17, player.max_hp * 0.07);
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
    // Level number
    fill(200, 200, 200, 220);
    textAlign(CENTER, CENTER);
    textSize(12);
    if (player.level < 10)   text(player.level, player.pos.x - player.max_hp*0.5, player.pos.y - 56);
    if (player.level >= 10)   text(player.level, player.pos.x - player.max_hp*0.5-3, player.pos.y - 56);
    stroke(4);
    // Nickname
    text(player.nickname, player.pos.x, player.pos.y - 73);
}

function render_stats(player) {
    textFont(FredokaOne_font);
    textSize(20);
    textAlign(LEFT, CENTER)
    fill(200,200,0,200);
    text("Damage: " + player.spell_damage, 10, innerHeight - 130);
    text("Crit Chance: " + Math.round(player.crit_chance * 100) + "%", 10, innerHeight - 105);
    text("Max. HP: " + player.max_hp, 10, innerHeight - 80);
    text("Max. Speed: " + player.max_speed, 10, innerHeight - 55);
    text("Bullet Speed: " + player.spell_speed, 10, innerHeight - 30);
}

function render_death_counter(player) {
    textFont(FredokaOne_font);
    textSize(34);
    textAlign(CENTER, CENTER)
    fill(230,230,0,200);
    text(Math.floor(((dead_timestamp - Date.now())/1000)) + 5, player.pos.x, player.pos.y - 4);
}

function render_level_up(player) {
    textFont(FredokaOne_font);
    textSize(20);
    textAlign(LEFT, CENTER)
    fill(180,180,0,200);
    
    if (player.spell_damage < 300) {    // Cap on 300 has to be set on server (BA_Game.player_update()), on clinet in Render.js render_level_up() and in BattleArena.js level_up_menu_handler()
        render_button(215, innerHeight - 130); 
        text("+2", 230, innerHeight - 135);
    }  
    if (player.crit_chance < 1) {
        render_button(215, innerHeight - 105);
        text("+3%", 230, innerHeight - 110);
    }
    if (player.max_hp < 200) {
        render_button(215, innerHeight - 80);
        text("+10", 230, innerHeight - 85);
    }
    if (player.max_speed < 30) {
        render_button(215, innerHeight - 55);
        text("+0.5", 230, innerHeight - 60);
    }
    if (player.spell_speed < 40) {
        render_button(215, innerHeight - 30);
        text("+2", 230, innerHeight - 35);
    }
    
}

function render_button(x, y) {
    push();
    rectMode(CENTER);
    fill(180, 180, 0, 200);
    noStroke();
    rect(x, y, 20, 20, 4);
    fill(55, 55, 55, 220);
    stroke(35);
    strokeWeight(4);
    line(x, y + 7, x, y - 7);     // Vertical
    line(x + 7, y, x - 7, y);     // Horizontal
    strokeWeight(2);
    pop()
}

function render_heal_pad(x, y, charged, heal_value) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(44, 44, 44);
    //ellipse(x, y, 50, 46);
    if (heal_value > 25 )   rect(x, y, 65, 62, 27);
    else                    rect(x, y, 50, 48, 21);
    fill(28, 28, 28, 230);
    if (heal_value > 25 )   rect(x, y, 44, 40, 16);
    else                    rect(x, y, 36, 34, 14);

    if (charged) {
        // ability
        const x_in = x;
        const y_in = y - Math.cos(frameCount*0.07)*1.6 - 3;
        fill(10,250,10, 80);
        if (heal_value > 25 )   rect(x_in, y_in, 38, 33, 5.2);
        else                    rect(x_in, y_in, 30, 26, 4.5);
        stroke(222,15,15, 200);
        strokeWeight(5);
        let cross_size = 7;
        if (heal_value > 25 ) {
            cross_size = 10;
            strokeWeight(6)
        }  
        line(x_in, y_in + cross_size , x_in, y_in - cross_size);     // Vertical
        line(x_in, y_in + cross_size , x_in, y_in - cross_size);     // Vertical
        line(x_in + cross_size, y_in, x_in + 4, y_in);     // Horizontal
        line(x_in - 4, y_in, x_in - cross_size, y_in);     // Horizontal
    }

    pop();
}