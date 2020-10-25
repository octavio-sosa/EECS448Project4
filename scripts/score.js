class Score {
  constructor(currentScore, targetScore) {
    this.currentScore = currentScore
    this.targetScore = targetScore
    this.scale = 0.00004
    this.position = {
      x: canvas.width - canvas.width*canvas.height*this.scale*0.25,
      y: canvas.height*canvas.width*this.scale
    }
    this.fontSize = canvas.height*canvas.width*0.00004
  }

  update(currentScore, targetScore) {
    this.position = {
      x: canvas.width - canvas.width*canvas.height*this.scale*0.25,
      y: canvas.height*canvas.width*this.scale
    }
    this.fontSize = canvas.height*canvas.width*0.00004
    this.currentScore = currentScore

    if(currentScore === targetScore) {
      //add life
      gameObjects[OBJ_KEYS.PLAYERSTATUS].targetScore *= 2
      gameObjects[OBJ_KEYS.PLAYERSTATUS].currentLives++ 
    }
  }

  draw() {
    //ctx.beginPath()
    ctx.font = this.fontSize + 'px serif'
    ctx.fillStyle = object_color
    ctx.textAlign = 'right'
    ctx.fillText(this.currentScore + '', this.position.x, this.position.y)
    //ctx.closePath()
    //draw temp life based on targetscore and current score
  }
}
