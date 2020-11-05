class Powers{
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
  isCatch (item){
    return(item.x < gameObjects[OBJ_KEYS.PADDLE].x + gameObjects[OBJ_KEYS.PADDLE].width
    && item.x + item.power_width > gameObjects[OBJ_KEYS.PADDLE].x
    && item.y < gameObjects[OBJ_KEYS.PADDLE].y + gameObjects[OBJ_KEYS.PADDLE].height
    && item.y + item.power_height > gameObjects[OBJ_KEYS.PADDLE].y)
  }

  isNotCatch(item){
    console.log('this.power_intX_percentage = ', this.power_initX);
    return (item.y > gameObjects[OBJ_KEYS.PADDLE].y);
  }

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
  catchHeart(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        gameObjects[OBJ_KEYS.PLAYERSTATUS].currentLives++;
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

  empty(){
    console.log("empty");
    if (gameObjects[OBJ_KEYS.BALL_CONTAINER].hitBricks == true)
      this.resetPowers(parseInt(Math.random()*8)+1);
  }

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

  resetPowers(itemtype){
    console.log("reset powers");
    this.powers = [];
    this.power_initX = Math.floor(Math.random()*9+1) / 10
    this.powerstype = itemtype;
    for (let i=0; i < this.fallings; i++){
      let power = {x: this.power_initX * canvas.width,
                   y: canvas.height/20,
                   power_width: canvas.width / 15,
                   power_height: canvas.height / 25,
                   power_type: itemtype,
                   isLive: true

                  };
      this.powers.push(power);

    }
    this.update();
    this.draw()
  }
  resize(){
    console.log("resize");
    console.log('this.power_intX_percentage = ', this.power_initX);
    for (let i=0; i<this.fallings; i++){
      this.powers[i].x = this.power_initX * canvas.width;
      console.log('this.powers[i].x = ', this.powers[i].x);
    }
  }
}
