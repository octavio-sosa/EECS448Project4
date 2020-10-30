class Powers{
  constructor(){
    this.fallings = 2
    this.powers = [];
    for (let i=0; i < this.fallings; i++){
      let power = {x: Math.floor(Math.random()*canvas.width),
                   y: Math.floor(Math.random()*canvas.height),
                   power_width: canvas.width / 15,
                   power_height: canvas.height / 25
                  };
      this.powers.push(power);
    }
  }
  draw(){
    var img = new Image();
    img.src = "assets/images/doubleball.png";
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.drawImage(img, power.x, power.y, 30, 30);
      power.y = power.y+1;
      if (power.y > canvas.height){
        power.y = 0;
      }
    }
  }
  update(){

  }
  resetPowers(){

  }
  resize(){

  }
}
