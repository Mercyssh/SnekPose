/* 
Each object is called and setup in 2 functions.
The objStep() function is where all of the logic of the object resides
& The objDraw() function is where all of the drawing of the object is handled
*/ /*
We use a main() function which is basically just a master function within which all
other functions are nested. This is responsible for setting up the game loop.
The game loop is setup using requestAnimationFrame and nesting it within the funciton itself
requestAnimationFrame calls this same function in a loop and gives the browser enough breathing
space between each loop. It handles these spaces on its own which is why its a good idea to use it.
*/

// DEFINE GAME STATE: 0-Menu, 1-In Game, 2-Leaderboard
var gamestate = 0;
// ^ Needs to be set up

// EXECUTE GAME LOOP
function main(deltaTime){

    // handle snake
    SnakeStep(); SnakeDraw();

    // handle pellets
    PelletStep(); PelletDraw();

    // handle poses
    PoseStep(); PoseDraw();

    // update ui
    UIUpdate();

    // recall the loop
    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);