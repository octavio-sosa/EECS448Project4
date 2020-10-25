class Lives {
  constructor(currentLives) {
    this.currentLives = currentLives
    this.maxLives = 5
    this.playerLives = []
    this.position = {
      x: canvas.width*0.01,
      y: canvas.width*0.01
    }
    this.pad = canvas.width*0.025
  }

  update(currentLives) {
    this.playerLives = this.buildLives(currentLives)
    if(currentLives === 0) {
      lost = true
    }
  }

  draw() {
    this.playerLives.forEach(life => life.draw())
  }

  buildLives(currentLives) {
    let lives = []

    for(let i = 0; i < currentLives; i++)
    {
      let position_x = this.position.x+i*(this.position.x+this.pad)
      lives.push(new Life(position_x, this.position.y))
    }

    return lives
  }
}

class Life {
  constructor(position_x, position_y) {
    this.scale = 0.025
    this.position = {
      x: position_x,
      y: position_y
    }
    this.size = {
      width: canvas.width*this.scale,
      height: canvas.width*this.scale*0.9
    }
    this.img = document.querySelector('#img_life')

  }

  draw() {
    ctx.drawImage(this.img, this.position.x, this.position.y,
                  this.size.width, this.size.height)
  }
}


