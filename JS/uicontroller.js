// CONTROLS THE UI OUTSIDE THE GAME ROOM - HEALTH, TIMER, SCORE
var timer = document.getElementById("pellettimer");

function UIUpdate(){

    // Update Pellet Timer
    if(pellet.active){
        let rat = pellet.life/pelletlifesize;
        let _deg = -(Math.round(rat*360)-360);
        // console.log(_deg)
        timer.style.background = "conic-gradient(#131913 "+_deg+"deg, #2BD600 0)";
    } else {
        timer.style.background = '#131913';
    }

}