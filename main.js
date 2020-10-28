
const BRICK_ROWS = 5;
const BRICK_COLS = 8;
const TOTAL_BRICKS = BRICK_ROWS * BRICK_COLS;

let PADDLE_WIDTH = canvas.width / 6;
let PADDLE_HEIGHT = canvas.height / 30;

let totalBricks = BRICK_ROWS * BRICK_COLS; // Keeps track of total number of bricks
let numCurrentBricks = totalBricks; // Initialize to whatever the initial number of bricks is
let gameObjects = [] // array to iterate through during game loop
let paddle = new Paddle(); // instantiate paddle
let ball = new Ball(); // instantiate ball
let brickset = new Brickset(BRICK_ROWS, BRICK_COLS, true); //instantiate brickset with number of rows and columns of bricks
let targetScore = Math.floor(brickset.bricks.length/4)
let playerStatus = new PlayerStatus(targetScore)

gameObjects.push(paddle); // add paddle to array
gameObjects.push(ball); // add ball to array
gameObjects.push(brickset);
gameObjects.push(playerStatus);

const OBJ_KEYS = {
	PADDLE: 0,
	BALL: 1,
	BRICKSET: 2,
	PLAYERSTATUS: 3
}

/**
 * Resumes game from paused state
 * @Pre game is currently paused
 * @Post game will be unpaused and menu will disappear
 */
var resume = function Resume()
{
    paused = false;
}

/**
 * Inverts colors of game
 * @Pre user has selected this option in the menu
 * @Post swaps color of background and objects
 */
var inv = function InvertColors()
{
  let temp = clrs[clr_idx][0];
  clrs[clr_idx][0] = clrs[clr_idx][1];
  clrs[clr_idx][1] = temp;

  ctx.fillStyle = clrs[0];
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = clrs[1];
}


/**
 * Animates game on screen
 * @Pre game objects have been created and user has selected to start game
 * @Post updates and draws every game object while unpaused
 */
var ani = function animate() // main game loop occurs here
{
    requestAnimationFrame(animate); // waits until this animate is done and then calls it again
    if (!paused & !lost & playerStatus.currentScore < TOTAL_BRICKS)
    {
        menu.style.display = 'none';
        setting.style.display = 'none';
        win.style.display = 'none';
        lose.style.display = 'none';  
        
        ctx.clearRect(0, 0 , window.innerWidth, window.innerHeight); // clears the previous frame
        ctx.fillStyle = clrs[clr_idx][0];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = clrs[clr_idx][1];

        for (let i = 0; i < gameObjects.length; i++) // iterate through game objects
        {
          gameObjects[i].update(); // call update on each object
          gameObjects[i].draw();
        }
        gameObjects[1].detect_collisions(gameObjects[0], gameObjects[2]);
    }
    else if (paused & !lost)
    {
        startBtn.innerHTML = "Resume";
        startBtn.onclick = resume;
        menu.style.display = 'block';
    }
    else if (lost)
    {
        lose.style.display = 'block';
		}
    else
    {
        win.style.display = 'block';
    }
}

invertcolorBtn.onclick = inv;
startBtn.onclick = ani; // start the loop


/**
 * Resets the game
 * @Pre gameobjects have already been created
 * @Post returns all game objects to original status and position
 */
var reset = function gameRestart(){

	ctx.clearRect(0, 0 , window.innerWidth, window.innerHeight); // clears the previous frame
	gameObjects[0].resetPaddle();
	gameObjects[1].resetBall();
	gameObjects[2].resetBrick();
	gameObjects[3].resetStatus();
	for (let i = 0; i < gameObjects.length; i++) // iterate through game objects
	{
		gameObjects[i].update(); // call update on each object
		gameObjects[i].draw();
  }
  lost = false;
}
nextBtn.onclick = reset;
tryBtn.onclick = reset;

/**
 * Opens option menu
 * @Pre menu is currently open
 * @Post main menu will be hidden and settings menu will appear
 */
var opt = function Opt(){
  menu.style.display = 'none';
  setting.style.display = 'block';
}
optionBtn.onclick = opt;

/**
 * Closes options menu
 * @Pre menu is currently open
 * @Post settings menu will be hidden and main menu reappears, reverts Opt()
 */
var bak = function Bak(){
  menu.style.display = 'block';
  setting.style.display = 'none';
}
backBtn.onclick = bak;

/**
 * Reloads page back to main menu
 * @Pre menu is currently open
 * @Post reload the page and back to the main menu
 */
var bmain_l = function Bmain_l(){ //need to update when add level part
  window.location.reload();
}
backmainBtn_l.onclick = bmain_l;

/**
 * Reloads window back to main menu
 * @Pre menu is currently open
 * @Post reload the page and back to the main menu
 */
var bmain_w = function Bmain_w(){ //need to update when add level part
  window.location.reload();
}
backmainBtn_w.onclick = bmain_w;

/*
* @Pre: the window size has been changed
* @Post: updates the canvas to correspond with the window size
*/
window.addEventListener('resize', () => // if the user shrinks/expands their browser, the canvas will update accordingly
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    PADDLE_WIDTH = canvas.width / 6;
    PADDLE_HEIGHT = canvas.height / 30; 

    if (gameObjects.length > 0) // if the objects have been created
    {
      for (let i = 0; i < gameObjects.length - 1; i++) // iterate through game objects
      {
        gameObjects[i].resize();
      }
    }
    
});