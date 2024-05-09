shooterGame.scene.Menu = function () {
    rune.scene.Scene.call(this);

};

shooterGame.scene.Menu.prototype = Object.create(rune.scene.Scene.prototype);
shooterGame.scene.Menu.prototype.constructor = shooterGame.scene.Menu;

/**
 * Initializes the menu scene
 * @returns {undefined}
 */
shooterGame.scene.Menu.prototype.init = function () {
    //start the music
    this.menuMusic = this.application.sounds.master.get("music_menu", false);
    this.menuMusic.loop = true;
    this.menuMusic.volume = 0.5;
    this.menuMusic.play();
    rune.scene.Scene.prototype.init.call(this); //superanrop, ska alltid finnas med 
    this.bg = new rune.display.Graphic(0, 0, 400, 225, "background1");
    this.stage.backgroundColor = "#918167";
    var logo = new rune.display.Graphic(40, 20, 821, 126, "logo");
    logo.scaleX = 0.4;
    logo.scaleY= 0.4;
    var credits = new rune.text.BitmapField("Developer: David Lindberg. Music: Kevin MacLeod, AVBE.");
    credits.y = 214;
    credits.autoSize = true;

    this.p1 = new rune.display.Sprite(40, 80, 32, 32, "soldier_walking");
    this.p1.animation.create("walk", [0, 1, 2, 3], 4, true);
    this.p1.scaleX = 2;
    this.p1.scaleY = 2;
    this.p2 = new rune.display.Sprite(290, 80, 32, 32, "soldier_walking2");
    this.p2.animation.create("walk", [0, 1, 2, 3], 4, true);
    this.p2.scaleX = 2;
    this.p2.scaleY = 2;
    this.p2.flippedX = true;

    this.menu = new rune.ui.VTMenu();
    this.menu.add("Start Game");
    this.menu.add("How To Play");
    this.menu.onSelect(this.selectOption, this);
    this.menu.center = this.application.screen.center;

    this.stage.addChild(this.bg);
    this.stage.addChild(this.menu);
    this.stage.addChild(this.p1);
    this.stage.addChild(this.p2);
    this.stage.addChild(logo);
    this.stage.addChild(credits);



}

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 * @param {number} step 
 */
shooterGame.scene.Menu.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    if (this.keyboard.justPressed("w") || this.gamepads.get(0).justPressed(12)) {
        if (this.menu.up()) {

        }

    }
    if (this.keyboard.justPressed("s") || this.gamepads.get(0).justPressed(13)) {
        if (this.menu.down()) {

        }

    }
    if (this.keyboard.justPressed("SPACE") || this.gamepads.get(0).justPressed(0) || this.keyboard.justPressed("ENTER")) {
        if (this.menu.select()) {

        }

    }

}

/**
 * 
 * @param {object} option 
 */
shooterGame.scene.Menu.prototype.selectOption = function (option) {

    switch (option.text) {
        case "Start Game":
            this.application.sounds.master.clear();
            this.application.scenes.load([new shooterGame.scene.Game()]);

            break;

        case "How To Play":
            this.application.scenes.load([new shooterGame.scene.HowToPlay()]);
            break;
    }

}