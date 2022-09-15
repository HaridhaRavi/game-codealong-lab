console.log("my js file loaded")
class Game{
    constructor(){
        this.player = null;
    }
    start(){
        console.log("Starting game");
        this.player = new Player();
        this.attachEventListeners();
    }
    attachEventListeners(){
        document.addEventListener('keydown',(keyEvent)=>{
            console.log("user has pressed a key",keyEvent.key);
            if(keyEvent.key === "ArrowLeft"){
                this.player.moveLeft();
            }else if(keyEvent.key === "ArrowRight"){
                this.player.moveRight();
            }
        });
    }
}


class Player{
    constructor(){
        this.positionX =35;
        this.positionY =0;
        this.width = 20;
        this.height = 10;
        this.domElement = null;
        this.createDomElement();
    }
    //Creating a div using dom and append it in dom
    createDomElement(){
        this.domElement = document.createElement('div');
        //newDiv.setAttribute('id','player')
        this.domElement.id = "player";

        this.domElement.style.width = this.width+"vw";
        this.domElement.style.height = this.height+"vh";

        //position
        this.domElement.style.bottom = this.positionY+"vh";
        this.domElement.style.left = this.positionX+"vw";
        
        //append to dom
        const boardElm = document.getElementById('board');
        boardElm.appendChild(this.domElement);

    }
    moveLeft(){
        console.log("moving left",this.positionX)
        this.positionX -= 1;
        this.domElement.style.left = this.positionX+"vw";
    }
    moveRight(){
        console.log("moving left",this.positionX)
        this.positionX += 1;
        this.domElement.style.left = this.positionX+"vw";
    }

}

const game = new Game();
game.start();
