class Food extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, sizeStateList) {
        super(scene, x, y, texture);

        // Add the object to the scene
        scene.add.existing(this);

        // Enable input for the object
        this.setInteractive({ useHandCursor: true });

        // Set the size state associated with this food object
        //this.sizeState = sizeState;
        const randomItem = this.getRandomItem(sizeStateList);
        this.sizeState = randomItem;
        // Add a pointerdown event listener for the object
        this.on('pointerdown', this.onPointerDown, this);
    }

    getRandomItem(list) {
        const randomIndex = Math.floor(Math.random() * list.length);
        return list[randomIndex];
    }

    onPointerDown() {
        console.log("Food clicked");
        // Call the enter method associated with the size state
        this.sizeState.enter();
    }
}
