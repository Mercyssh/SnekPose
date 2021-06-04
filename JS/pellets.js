/* 
This .js file handles the pellet object. Its spawning and its consumption
*/

// DEFINE CONTROL VARIABLES
const pelletlifesize = 500          //Controls the life of a pellet. Higher = Longer
const spawntimerrange = [100,150]  //Controls the interval between each pellet spawn. 800-1200

//INITIALIZE THE PELLET
var pellet, _deg=0;
function PelletCreate(){
    pellet = {
        active: false,                  //Checks for if a pellet already in the world
        pos: {x: null, y:null},         //Position of the pellet
        life: pelletlifesize,           //How long the pellet will remain active
        spawntimer: randomrange(spawntimerrange[0], spawntimerrange[1], true)   //When the pellet will spawn, if its not active
    }
}
PelletCreate();

// HANDLE PELLET LOGIC
function PelletStep(){

    //If Pellet is not active
    if(!pellet.active){
        //Spawn Pellet
        pellet.spawntimer--;
        if(pellet.spawntimer<=0){
            activate();
        }
    }

    //If Pellet is active
    else {
        // Decay Pellet
        pellet.life--;
        if(pellet.life<=0){
            deactivate();
        }
    }
}
// HANDLE PELLET EATING
window.addEventListener('snakemove', eatpellet);

// DRAW THE PELLET
function PelletDraw(){

    // Declare Variables
    let pelletsize = tilesize/3;
    let _x = (pellet.pos.x*tilesize)+(tilesize/2)-(pelletsize/2);
    let _y = (pellet.pos.y*tilesize)+(tilesize/2)-(pelletsize/2);
    
    // Spin
    _deg+=.05;
    
    // Draw
    if(pellet.active){
        ctx.translate((pellet.pos.x*tilesize)+(tilesize/2), (pellet.pos.y*tilesize)+(tilesize/2));
        ctx.rotate(_deg);
        ctx.translate( -((pellet.pos.x*tilesize)+(tilesize/2)) , -((pellet.pos.y*tilesize)+(tilesize/2)) );
        ctx.fillRect(_x, _y, pelletsize, pelletsize);
    }

    //Reset transforms
    ctx.setTransform(1, 0, 0, 1, 0, 0);

}

// ADDITIONAL FUNCTIONS
//checks if the head is on the pellet
function eatpellet(){
    let head = snake.body[snake.body.length-1];
    if(head.x == pellet.pos.x && head.y == pellet.pos.y){
        deactivate();
        if(snake.health<3)
            snake.health+=.25;
        snake.length+=1;
        snake.score+=50;
        window.dispatchEvent(healthupdate);
        window.dispatchEvent(scoreupdate);
        eatSound.play();
    }
}

// Deactivate Pellet
function deactivate(){
    pellet.active = false;
    pellet.pos = {x: null, y: null};
    pellet.spawntimer = randomrange(spawntimerrange[0], spawntimerrange[1], true);
    _deg = 0;
}

//Activate pellet
function activate(){
    pelletSound.play();
    pellet.active = true;
    pellet.pos = {x: randomrange(0, gridsize-1, true), y:randomrange(0, gridsize-1, true)};
    pellet.life = pelletlifesize;
}
