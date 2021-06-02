// CONTROLS THE UI OUTSIDE THE GAME ROOM - HEALTH, TIMER, SCORE
var timer = document.getElementById("pellettimer");
var health = document.getElementById("health");
var currentscore = document.getElementById("currentscore");
var highscore = document.getElementById("highscore");


// Updates Pellet Despawn Timer
function UIUpdate(){

    // Update Pellet Timer
    if(pellet.active){
        let rat = pellet.life/pelletlifesize;
        let _deg = -(Math.round(rat*360)-360);
        timer.style.background = "conic-gradient(#131913 "+_deg+"deg, #2BD600 0)";
    } else {
        timer.style.background = '#131913';
    }

}

// Updates Health
function HealthUpdate(){
    // console.log(snake.health);
    let _health = Math.floor(snake.health);
    switch(_health){
        case 0:
            health.src = 'ASSETS/health0.png';
            break;

        case 1:
            health.src = 'ASSETS/health1.png';
            break;

        case 2:
            health.src = 'ASSETS/health2.png';
            break;

        case 3:
            health.src = 'ASSETS/health3.png';
            break;
    }
}
window.addEventListener('healthupdate', HealthUpdate);

function ScoreUpdate(){
    currentscore.innerHTML = snake.score;
}
window.addEventListener('scoreupdate', ScoreUpdate);
