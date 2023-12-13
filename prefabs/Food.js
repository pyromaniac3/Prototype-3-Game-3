class Food extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, sizeStateList, player) {
        super(scene, x, y, texture);
        this.biteLevel;
        // Add the object to the scene
        scene.add.existing(this);
        this.sizeStateList = sizeStateList;

        // Enable input for the object
        this.setInteractive({ useHandCursor: true });

        // Set the size state associated with this food object
        //this.sizeState = sizeState;
        //const randomItem = this.getRandomItem();
        //this.sizeState = randomItem;
        this.sizeState = null;
        // Add a pointerdown event listener for the object
        this.on('pointerdown', () => this.onPointerDown(player, x, y), this);
        this.setRandomState();
    }

    setRandomState() {
        const randomIndex = Math.floor(Math.random() * this.sizeStateList.length);
        this.sizeState = this.sizeStateList[randomIndex];
    }

    onPointerDown(player,x,y) {
        console.log("Food clicked");
        this.scene.targetPosition = null;
        this.scene.currBorger = this;
        this.scene.targetPosition = { x: this.x, y: this.y }; //set player to move to us!
        if(Math.sign(this.scene.targetPosition.x - this.scene.player.x) < 0){
            this.scene.player.setFlipX(true);
        }else{
            this.scene.player.setFlipX(false);
        }
        this.scene.isPlayerMoving = true;
        this.scene.targetPosition = { x: this.x, y: this.y }; //set player to move to us!
        console.log("player is moving = " + this.scene.isPlayerMoving + "target posX: " + this.scene.targetPosition.x);
    }
    bite(val){
        this.biteLevel-=1;
        this.setAlpha(val == 0 ? 0 : 1);
        this.setActive(val);
    }
    off(){
        this.setActive(0);
    }
}