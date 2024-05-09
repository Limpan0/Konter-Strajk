//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the Main class.
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Entry point class.
 */
shooterGame.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend (Rune) Application.
     */
    rune.system.Application.call(this, {
        developer: "se.lnu",
        app: "shooterGame",
        build: "1.0.0",
        scene: shooterGame.scene.Menu,
        resources: shooterGame.data.Requests,
        useGamepads:true,
        useKeyboard:true,
        framerate: 60,
        debug: true
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

shooterGame.system.Main.prototype = Object.create(rune.system.Application.prototype);
shooterGame.system.Main.prototype.constructor = shooterGame.system.Main;