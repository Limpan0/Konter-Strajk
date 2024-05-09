shooterGame.scene.Maps = function (id) {

    rune.display.DisplayObject.call(this);
    this.id = id;
};

shooterGame.scene.Maps.prototype = Object.create(rune.display.DisplayObject.prototype);
shooterGame.scene.Maps.prototype.constructor = shooterGame.scene.Maps;

/**
 * Initiate the map
 * @returns {undefined}
 */
shooterGame.scene.Maps.prototype.init = function () {
    rune.display.DisplayObject.prototype.init.call(this); //superanrop, ska alltid finnas med 
    this.walls = new rune.display.DisplayGroup(this.stage);
    this.wallArr = [];
    this.wallThickness = 3;
    this.powerUp;
    this.powerUpCords = null;
    switch (this.id) {
        case 1:
            this.map1();
            break;
        case 2:
            this.map2();
            break;
        case 3:
            this.map3();
            break;
    
        default:
            this.map1();
            break;
    }
}

/**
 * To get the walls used in the maps
 * @returns {Object}
 */
shooterGame.scene.Maps.prototype.getWalls = function () {
    return this.walls;
}

/**
 * Map 1
 * @returns {undefined}
 */
shooterGame.scene.Maps.prototype.map1 = function () {

    //start cords for players
    this.playerStartCords = {
        x1: 20,
        y1: 40,
        x2: 360,
        y2: 185
    };

    //400x225 px
    var w1 = new rune.display.DisplayObject(0, 20, 400, this.wallThickness);
    var w2 = new rune.display.DisplayObject(0, 20, this.wallThickness, 205);
    var w3 = new rune.display.DisplayObject(0, 222, 400, this.wallThickness);
    var w4 = new rune.display.DisplayObject(397, 20, this.wallThickness, 210);
    //middle walls
    var w5 = new rune.display.DisplayObject(70, 20, this.wallThickness, 40);
    var w6 = new rune.display.DisplayObject(330, 185, this.wallThickness, 40);
    var w9 = new rune.display.DisplayObject(172, 150, this.wallThickness, 40);
    var w10 = new rune.display.DisplayObject(225, 60, this.wallThickness, 40);
    var w11 = new rune.display.DisplayObject(175, 60, 50, this.wallThickness);
    var w12 = new rune.display.DisplayObject(175, 187, 50, this.wallThickness);
    //left bot
    var w13 = new rune.display.DisplayObject(50, 150, 25, 45);
    var w14 = new rune.display.DisplayObject(75, 192, 50, this.wallThickness);
    var w15 = new rune.display.DisplayObject(50, 100, 80, 10);
    //right top
    var w16 = new rune.display.DisplayObject(330, 50, 25, 45);
    var w17 = new rune.display.DisplayObject(280, 50, 50, this.wallThickness);
    var w18 = new rune.display.DisplayObject(275, 140, 80, 10);
    //boxes
    var w7 = new rune.display.DisplayObject(125, 100, 50, 50);
    var w8 = new rune.display.DisplayObject(225, 100, 50, 50);
    var w19 = new rune.display.DisplayObject(125, 65, 10, 35);
    var w20 = new rune.display.DisplayObject(265, 150, 10, 35);
    this.wallArr.push(w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14, w15, w16, w17, w18,w19,w20);
    for (var i = 0; i < this.wallArr.length; i++) {
        this.wallArr[i].immovable = true;
        this.wallArr[i].backgroundColor = "#1000CF";
        this.walls.addMember(this.wallArr[i]);

    }

    shooterGame.scene.Game.prototype.walls = this.walls;

    
    //powerup cordinates
    this.powerUpCords = [
        {
            //top left
            x: 110,
            y: 40
        },
        {
            //bot right
            x: 270,
            y: 190
        },
        {
            //bot left
            x: 90,
            y: 160
        },
        {
            //top left
            x: 290,
            y: 65
        },
        {
            //mid
            x: 188,
            y: 115
        }
    ];


}

/**
 * Map 2
 * @returns {undefined}
 */
