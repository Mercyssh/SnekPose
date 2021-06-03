/*
This file is responsible for setting up
the Create, Step, and Draw functions for
the pose object

It mostly handles Generation of Poses, Possible Poses, .
*/

// CONTROL VARIABLES
var poses = [];
var maxposesize = 6;            // Maximum size a pose can grow to
var maxposesonscreen = 1;       // sets the maximum number of poses which can be on screen at a time
var poselife = 600;             // Default life of a pose object
var spawntimer = 300;           // Time between each generation. Approx: 60 = 1 second

var _t = spawntimer             // use this variable to tick down

// HANDE LOGIC FOR POSES
function PoseStep(){

    //Create Poses
    if(poses.length<maxposesonscreen){
        //tick down timer
        _t--;

        //execute action once timer hits 0 - generate a pose
        if(_t<=0){
            poses.push(generatepose());
            _t = spawntimer;
        }
    }
    else {
        //reset timer if all are spawned
        _t = spawntimer;
    }

    //Decay Poses and check for colilsion
    for(var pose in poses){

        //decay pose
        poses[pose].time--;
        if(poses[pose].time<=0){
            poses.splice(pose,1);
            if(snake.health>0)
                snake.health--;
            window.dispatchEvent(healthupdate);
        } 

        // check for collissions
        else {
            let filled = true;
            //loop through pos array and check if tile is not filled
            for(var pos of poses[pose].pos){
                if(pos.x!==undefined)
                if(snake.body.findIndex(part => part.x==pos.x && part.y==pos.y)==-1){
                    filled = false;
                }
            }
            if(filled){
                //Formula for adding score = time left + (snake.lenght*50)
                snake.score+= poses[pose].time + (poses[pose].length*50);
                window.dispatchEvent(scoreupdate);
                console.log('pop')
                poses.splice(pose,1);
                filled = false;
            }
        }
    }

    //Scale Difficulty - Dynamically change maxposesonscreen and spawntimer when certain conditions are met

}

// DRAW THE POSES
function PoseDraw(){
    //draw each pose
    ctx.lineWidth=2.5;
    for(var pose of poses){
        alpha = pose.time/poselife;

        //Draw outlines first, then draw internal rectangles to create overall outline
        for(var pos of pose.pos){
            ctx.strokeStyle = "rgba(255, 255, 255, "+alpha+")";
            ctx.strokeRect(pos.x*tilesize, pos.y*tilesize, tilesize, tilesize)
        }
        for(var pos of pose.pos){
            ctx.clearRect(pos.x*tilesize, pos.y*tilesize, tilesize, tilesize)
        }
    }
}

// ADDITIONAL FUNCTIONS GO HERE
// Generates and returns an object containging pose data.
function generatepose(){
    let poseobject = {
        pos: [],
        length: snake.length,
        time: poselife
    };
    let o;      //Defines the starting point of the pose object
    let originfound = false;

    //Hold code execution until valid o is found
    while(!originfound){
        o = {x: randomrange(0, gridsize-1, true), y: randomrange(0, gridsize-1, true)};
        let overlap = false;
        
        //if snake is not on tile
        if(snake.body.findIndex(val => val.x==o.x && val.y==o.y)!=-1)
            overlap=true;
        //if no other pose is on tile
        poses.forEach(obj => {
            if(obj.pos.findIndex(val => val.x == o.x && val.y == o.y)!=-1)
                overlap=true;
        })

        //if chosen tile has no overlap, set it as origin
        if(!overlap){
            originfound=true;
        }
    }
    poseobject.pos.push(o);

    //Generate remaining tiles
    for(var i=0; i<poseobject.length-1; i++){

        //find empty tile
        let last = poseobject.pos[poseobject.pos.length-1];
        if(last == undefined){
            console.log(last, poseobject.pos[poseobject.pos.length-1],  poseobject.pos, poseobject.pos.length-1)
        }
        let _arr = findemptytile(last.x, last.y, poseobject);
        if(_arr==-1)
            break;
        let _target = randomrange(0,_arr.length-1, true);
        poseobject.pos.push(_arr[_target]);
    }

    return poseobject;
}

// Takes x,y coordinates and returns an array of empty tiles around it. (no diagonals)
// pose parameter is an optional one, which will allow checking of pose with incomplete pose object
// you are supposed to pass the incomplete pose object into the pass parameter - poseobject
function findemptytile(x, y, _pose){
   
    //If out of bound coordinates, return -1
    if((x<0 || y<0) || (x>gridsize-1 || y>gridsize-1))
        return -1;
    
    //Find empty tiles and store in array
    let utile,ltile,dtile,rtile;
    utile = {x: x, y: y-1};
    dtile = {x: x, y: y+1};
    rtile = {x: x+1, y: y};
    ltile = {x: x-1, y: y};

    //If overlapping with snake
    if(snake.body.findIndex(pos => pos.x==utile.x && pos.y==utile.y)!=-1)
        utile=-1;
    if(snake.body.findIndex(pos => pos.x==dtile.x && pos.y==dtile.y)!=-1)
        dtile=-1;
    if(snake.body.findIndex(pos => pos.x==rtile.x && pos.y==rtile.y)!=-1)
        rtile=-1;
    if(snake.body.findIndex(pos => pos.x==ltile.x && pos.y==ltile.y)!=-1)
        ltile=-1;

    //If overlapping with existing pose
    for(var pose of poses){
        if(pose.pos.findIndex(pos => pos.x==utile.x && pos.y==utile.y)!=-1)
            utile=-1;
        if(pose.pos.findIndex(pos => pos.x==dtile.x && pos.y==dtile.y)!=-1)
            dtile=-1;
        if(pose.pos.findIndex(pos => pos.x==rtile.x && pos.y==rtile.y)!=-1)
            rtile=-1;
        if(pose.pos.findIndex(pos => pos.x==ltile.x && pos.y==ltile.y)!=-1)
            ltile=-1;
    }

    //check if out of bounds
    if(utile.x < 0 || utile.y < 0 || utile.x > gridsize-1 || utile.y > gridsize-1)
        utile=-1;
    if(dtile.x < 0 || dtile.y < 0 || dtile.x > gridsize-1 || dtile.y > gridsize-1)
        dtile=-1;
    if(rtile.x < 0 || rtile.y < 0 || rtile.x > gridsize-1 || rtile.y > gridsize-1)
        rtile=-1;
    if(ltile.x < 0 || ltile.y < 0 || ltile.x > gridsize-1 || ltile.y > gridsize-1)
        ltile=-1;

    //check with current pos which is being generated
    if(_pose!=undefined){
        if(_pose.pos.findIndex(pos => pos.x==utile.x && pos.y==utile.y)!=-1)
            utile=-1;
        if(_pose.pos.findIndex(pos => pos.x==dtile.x && pos.y==dtile.y)!=-1)
            dtile=-1;
        if(_pose.pos.findIndex(pos => pos.x==rtile.x && pos.y==rtile.y)!=-1)
            rtile=-1;
        if(_pose.pos.findIndex(pos => pos.x==ltile.x && pos.y==ltile.y)!=-1)
            ltile=-1;
    }
    
    let tiles = [utile, dtile, rtile, ltile]; //This is where output is collected
    tiles = tiles.filter(val => val!=-1);

    if(tiles.length==0)
        return -1;
    else
        return tiles;
}