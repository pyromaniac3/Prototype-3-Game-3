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
        this.load.image("playerNormal", "./assets/playerNormal.png");
        this.load.image("playerSmall", "./assets/playerSmall.png");
        this.load.image("playerBig", "./assets/playerBig.png");
    }

    create(){
        // background of the scene
        let room = this.add.sprite(0,600,"background").setOrigin(0,1).setScale(0.5);

        // add in player sprite depth is to make sure its in front of the food
        let player = this.add.sprite(50,600,"playerNormal").setOrigin(0,1).setDepth(10);
        
        
        //#region << PLAYER SIZE STATE >>
          this.sizeState = {
            BIG:{
                name:'big',
                enter: () =>{
                    // set the size state to big and scale the player double size
                    this.currSizeState = this.sizeState.BIG;
                    console.log("am big");
                    player.setTexture("playerBig");
                    //player.setScale(3);// double the size
                }
            },
            NORMAL:{
                name:'normal',
                enter: () =>{
                    // set the state to normal and revert size to regular
                    this.currSizeState = this.sizeState.NORMAL;
                    console.log("am normal");
                    player.setTexture("playerNormal");
                    //player.setScale(1); // normal scale
                }
            },
            SMALL:{
                name:'small',
                enter: () =>{
                    // set state to small and scale to half size
                    this.currSizeState = this.sizeState.SMALL;
                    console.log("am small")
                    player.setTexture("playerSmall");
                    //player.setScale(0.5); // half size
                }
            } 
        }   
        //#endregion

        //#region << Create instances of the Food prefab >>
        const food1 = new Food(this, foodX, foodY, 'food', [this.sizeState.BIG,this.sizeState.SMALL,this.sizeState.NORMAL], this.player).setScale(0.5);
        const food2 = new Food(this, foodX +260, foodY, 'food', [this.sizeState.BIG,this.sizeState.SMALL,this.sizeState.NORMAL], this.player).setScale(0.5);
        const food3 = new Food(this, foodX +520, foodY, 'food', [this.sizeState.BIG,this.sizeState.SMALL,this.sizeState.NORMAL], this.player).setScale(0.5);
        //#endregion
        
        this.sizeState.NORMAL.enter();// enter normal to start with

    }

    update(){

        // add a timer for 10 seconds to choose a door and a food
        // if when food is eaten and timer is over door gets opened and if the player isnt caught refill
        // the food and keep going until caught 
        


    }
}