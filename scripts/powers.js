class Powers{
  constructor(){
    this.fallings = 20;
    this.powers = [];
    for (let i=0; i<this.fallings; i++){
      let power = {x: Math.floor(Math.random()*canvas.width),
                   y: Math.floor(Math.random()*canvas.height)};
      this.powers.push(power);
    }
  }
  draw(){
    for (let i=0; i<this.powers.length; i++){
      let power = this.powers[i];
      ctx.fillStyle = 'pink';
      ctx.fillRect(power.x, power.y, 20, 20);
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
