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
    length: startsnakesize,
    health: 3,
    direction: '',
    lastdir: 'Right',
    lasttail: {},
    stuck: false,
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
                    if(!(neck.x==head.x && head.y>neck.y) && head.y>0){         // If head is not moving into the neck
                        snake.stuck=false;                          // Saves if snake is stuck or not. Used in Drawing the Snake
                        snake.body.push({x:head.x, y:head.y-1});    // Update head location
                        snake.lasttail=snake.body[0];               // Save the position of tail before deleting it. Used in Smooth Drawing of Snake Movement
                        snake.body.shift();                         // Delete old tail
                    }    else snake.stuck=true;
                    break;
    
                case 'Left':
                    if(!(neck.x<head.x && head.y==neck.y) && head.x>0){
                        snake.stuck=false;
                        snake.body.push({x:head.x-1, y:head.y});
                        snake.lasttail=snake.body[0];
                        snake.body.shift();
                    } else snake.stuck=true;
                    break;
                
                case 'Down':
                    if(!(neck.x==head.x && head.y<neck.y) && head.y<gridsize-1){
                        snake.stuck=false;
                        snake.body.push({x:head.x, y:head.y+1});
                        snake.lasttail=snake.body[0];
                        snake.body.shift();
                    } else snake.stuck=true;
                    break;
    
                case 'Right':
                    if(!(neck.x>head.x && head.y==neck.y) && head.x<gridsize-1){
                        snake.stuck=false;
                        snake.body.push({x:head.x+1, y:head.y});
                        snake.lasttail=snake.body[0];
                        snake.body.shift();
                    } else {
                        snake.stuck=true;
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
    
    let moveincrement = tilesize/gametick;  //Gives size of each increment to be made for a smooth transition

    // render head
    ctx.fillStyle = '#22AA00';
    let head = snake.body[snake.body.length-1];
    let neck = snake.body[snake.body.length-2];
    if(snake.moving){
    switch(snake.lastdir){
        case 'Up':
            if(!snake.stuck){
                ctx.fillRect(head.x*tilesize, (head.y*tilesize)+tilesize, tilesize, -moveincrement*snake.timer);
            } else ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize)
            break;

        case 'Left':
            if(!snake.stuck){
                ctx.fillRect((head.x*tilesize)+tilesize, head.y*tilesize, -moveincrement*snake.timer, tilesize);
            } else ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize)
            break;

        case 'Down':
            if(!snake.stuck){
                ctx.fillRect(head.x*tilesize, (head.y*tilesize), tilesize, moveincrement*snake.timer);
            } else ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize)
            break;

        case 'Right':
            if(!snake.stuck){
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

    // render tail
    let tail = snake.body[0];
    let hip = snake.lasttail;
    // let hip = snake.body[1];
    let _snaketimer = -(gametick-snake.timer)
    let _dir;

    // CHANGE FROM HIP BASED TO LAST TAIL BASED
    if(tail.x==hip.x && tail.y<hip.y) _dir="Up";
    if(tail.x==hip.x && tail.y>hip.y) _dir="Down";
    if(tail.y==hip.y && tail.x<hip.x) _dir="Left";
    if(tail.y==hip.y && tail.x>hip.x) _dir="Right";

    if(snake.moving){
        switch(_dir){
            case "Up":
                if(!snake.stuck)
                    ctx.fillRect(tail.x*tilesize, (tail.y)*tilesize, tilesize, (-moveincrement*_snaketimer)+tilesize);
                else
                    ctx.fillRect(tail.x*tilesize, tail.y*tilesize, tilesize, tilesize)
                break;

            case "Left":
                if(!snake.stuck)
                    ctx.fillRect((tail.x)*tilesize, tail.y*tilesize, tilesize+(-moveincrement*_snaketimer), tilesize)
                else
                    ctx.fillRect(tail.x*tilesize, tail.y*tilesize, tilesize, tilesize)
                break;

            case "Down":
                if(!snake.stuck)
                    ctx.fillRect(tail.x*tilesize, (tail.y+1)*tilesize, tilesize, -tilesize+(moveincrement*_snaketimer))
                else
                    ctx.fillRect(tail.x*tilesize, tail.y*tilesize, tilesize, tilesize)
                break;

            case "Right":
                if(!snake.stuck){
                    ctx.fillRect((tail.x+1)*tilesize, tail.y*tilesize, (moveincrement*_snaketimer)-tilesize, tilesize);
                } else {
                    ctx.fillRect(tail.x*tilesize, tail.y*tilesize, tilesize, tilesize)
                }
                break;

            default:
                ctx.fillRect(tail.x*tilesize, tail.y*tilesize, tilesize, tilesize)
                break;
        }
    } else {
        //Draw stagnant tile when snake is not moving
        ctx.fillRect(tail.x*tilesize, tail.y*tilesize, tilesize, tilesize)
    }

    //render body
    for(var i=1; i<snake.body.length-1; i++){
        ctx.fillRect(snake.body[i].x*tilesize, snake.body[i].y*tilesize, tilesize, tilesize)
    }
}

// EXECUTE GAME LOOP
function main(deltaTime){

    // handle snake
    SnakeStep(); SnakeDraw();
    // 

    // recall the loop
    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);