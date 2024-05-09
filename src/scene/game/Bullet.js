/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {string} bulletDir 
 * @param {number} maxBounces 
 * @param {number} id 
 * 
 * @returns {undefined}
 */
shooterGame.scene.Bullet = function (x, y, bulletDir, maxBounces, id) {

    rune.display.DisplayObject.call(this, x, y, 2, 2);
    this.bulletDir = bulletDir;
    this.id = id;
    this.maxBounces = maxBounces;
    this.movable = true;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

shooterGame.scene.Bullet.prototype = Object.create(rune.display.DisplayObject.prototype);
shooterGame.scene.Bullet.prototype.constructor = shooterGame.scene.Bullet;

/**
 * Initiate class
 * @returns {undefined}
 */
shooterGame.scene.Bullet.prototype.init = function () {
    rune.display.DisplayObject.prototype.init.call(this); //superanrop, ska alltid finnas med 

    if (this.id === 1) {
        this.backgroundColor = "#000000";
    } else this.backgroundColor = "#FFFFFF";

    this.bounceCounter = 0;
    this.bulletSpeed = 2;
    this.walls = shooterGame.scene.Game.prototype.walls;

    this.bulletBounce = this.application.sounds.sound.get("bullet_bounce", false);


}

/**
 * Get the previous x/y positions
 * @param {number} step 
 * @returns {undefined}
 */
shooterGame.scene.Bullet.prototype.m_updatePreviousPosition = function (step) {
    this.prevY = this.m_previousY;
    this.prevX = this.m_previousX;
    rune.display.DisplayObject.prototype.m_updatePreviousPosition.call(this, step);
}

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 * Checks what direction the bullet is supposed to go and bounces it off the walls
 * @param {number} step 
 * @returns {undefined}
 */
shooterGame.scene.Bullet.prototype.update = function (step) {
    rune.display.DisplayObject.prototype.update.call(this, step)

    switch (this.bulletDir) {
        case "r":
            this.x += this.bulletSpeed;
            break;
        case "d":
            this.y += this.bulletSpeed;
            break;
        case "l":
            this.x -= this.bulletSpeed;
            break;
        case "u":
            this.y -= this.bulletSpeed;
            break;
        case "rd":
            this.x += this.bulletSpeed;
            this.y += this.bulletSpeed;
            break;
        case "ru":
            this.x += this.bulletSpeed;
            this.y -= this.bulletSpeed;
            break;
        case "ld":
            this.x -= this.bulletSpeed;
            this.y += this.bulletSpeed;
            break;
        case "lu":
            this.x -= this.bulletSpeed;
            this.y -= this.bulletSpeed;
            break;
    };


    this.walls.hitTestAndSeparateObject(this, function () {
        var to = this.touching;
        this.bounceCounter++;
        this.bulletBounce.play(true);
        if (this.prevX < this.x && this.prevY < this.y) {
            if (to === 4096) {
                this.bulletDir = "ru";
            } else {
                this.bulletDir = "ld";
            }
            return;
        }
        // ↙
        if (this.prevX > this.x && this.prevY < this.y) {
            if (to === 4096) {
                this.bulletDir = "lu";
            } else {
                this.bulletDir = "rd";
            }
            return;
        }
        // ↖
        if (this.prevX > this.x && this.prevY > this.y) {
            if (to === 256) {
                this.bulletDir = "ld";
            } else {
                this.bulletDir = "ru";
            }
            return;
        }
        // ↗
        if (this.prevX < this.x && this.prevY > this.y) {
            if (to === 256) {
                this.bulletDir = "rd";
            } else {
                this.bulletDir = "lu";
            }
            return;
        }
        // ←	
        if (this.prevX < this.x) {
            this.bulletDir = "l";
            return;
        }
        // →
        if (this.prevX > this.x) {
            this.bulletDir = "r";
            return;
        }
        // ↑
        if (this.prevY < this.y) {
            this.bulletDir = "u";
            return;
        }
        // ↓	
        if (this.prevY > this.y) {
            this.bulletDir = "d";
            return;
        }

    }, this);

    if (this.bounceCounter >= this.maxBounces) {
        this.dispose();
    }


};


shooterGame.scene.Bullet.prototype.dispose = function () {
    rune.display.DisplayObject.prototype.dispose.call(this);
};
