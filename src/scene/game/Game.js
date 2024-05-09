//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * 
 * @param {object} p1 
 * @param {object} p2 
 * @param {array} mapArray
 * 
 * @returns {undefined}
 */
shooterGame.scene.Game = function (p1, p2, mapArray) {

    rune.scene.Scene.call(this);
    this.p1Won = p1 || 0;
    this.p2Won = p2 || 0;
    this.mapArray = mapArray || [1, 2, 3];
    this.roundEnd = false;
    shooterGame.scene.Game.prototype.roundEnd = this.roundEnd;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

shooterGame.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
shooterGame.scene.Game.prototype.constructor = shooterGame.scene.Game;

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
shooterGame.scene.Game.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);

    this.roundEnd = false;
    this.hasPowerUp = false;
    var r = Math.floor(Math.random() * this.mapArray.length);
    this.rId = this.mapArray.splice(r, 1);
    this.endGame = false;

    //play music     
    if (this.application.sounds.master.length === 0) {
        this.gameMusic = this.application.sounds.master.get("music_game", false);
        this.gameMusic.loop = true;
        this.gameMusic.volume = 0.2;
        this.gameMusic.play();

    }

    //Sounds
    this.powerUpSound = this.application.sounds.sound.get("powerup_sound", false);
    this.deathSound = this.application.sounds.sound.get("splatsound", false);
    this.countdownSound = this.application.sounds.sound.get("countdown321", false);

    //Start new game
    this.newGame();

};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
*
* @param {number} step Fixed time step.
*
* @returns {undefined}
*/
shooterGame.scene.Game.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    var self = this;

    //Powerups hitTest
    if (this.map.powerUp) {
        this.map.powerUp.hitTestObject(this.player1, function () {
            self.powerUp(self.player1);
        });
        this.map.powerUp.hitTestObject(this.player2, function () {
            self.powerUp(self.player2);
        });

    }



    // Hit test kill eachother
    if (this.player1.active === true && this.player2.active === true) {

        if (this.player1.bulletList || this.player2.bulletList) {

            this.player2.hitTestGroup(this.player1.bulletList, function () {
                if (self.player1.bulletList.getMembers()[0].id === 1) {
                    this.p1Won++;
                    self.kill(self.player1, self.player2);
                }
            }, this);
            this.player1.hitTestGroup(this.player2.bulletList, function () {
                if (self.player2.bulletList.getMembers()[0].id === 2) {
                    this.p2Won++;
                    self.kill(self.player2, self.player1);
                }
            }, this);

        }
    }


    //Hit test player collisions
    this.player1.hitTestAndSeparate(this.player2, function () {

    });


    if (this.roundEnd === true) {
        if (this.gamepads.get(0).justPressed(9) || this.keyboard.justPressed("ENTER")) {
            this.application.scenes.load([new shooterGame.scene.Game(this.p1Won, this.p2Won, this.mapArray)]);
        }
    }

    if (this.endGame === true) {
        if (this.gamepads.get(0).justPressed(9) || this.keyboard.justPressed("ENTER")) {
            this.application.sounds.master.clear();

            this.application.scenes.load([new shooterGame.scene.Menu()]);
        }
    }





};

/**
 * Handles the player and score when a player kills another player
 * @param {object} winner 
 * @param {object} loser 
 */
shooterGame.scene.Game.prototype.kill = function (winner, loser) {
    this.deathSound.play();
    this.cameras.getCameraAt(0).shake.start(200);
    this.player1.active = false;
    this.player2.active = false;
    loser.dispose();
    loser = null;
    winner.bullet.dispose();
    winner.bullet = null;

    if (winner === this.player1 && this.p1Won != 2) {
        this.winnerText = new rune.text.BitmapField("Player 1 wins this round! Press START for the next round!");
        this.winnerText.autoSize = true;
        this.winnerText.center = this.application.screen.center;
        this.stage.addChild(this.winnerText);
        this.roundEnd = true;
    } else if (winner === this.player2 && this.p2Won != 2) {
        this.winnerText = new rune.text.BitmapField("Player 2 wins this round! Press START for the next round!");
        this.winnerText.autoSize = true;
        this.winnerText.center = this.application.screen.center;
        this.stage.addChild(this.winnerText);
        this.roundEnd = true;
    }

    this.playerInfo();


}

