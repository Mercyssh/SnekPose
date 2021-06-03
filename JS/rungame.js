/* 
Each object is called and setup in 2 functions.
The objStep() function is where all of the logic of the object resides
& The objDraw() function is where all of the drawing of the object is handled
*/ /*
We use a main() function which is basically just a master function within which all
other functions are nested. This is responsible for setting up the game loop.
The game loop is setup using requestAnimationFrame and nesting it within the funciton itself.
requestAnimationFrame calls this same function in a loop and gives the browser enough breathing
space between each loop. It handles these spaces on its own which is why its a good idea to use it.
*/

// DEFINE GAME STATE: "MENU", "GAME", "LEADERBOARD"
var gamestate = "GAME";
// ^ Needs to be set up

window.addEventListener('changestate', e =>{
    if(gamestate=="MENU"){
        gamestate = "GAME";
        window.requestAnimationFrame(main);
    }
    if(gamestate=="GAME"){
        gamestate = "LEADERBOARD";
    }
})

// EXECUTE GAME LOOP
function main(deltaTime){

    // CLEAR CANVAS
    ctx.clearRect(0,0, room.width, room.height);

    // EXECUTE LOGIC
    SnakeStep(); 
    PelletStep(); 
    PoseStep(); 

    // EXECUTE DRAW
    PelletDraw();
    PoseDraw();
    SnakeDraw();

    // update ui
    UIUpdate();

    // recall the loop
    if(gamestate=="GAME")
        window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);