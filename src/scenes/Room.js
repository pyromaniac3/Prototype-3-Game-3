class Room extends Phaser.Scene{
    constructor(){
        super("roomScene");
    }
    preload(){
        this.load.image("food", "./assets/food.png");
      

    }

    create(){

        // food to eat that will make you big,small, or no effect
        let player = this.add.rectangle(400,200,100,100, 0x7D7EEC)
      
        
        //#region << PLAYER SIZE STATE >>
          this.sizeState = {
            BIG:{
                name:'big',
                enter: () =>{
                    this.currSizeState = this.sizeState.BIG;
                    console.log("am big");
                    player.setScale(3);// double the size
                }
            },
            NORMAL:{
                name:'normal',
                enter: () =>{
                    this.currSizeState = this.sizeState.NORMAL;
                    console.log("am normal");
                    player.setScale(1); // normal scale
                }
            },
            SMALL:{
                name:'small',
                enter: () =>{
                    this.currSizeState = this.sizeState.SMALL;
                    console.log("am small")
                    player.setScale(0.5); // half size
                }
            } 
        }   
        //#endregion

        //#region << Create instances of the Food prefab >>
        const food1 = new Food(this, foodX, foodY, 'food', [this.sizeState.BIG,this.sizeState.SMALL,this.sizeState.NORMAL]).setScale(0.5);
        const food2 = new Food(this, foodX +300, foodY, 'food', [this.sizeState.BIG,this.sizeState.SMALL,this.sizeState.NORMAL]).setScale(0.5);
        const food3 = new Food(this, foodX +600, foodY, 'food', [this.sizeState.BIG,this.sizeState.SMALL,this.sizeState.NORMAL]).setScale(0.5);
        //#endregion
        
        this.sizeState.NORMAL.enter();// enter normal to start with

    }

    update(){

 
        


    }

    Food_State_Change(){

    }
}