/**
 * Updates the players infobar: ammo, powerup-timer and wins
 * @returns {undefined}
 */
shooterGame.scene.Game.prototype.playerInfo = function () {

    if (this.p1Ammo || this.p2Ammo) {
        this.p1Ammo.dispose();
        this.p1Ammo = null;
        this.p2Ammo.dispose();
        this.p2Ammo = null;
    }
    var p1 = new rune.text.BitmapField("PLAYER 1");
    var p2 = new rune.text.BitmapField("PLAYER 2");
    p1.x = 30;
    p2.x = 320;
    this.stage.addChild(p1);
    this.stage.addChild(p2);

    //display amount of round-wins
    var winsText = new rune.text.BitmapField("WINS");
    winsText.x = 188;
    winsText.y = 5;
    var p1w1 = new rune.display.DisplayObject(160, 3, 4, 14);
    var p1w2 = new rune.display.DisplayObject(170, 3, 4, 14);
    var p2w1 = new rune.display.DisplayObject(236, 3, 4, 14);
    var p2w2 = new rune.display.DisplayObject(226, 3, 4, 14);
    var winText = new rune.text.BitmapField("WINS");
    winText.x = p1w2.x + 18;
    winText.y = p1w2.y + 3;
    this.winDisplay = new rune.display.DisplayGroup(this.stage);
    this.winDisplay.addMember(p1w1);
    this.winDisplay.addMember(p1w2);
    this.winDisplay.addMember(p2w1);
    this.winDisplay.addMember(p2w2);
    this.stage.addChild(winText);

    for (var i = 0; i < this.winDisplay.getMembers().length; i++) {
        this.winDisplay.getMembers()[i].backgroundColor = "#222222";
    }

    if (this.p1Won === 1) {
        p1w1.backgroundColor = "#209920";
    } else if (this.p1Won === 2) {
        p1w1.backgroundColor = "#209920";
        p1w2.backgroundColor = "#209920";
        this.gameOver(this.player1);
        this.endGame = true;
    }
    if (this.p2Won === 1) {
        p2w1.backgroundColor = "#8df0e6";
    } else if (this.p2Won === 2) {
        p2w1.backgroundColor = "#8df0e6";
        p2w2.backgroundColor = "#8df0e6";
        this.gameOver(this.player2);
        this.endGame = true;
    }



}


/**
 * Initiates a new game/round after a player has won
 * @returns {undefined}
 */
shooterGame.scene.Game.prototype.newGame = function () {

    this.roundEnd === false;

    //new map
    this.map = new shooterGame.scene.Maps(this.rId[0]);
    // this.map = new shooterGame.scene.Maps(3);


    this.stage.addChild(this.map);
    this.stage.backgroundColor = "#cebd94";
    this.walls = shooterGame.scene.Game.prototype.walls;
    shooterGame.scene.Game.prototype.walls = this.walls;

    //Players
    this.player1 = new shooterGame.scene.Player(this.map.playerStartCords.x1, this.map.playerStartCords.y1, 1, this.timers);
    this.player2 = new shooterGame.scene.Player(this.map.playerStartCords.x2, this.map.playerStartCords.y2, 2, this.timers);
    this.stage.addChild(this.player1);
    this.stage.addChild(this.player2);
    this.player1.active = false;
    this.player2.active = false;

    //show players information
    this.playerInfo();
    //start timer 

    this.startTimerSprite = new rune.display.Sprite(this.application.screen.centerX - 64, 88, 64, 32, "countdown");
    this.startTimerSprite.animation.create("count", [0, 1, 2, 3], 1.5, true);
    this.startTimerSprite.scaleX = 2;
    this.startTimerSprite.scaleY = 2;
    this.startTimer = this.timers.create({
        duration: 2600,
        scope: this,
        onStart: function () {
            this.stage.addChild(this.startTimerSprite);
            this.countdownSound.play();
        },
        onComplete: function () {
            this.startTimerSprite.dispose();
            this.startTimerSprite = null;
            this.startTimer = null;
            this.player1.active = true;
            this.player2.active = true;
            //spawn powerUp
            this.powerUp();
        }
    }, true);
}


/**
 * Handles the game when a player has won the game
 * @param {object} player 
 * @returns {undefined}
 */
