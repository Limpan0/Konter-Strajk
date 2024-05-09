shooterGame.scene.Player = function (x, y, id, time) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
    */
    this.timers = time;
    this.id = id;
    rune.display.Sprite.call(this, x, y, 52, 52, "player" + id);
    this.ammo = null;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

shooterGame.scene.Player.prototype = Object.create(rune.display.Sprite.prototype);
shooterGame.scene.Player.prototype.constructor = shooterGame.scene.Player;

shooterGame.scene.Player.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this); //superanrop, ska alltid finnas med 
    console.log(shooterGame.scene.Game.prototype.walls);
    this.hitbox.set(11, 11, 30, 30);
    this.scaleX = 0.4;
    this.scaleY = 0.4;
    this.hitbox.debugColor = "#10101050";
    this.moveSpeed = 1.15;
    this.maxBounces = 5;
    this.ammo = 5;
    this.bulletList = new rune.display.DisplayGroup(this.stage);
    this.aimDir = "u"; //default aim angle before moving
    this.updateAmmo();


    //keyboard inputs
    if (this.id === 1) {
        this.m_right = "d";
        this.m_left = "a";
        this.m_up = "w";
        this.m_down = "s";
        this.shoot = "SPACE";
        this.reloadAmmo = "r";
    }
    if (this.id === 2) {
        this.m_right = "l";
        this.m_left = "j";
        this.m_up = "i";
        this.m_down = "k";
        this.shoot = "o";
        this.reloadAmmo = "p";
    }

    //controller inputs
    this.gamePad = this.gamepads.get(this.id - 1);


    //sounds
    this.reloadSound = this.application.sounds.sound.get("reload", false);
    this.reloadSound.volume = 0.8;
    this.gunSound = this.application.sounds.sound.get("gunshot", false);
    this.dryFire = this.application.sounds.sound.get("dryfire", false);
    this.dryFire.volume = 1;

    //quick fix for ammodisplay bug
    if (this.id === 1) {
        this.stage.addChild(this.ammoDisplay);

    } else {

        this.stage.addChild(this.ammoDisplay);
    }
};

shooterGame.scene.Player.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step)

    /**---------------------------------------------------------
     * Movement Keyboard
    ---------------------------------------------------------*/

    if (this.keyboard.pressed(this.m_right) || this.gamePad.stickLeftRight) {
        this.x += this.moveSpeed;
        this.rotation = 90;
        this.aimDir = "r";
    }
    if (this.keyboard.pressed(this.m_left) || this.gamePad.stickLeftLeft
    ) {
        this.x -= this.moveSpeed;
        this.rotation = 270;
        this.aimDir = "l";
    }
    if (this.keyboard.pressed(this.m_up) || this.gamePad.stickLeftUp) {
        this.y -= this.moveSpeed;
        this.rotation = 0;
        this.aimDir = "u";
    }
    if (this.keyboard.pressed(this.m_down) || this.gamePad.stickLeftDown) {
        this.rotation = 180;
        this.y += this.moveSpeed;
        this.aimDir = "d";
    }

    if (this.keyboard.pressed(this.m_right) && this.keyboard.pressed(this.m_down) || this.gamePad.stickLeftDown && this.gamePad.stickLeftRight) {
        this.aimDir = "rd";
        this.rotation = 135;
    }
    if (this.keyboard.pressed(this.m_right) && this.keyboard.pressed(this.m_up) || this.gamePad.stickLeftUp && this.gamePad.stickLeftRight) {
        this.aimDir = "ru";
        this.rotation = 45;
    }
    if (this.keyboard.pressed(this.m_left) && this.keyboard.pressed(this.m_down) || this.gamePad.stickLeftDown && this.gamePad.stickLeftLeft) {
        this.aimDir = "ld";
        this.rotation = 225;
    }
    if (this.keyboard.pressed(this.m_left) && this.keyboard.pressed(this.m_up) || this.gamePad.stickLeftUp && this.gamePad.stickLeftLeft) {
        this.aimDir = "lu";
        this.rotation = 315;
    }
    if (this.ammo === 0) {
        this.reload();
    }

    if (this.keyboard.justPressed(this.shoot) || this.gamePad.justPressed(0)) {



        if (this.ammo === 0) {
            this.dryFire.play();
            this.reload();
        } else {
            this.gunSound.play(true);
            this.bullet = new shooterGame.scene.Bullet(this.centerX, this.centerY, this.aimDir, this.maxBounces, this.id);
            this.stage.addChild(this.bullet);
            this.ammo--;
            this.bulletList.addMember(this.bullet);

            shooterGame.scene.Player.prototype.bulletList = this.bulletList;

        }

        //update ammo counter when shooting
        this.updateAmmo();

    }

    if (this.keyboard.justPressed(this.reloadAmmo) || this.gamePad.justPressed(1)) {
        this.ammo = 0;
        this.reload();

    }


    //-----------------------------------------------------
    // collision controll
    //-----------------------------------------------------
    this.hitTestAndSeparate(shooterGame.scene.Game.prototype.walls, function () {
        console.log("macke");
    }, this);

    if (this.id === 1) {
        this.stage.addChild(this.ammoDisplay);

    } else {

        this.stage.addChild(this.ammoDisplay);
    }



};


shooterGame.scene.Player.prototype.updateAmmo = function () {

    if (this.ammoDisplay) {
        this.ammoDisplay.dispose();
    }
    if (this.id === 1) {
        this.ammoDisplay = new rune.text.BitmapField("ammo: " + this.ammo);
        this.ammoDisplay.x = 30;
        this.ammoDisplay.y = 10;
        if (shooterGame.scene.Game.prototype.roundEnd === true) {

            this.stage.addChild(this.ammoDisplay);
        }

    } else {
        this.ammoDisplay = new rune.text.BitmapField("ammo: " + this.ammo);
        this.ammoDisplay.x = 325;
        this.ammoDisplay.y = 10;
        if (shooterGame.scene.Game.prototype.roundEnd === true) {

            this.stage.addChild(this.ammoDisplay);
        }

    }


}


shooterGame.scene.Player.prototype.reload = function () {

    if (!this.reloadTimer) {
        this.reloadTimer = this.timers.create({
            duration: 2000,
            onStart: function () {
                this.ammoDisplay.text = "Reloading...";
                this.updateAmmo();
                this.reloadSound.play();
            },
            onComplete: function () {
                this.ammo = 5;
                this.reloadTimer = null;
                this.updateAmmo();
            },
            scope: this
        });

    }



}