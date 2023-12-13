/*
    Welcome to the menu set up screen
*/

let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,  // Scale mode to fit the whole game in the specified dimensions
        autoCenter: Phaser.Scale.CENTER_BOTH,  // Center the game on the screen
    },
    backgroundColor: '#FACADE', // Set the background color to a hex color code
    scene : [Room, Chef, GameOver, Win]
};

let game = new Phaser.Game(config);

let foodX = 160; // to change where the beginning food starts
let foodY = 200; // to change where the food lies height wise
