// GET CANVAS OBJECT
const room = document.getElementById('room');
var ctx = room.getContext('2d');


// SETUP THE ROOM
const gametick = 10;            // speed of the game. lower = faster
const gridsize = 15;            // defines the size of the grids (rows x column)
const startsnakesize = 4;       // defines starting snake size
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


// DEFINE SNAKE OBJECT

// generate initial body
var _body = [];
_u = 0;
for(var i=startsnakesize-1; i>=0; i--){
    _body[i] = {x:(Math.floor(gridsize/2))+1 - _u, y:Math.floor(gridsize/2)}
    _u++;
}
delete(_u);

// create snake
var snake = {
    body: _body,
    length: 4,
    health: 3,
    direction: '',
    lastdir: 'Right',
    moving: false,
    timer: 0,
}


// SNAKE LOGIC
function SnakeStep(){

    snake.direction = input;

    // tick and reset timer if snake is in moving state
    if(snake.moving==true){
        snake.timer++;
        if(snake.timer>gametick){
            snake.moving=false;
            snake.timer=0;
        }
    }
    // update snake body when timer runs out
    if(snake.moving==false){
        if(input!=''){
            //Save last direction the snake was travelling in. Used in drawing
            snake.lastdir=snake.direction;
        }

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
        }
    }
}

// DRAW THE SNAKE
function SnakeDraw(){

    // CLEAR CANVAS
    ctx.clearRect(0,0, room.width, room.height);

    // draw the Snake
    // we render head, body and tail separately to make it look like they move smoothly
    ctx.fillStyle = '#22AA00';
        
    let moveincrement = tilesize/gametick; //Gives size of each increment to be made for a smooth transition

    // render head
    let head = snake.body[snake.body.length-1];
    let neck = snake.body[snake.body.length-2];

    if(snake.moving){
    switch(snake.lastdir){
        case 'Up':
            if(!(neck.x==head.x && head.y>neck.y)){
                ctx.fillRect(head.x*tilesize, (head.y*tilesize)+tilesize, tilesize, -moveincrement*snake.timer);
            } else ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize)
            break;

        case 'Left':
            if(!(neck.x<head.x && head.y==neck.y)){
                ctx.fillRect((head.x*tilesize)+tilesize, head.y*tilesize, -moveincrement*snake.timer, tilesize);
            } else ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize)
            break;

        case 'Down':
            if(!(neck.x==head.x && head.y<neck.y)){
                ctx.fillRect(head.x*tilesize, (head.y*tilesize), tilesize, moveincrement*snake.timer);
            } else ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize)
            break;

        case 'Right':
            if(!(neck.x>head.x && head.y==neck.y)){
                ctx.fillRect((head.x*tilesize), head.y*tilesize, moveincrement*snake.timer, tilesize);
            } else ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize)
            break;

        default:
            console.log("ERR")
            break;
    }}
    if(snake.moving==false){
        ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize)
    }

    //render body
    for(var i=0; i<snake.body.length-1; i++){
        ctx.fillRect(snake.body[i].x*tilesize, snake.body[i].y*tilesize, tilesize, tilesize)
    }
}


// LOG STATS FOR THE GAME - COMMENT THIS OUT IF NOT DEV
function GameLog(){

}

// EXECUTE GAME LOOP
function main(deltaTime){
    SnakeStep();
    SnakeDraw();
    GameLog();

    //Recall the loop
    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);