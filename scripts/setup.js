let canvas = document.querySelector('canvas'); // create variable to reference the canvas html element
canvas.width = window.innerWidth; // make the canvas' width equal to the width of the user's browser
canvas.height = window.innerHeight; // make the canvas' height equal to the height of the user's browser
let ctx = canvas.getContext('2d'); // a variable that contains the canvas' 2d methods, used for drawing shapes and adding colors

//assign variables to html elements
var setting = document.getElementById('setting screen');
setting.style.display = 'none';

var win = document.getElementById('win screen');
win.style.display = 'none';

var lose = document.getElementById('lose screen');
lose.style.display = 'none';

var startBtn = document.getElementById('start');
var menu = document.getElementById('menu screen');
var optionBtn = document.getElementById('option');
var invertcolorBtn = document.getElementById('invert_colors');
var backBtn = document.getElementById('back');
var nextBtn = document.getElementById('nextlevel');
var backmainBtn_w = document.getElementById('backmain_w');
var tryBtn = document.getElementById('tryagain');
var backmainBtn_l = document.getElementById('backmain_l');

let clrs = [["#FFFFFF", "#000000"], ["#5B0E2D", "#FFA781"], ["#F2BC94", "#30110D"], ["#F9858B", "#761137"], ["#143D59", "#F4B41A"]];
let clr_idx = 2;

function setRandomColor()
{
    let clr_idx = Math.floor(Math.random() * clrs.length);
    console.log(clr_idx);
    if (Math.random() >= 0.5)
    {
        console.log("in here");
        let temp = clrs[clr_idx][0];
        clrs[clr_idx][0] = clrs[clr_idx][1];
        clrs[clr_idx][1] = temp;
    }
}


let paused = false;
let playerHasLost = false;
let playerHasWon = false;
let simulate_ball = false;

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
