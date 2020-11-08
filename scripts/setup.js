let canvas = document.querySelector('canvas'); // create variable to reference the canvas html element 
canvas.width = window.innerWidth; // make the canvas' width equal to the width of the user's browser
canvas.height = window.innerHeight; // make the canvas' height equal to the height of the user's browser

var prev_width = canvas.width;
var prev_height = canvas.height;


let ctx = canvas.getContext('2d'); // a variable that contains the canvas' 2d methods, used for drawing shapes and adding colors

let about = document.getElementById('about'); // Gets the about button to redirect to about page

//assign variables to html elements
var setting = document.getElementById('setting screen');
setting.style.display = 'none';

var win = document.getElementById('win screen');
win.style.display = 'none';
win.style.width = "30%";
win.style.left = "35%";
win.style.height = "50%";
win.style.top = "25%";

var lose = document.getElementById('lose screen');
lose.style.display = 'none';
lose.style.width = "30%";
lose.style.left = "35%";
lose.style.height = "65%";
lose.style.top = "17.5%";

var notif_elem = document.getElementById('notification');
var playerScoreElem = document.getElementById('yourScore');
var highScoreElem = document.getElementById('highScore');
var highScore = 0;

var startBtn = document.getElementById('start');
var menu = document.getElementById('menu screen');

var optionBtn = document.getElementById('option');
var handTrackBtn = document.getElementById('handTrack');
var invertcolorBtn = document.getElementById('invert_colors');
var backBtn = document.getElementById('back');
var nextBtn = document.getElementById('nextlevel');
var backmainBtn_w = document.getElementById('backmain_w');
var tryBtn = document.getElementById('tryagain');
var backmainBtn_l = document.getElementById('backmain_l');

let clrs = [["#FFFFFF", "#000000", "#DAA520"], ["#5B0E2D", "#FFA781", "#FFFFFF"], ["#F2BC94", "#30110D", "#DAA520"],
            ["#F9858B", "#761137", "#FFFFFF"], ["#143D59", "#F4B41A", "#FFFFFF"], ["#358597", "#F4A896", "#FFFFFF"],
            ["#533549", "#F6B042", "#FFFFFF"], ["#191919", "#FDF5A6", "#DAA520"]];

/*Guide to clrs (I am mildly colorblind so I may be kind of wrong - Connor)
* Index 0: Black / White / Gold
* Index 1: Pink / Tan / White
* Index 2: Light Brown / Dark Brown / Gold
* Index 3: Light Pink / Dark Pink / White
* Index 4: Blue / Yellow / White
* Index 5: Blue / Coral / White
* Index 6: Purple / Yellow / Black
* Index 7: Dark Brown / Ivory / Gold
*/

let clr_idx = 7;

/**
 * @Pre A new level has started
 * @Post The colors of the objects and the background will be set to a random combination from the clrs array
 */
function setRandomColor()
{
    do {
        prev_idx = clr_idx
        clr_idx = Math.floor(Math.random() * clrs.length);
    } while (clr_idx == prev_idx);

    if (Math.random() >= 0.5)
    {
        let temp = clrs[clr_idx][0];
        clrs[clr_idx][0] = clrs[clr_idx][1];
        clrs[clr_idx][1] = temp;
    }
}


/**
 * @Pre A request has been made to display a notification
 * @Post The notification will be displayed on the canvas and fade away over time
 */
function displayNotification(notif)
{
    notif_elem.style.display = 'block';
    notif_elem.innerHTML = notif;
    notif_elem.style.color = clrs[clr_idx][2];
    function fade()
    {
        notif_elem.style.opacity -= 0.01;
        if (notif_elem.style.opacity > 0)
        {
            setTimeout(fade, 10);
        }
        else notif_elem.style.display = 'none';
    }
    notif_elem.style.opacity = 1;
    setTimeout(fade, 1000);
}

let paused = false;
let playerHasLost = false;
let playerHasWon = false;
let simulate_ball = false;
let gameHasStarted = false;


let mouse = // create variable which will be used to update things based on the mouse's position
{
    x: undefined,
    y: undefined
};


/**
 * Detects if keys are pressed by user
 * @Pre a key has been pressed by the user
 * @Post updates game depending on the key the user pressed
        left arrow: shift paddle left by updating mouse variable
        right arrow: shift paddle right
        escape: pause or unpause game
        space: start simulating the ball if it is dormant
*/
window.addEventListener('keydown', e => {
    if(e.key == 'ArrowLeft'){
        mouse.x = mouse.x - 30;
    }
    if (e.key == 'ArrowRight') {
        mouse.x = mouse.x + 30;
    }
    if (e.key === 'Escape') paused = !paused;
    if (e.code == 'Space') simulate_ball = true;
})

/**
 * Mouse event listener that detects if user moves mouse
 * @Pre mouse has been moved
 * @Post updates variable keeping track of mouse, which will update paddle's position
 */ 
window.addEventListener('mousemove', // window will call this function every time the mouse moves, updating its position
    function(e) 
    {
        mouse.x = e.x;
        mouse.y = e.y;
    }
);

