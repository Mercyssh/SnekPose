/*
This file is responsible for setting up
the Create, Step, and Draw functions for
the snake object

It mostly handles Snake movement, Smooth drawing, etc.
*/

// DEFINE CONTROL VARIABLES
const startsnakesize = 4;       // defines starting snake size - Must be, x >= 2
const maxsnakesize = 10       //Controls the maximum number of length a snake can grow to. Pellets won't spawn beyond this point

// DEFINE SNAKE OBJECT
var snake = {};
var snakeface;      //Image for snake's face
function SnakeCreate(){
    let _body = [];
    let _u = 0;
    // generate initial body
    for(var i=startsnakesize-1; i>=0; i--){
        _body[i] = {x:(Math.floor(gridsize/2))+1 - _u, y:Math.floor(gridsize/2)}
        _u++;
    }

    // create snake
    snake = {
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

    snakeface = new Image();
    snakeface.src = '../ASSETS/snakeface.png';
}
SnakeCreate();

// SNAKE LOGIC
function SnakeStep(){
    // console.log("here")

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

        //Save last direction the snake was travelling in. Used in drawing
        if(input!=''){
            snake.lastdir=snake.direction;
        }

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
                        if(snake.length<snake.body.length)
                            snake.body.shift();                     // Delete old tail if length is equal to target or more
                    } else snake.stuck=true;
                    break;
    
                case 'Left':
                    if(!(neck.x<head.x && head.y==neck.y) && head.x>0){
                        snake.stuck=false;
                        snake.body.push({x:head.x-1, y:head.y});
                        snake.lasttail=snake.body[0];
                        if(snake.length<snake.body.length)
                            snake.body.shift();
                    } else snake.stuck=true;
                    break;
                
                case 'Down':
                    if(!(neck.x==head.x && head.y<neck.y) && head.y<gridsize-1){
                        snake.stuck=false;
                        snake.body.push({x:head.x, y:head.y+1});
                        snake.lasttail=snake.body[0];
                        if(snake.length<snake.body.length)
                            snake.body.shift();
                    } else snake.stuck=true;
                    break;
    
                case 'Right':
                    if(!(neck.x>head.x && head.y==neck.y) && head.x<gridsize-1){
                        snake.stuck=false;
                        snake.body.push({x:head.x+1, y:head.y});
                        snake.lasttail=snake.body[0];
                        if(snake.length<snake.body.length)
                            snake.body.shift();
                    } else {
                        snake.stuck=true;
                    }
                    break;
                
                default:
                    break;
            }

            // bite off the body if snake bites itself
            if(bitecheck()!=-1){
                bite(bitecheck());
            }

            // Dispatch snakemove event
            window.dispatchEvent(snakemove);
        }
    }
}

