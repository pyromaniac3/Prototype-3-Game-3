let currentState = 'normal';
let roundCount = 0;
class Room extends Phaser.Scene{
    constructor(){
        super("roomScene");
        this.targetPosition = null;
        this.isPlayerMoving = false;
        this.currBorger = null;
        this.foods = [];
    }
    preload(){
        this.load.image("food", "./assets/food.png");
        // add in background
        this.load.image("background", "./assets/hotel_lobby.png");
        
        // add in doors
        
        // add in player
        this.load.image("playerNormal", "./assets/playerNormal.png");
        this.load.image("playerSmall", "./assets/playerSmall.png");
        this.load.image("playerBig", "./assets/playerBig.png");
    }

    create(){
        console.log(roundCount);
        // background of the scene
        let room = this.add.sprite(0,600,"background").setOrigin(0,1);

        // add in player sprite depth is to make sure its in front of the food
        this.player = this.add.sprite(50,600,"playerNormal").setOrigin(.5,1).setDepth(10);
        // round counter
        this.roundsLeft = 3;

        // minute timer variable
        this.timer = this.time.delayedCall(11000, this.onTimerComplete, [], this);
        
        // text UI
        this.firstText = this.add.text(10, 10, '', { fontSize: '28px', fontFamily: 'Arial', fill: '#ffffff', stroke: '#000000', strokeThickness: 4}).setOrigin(-0.9,-1.5);
        this.secondText = this.add.text(10, 10, '', { fontSize: '28px', fontFamily: 'Arial', fill: 'red', stroke: '#000000', strokeThickness: 4})
        this.winText = this.add.text(10, 10, '', { fontSize: '28px', fontFamily: 'Arial', fill: 'gold', stroke: '#000000', strokeThickness: 4}).setOrigin(-0.7,-2.7);

        //#region << PLAYER SIZE STATE >>
          this.sizeState = {
            BIG:{
                name:'big',
                enter: () =>{
                    // set the size state to big and mak player big
                    this.currSizeState = this.sizeState.BIG;
                    console.log("am big");
                    currentState = 'big';
                    this.player.setTexture("playerBig");
                }
            },
            NORMAL:{
                name:'normal',
                enter: () =>{
                    // set the state to normal and revert size to regular
                    this.currSizeState = this.sizeState.NORMAL;
                    this.player.setTexture("playerNormal");
                    currentState = 'normal';
                    console.log("am normal");

                }
            },
            SMALL:{
                name:'small',
                enter: () =>{
                    // set state to small and scale to half size
                    this.currSizeState = this.sizeState.SMALL;
                    this.player.setTexture("playerSmall");
                    currentState = 'small';
                    console.log("am small");
                }
            } 
        }   
        //#endregion

        //#region << Create instances of the Food prefab >>
        const food1 = new Food(this, foodX, foodY, 'food', [this.sizeState.BIG,this.sizeState.SMALL,this.sizeState.NORMAL], this.player).setScale(0.5);
        const food2 = new Food(this, foodX +260, foodY, 'food', [this.sizeState.BIG,this.sizeState.SMALL,this.sizeState.NORMAL], this.player).setScale(0.5);
        const food3 = new Food(this, foodX +520, foodY, 'food', [this.sizeState.BIG,this.sizeState.SMALL,this.sizeState.NORMAL], this.player).setScale(0.5);
        //#endregion
        this.foods[0] = food1;
        this.foods[1] = food2;
        this.foods[2] = food3;
        this.sizeState.NORMAL.enter();// enter normal to start with

        // Global click listener
        this.input.on('pointerdown', (pointer) => {
            if (!this.isClickOnFood(pointer)) {
                this.stopPlayerMovement();
            }
        });
    }

    onTimerComplete() {
        console.log("times up!");
    }

    update(){
        if (roundCount >= 3) {
            this.scene.play("winScene");
        }
        // add a timer for 10 seconds to choose a door and a food
        // if when food is eaten and timer is over door gets opened and if the player isnt caught refill
        // the food and keep going until caught
        var remaining = this.timer.getRemainingSeconds();
        const remainingTime = Math.floor(remaining); // round down
        this.firstText.setText("Quick! They're coming!");
        this.secondText.setText(remainingTime + " seconds remaining");
        if(remainingTime == 0) {
            this.firstText.setText("");
            this.secondText.setText("");
            // implement scene here where the person comes to the door
            console.log(currentState);
            this.scene.start("chefScene");
            console.log("rounds left" + this.roundsLeft);
            this.roundsLeft--;
            this.timer = this.time.delayedCall(11000, this.onTimerComplete, [], this);
            this.firstText.setText("Quick! They're coming!");
            this.secondText.setText(remainingTime + " seconds remaining");
            this.foods.forEach( (item) => {
                item.setRandomState();
                item.bite(1);
            })
        }
        if(this.roundsLeft <= 0) {
            this.firstText.setText("");
            this.secondText.setText("");
            // player wins
            this.winText.setText("You win!");
        }
        if (this.isPlayerMoving) {
            const speed = 3; // speed of player
            this.player.x +=( speed * Math.sign(this.targetPosition.x - this.player.x));

            if(this.targetPosition != null && this.currBorger.active && (Math.abs(Math.abs(this.targetPosition.x) - Math.abs(this.player.x)) < 3)){
                this.isPlayerMoving = false;
                this.targetPosition = null;
                this.currBorger.sizeState.enter();
                this.currBorger.bite(0);
                this.foods.forEach( (item) => {
                    item.off();
                })
            }
        }
    }

    isClickOnFood(pointer) {
        return this.foods.some(food => food.getBounds().contains(pointer.x, pointer.y));
    }

    stopPlayerMovement() {
        this.isPlayerMoving = false;
        this.targetPosition = null;
        this.currBorger = null;
    }

}