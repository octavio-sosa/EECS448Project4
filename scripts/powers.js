class Powers{
  constructor(x, y){
    this.paddleW = x;
    this.paddleH = y;
    this.fallings = 2;
    this.powers = [];
    for (let i=0; i < this.fallings; i++){
      let power = {x: Math.floor(Math.random()*canvas.width),
                   y: canvas.height/20,
                   power_width: canvas.width / 15,
                   power_height: canvas.height / 25,
                   isLive: true
                  };
      this.powers.push(power);
      //this.isLive = true;
    }
  }
  isCatch (item) {
    return(item.x < gameObjects[OBJ_KEYS.PADDLE].x + this.paddleW
    && item.x + item.power_width > gameObjects[OBJ_KEYS.PADDLE].x
    && item.y < gameObjects[OBJ_KEYS.PADDLE].y + this.paddleH
    && item.y + item.power_height > gameObjects[OBJ_KEYS.PADDLE].y)
  }
  catchBall(item){
    if (item.isLive){
      if (this.isCatch(item)){
        item.isLive = false;
        this.powers.splice(item, 1);
        console.log('catch');
      }
    }
  }
  draw(){
    this.drawBall();
  }
  drawBall(){
    var img = new Image();
    img.src = "assets/images/x2ball.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 50, 50);
      power.y = power.y+2;
      if (power.y > canvas.height){
        power.y = 0;
      }
      this.catchBall(power);
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
                   power_height: canvas.height / 25
                  };
      this.powers.push(power);
    }
  }
  resize(){

  }
}
