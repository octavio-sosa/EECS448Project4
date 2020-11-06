let PADDLE_WIDTH = canvas.width / 6;
let PADDLE_HEIGHT = canvas.height / 30;
let level = 1;

let gameObjects = [] // array to iterate through during game loop
let paddle = new Paddle(); // instantiate paddle
let ballContainer = new BallContainer;
let brickset = new Brickset(); //instantiate brickset with number of rows and columns of bricks
let targetScore = Math.floor(brickset.bricks.length/4); // sets the target score
let playerStatus = new PlayerStatus(targetScore); // initializes the players status object
let totalfallings = 1; // 1 power
let randomtype = parseInt(Math.random()*(8-1+1)+1); // Gets random number to choose powerup
let powers = new Powers(paddle, totalfallings, 2); // initializes powerup
let testing = new testSuite();

testButton.addEventListener('click', () => {
  testing.runTests();
})

ballContainer.push(new Ball(true));
gameObjects.push(paddle); // add paddle to array
gameObjects.push(ballContainer); // add ball to array
gameObjects.push(brickset); // add brickset to array
gameObjects.push(playerStatus); // add playerstatus to array
gameObjects.push(powers); // add powers to array

const OBJ_KEYS = {
	PADDLE: 0,
	BALL_CONTAINER: 1,
	BRICKSET: 2,
  PLAYERSTATUS: 3,
  POWERS: 4
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
 * Sets the color to a random colorscheme
 * @Pre Gives game a random color
 * @Post Game color will be changed to random color
 */
function setRandomColor()
{
    clr_idx = Math.floor(Math.random() * clrs.length);
    if (Math.random() >= 0.5)
    {
        let temp = clrs[clr_idx][0];
        clrs[clr_idx][0] = clrs[clr_idx][1];
        clrs[clr_idx][1] = temp;
    }
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

  if (gameHasStarted)
  {
      ctx.fillStyle = clrs[clr_idx][0];
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = clrs[clr_idx][1];
      for (let i = 0; i < gameObjects.length-1; i++) // iterate through game objects
      {
        gameObjects[i].draw();
      }
      gameObjects[OBJ_KEYS.BALL_CONTAINER].detect_collisions(gameObjects[0], gameObjects[2]); // Have ball check for collisions
      if (gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks){
        gameObjects[4].draw();
      }
  }

}

/**
 * Animates game on screen
 * @Pre game objects have been created and user has selected to start game
 * @Post updates and draws every game object while unpaused
 */
let startBall = new StartScreenBall;
function animate() // main game loop occurs here
{
    requestAnimationFrame(animate); // waits until this animate is done and then calls it again
    if (!gameHasStarted)
    { 
        drawStartScreen();
        startBall.update();
    }
    else if (!paused & !playerHasLost & !playerHasWon)
    {
        menu.style.display = 'none';
        setting.style.display = 'none';
        win.style.display = 'none';
        lose.style.display = 'none';

        ctx.clearRect(0, 0 , window.innerWidth, window.innerHeight); // clears the previous frame
        ctx.fillStyle = clrs[clr_idx][0];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = clrs[clr_idx][1];

        for (let i = 0; i < gameObjects.length-1; i++) // iterate through game objects
        {
          gameObjects[i].update(); // call update on each object
          gameObjects[i].draw();
        }
        gameObjects[OBJ_KEYS.BALL_CONTAINER].detect_collisions(gameObjects[0], gameObjects[2]); // Have ball check for collisions
				if (gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks){
					gameObjects[4].update();
					gameObjects[4].draw();
				}
        //gameObjects[0].detect_collision(gameObjects[4]); // Have paddle check for collision with powers
    }
    else if (paused & !playerHasLost)
    {
        startBtn.innerHTML = "RESUME";
        startBtn.onclick = resume;
        menu.style.display = 'block';
    }
    else if (playerHasLost)
    {
        lose.style.display = 'block';
        playerScoreElem.innerHTML = "Your Score: " + playerStatus.currentScore;
        if (playerStatus.currentScore > highScore) highScore = playerStatus.currentScore;
        highScoreElem.innerHTML = "High Score: " + highScore; 
		}
    else
    {
        win.style.display = 'block';
    }
}

/**
 * Starts the game with a random color
 * @Pre Game starts and color and level are chosen
 * @Post Chooses color of game
 */
var start = function startGame()
{
    setRandomColor();
    animate();
    displayNotification("LEVEL " + level);
    gameHasStarted = true;
}

invertcolorBtn.onclick = inv;
startBtn.onclick = start; // start the loop


/**
 * Resets the game
 * @Pre gameobjects have already been created
 * @Post returns all game objects to original status and position
 */
var reset = function gameRestart(){
  level = 1;
  setRandomColor();
	ctx.clearRect(0, 0 , window.innerWidth, window.innerHeight); // clears the previous frame
	gameObjects[0].resetPaddle();
	gameObjects[1].resetBalls();
	gameObjects[2].resetBrick();
  gameObjects[3].resetStatus();
  gameObjects[4].resetPowers(0);
  gameObjects[1].hitBricks = false;


	for (let i = 0; i < gameObjects.length-1; i++) // iterate through game objects
	{
		gameObjects[i].update(); // call update on each object
		gameObjects[i].draw();
  }
  if (gameObjects[1].hitBricks == true){
    gameObjects[4].update();
    gameObjects[4].draw();
  }
  playerHasWon = false;
  playerHasLost = false;
  displayNotification("LEVEL " + level);
}
tryBtn.onclick = reset;

/**
 * Goes to next level once first level is beat
 * @Pre Assumes game has been initialized properly
 * @Post Game will advance to next level
 */
var nextlevel = function nextLevel()
{
  level++;
  setRandomColor();
	ctx.clearRect(0, 0 , window.innerWidth, window.innerHeight); // clears the previous frame
	gameObjects[0].resetPaddle();
	gameObjects[1].resetBalls();
	gameObjects[2].resetBrick();
  gameObjects[4].resetPowers(0);
  //gameObjects[1].hitBricks = false;
  //gameObjects[3].resetStatus();

	for (let i = 0; i < gameObjects.length-1; i++) // iterate through game objects
	{
		gameObjects[i].update(); // call update on each object
		gameObjects[i].draw();
  }
  if (gameObjects[1].hitBricks == true){
    gameObjects[4].update();
    gameObjects[4].draw();
  }

  playerHasWon = false;
  playerHasLost = false;
  displayNotification("LEVEL " + level);
}
nextBtn.onclick = nextlevel;

/**
 * Opens option menu
 * @Pre menu is currently open
 * @Post main menu will be hidden and settings menu will appear
 */
var opt = function Opt(){
  setting.style.display = 'block';
  menu.style.display = 'none';
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

/**
 * @Pre the window size has been changed
 * @Post updates the canvas to correspond with the window size
 */
window.addEventListener('resize', () => // if the user shrinks/expands their browser, the canvas will update accordingly
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    PADDLE_WIDTH = canvas.width / 6;
    PADDLE_HEIGHT = canvas.height / 30;

    if (gameHasStarted)
    {
      if (gameObjects.length > 0) // if the objects have been created
      {
        for (let i = 0; i < gameObjects.length; i++) // iterate through game objects
        {
          gameObjects[i].resize();
        }
      }
      prev_width = canvas.width;
      prev_height = canvas.height;
    }
    else 
    {
      drawStartScreen();
    }


});