// DRAW THE SNAKE
function SnakeDraw(){

    // CLEAR CANVAS
    ctx.clearRect(0,0, room.width, room.height);

    // draw the Snake
    // we render head, body and tail separately to make it look like they move smoothly 
    let moveincrement = tilesize/gametick;          //Gives size of each increment to be made for a smooth transition
    let head = snake.body[snake.body.length-1];     //Gives head body part
    let neck = snake.body[snake.body.length-2];     //Gives the part just behind the head
    let tail = snake.body[0];       //Gives the tail body part
    let hip = snake.lasttail;       //Gives where the tail was in the last tick

    // RENDER TAIL
    let _snaketimer = -(gametick-snake.timer);
    let _dir;

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
        // Draw stagnant tile when snake is not moving
        ctx.fillRect(tail.x*tilesize, tail.y*tilesize, tilesize, tilesize)
    }

    // RENDER BODY
    for(var i=1; i<snake.body.length-1; i++){
        ctx.fillRect(snake.body[i].x*tilesize, snake.body[i].y*tilesize, tilesize, tilesize);
    }

    // RENDER HEAD
    ctx.fillStyle = '#22AA00';
    if(snake.moving){
    switch(snake.lastdir){
        case 'Up':
            if(!snake.stuck){
                ctx.fillRect(head.x*tilesize, (head.y*tilesize)+tilesize, tilesize, -moveincrement*snake.timer);
                drawface((head.x*tilesize)+tilesize/2, (((head.y+1)*tilesize)+tilesize/2)-moveincrement*snake.timer, -90, snakeface);
            } else {
                ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize)
            }
            break;

        case 'Left':
            if(!snake.stuck){
                ctx.fillRect((head.x*tilesize)+tilesize, head.y*tilesize, -moveincrement*snake.timer, tilesize);
                drawface((((head.x+1)*tilesize)+tilesize/2)-moveincrement*snake.timer, (head.y*tilesize)+tilesize/2, 0, snakeface, true);
            } else {
                ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize);
            }
            break;

        case 'Down':
            if(!snake.stuck){
                ctx.fillRect(head.x*tilesize, (head.y*tilesize), tilesize, moveincrement*snake.timer);
                drawface((head.x*tilesize)+tilesize/2, (((head.y-1)*tilesize)+tilesize/2)+moveincrement*snake.timer, 90, snakeface, false);
            } else {
                ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize);
            }
            break;

        case 'Right':
            if(!snake.stuck){
                ctx.fillRect((head.x*tilesize), head.y*tilesize, moveincrement*snake.timer, tilesize);
                drawface((((head.x-1)*tilesize)+tilesize/2)+moveincrement*snake.timer, (head.y*tilesize)+tilesize/2, -0, snakeface);
            } else {
                ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize);
            }
            break;

        default:
            console.log("ERR");
            break;
    }}

    // draw static head and face when idle
    if(snake.moving==false){
        ctx.fillRect(head.x*tilesize, head.y*tilesize, tilesize, tilesize)
        switch(snake.lastdir){
            case "Up":
                drawface((head.x*tilesize)+tilesize/2, (head.y*tilesize)+tilesize/2, -90, snakeface, false);
                break;

            case "Left":
                drawface((head.x*tilesize)+tilesize/2, (head.y*tilesize)+tilesize/2, 0, snakeface, true);
                break; 
                
            case "Right":
                drawface((head.x*tilesize)+tilesize/2, (head.y*tilesize)+tilesize/2, -0, snakeface, false);
                break;

            case "Down":
                drawface((head.x*tilesize)+tilesize/2, (head.y*tilesize)+tilesize/2, 90, snakeface, false);
                break;

            default:
                drawface((head.x*tilesize)+tilesize/2, (head.y*tilesize)+tilesize/2, -0, snakeface, false);
                break;
        }
    }
}

//ANY ADDITIONAL FUNCTIONS
/* draws the face of the snake at the appropriate position. also takes care of scaling 
Example of use : 
drawface((head.x*tilesize)+tilesize/2, (head.y*tilesize)+tilesize/2, -0, snakeface); */
function drawface(x, y, dir, img, flip){
    let _fillstyle = ctx.fillStyle

    //Handle Positioning wrt scaled
    let yratio = 33.33/-10;
    let _y = tilesize/yratio;

    //Handle sizes wrt scaled
    let width = img.width;
    let height = img.height;
    let wratio = 33.33/width;
    let hratio = 33.33/height;
    let _h = tilesize/hratio;
    let _w = tilesize/wratio;
    
    //Handle transformations applied on the image.
    ctx.translate(x, y);

    //Start transforms
    ctx.rotate(dir*Math.PI/180);
    if(flip) ctx.scale(-1,1);
    //End transforms
    
    ctx.translate(-x, -y);

    //Handle Image Drawing
    ctx.drawImage(img, x, y+_y, _w, _h);
    
    //Reset matrix and color
    ctx.fillStyle = _fillstyle
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

//Checks is snake is biting itself
function bitecheck(){

    let head = snake.body[snake.body.length-1];     // last object in body array is head
    let headindex = snake.body.findIndex(val => val.x==head.x && val.y==head.y)     // find index of any element which is the same as head

    //If the postion of head repeats twice in the body, snake has bit itself
    if(headindex != snake.body.length-1)
        return headindex;
    else
        return -1;

}

/* Bites off the body from the point of contact
takes one parameter i, which tells the position of the bite on the boy */
function bite(i){
    
    //remove as many segments as required
    for(var u=0; u<=i; u++){
        snake.body.shift();
    }
    snake.length = snake.body.length;
}