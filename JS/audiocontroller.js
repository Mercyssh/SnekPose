// HANDLES EVERYTHING AUDIO RELATED

// GET AUDIO CONTROL
var vol = document.getElementById('volume');
let _btns = document.getElementById('menu-btns').getElementsByClassName('btn');  //Array of menu buttons

// CREATE AUDIO FILES
const eatSound = new Audio('ASSETS/eat.wav');       //
const hurtSound = new Audio('ASSETS/hurt.wav');     //
const pelletSound = new Audio('ASSETS/pop.wav');    //
const poseSound = new Audio('ASSETS/shutter.mp3');  //
const loseSound = new Audio('ASSETS/lose.wav');     // 
const musicSound = new Audio('ASSETS/music.mp3');   //
musicSound.loop = true;

// MENU AUDIOS
for(var btn of _btns){
    btn.addEventListener('mouseover', e => {
        pelletSound.play();
    })
}


// SET AUDIOS
SyncVolume();
updateVolume();
vol.addEventListener('mousemove', function(){
    updateVolume();
})

// START PLAYING BG MUSIC
musicSound.addEventListener('loadeddata', function(){
    musicSound.play();
})

// HELPER FUNCTIONS
//Updates all volumes to slider
function updateVolume(){
    eatSound.volume = vol.value/100;
    hurtSound.volume = vol.value/100;
    pelletSound.volume = vol.value/100;
    poseSound.volume = vol.value/100;
    loseSound.volume = vol.value/100;
    musicSound.volume = (vol.value/100);

    let storage = window.localStorage;
    let _pull = storage.getItem('_vol');
    let pull = JSON.parse(_pull);
    if(_pull){
        pull = vol.value;
        let final = JSON.stringify(pull);
        storage.setItem('_vol', final);
    }
}

// Syncs some basic info such as highscore on the machine, audio settings, etc..
function SyncVolume(){
    let storage = window.localStorage;
    let _pull = storage.getItem('_vol');
    
    if(!_pull){
        let final =  JSON.stringify(50);
        storage.setItem('_vol', final);
    } else {
        let pull = JSON.parse(_pull);
        vol.value = pull;
    }
}