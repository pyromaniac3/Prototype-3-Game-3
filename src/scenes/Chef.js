class Chef extends Phaser.Scene {
    constructor() {
        super("chefScene");
    }

    preload() {
        this.load.image("bg", "./assets/doorOpened.png");
        this.load.image("playerSMALL", "./assets/playerSmall.png");
        this.load.image("playerNormal", "./assets/playerNormal.png");
        this.load.image("playerBIG", "./assets/playerBig.png");
        this.load.image("chefAngry" , "./assets/chefAngry.png");
        this.load.image("chef", "./assets/chef.png");
    }

    create() {
        let chef = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "chef").setOrigin(0.4).setDepth(10).setScale(0.3);
        chef.setAlpha(0); // set initial alpha to 0 (transparent)

        // mask to control the fade-in effect
        const maskGraphics = this.make.graphics();
        maskGraphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
        const mask = maskGraphics.createGeometryMask();

        chef.setMask(mask);

        this.tweens.add({
            targets: chef,
            alpha: { from: 0, to: 1 },
            duration: 1000, 
            ease: 'Sine.InOut',
            delay: 1000, 
        });
        let player;
        console.log(currentState);

        if (currentState === 'small') {
            player = this.add.sprite(50, 600, "playerSMALL").setOrigin(0, 1).setDepth(10);
            for (let i = 0; i < 8; i++) {
                this.time.delayedCall(i * 1100, () => {
                    chef.setFlipX(!chef.flipX); // flip horizontally
                });
            }
            this.timer = this.time.addEvent({
                delay: 8000,
                callback: this.onTimerComplete,
                callbackScope: this
            });
        } else if (currentState === 'normal') {
            player = this.add.sprite(50, 600, "playerNormal").setOrigin(0, 1).setDepth(10);
            chef.setTexture("chefAngry");
            this.timer = this.time.addEvent({
                delay: 4000,
                callback: this.onDelayComplete,
                callbackScope: this
            });
        } else {
            player = this.add.sprite(50, 600, "playerBIG").setOrigin(0, 1).setDepth(10);
            chef.setTexture("chefAngry");
            this.timer = this.time.addEvent({
                delay: 4000,
                callback: this.onDelayComplete,
                callbackScope: this
            });
        }

        let room = this.add.sprite(0, 600, "bg").setOrigin(0, 1);
    }

    // Callback function for the delayed event
    onTimerComplete() {
        // Check if the timer has reached zero
        if (this.timer && this.timer.getRemainingSeconds() <= 0) {
            this.scene.stop("chefScene");
            this.scene.start("roomScene");
            roundCount++;
        }
    }

    onDelayComplete() {
        if (this.timer && this.timer.getRemainingSeconds() <= 0) {
            this.scene.stop("chefScene");
            this.scene.start("gameOverScene");
            roundCount = 0;
        }
    }
}
