class Powers{
  constructor(x, y, num, itemtype){
    this.paddleW = x;
    this.paddleH = y;
    this.fallings = num;
    this.powerstype = itemtype;
    this.powers = [];
    for (let i=0; i < this.fallings; i++){
      let power = {x: Math.floor(Math.random()*(canvas.width-50)),
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
    return(item.x < gameObjects[OBJ_KEYS.PADDLE].x + this.paddleW
    && item.x + item.power_width > gameObjects[OBJ_KEYS.PADDLE].x
    && item.y < gameObjects[OBJ_KEYS.PADDLE].y + this.paddleH
    && item.y + item.power_height > gameObjects[OBJ_KEYS.PADDLE].y)
  }

  catchBall(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('catchBall');
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
      }
    }
  }
  catchPlonger(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('catchPlonger');
        if(gameObjects[OBJ_KEYS.PADDLE].width>(canvas.width/10)
          &&gameObjects[OBJ_KEYS.PADDLE].width<(canvas.width/3)){
            gameObjects[OBJ_KEYS.PADDLE].width += 60;
          }
      }
    }
  }
  catchPshorter(index, item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(index, 1);
        console.log('catchPshorter');
        if(gameObjects[OBJ_KEYS.PADDLE].width>(canvas.width/10)
          &&gameObjects[OBJ_KEYS.PADDLE].width<(canvas.width/3)){
            gameObjects[OBJ_KEYS.PADDLE].width -= 60;
          }
      }
    }
  }

  draw(){
    if(this.powerstype==1) { this.drawBall();}
    if(this.powerstype==2) { this.drawHeart();}
    if(this.powerstype==3) { this.drawPlonger();}
    if(this.powerstype==4) { this.drawPshorter();}
  }

  drawBall(){
    var img = new Image();
    img.src = "assets/images/x2ball.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 50, 50);
      if (power.y < canvas.height){
        power.y = power.y+2;
      }
      this.catchBall(i,power);
    }
  }
  drawHeart(){
    var img = new Image();
    img.src = "assets/images/heart.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 50, 50);
      if (power.y < canvas.height){
        power.y = power.y+2;
      }
      this.catchHeart(i,power);
    }
  }
  drawPlonger(){
    var img = new Image();
    img.src = "assets/images/paddle_long.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 50, 50);
      if (power.y < canvas.height){
        power.y = power.y+2;
      }
      this.catchPlonger(i,power);
    }
  }
  drawPshorter(){
    var img = new Image();
    img.src = "assets/images/paddle_short.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 50, 50);
      if (power.y < canvas.height){
        power.y = power.y+2;
      }
      this.catchPshorter(i,power);
    }
  }


  update(){
    
  }

  resetPowers(){
    this.powers = [];
    for (let i=0; i < this.fallings; i++){
      let power = {x: Math.floor(Math.random()*canvas.width),
                   y: canvas.height/20,
                   power_width: canvas.width / 15,
                   power_height: canvas.height / 25,
                   power_type: itemtype,
                  };
      this.powers.push(power);
    }
  }
  resize(){

  }
}
