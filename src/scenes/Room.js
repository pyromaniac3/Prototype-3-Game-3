let currentState = 'normal';
let roundCount = 0;
class Room extends Phaser.Scene{
    constructor(){
        super("roomScene");
    }
    preload(){
        this.load.image("food", "./assets/food.png");
        // add in background
        this.load.image("background", "./assets/hotel_lobby.png");
        
        // add in doors
        
        // add in player
        this.load.image("playerSMALL", "./assets/playerSmall.png");
        this.load.image("playerNormal", "./assets/playerNormal.png");
        this.load.image("playerBIG", "./assets/playerBig.png");
    }

    create(){
        console.log(roundCount);
        // background of the scene
        let room = this.add.sprite(0,600,"background").setOrigin(0,1);

        // add in player sprite depth is to make sure its in front of the food
        let player = this.add.sprite(50,600,"playerNormal").setOrigin(0,1).setDepth(10);

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
                    // set the size state to big and scale the player double size
                    this.currSizeState = this.sizeState.BIG;
                    console.log("am big");
                    currentState = 'big';
                    player.setTexture("playerBIG");
                }
            },
            NORMAL:{
                name:'normal',
                enter: () =>{
                    // set the state to normal and revert size to regular
                    this.currSizeState = this.sizeState.NORMAL;
                    player.setTexture("playerNormal");
                    currentState = 'normal';
                    console.log("am normal");
                }
            },
            SMALL:{
                name:'small',
                enter: () =>{
                    // set state to small and scale to half size
                    this.currSizeState = this.sizeState.SMALL;
                    player.setTexture("playerSMALL");
                    currentState = 'small';
                    console.log("am small");
                }
            } 
        }   
        //#endregion

        //#region << Create instances of the Food prefab >>
        const food1 = new Food(this, foodX, foodY, 'food', [this.sizeState.BIG,this.sizeState.SMALL,this.sizeState.NORMAL]).setScale(0.5);
        const food2 = new Food(this, foodX +260, foodY, 'food', [this.sizeState.BIG,this.sizeState.SMALL,this.sizeState.NORMAL]).setScale(0.5);
        const food3 = new Food(this, foodX +520, foodY, 'food', [this.sizeState.BIG,this.sizeState.SMALL,this.sizeState.NORMAL]).setScale(0.5);
        //#endregion
        
        this.sizeState.NORMAL.enter();// enter normal to start with

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

        }
    }
}