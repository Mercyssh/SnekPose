/* 
This .js file is primarily responsible for setting up the room
It is also responsible for setting up any recurring functions
and also for controlling some basic parameters
*/


// GET CANVAS OBJECT
const room = document.getElementById('room');
var ctx = room.getContext('2d');

// SETUP THE ROOM
const gametick = 10;            // speed of the game. lower = faster
const gridsize = 15;            // defines the size of the grids (rows x column)
const startsnakesize = 5;       // defines starting snake size - Must be, x >= 2
const tilesize = room.width/gridsize;   // size of each individual grid tile

// RECIEVE AND HANDLE INPUT
var input = '';     // string to keep track of last pressed button
window.addEventListener('keydown', function(e) {
    
    // listen for arrow keys and wasd. Set input to appropriate value
    if(e.key=='ArrowUp' || e.key=='ArrowLeft' || e.key=='ArrowDown' || e.key=='ArrowRight')
        input = e.key.replace('Arrow', '');
    else { 
        if(e.key=='w') input='Up'; 
        if(e.key=='a') input='Left';
        if(e.key=='s') input='Down';
        if(e.key=='d') input='Right';
    }

})
window.addEventListener('keyup', function(e) {

    // clear input when keys are lifted
    if(input=='Up')
        if(e.key=='w' || e.key=='ArrowUp')
            input='';
    if(input=='Left')
        if(e.key=='a' || e.key=='ArrowLeft')
            input='';
    if(input=='Down')
        if(e.key=='s' || e.key=='ArrowDown')
            input='';
    if(input=='Right')
        if(e.key=='d' || e.key=='ArrowRight')
            input='';
    
})

// DECLARE FUNCTIONS HERE