shooterGame.scene.Game.prototype.gameOver = function (player) {

    this.backOption = new rune.text.BitmapField("Press START to go back");
    this.backOption.flicker.start(100000, 500);
    this.backOption.autoSize = true;
    this.backOption.centerX = this.application.screen.centerX;
    this.backOption.y = 210;
    this.stage.addChild(this.backOption);

    if (player.id === 1) {
        this.gameWinningText = new rune.text.BitmapField("PLAYER " + player.id + " WINS THE GAME: " + this.p1Won + " - " + this.p2Won);
        this.p1 = new rune.display.Sprite(this.application.screen.centerX - 32, 120, 32, 32, "soldier_walking");
        this.p1.animation.create("walk", [0, 1, 2, 3], 4, true);
        this.p1.scaleX = 2;
        this.p1.scaleY = 2;
        this.stage.addChild(this.p1);
    } else {
        this.gameWinningText = new rune.text.BitmapField("PLAYER " + player.id + " WINS THE GAME: " + this.p2Won + " - " + this.p1Won);
        this.p2 = new rune.display.Sprite(this.application.screen.centerX - 32, 120, 32, 32, "soldier_walking2");
        this.p2.animation.create("walk", [0, 1, 2, 3], 4, true);
        this.p2.scaleX = 2;
        this.p2.scaleY = 2;
        this.p2.flippedX = true;
        this.stage.addChild(this.p2);
    }

    this.gameWinningText.autoSize = true;
    this.gameWinningText.center = this.application.screen.center;
    this.stage.addChild(this.gameWinningText);

}


/**
 * Handles the powerup when a player picks it up
 * @param {object} player 
 * @returns {undefined}
 */
shooterGame.scene.Game.prototype.powerUp = function (player) {
    var self = this;
    this.powerUpBar = new rune.ui.Progressbar(30, 10, "#FFFFFF", "#000000");
    this.powerUpBar.y = 5;
    this.powerUpBar.progress = 1;


    if (!this.hasPowerUp) {
        this.powerUpRespawnTimer = this.timers.create({
            duration: 6000,
            onComplete: function () {
                if (this.endGame === false) {
                    self.map.spawnPowerUp();
                    self.hasPowerUp = false;
                }
            },
            scope: this
        }, true);

        if (this.map.powerUp) {

            var type = this.map.powerUp.type

            //add powerups to player
            if (type === "speed") {
                player.moveSpeed = 1.6;
                this.powerUpDisplay = new rune.display.Sprite(0, 0, 25, 20, "speed");

            } else {
                player.maxBounces = 8;
                this.powerUpDisplay = new rune.display.Sprite(0, 0, 25, 20, "bounce");
            }

            if (player.id === 1) {
                this.powerUpDisplay.x = 85;
                this.powerUpBar.x = 115;
            } else {
                this.powerUpDisplay.x = 285;
                this.powerUpBar.x = 250;
                this.powerUpBar.flippedX = true;
            }

            //remove powerup after 5 seconds
            this.powerUpTimer = this.timers.create({
                duration: 500,
                repeat: 8,
                onStart: function () {
                    this.stage.addChild(this.powerUpDisplay);
                    this.stage.addChild(this.powerUpBar);
                    this.powerUpSound.play();

                },
                onTick: function () {
                    this.powerUpBar.progress -= 0.1;
                },
                onComplete: function () {
                    player.moveSpeed = 1.15;
                    player.maxBounces = 5;
                    this.powerUpDisplay.dispose();
                    this.powerUpBar.dispose();

                },
                scope: this
            });

            this.map.powerUp.dispose();
        };

    }

}





/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
shooterGame.scene.Game.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);

    this.map = null;
    this.walls = null;
    this.gameMusic = null;
    this.p1Won = null;
    this.p2Won = null;
    this.player1 = null;
    this.player2 = null;
    this.winDisplay.forEachMember(function (x) {
        x.dispose();
        x = null;
    }, this);
    this.winnerText = null;
    this.backOption = null;
    this.gameWinningText = null;
    this.powerUpBar = null;
    this.powerUpDisplay = null;
    this.powerUpTimer = null;
    if (this.p1) {
        this.p1 = null;
    }
    if (this.p2) {
        this.p2 = null;
    }
};