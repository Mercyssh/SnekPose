//Handles Different states of the webpage apart from the Game itself
//Such as Leaderboards, Main Menu, etc..

//Initialize Leaderboard
let menu = document.getElementById('menu');                     //container for menu
let game = document.getElementById('main');                     //container for game
let leaderboard = document.getElementById('leaderboard');       //container for leaderboard
let inputpage = document.getElementById('inputpage');           //container for input page
let nameinput = document.getElementById('nameinput');           //container for input fields
let initials = document.getElementsByClassName('initials');     //array of all input fields
let resultspage = document.getElementById('resultspage');       //container for results page
let alrt = document.getElementById('alrt');                     //alrt message
let _i, vals=[], username='';
let page=0;

function Leaderboard(){

    // Switch to relevant div display
    menu.style.display = 'none';
    game.style.display = 'none';
    leaderboard.style.display = 'block';
    inputpage.style.display = 'flex';

    // Setup BG Image
    document.body.style.background = 'url("../ASSETS/bg.png")';
    document.body.style.backgroundSize =  "100vw 100vh";
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

    window.addEventListener('keydown', e => {
        if(e.key=='Enter' && username.length==4){
            if(page==0){
            inputpage.style.display='none';
            resultspage.style.display='flex';
            page=1;
            } else {
                location.reload();
            }
        }
    })
}
