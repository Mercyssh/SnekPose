//Handles Different states of the webpage apart from the Game itself
//Such as Leaderboards, Main Menu, etc..

//Initialize Leaderboard
let menu = document.getElementById('menu');                     //container for menu
let menubtns = document.getElementById('menu-btns')             //Get button Container
let btns = menubtns.getElementsByClassName('btn');              //Get Array of Buttons

let game = document.getElementById('main');                     //container for game

let hs = document.getElementById('highscore');                  //Last highscore on this machine
let leaderboard = document.getElementById('leaderboard');       //container for leaderboard
let inputpage = document.getElementById('inputpage');           //container for input page
let nameinput = document.getElementById('nameinput');           //container for input fields
let score = document.getElementById('score');                   //p tag for displaying current score
let initials = document.getElementsByClassName('initials');     //array of all input fields
let resultspage = document.getElementById('resultspage');       //container for results page
let alrt = document.getElementById('alrt');                     //alrt message

let _i, vals=[];
var username=''
let page=0;


// HANDLE MENU
// Play Button - Start Game
btns[0].addEventListener('click', e => {
    changestate();
});

// Tutorial Button - Open Lightbox
btns[1].addEventListener('click', e => {
    let tutorial = document.getElementById('tutorial');
    tutorial.style.display = "block";
});
// Close Tutorial Button
document.getElementById('closetutorial').addEventListener('click', e => {
    let tutorial = document.getElementById('tutorial');
    tutorial.style.display = "none";
})

// Share Button - Change Text and revert back
btns[2].addEventListener('click', e => {
    btns[2].innerHTML = '<p>•</p> Copied to Clipboard! <p>•</p>';
    copyToClipboard('https://mercyssh.github.io/SnekPoseOnline');
    setTimeout(function(){ btns[2].innerHTML = "<p>•</p> Share <p>•</p>" }, 1000);
});

// SWITCH TO DISPLAYING THE GAME
function InitGame(){
    menu.style.display = 'none';
    leaderboard.style.display = 'none';
    game.style.display = 'block';
}


// HANDLE LEADERBOARD
SyncScore();
function Leaderboard(){
    // Update score
    score.innerHTML = snake.score; 

    // Switch to relevant div display
    menu.style.display = 'none';
    game.style.display = 'none';
    leaderboard.style.display = 'block';
    inputpage.style.display = 'flex';

    // START INPUT
    initials[0].focus();

    // Autoset focus and hide warning
    for(var initial of initials){
        initial.addEventListener('click',function(){
            for(var val of initials)
                vals.push(val.value);
            let _i = vals.indexOf("");

            if(_i!=-1)
                initials[_i].focus();
        })

        initial.addEventListener('keyup',function(e){
            // find empty field
            for(var val of initials)
                vals.push(val.value);
            let _i = vals.indexOf("");

            if(e.key!='Backspace'){
                if(_i!=-1)
                    initials[_i].focus();
            } 
            else {
                if(_i>0){
                    initials[_i-1].value="";
                    initials[_i-1].focus();
                }
            }
            username = vals[0]+vals[1]+vals[2]+vals[3];

            //Hide unhide alert
            if(username.length==4)
                alrt.style.display='none';
            else
                alrt.style.display='block';
            
            //reset vals
            vals=[];
        })
    }

    // Change to final page
    window.addEventListener('keydown', e => {
        if(e.key=='Enter' && username.length==4){
            if(page==0){
            inputpage.style.display='none';
            resultspage.style.display='flex';
            regenerateLeaderboard();
            page=1;
            } else {
                location.reload();
            }
        }
    })
}

//HELPER FUNCTIONS
//Responsible for regenerative leaderboard
//Fetch Leaderboard, Get Rank, Add Rank to Leaderboard, Upload Leaderboard
function regenerateLeaderboard(){
    let storage = window.localStorage;
    let db = storage.getItem('db');

    // If DB doesn't exist, create one
    if(!db){
        let push = JSON.stringify([{name: '----', score:0},{name: '----', score:0},{name: '----', score:0},{name: '----', score:0}]);
        storage.setItem('db', push)
        console.log("Created Database!\n");
    }

    // If it does exist do required stuff
    let pull = JSON.parse(storage.getItem('db'));
    console.log("PULLED DATA")
    console.log(pull);
    console.log('\n');

    let _push = {name: username, score: snake.score}; //Incomplete Push
    let nameexists, final, push;

    // let nameexists = pull.findIndex(n => n.name == username) 
    // console.log(pull.findIndex(n => n.name == username) )

    // Find if username Exists
    for(var n in pull){
        if(pull[n].name == username){
            nameexists=n;
        }
    }

    //If Username Doesn't exist
    if(nameexists==undefined){
        
        //add current player stats to the db you just pulled
        pull.push(_push);
        //sort the db in terms of ascending order of scores
        push = pull.sort((a, b) => { return b.score - a.score; });
        console.log('USER CREATED');
        console.log(push);
        console.log('\n')
        
        //update the db by creating a new entry for the username
        final = JSON.stringify(push)
        storage.setItem('db', final);
    } 
    //If Username Exists and score is a highscore
    else {
        if(_push.score>=pull[nameexists].score){
            
            pull[nameexists] = _push;
            push = pull.sort((a, b) => { return b.score - a.score; })
            console.log('USER UPDATED');
            console.log(push);
            console.log('\n');

            final = JSON.stringify(push)
            storage.setItem('db', final);
        }
        //If name exist but not highscore 
        else {
            console.log('not hiscore')
            pull[nameexists] = _push;
            push = pull.sort((a, b) => { return b.score - a.score; })
        }
    }

    //Update the UI
    updateLeaderboard(push, _push);
}

//Here Data contains the Array pulled from localstorage. and Currentdata consists of the username and score of the current run
function updateLeaderboard(data, currentdata){
    let table = document.getElementById('lb');
    let rank1 = document.getElementById('rank1');
    let rank2 = document.getElementById('rank2');
    let rank3 = document.getElementById('rank3');
    let rankx = document.getElementById('rankx');

    rank1.getElementsByTagName('td')[1].innerHTML = data[0].name
    rank1.getElementsByTagName('td')[2].innerHTML = data[0].score

    rank2.getElementsByTagName('td')[1].innerHTML = data[1].name
    rank2.getElementsByTagName('td')[2].innerHTML = data[1].score

    rank3.getElementsByTagName('td')[1].innerHTML = data[2].name
    rank3.getElementsByTagName('td')[2].innerHTML = data[2].score

    _rank = data.findIndex(n => n.name==currentdata.name)
    rankx.getElementsByTagName('td')[0].innerHTML = _rank+1;
    rankx.getElementsByTagName('td')[1].innerHTML = currentdata.name;
    rankx.getElementsByTagName('td')[2].innerHTML = snake.score;
}

// Sync the highscore displayed at the top right of ur screen
function SyncScore(){
    let storage = window.localStorage;
    let _pull = storage.getItem('db');
    pull = JSON.parse(_pull);

    if(_pull){
        hs.innerHTML = pull[0].score;
    }
}

// Creates a method to copy a string to clipboard
const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };