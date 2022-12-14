console.log("my js file loaded")
class Game {
    constructor(){
        this.player = null; //will store an instance of the class Player
        this.obstacles = [];//store instances of obstacle class
    }

    start(){
        this.player = new Player();
        this.attachEventListeners();
        setInterval(()=>{
            const newObstacle = new Obstacle();
            this.obstacles.push(newObstacle);
        },2000)
        
           //move obstacles
           setInterval(() => {
            this.obstacles.forEach( (obstacleInstance) => {

                //move
                obstacleInstance.moveDown();

                //detect collision
                if (
                    this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
                    this.player.positionX + this.player.width > obstacleInstance.positionX &&
                    this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
                    this.player.height + this.player.positionY > obstacleInstance.positionY
                ) {
                    location.href = 'game-over.html';
                }

            });
        }, 60);

        
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
        this.positionX =45;
        this.positionY =0;
        this.width = 10;
        this.height = 5;
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
        if(this.positionX<1){
            this.positionX = 1;
        }else{
            console.log("moving left",this.positionX)
            this.positionX -= 1;
            this.domElement.style.left = this.positionX+"vw";
        }
        
    }
    moveRight(){
        if(this.positionX >89){
            this.positionX = 89
        }else{
            console.log("moving left",this.positionX)
            this.positionX += 1;
            this.domElement.style.left = this.positionX+"vw";
        }
        
    }

}


class Obstacle {
    constructor(){
        this.positionX = Math.random()*90;
        this.positionY = 90;
        this.width = 5;
        this.height = 5;
        this.domElement = null;
        this.createDomElement();
    }
     //Creating a div using dom and append it in dom
     createDomElement(){
        this.domElement = document.createElement('div');
        //newDiv.setAttribute('id','player')
        this.domElement.className = "obstacle";

        this.domElement.style.width = this.width+"vw";
        this.domElement.style.height = this.height+"vh";

        //position
        this.domElement.style.bottom = this.positionY+"vh";
        this.domElement.style.left = this.positionX+"vw";
        
        //append to dom
        const boardElm = document.getElementById('board');
        boardElm.appendChild(this.domElement);

    }
    moveDown(){
        if(this.positionY === 0){
            this.remove();
        }
        console.log("moving down",this.positionY)
        this.positionY-= 1;
        this.domElement.style.bottom = this.positionY + "vh";
    }
    remove(){
        this.domElement.remove();
    }
   
}


const game = new Game();
game.start();
