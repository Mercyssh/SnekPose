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

// DEFINE STARTING GAME STATE: "MENU", "GAME", "LEADERBOARD"
var gamestate = "MENU";
// regenerateLeaderboard()
// Leaderboard();

// Changes state of the game
function changestate(){
    if(gamestate=="MENU"){
        InitGame();
        gamestate = "GAME";
        window.requestAnimationFrame(main);
    } 
    else if(gamestate=="GAME"){
        gamestate = "LEADERBOARD";
        Leaderboard();
    } 
    else if(gamestate=="LEADERBOARD"){
        location.reload();
    }
}

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