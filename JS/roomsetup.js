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

// DECLARE FUNCTIONS AND EVENTS HERE
// if 'x' is within 'r' range of 'n', returns true, else false 
function within(x, r, n){
    if(x>=n-r && x<=n+r)
        return true;
    else
        return false;
}

// Returns a random value between min, and max range. 3rd Optional Parameter is used incase you want a rounded value 
function randomrange(min, max, whole){
    let range = Math.abs(max-min);
    if(!whole)
        return min+(Math.random()*range);
    else
        return Math.round(min+(Math.random()*range));
}

// Event fired whenever snake moves successful
const snakemove = new Event('snakemove');
const healthupdate = new Event('healthupdate');
const scoreupdate = new Event('scoreupdate');

// Custom rectangle rendering method
CanvasRenderingContext2D.prototype.borderRect = function (x,y,w,h,fillColor,tColor,rColor,bColor,lColor){

    // use existing fillStyle if fillStyle is not supplied
    fillColor=fillColor||this.fillStyle;

    // use existing strokeStyle if any strokeStyle is not supplied
    var ss=this.strokeStyle;
    tColor=tColor||ss;
    rColor=rColor||ss;
    bColor=bColor||ss;
    lColor=lColor||ss;


    // context will be modified, so save it
    this.save();

    // miter the lines
    this.lineJoin="miter";

    // helper function: draws one side's trapezoidal "stroke"
    function trapezoid(context,color,x1,y1,x2,y2,x3,y3,x4,y4){
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
        context.lineTo(x3,y3);
        context.lineTo(x4,y4);
        context.closePath();
        context.fillStyle=color;
        context.fill();
    }

    // context lines are always drawn half-in/half-out
    // so context.lineWidth/2 is used a lot
    var lw=this.lineWidth/2;

    // shortcut vars for boundaries
    var L=x-lw;
    var R=x+lw;
    var T=y-lw;
    var B=y+lw;

    // top
    trapezoid(this,tColor,  L,T,  R+w,T,  L+w,B,  R,B );

    // right
    trapezoid(this,rColor,  R+w,T,  R+w,B+h,  L+w,T+h,  L+w,B );

    // bottom
    trapezoid(this,bColor,  R+w,B+h,  L,B+h,  R,T+h,  L+w,T+h );

    // left
    trapezoid(this,lColor,  L,B+h,  L,T,  R,B,  R,T+h );

    // fill
    this.fillStyle=fillColor;
    this.fillRect(x,y,w,h);

    // be kind -- always rewind (old vhs reference!)
    this.restore();
    // don't let this path leak
    this.beginPath();
    // chain
    return(this);
};