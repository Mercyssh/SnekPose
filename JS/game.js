// GET CANVAS OBJECT
const room = document.getElementById('room');
var ctx = room.getContext('2d');


// SETUP THE ROOM
const gametick = 10;    // speed of the game. lower = faster
const gridsize = 15;    // defines the size of the grids (rows x column)
const tilesize = room.width/gridsize;   // size of each individual grid tile


// RECIEVE AND HANDLE INPUT
// TRY CONVERTING TO STRING CONCAT AND REPLACE TYPE
var input = '';     // string to keep track of last pressed button
var lastkey;        // used to make sure the same keydown key is not registered twice
window.addEventListener('keydown', function(e) {
    if(e.key=='ArrowUp' || e.key=='ArrowLeft' || e.key=='ArrowDown' || e.key=='ArrowRight')
        input = e.key.replace('Arrow', '');
    else { 
        if(e.key=='w') input+='Up'; 
        if(e.key=='a') input='Left';
        if(e.key=='s') input='Down';
        if(e.key=='d') input='Right';
    }
})
window.addEventListener('keyup', function(e) {

    // If no keys are pressed, clear input
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


// DEFINE SNAKE OBJECT
var snake = {
    body: [{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}],
    direction: '',
    moving: false,
    speed: 1,
    timer: gametick,
    length: 4,
    health: 3,
}

//TODO REDO TIMER SYSTEM, REPLACE WITH SOMETHING SMOOTHER

// GAME LOGIC
function GameStep(){

    snake.direction = input;


    if(snake.moving==true){
        snake.timer++;
        if(snake.timer>gametick){
            snake.moving=false;
            snake.timer=0;
        }
    }
    //If snake is not moving
    if(snake.moving==false){

        // console.log('test')
        let head = snake.body[snake.body.length-1];     // last object in body array is head
        let neck = snake.body[snake.body.length-2];     // object just before the head is the neck

        // set snake state to moving. and update body
        if(snake.direction!=''){
            snake.moving=true;
            switch(snake.direction){
                case 'Up':
                    if(!(neck.x==head.x && head.y>neck.y)){
                        snake.body.push({x:head.x, y:head.y-1});
                        snake.body.shift();
                    }
                    break;
    
                case 'Left':
                    if(!(neck.x<head.x && head.y==neck.y)){
                        snake.body.push({x:head.x-1, y:head.y});
                        snake.body.shift();
                    }
                    break;
                
                case 'Down':
                    if(!(neck.x==head.x && head.y<neck.y)){
                        snake.body.push({x:head.x, y:head.y+1});
                        snake.body.shift();
                    }
                    break;
    
                case 'Right':
                    if(!(neck.x>head.x && head.y==neck.y)){
                        snake.body.push({x:head.x+1, y:head.y});
                        snake.body.shift();
                    }
                    break;
                
                default:
                    break;
            }
            // console.log('moving')
        }

    }

    // snake.timer++;
    // if(snake.timer>gametick){
    //     let head = snake.body[snake.body.length-1];     // last object in body array is head
    //     let neck = snake.body[snake.body.length-2];     // object just before the head is the neck
    //     let tail = snake.body[0]                        // first object in body array is tail

    //     // update snake's position
    //     switch(snake.direction){
    //         case 'Up':
    //             if(!(neck.x==head.x && head.y>neck.y)){
    //                 snake.body.push({x:head.x, y:head.y-1});
    //                 snake.body.shift();
    //             }
    //             break;

    //         case 'Left':
    //             if(!(neck.x<head.x && head.y==neck.y)){
    //                 snake.body.push({x:head.x-1, y:head.y});
    //                 snake.body.shift();
    //             }
    //             break;
            
    //         case 'Down':
    //             if(!(neck.x==head.x && head.y<neck.y)){
    //                 snake.body.push({x:head.x, y:head.y+1});
    //                 snake.body.shift();
    //             }
    //             break;

    //         case 'Right':
    //             if(!(neck.x>head.x && head.y==neck.y)){
    //                 snake.body.push({x:head.x+1, y:head.y});
    //                 snake.body.shift();
    //             }
    //             break;
            
    //         default:
    //             break;
    //     }

    //     // reset move timer
    //     snake.timer=0;
    // }
}


// DRAW THE GAME
function GameDraw(){

    // CLEAR CANVAS
    ctx.clearRect(0,0, room.width, room.height);

    // draw the Snake
    // we render head, body and tail separately to make it look like they move smoothly
    ctx.fillStyle = '#22AA00';
        
    let moveincrement = tilesize/gametick; //Gives size of each increment to be made for a smooth transition

    // // render head
    // let head = snake.body[snake.body.length-1];
    // switch(snake.direction){
    //     case 'Up':
    //         ctx.fillRect(head.x*tilesize, (head.y*tilesize)+tilesize, tilesize, -moveincrement*snake.timer);
    //         break;

    //     case 'Left':
    //         ctx.fillRect((head.x*tilesize)+tilesize, head.y*tilesize, -moveincrement*snake.timer, tilesize);
    //         break;

    //     case 'Down':
    //         ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, moveincrement*snake.timer);
    //         break;

    //     case 'Right':
    //         ctx.fillRect((head.x*tilesize), head.y*tilesize, moveincrement*snake.timer, tilesize);
    //         break;

    //     default:
    //         ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize)
    //         break;
    // }

    //render body
    for(var i=0; i<snake.body.length; i++){
        ctx.fillRect(snake.body[i].x*tilesize, snake.body[i].y*tilesize, tilesize, tilesize)
    }
}


// LOG STATS FOR THE GAME - COMMENT THIS OUT IF NOT DEV
function GameLog(){

}

// EXECUTE GAME LOOP
function main(deltaTime){
    GameStep();
    GameDraw();
    GameLog();

    //Recall the loop
    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);