shooterGame.scene.Maps.prototype.map2 = function () {

    //start cords for players
    this.playerStartCords = {
        x1: 20,
        y1: 114,
        x2: 360,
        y2: 114
    };

    //Map size = 400x225 px
    //outer walls top, left, bot, right
    var w1 = new rune.display.DisplayObject(0, 20, 400, this.wallThickness);
    var w2 = new rune.display.DisplayObject(0, 20, this.wallThickness, 205);
    var w3 = new rune.display.DisplayObject(0, 222, 400, this.wallThickness);
    var w4 = new rune.display.DisplayObject(397, 20, this.wallThickness, 210);
    //semi outer walls
    var w9 = new rune.display.DisplayObject(0, 195, 200, 30);
    var w10 = new rune.display.DisplayObject(200, 20, 200, 30);
    var w11 = new rune.display.DisplayObject(200, 195, 80, this.wallThickness);
    var w12 = new rune.display.DisplayObject(130, 47, 80, this.wallThickness);
    //middle corridor
    var w13 = new rune.display.DisplayObject(60, 150, 100, 10);
    var w14 = new rune.display.DisplayObject(60, 90, 60, 10);
    var w15 = new rune.display.DisplayObject(190, 150, 60, 10);
    var w16 = new rune.display.DisplayObject(150, 90, 60, 10);
    var w17 = new rune.display.DisplayObject(240, 90, 100, 10);
    var w18 = new rune.display.DisplayObject(280, 150, 60, 10);
    var w5 = new rune.display.DisplayObject(100, 100, 20, 20);
    var w6 = new rune.display.DisplayObject(280, 130, 20, 20);
    var w7 = new rune.display.DisplayObject(190, 100, 20, 10);
    var w8 = new rune.display.DisplayObject(190, 140, 20, 10);
    var w19 = new rune.display.DisplayObject(60, 43, this.wallThickness, 47);
    var w20 = new rune.display.DisplayObject(340, 150, this.wallThickness, 47);
    //close to spawn-boxes
    var w21 = new rune.display.DisplayObject(30, 180, 15, 15);
    var w22 = new rune.display.DisplayObject(80, 160, 15, 15);
    var w23 = new rune.display.DisplayObject(305, 75, 15, 15);
    var w24 = new rune.display.DisplayObject(355, 50, 15, 15);


    this.wallArr.push(w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14, w15, w16, w17, w18, w19, w20, w21, w22, w23, w24);
    for (var i = 0; i < this.wallArr.length; i++) {
        this.wallArr[i].immovable = true;
        this.wallArr[i].backgroundColor = "#30B032";
        this.walls.addMember(this.wallArr[i]);

    }

    shooterGame.scene.Game.prototype.walls = this.walls;

    //---------------------------------------------------------------
    //Powerups
    //---------------------------------------------------------------
    this.powerUpCords = [
        {
            //mid top
            x: 187,
            y: 115
        },
        {
            //mid top
            x: 165,
            y: 25
        },
        {
            //mid bot
            x: 210,
            y: 200
        }
    ];


}

/**
 * Map 3
 * @returns {undefined}
 */
shooterGame.scene.Maps.prototype.map3 = function () {

    //start cords for players
    this.playerStartCords = {
        x1: 15,
        y1: 190,
        x2: 365,
        y2: 30
    };

    //400x225 px
    //outer walls
    var w1 = new rune.display.DisplayObject(0, 20, 400, this.wallThickness);
    var w2 = new rune.display.DisplayObject(0, 20, this.wallThickness, 205);
    var w3 = new rune.display.DisplayObject(0, 222, 400, this.wallThickness);
    var w4 = new rune.display.DisplayObject(397, 20, this.wallThickness, 210);
    //left boxes
    var w5 = new rune.display.DisplayObject(28, 45, 70, 70);
    var w9 = new rune.display.DisplayObject(28, 140, 120, 30);
    //right boxes
    var w6 = new rune.display.DisplayObject(302, 127, 70, 70);
    var w10 = new rune.display.DisplayObject(252, 70, 120, 30);
    //middle boxes
    var w7 = new rune.display.DisplayObject(140, 45, 40, 40);
    var w8 = new rune.display.DisplayObject(220, 157, 40, 40);
    var w13 = new rune.display.DisplayObject(175, 140, 20, 30);
    var w14 = new rune.display.DisplayObject(205, 70, 20, 30);
    //middle walls
    var w11 = new rune.display.DisplayObject(175, 45, 50, this.wallThickness);
    var w12 = new rune.display.DisplayObject(175, 194, 50, this.wallThickness);
    var w15 = new rune.display.DisplayObject(140, 85, this.wallThickness, 15);
    var w18 = new rune.display.DisplayObject(257, 142, this.wallThickness, 15);
    //dont know what to call these walls 
    var w16 = new rune.display.DisplayObject(80, 170, this.wallThickness, 30);
    var w17 = new rune.display.DisplayObject(320, 45, this.wallThickness, 30);
    
    this.wallArr.push(w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14, w15, w16, w17, w18);
    for (var i = 0; i < this.wallArr.length; i++) {
        this.wallArr[i].immovable = true;
        this.wallArr[i].backgroundColor = "#993d26";
        this.walls.addMember(this.wallArr[i]);

    }

    shooterGame.scene.Game.prototype.walls = this.walls;

    //---------------------------------------------------------------
    //Powerups
    //---------------------------------------------------------------
    this.powerUpCords = [
        {
            //bot right
            x: 268,
            y: 185
        },
        {
            //mid right
            x: 220,
            y: 125
        },
        {
            //mid left
            x: 155,
            y: 95
        },
        {
            //top left
            x: 107,
            y: 35
        },
    ];


}

/**
 * Spawns a powerup at a random location
 * @returns {undefined}
 */
shooterGame.scene.Maps.prototype.spawnPowerUp = function () {
    var cords = this.powerUpCords
    // this.powerUps = new rune.display.DisplayGroup(this.stage);
    this.powerUp = null;
    
    //chooses random sets of coordinates to spawn the powerup
    var spawn = Math.floor(Math.random() * cords.length);
    // var x = cords[0].x;
    // var y = cords[0].y;
    var x = cords[spawn].x;
    var y = cords[spawn].y;
    
    var rPower = Math.floor(Math.random() * 2);
    if (rPower === 0) {
        this.powerUp = new rune.display.Sprite(x, y, 25, 20, "speed");
        this.powerUp.type = "speed";
    } else {
        this.powerUp = new rune.display.Sprite(x, y, 25, 20, "bounce");
        this.powerUp.type = "bounce";
    }

    this.stage.addChild(this.powerUp);

}