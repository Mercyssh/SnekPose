/* 
This .js file handles the pellet object. Its spawning and its consumption
*/

const pelletlifesize = 500          //Controls the life of a pellet. Higher = Longer
const spawntimerrange = [800,1200]  //Controls the interval between each pellet spawn. 
var pellet;

//INITIALIZE HE PELLET
pellet = {
    active: false,                  //Checks for if a pellet already in the world
    pos: {x: null, y:null},         //Position of the pellet
    life: pelletlifesize,           //How long the pellet will remain active
    spawntimer: randomrange(spawntimerrange[0], spawntimerrange[1], true)   //When the pellet will spawn, if its not active
}

// HANDLE PELLET LOGIC
function PelletStep(){
    //If Pellet is not active
    if(!pellet.active){
        

    }
    //If Pellet is active
    else {

    }
}

// DRAW THE PELLET
function PelletDraw(){

}

