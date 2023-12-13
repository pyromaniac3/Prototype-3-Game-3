class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        this.load.image('back','./assets/darkenedBG.png');
        this.load.image('gameOver','./assets/gameOver.png');
    }

    create() {
        let bg = this.add.image(0, 600, "back").setOrigin(0,1);
        let text = this.add.image(160,300, "gameOver").setOrigin(0,1);
        this.add.text(275, 400, 'Press R to restart', { fontSize: '24px', fill: '#fff' }).setOrigin(0,1);
        
        this.input.keyboard.on('keydown-R', () => {
            this.scene.stop('gameOverScene');
            this.scene.start('roomScene');
        });
    }
}