class Chef extends Phaser.Scene {
    constructor() {
        super("chefScene");
    }

    preload() {
        this.load.image("bg", "./assets/doorOpened.png");
        this.load.image("playerSMALL", "./assets/playerSmall.png");
        this.load.image("playerNormal", "./assets/playerNormal.png");
        this.load.image("playerBIG", "./assets/playerBig.png");
    }

    create() {
        let player;
        console.log(currentState);

        if (currentState === 'small') {
            player = this.add.sprite(50, 600, "playerSMALL").setOrigin(0, 1).setDepth(10);
        } else if (currentState === 'normal') {
            player = this.add.sprite(50, 600, "playerNormal").setOrigin(0, 1).setDepth(10);
        } else {
            player = this.add.sprite(50, 600, "playerBIG").setOrigin(0, 1).setDepth(10);
        }

        // Make chef appear
        if (currentState === "big" || currentState == "normal") {
            // Lose
            console.log("You were caught.");
        } else {
            // Create a delayed event to check if the timer has reached zero
            this.timer = this.time.addEvent({
                delay: 8000,
                callback: this.onTimerComplete,
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
}
