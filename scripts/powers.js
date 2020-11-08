class Powers{

  /**
   * Initializes the powers object
   * @constructor
   * @pre canvas must be declared
   * @post initializes powers object
   * @param {paddle} paddle: object
   * @param {int} num: integer value representing the total number of powers
   * @param {int} itemtype: integer index representing type number of powers
   */
  constructor(paddle, num, itemtype){
    this.power_initX = Math.floor(Math.random()*9+1) / 10;
    this.paddleW = paddle.width;
    this.paddleH = paddle.height;
    this.fallings = num;
    this.powerstype = itemtype;
    this.powers = [];
    this.fall_speed = canvas.height / 200;
    for (let i=0; i < this.fallings; i++){
      let power = {x: this.power_initX * canvas.width,
                   y: 0,
                   power_width: canvas.width / 15,
                   power_height: canvas.height / 25,
                   power_type: itemtype,
                   isLive: true
                  };
      this.powers.push(power);
    }
  }

 /**
  * Mark the power item is catched by paddle
  * @pre item must drop from top of the screen, game is no over
  * @post mark the power object it catched by paddle
  * @param {Powers} item: set of powers that the paddle could catch it
  * @return return True if itme is caught by paddle, otherwise false
  */
  isCatch (item){
    return(item.x < gameObjects[OBJ_KEYS.PADDLE].x + gameObjects[OBJ_KEYS.PADDLE].width
    && item.x + item.power_width > gameObjects[OBJ_KEYS.PADDLE].x
    && item.y < gameObjects[OBJ_KEYS.PADDLE].y + gameObjects[OBJ_KEYS.PADDLE].height
    && item.y + item.power_height > gameObjects[OBJ_KEYS.PADDLE].y)
  }

 /**
  * Mark the power item is not catched by paddle
  * @pre item must drop from top of screen, game is no over
  * @post mark the power object is not catched by paddle
  * @param {Powers} item: set of powers that the paddle could catch it
  * @return return True if itme is not caught by paddle, otherwise false
  */
  isNotCatch(item){
    console.log('this.power_intX_percentage = ', this.power_initX);
    return (item.y > gameObjects[OBJ_KEYS.PADDLE].y);
  }

 /**
  * Double ball feature:
  * @pre item must drop from top of the screen, game is no over
  * @post double the each existing ball when the paddle catch x2 item
  * @param {int} index: the index about item
  * @param {Power} item: set of powers that the paddle could catch it
  */
  catchBall(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        gameObjects[OBJ_KEYS.BALL_CONTAINER].x2();
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        this.resetPowers(Math.floor((Math.random() * 8) + 1));

      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        this.resetPowers(Math.floor((Math.random() * 8) + 1));
      }
    }
  }

 /**
  * Lives + 1 feature:
  * @pre item must drop from top of the screen, game is no over
  * @post add 1 live when the paddle catch heart item
  * @param {int} index: the index about item
  * @param {Power} item: set of powers that the paddle could catch it
  */
  catchHeart(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        if (gameObjects[OBJ_KEYS.PLAYERSTATUS].currentLives < 5)
        {
          gameObjects[OBJ_KEYS.PLAYERSTATUS].currentLives++;
        }
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        this.resetPowers(Math.floor((Math.random() * 8) + 1));

      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        this.resetPowers(Math.floor((Math.random() * 8) + 1));
      }
    }
  }

  /**
  * Paddle longer feature:
  * @pre item must drop from top of the screen, game is no over
  * @post paddle width change to longer when the paddle catch Plonger item
  * @param {int} index: the index about item
  * @param {Power} item: set of powers that the paddle could catch it
  */
  catchPlonger(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        if(gameObjects[OBJ_KEYS.PADDLE].width<(canvas.width/3)){
            let added_width = 0;
            let max_added_width = gameObjects[OBJ_KEYS.PADDLE].width / 3;
            function expandSize()
            {
              gameObjects[OBJ_KEYS.PADDLE].width += 1;
              gameObjects[OBJ_KEYS.PADDLE].width_size = gameObjects[OBJ_KEYS.PADDLE].width / gameObjects[OBJ_KEYS.PADDLE].init_width;
              added_width += 1;
              if (added_width < max_added_width) setTimeout(expandSize, 10);
            }
            setTimeout(expandSize, 10);
          }
          gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
          this.resetPowers(Math.floor((Math.random() * 8) + 1));
      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        this.resetPowers(Math.floor((Math.random() * 8) + 1));
      }

    }
  }

  /**
  * Paddle shorter feature:
  * @pre item must drop from top of the screen, game is no over
  * @post paddle width change to shorter when the paddle catch Pshorter item
  * @param {int} index: the index about item
  * @param {Power} item: set of powers that the paddle could catch it
  */
  catchPshorter(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        if(gameObjects[OBJ_KEYS.PADDLE].width>(canvas.width/10)){
            let subtracted_width = 0;
            let max_subtracted_width = gameObjects[OBJ_KEYS.PADDLE].width / 3;
            function reduceSize()
            {
              gameObjects[OBJ_KEYS.PADDLE].width -= 1;
              gameObjects[OBJ_KEYS.PADDLE].width_size = gameObjects[OBJ_KEYS.PADDLE].width / gameObjects[OBJ_KEYS.PADDLE].init_width;
              subtracted_width += 1;
              if (subtracted_width < max_subtracted_width) setTimeout(reduceSize, 10);
            }
            setTimeout(reduceSize, 10);
            //this.paddleW = gameObjects[OBJ_KEYS.PADDLE].width;     //update paddle info
          }
          gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
          this.resetPowers(Math.floor((Math.random() * 8) + 1));

      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        this.resetPowers(Math.floor((Math.random() * 8) + 1));
      }

    }
  }

  /**
  * Big ball feature:
  * @pre item must drop from top of the screen, game is no over
  * @post ball size change to bigger when the paddle catch Bball item
  * @param {int} index: the index about item
  * @param {Power} item: set of powers that the paddle could catch it
  */
  catchBball(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        gameObjects[OBJ_KEYS.BALL_CONTAINER].increaseSize();
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        this.resetPowers(Math.floor((Math.random() * 8) + 1));

      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        this.resetPowers(Math.floor((Math.random() * 8) + 1));
      }
    }
  }

  /**
  * Small ball feature:
  * @pre item must drop from top of the screen, game is no over
  * @post ball size change to smaller when the paddle catch Sball item
  * @param {int} index: the index about item
  * @param {Power} item: set of powers that the paddle could catch it
  */
  catchSball(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        gameObjects[OBJ_KEYS.BALL_CONTAINER].decreaseSize();
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        this.resetPowers(Math.floor((Math.random() * 8) + 1));

      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        this.resetPowers(Math.floor((Math.random() * 8) + 1));
      }

    }
  }


  /**
  * Ball speed up feature:
  * @pre item must drop from top of the screen, game is no over
  * @post ball speed up when the paddle catch Bfast item
  * @param {int} index: the index about item
  * @param {Power} item: set of powers that the paddle could catch it
  */
  catchBfast(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        gameObjects[OBJ_KEYS.BALL_CONTAINER].increaseSpeed();
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        this.resetPowers(Math.floor((Math.random() * 8) + 1));
      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        this.resetPowers(Math.floor((Math.random() * 8) + 1));
      }
    }
  }

  /**
  * Ball speed down feature:
  * @pre item must drop from top of the screen, game is no over
  * @post ball speed down when the paddle catch Bslow item
  * @param {int} index: the index about item
  * @param {Power} item: set of powers that the paddle could catch it
  */
  catchBslow(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        gameObjects[OBJ_KEYS.BALL_CONTAINER].decreaseSpeed();
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        this.resetPowers(parseInt(Math.random()*8)+1);
      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        //console.log('not catchBslow');
        gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
        //console.log(//gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks);
        this.resetPowers(Math.floor((Math.random() * 8) + 1));
      }

    }
  }

  /**
  * Draws the random power items drop from the top of screen
  * @pre the ball hit the brick
  * @post draws the power item drop from the top of the screen
  */
  draw(){
    if (this.powerstype == 0) { this.empty();}
    else if(this.powerstype == 1) { this.drawBall();}
    else if(this.powerstype == 2) { this.drawHeart();}
    else if(this.powerstype == 3) { this.drawPlonger();}
    else if(this.powerstype == 4) { this.drawPshorter();}
    else if(this.powerstype == 5) { this.drawBigBall();}
    else if(this.powerstype == 6) { this.drawSmallBall();}
    else if(this.powerstype == 7) { this.drawBallfast();}
    else if(this.powerstype == 8) { this.drawBallslow();}

  }

  /**
  * Do not draws the power item on the top of the screen
  * @pre the ball hit the brick
  * @post No power item drop from the top of the screen
  */
  empty(){
    console.log("empty");
    if (gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks == true)
      this.resetPowers(parseInt(Math.random()*8)+1);
  }

  /**
  * Draws the double ball power item drop from the top of the screen
  * @pre the ball hit the brick
  * @post draws the x2Ball item drop from the top of the screen and update y position of power
  */
  drawBall(){
    var img = new Image();
    img.src = "assets/images/+ball.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 65, 55);
      if (power.y < canvas.height){
        power.y = power.y+this.fall_speed;
      }
      this.catchBall(i,power);
    }
  }

  /**
  * Draws the lives + 1 power item drop from the top of the screen
  * @pre the ball hit the brick
  * @post draws the Heart item drop from the top of the screen and update y position of power
  */
  drawHeart(){
    var img = new Image();
    img.src = "assets/images/+live.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 55, 45);
      if (power.y < canvas.height){
        power.y = power.y+this.fall_speed;
      }
      this.catchHeart(i,power);
    }
  }

  /**
  * Draws the paddle longer power item drop from the top of the screen
  * @pre the ball hit the brick
  * @post draws the Plonger item drop from the top of the screen and update y position of power
  */
  drawPlonger(){
    var img = new Image();
    img.src = "assets/images/plong.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 90, 85);
      if (power.y < canvas.height){
        power.y = power.y+this.fall_speed;
      }
      this.catchPlonger(i,power);
    }
  }

  /**
  * Draws the paddle shorter power item drop from the top of the screen
  * @pre the ball hit the brick
  * @post draws the Pshorter item drop from the top of the screen and update y position of power
  */
  drawPshorter(){
    var img = new Image();
    img.src = "assets/images/psmall.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 90, 85);
      if (power.y < canvas.height){
        power.y = power.y+this.fall_speed;
      }
      this.catchPshorter(i,power);
    }
  }

  /**
  * Draws the big ball power item drop from the top of the screen
  * @pre the ball hit the brick
  * @post draws the BigBall item drop from the top of the screen and update y position of power
  */
  drawBigBall(){
    var img = new Image();
    img.src = "assets/images/bball.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 55, 45);
      if (power.y < canvas.height){
        power.y = power.y+this.fall_speed;
      }
      this.catchBball(i,power);
    }
  }

  /**
  * Draws the small ball power item drop from the top of the screen
  * @pre the ball hit the brick
  * @post draws the SmallBall item drop from the top of the screen and update y position of power
  */
  drawSmallBall(){
    var img = new Image();
    img.src = "assets/images/sball.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 40, 40);
      if (power.y < canvas.height){
        power.y = power.y+this.fall_speed;
      }
      this.catchSball(i,power);
    }
  }

  /**
  * Draws the speed up power item drop from the top of the screen
  * @pre the ball hit the brick
  * @post draws the Ballfast item drop from the top of the screen and update y position of power
  */
  drawBallfast(){
    var img = new Image();
    img.src = "assets/images/bfast.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 85, 70);
      if (power.y < canvas.height){
        power.y = power.y+this.fall_speed;
      }
      this.catchBfast(i,power);
    }
  }

  /**
  * Draws the speed down power item drop from the top of the screen
  * @pre the ball hit the brick
  * @post draws the Ballslow item drop from the top of the screen and update y position of power
  */
  drawBallslow(){
    var img = new Image();
    img.src = "assets/images/bslow.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 85, 70);
      if (power.y < canvas.height){
        power.y = power.y+this.fall_speed;
      }
      this.catchBslow(i,power);
    }
  }


  update(){

  }

  /**
  * @Pre The game has been reset or lose a live
  * @Post clears power items from the screen
  * @param {int} itemtype: generate random types of powers
  */
  resetPowers(itemtype){
    console.log("reset powers");
    this.powers = [];
    this.power_initX = Math.floor(Math.random()*9+1) / 10
    this.powerstype = itemtype;
    gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks = false;
    for (let i=0; i < this.fallings; i++){
      let power = {x: this.power_initX * canvas.width,
                   y: canvas.height/20,
                   power_width: canvas.width / 15,
                   power_height: canvas.height / 25,
                   power_type: itemtype,
                   isLive: true

                  };
      this.powers.push(power);
      console.log(power.x, power.y, power.power_type);

    }
    //this.update();
    //this.draw()
  }

  /**
  * @Pre The window has been resized
  * @Post updates the x position of the power item for the new window size
  */
  resize(){
    console.log("resize");
    console.log('this.power_intX_percentage = ', this.power_initX);
    for (let i=0; i<this.fallings; i++){
      this.powers[i].x = this.power_initX * canvas.width;
      console.log('this.powers[i].x = ', this.powers[i].x);
    }
  }
}
