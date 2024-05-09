shooterGame.scene.HowToPlay = function () {
    rune.scene.Scene.call(this);

};

shooterGame.scene.HowToPlay.prototype = Object.create(rune.scene.Scene.prototype);
shooterGame.scene.HowToPlay.prototype.constructor = shooterGame.scene.HowToPlay;

/**
 * Displays all the text and images for the how to play scene
 * @returns {undefined}
 */
shooterGame.scene.HowToPlay.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this); //superanrop, ska alltid finnas med 

    this.stage.backgroundColor = "#cebd94";
    var controller = new rune.display.Sprite(0, 0, 150, 80, "controller");
    controller.x = this.application.screen.centerX - controller.width / 2;
    controller.y = 20;
    var shoot = new rune.text.BitmapField("Shoot");
    shoot.x = controller.x + 106;
    shoot.y = controller.y + 85;
    var reload = new rune.text.BitmapField("Reload, takes 2s");
    reload.x = controller.x + 155;
    reload.y = controller.y + 42;
    var move = new rune.text.BitmapField("Move/Aim");
    move.x = controller.x + 30;
    move.y = controller.y + 90;
    var powerup = new rune.text.BitmapField("POWERUPS");
    powerup.x = controller.x + 50;
    powerup.y = controller.y + 120;
    var powerupDuration = new rune.text.BitmapField("Powerup duration: 4s");
    powerupDuration.x = controller.x + 15;
    powerupDuration.y = controller.y + 130;

    var p1 = new rune.display.Sprite(powerup.x - 50, powerup.y + 25, 25, 20, "bounce");
    var p2 = new rune.display.Sprite(powerup.x + 75, powerup.y + 25, 25, 20, "speed");
    var bounce = new rune.text.BitmapField("Double Bullet Bounce");
    bounce.x = p1.x - 50;
    bounce.y = p1.y + 25;
    var speed = new rune.text.BitmapField("+Movement Speed");
    speed.x = p2.x - 35;
    speed.y = p2.y + 25;

    var objective = new rune.text.BitmapField("OBJECTIVE");
    objective.x = controller.x - 90;
    objective.y = controller.y + 60;
    var text1 = new rune.text.BitmapField("Shoot your opponent");
    text1.x = objective.x - 30;
    text1.y = objective.y + 15;
    var text2 = new rune.text.BitmapField("Best of 3 rounds wins");
    text2.x = text1.x;
    text2.y = text1.y + 10;


    this.backOption = new rune.text.BitmapField("Press START to go back");
    this.backOption.flicker.start(100000, 500);
    this.backOption.autoSize = true;
    this.backOption.centerX = this.application.screen.centerX;
    this.backOption.y = 210;
    this.stage.addChild(this.backOption);
    this.stage.addChild(controller);
    this.stage.addChild(shoot);
    this.stage.addChild(reload);
    this.stage.addChild(move);
    this.stage.addChild(powerup);
    this.stage.addChild(powerupDuration);
    this.stage.addChild(p1);
    this.stage.addChild(p2);
    this.stage.addChild(bounce);
    this.stage.addChild(speed);
    this.stage.addChild(objective);
    this.stage.addChild(text1);
    this.stage.addChild(text2);
}

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 * @param {number} step 
 */
shooterGame.scene.HowToPlay.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);

    if (this.keyboard.justPressed("SPACE") || this.gamepads.get(0).justPressed(11) || this.gamepads.get(0).justPressed(9) || this.keyboard.justPressed("ENTER")) {

        this.application.scenes.load([new shooterGame.scene.Menu()]);

    }

}

shooterGame.scene.Bullet.prototype.dispose = function () {
    rune.display.DisplayObject.prototype.dispose.call(this);
};
