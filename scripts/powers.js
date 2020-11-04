class Powers{
  constructor(paddle, num, itemtype){
    this.paddleW = paddle.width;
    this.paddleH = paddle.height;
    this.fallings = num;
    this.powerstype = itemtype;
    this.powers = [];
    for (let i=0; i < this.fallings; i++){
      let power = {x: Math.floor(Math.random()*(window.innerWidth)),
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
    return (item.y > gameObjects[OBJ_KEYS.PADDLE].y);
  }

  catchBall(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('catchBall');
        gameObjects[OBJ_KEYS.BALL].numofBall += 1;
        gameObjects[OBJ_KEYS.BALL].hitBricks = false;
        console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
        this.resetPowers(parseInt(Math.random()*(8-1+1)+1));

      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('not catchHeart');
        gameObjects[OBJ_KEYS.BALL].hitBricks = false;
        console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
        this.resetPowers(parseInt(Math.random()*(8-1+1)+1));
      }
    }
  }
  catchHeart(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('catchHeart');
        gameObjects[OBJ_KEYS.PLAYERSTATUS].currentLives++;
        gameObjects[OBJ_KEYS.BALL].hitBricks = false;
        console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
        this.resetPowers(parseInt(Math.random()*(8-1+1)+1));

      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('not catchHeart');
        gameObjects[OBJ_KEYS.BALL].hitBricks = false;
        console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
        this.resetPowers(parseInt(Math.random()*(8-1+1)+1));
      }
    }
  }
  catchPlonger(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);

        console.log('catchPlonger');        
        console.log('width = ', gameObjects[OBJ_KEYS.PADDLE].width);              //testing width_size
        console.log('init_width = ', gameObjects[OBJ_KEYS.PADDLE].init_width);
        console.log('width_size = ', gameObjects[OBJ_KEYS.PADDLE].width_size);

        if(gameObjects[OBJ_KEYS.PADDLE].width<(canvas.width/3)){
            let added_width = 0;
            let max_added_width = gameObjects[OBJ_KEYS.PADDLE].width / 3;
            function expandSize()
            {
              gameObjects[OBJ_KEYS.PADDLE].width += 1;
              added_width += 1;
              if (added_width < max_added_width) setTimeout(expandSize, 10);
            }
            setTimeout(expandSize, 10);
          }
          console.log('width = ', gameObjects[OBJ_KEYS.PADDLE].width);
          console.log('init_width = ', gameObjects[OBJ_KEYS.PADDLE].init_width);

          gameObjects[OBJ_KEYS.PADDLE].width_size = gameObjects[OBJ_KEYS.PADDLE].width / gameObjects[OBJ_KEYS.PADDLE].init_width;
          
          console.log('width_size = ', gameObjects[OBJ_KEYS.PADDLE].width_size);

          gameObjects[OBJ_KEYS.BALL].hitBricks = false;
          console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
          this.resetPowers(parseInt(Math.random()*(8-1+1)+1));
      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('not catchHeart');
        gameObjects[OBJ_KEYS.BALL].hitBricks = false;
        console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
        this.resetPowers(parseInt(Math.random()*(8-1+1)+1));
      }

    }
  }
  catchPshorter(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('catchPshorter');
        if(gameObjects[OBJ_KEYS.PADDLE].width>(canvas.width/10)){
            let subtracted_width = 0;
            let max_subtracted_width = gameObjects[OBJ_KEYS.PADDLE].width / 3;
            function reduceSize()
            {
              gameObjects[OBJ_KEYS.PADDLE].width -= 1;
              subtracted_width += 1;
              if (subtracted_width < max_subtracted_width) setTimeout(reduceSize, 10);
            }
            setTimeout(reduceSize, 10);
            //this.paddleW = gameObjects[OBJ_KEYS.PADDLE].width;     //update paddle info
          }
          console.log('width = ', gameObjects[OBJ_KEYS.PADDLE].width);
          console.log('init_width = ', gameObjects[OBJ_KEYS.PADDLE].init_width);

          gameObjects[OBJ_KEYS.PADDLE].width_size = gameObjects[OBJ_KEYS.PADDLE].width / gameObjects[OBJ_KEYS.PADDLE].init_width;
          
          console.log('width_size = ', gameObjects[OBJ_KEYS.PADDLE].width_size);
          gameObjects[OBJ_KEYS.BALL].hitBricks = false;
          console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
          console.log('width_size = ', gameObjects[OBJ_KEYS.PADDLE].width_size);
          this.resetPowers(parseInt(Math.random()*(8-1+1)+1));

      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('not catchHeart');
        gameObjects[OBJ_KEYS.BALL].hitBricks = false;
        console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
        this.resetPowers(parseInt(Math.random()*(8-1+1)+1));
      }

    }
  }

  catchBball(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('catchBball');
        if(gameObjects[OBJ_KEYS.BALL].radius_size<2.5){
          gameObjects[OBJ_KEYS.BALL].radius_size *= 1.3;
          gameObjects[OBJ_KEYS.BALL].radius *= 1.3;
          gameObjects[OBJ_KEYS.BALL].hitBricks = false;
          console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
          this.resetPowers(parseInt(Math.random()*(8-1+1)+1));
        }
      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('not catchHeart');
        gameObjects[OBJ_KEYS.BALL].hitBricks = false;
        console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
        this.resetPowers(parseInt(Math.random()*(8-1+1)+1));
      }
    }
  }

  catchSball(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('catchBall');
        console.log('ball_radius = ',gameObjects[OBJ_KEYS.BALL].radius_size);
        if (gameObjects[OBJ_KEYS.BALL].radius_size > 0.4){
          gameObjects[OBJ_KEYS.BALL].radius_size *= 0.7;
          gameObjects[OBJ_KEYS.BALL].radius *= 0.7;
          gameObjects[OBJ_KEYS.BALL].hitBricks = false;
          console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
          this.resetPowers(parseInt(Math.random()*(8-1+1)+1));

        }
      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('not catchHeart');
        gameObjects[OBJ_KEYS.BALL].hitBricks = false;
        console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
        this.resetPowers(parseInt(Math.random()*(8-1+1)+1));
      }

    }
  }

  catchBfast(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log("velX = ",gameObjects[OBJ_KEYS.BALL].vel.x);    // testing ball vel before add speed
        console.log("velY = ",gameObjects[OBJ_KEYS.BALL].vel.y);    //
        console.log('catchBfast');
        if (gameObjects[OBJ_KEYS.BALL].speed.x < 2
            && gameObjects[OBJ_KEYS.BALL].speed.y < 2){
          gameObjects[OBJ_KEYS.BALL].speed.x *= 1.2;
          gameObjects[OBJ_KEYS.BALL].speed.y *= 1.2;
          console.log("speed_X = ",gameObjects[OBJ_KEYS.BALL].speed.x);  // testing ball speed
          console.log("speed_Y = ",gameObjects[OBJ_KEYS.BALL].speed.y);
          gameObjects[OBJ_KEYS.BALL].hitBricks = false;
          console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
          this.resetPowers(parseInt(Math.random()*(8-1+1)+1));
          console.log("velX = ",gameObjects[OBJ_KEYS.BALL].vel.x);  // testing ball vel after add speed
          console.log("velY = ",gameObjects[OBJ_KEYS.BALL].vel.y);
        }
      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('not catchBfast');
        gameObjects[OBJ_KEYS.BALL].hitBricks = false;
        console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
        this.resetPowers(parseInt(Math.random()*(8-1+1)+1));
      }
    }
  }

  catchBslow(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('catchBslow');
        if (gameObjects[OBJ_KEYS.BALL].speed.x > 0.52
            && gameObjects[OBJ_KEYS.BALL].speed.y > 0.52){
          gameObjects[OBJ_KEYS.BALL].speed.x *= 0.8;
          gameObjects[OBJ_KEYS.BALL].speed.y *= 0.8;
          console.log("speed_X = ",gameObjects[OBJ_KEYS.BALL].speed.x);  // testing ball speed
          console.log("speed_Y = ",gameObjects[OBJ_KEYS.BALL].speed.y);
          gameObjects[OBJ_KEYS.BALL].hitBricks = false;
          console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
          this.resetPowers(parseInt(Math.random()*(8-1+1)+1));
          console.log("velX = ",gameObjects[OBJ_KEYS.BALL].vel.x);
          console.log("velY = ",gameObjects[OBJ_KEYS.BALL].vel.y);
        }
      }
      else if (this.isNotCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('not catchBslow');
        gameObjects[OBJ_KEYS.BALL].hitBricks = false;
        console.log(gameObjects[OBJ_KEYS.BALL].hitBricks);
        this.resetPowers(parseInt(Math.random()*(8-1+1)+1));
      }

    }
  }

  draw(){
    if(this.powerstype == 1) { this.drawBall();}
    else if(this.powerstype == 2) { this.drawHeart();}
    else if(this.powerstype == 3) { this.drawPlonger();}
    else if(this.powerstype == 4) { this.drawPshorter();}
    else if(this.powerstype == 5) { this.drawBigBall();}
    else if(this.powerstype == 6) { this.drawSmallBall();}
    else if(this.powerstype == 7) { this.drawBallfast();}
    else if(this.powerstype == 8) { this.drawBallslow();}
  }

  drawBall(){
    var img = new Image();
    img.src = "assets/images/+ball.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 65, 55);
      if (power.y < canvas.height){
        power.y = power.y+2;
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
        power.y = power.y+2;
      }
      this.catchHeart(i,power);
    }
  }
  drawPlonger(){
    var img = new Image();
    img.src = "assets/images/plong.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 80, 75);
      if (power.y < canvas.height){
        power.y = power.y+2;
      }
      this.catchPlonger(i,power);
    }
  }
  drawPshorter(){
    var img = new Image();
    img.src = "assets/images/psmall.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 80, 75);
      if (power.y < canvas.height){
        power.y = power.y+2;
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
        power.y = power.y+2;
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
        power.y = power.y+2;
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
        power.y = power.y+2;
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
        power.y = power.y+2;
      }
      this.catchBslow(i,power);
    }
  }


  update(){

  }

  resetPowers(itemtype){
    console.log("reset powers");
    this.powers = [];
    this.powerstype = itemtype;
    for (let i=0; i < this.fallings; i++){
      let power = {x: Math.floor(Math.random()*canvas.width),
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

  }
}
