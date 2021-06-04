// HANDLES EVERYTHING AUDIO RELATED

// GET AUDIO CONTROL
var vol = document.getElementById('volume');


// CREATE AUDIO FILES
const eatSound = new Audio('ASSETS/eat.wav');       //
const hurtSound = new Audio('ASSETS/hurt.wav');     //
const pelletSound = new Audio('ASSETS/pop.wav');    //
const poseSound = new Audio('ASSETS/shutter.mp3');  //
const loseSound = new Audio('ASSETS/lose.wav');     
const musicSound = new Audio('ASSETS/music.mp3');   //

// SET AUDIOS
updateVolume();
vol.addEventListener('mousemove', function(){
    updateVolume();
})

musicSound.addEventListener('loadeddata', function(){
    musicSound.play();
})

// HELPER FUNCTIONS
function updateVolume(){
    eatSound.volume = vol.value/100;
    hurtSound.volume = vol.value/100;
    pelletSound.volume = vol.value/100;
    poseSound.volume = vol.value/100;
    loseSound.volume = vol.value/100;
    musicSound.volume = (vol.value/100)-.1;
}