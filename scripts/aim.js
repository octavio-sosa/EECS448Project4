class Aim {
  constructor(startPos_x, startPos_y) {
    this.startPos = {
      x: startPos_x,
      y: startPos_y
    }

    this.length = canvas.width*canvas.height*0.00004
    this.color = '#ff0000'//'#00ddff'

    this.endPos = {
      x: this.startPos.x,
      y: this.startPos.y - this.length 
    }

    this.lineWidth = canvas.width*canvas.height*0.000004

    this.launchVector = {
      x: 0,
      y: 0
    }

    this.step = 0
    this.angularConst = 0.05
    this.minAngle = Math.PI/12
    this.maxAngle = 11*Math.PI/12
    this.radians = this.minAngle
    this.clockwise = false

    this.arrowHeadLeft = {
      x: 0,
      y: 0,
      length: this.length*0.25
    }

    this.arrowHeadRight = {
      x: 0,
      y: 0,
      length: this.length*0.25
    }
  }

  update(startPos_x, startPos_y) {
    //this.color = updateColor() //TODO
    this.updateLine(startPos_x, startPos_y)
    this.updateLaunchVector()
    //this.updateHead() //TODO
  }

  draw() {
    this.drawLine()
    //this.drawHead()//TODO
  }

  updateLaunchVector() {
    this.updateAngle()
    this.launchVector.x = this.length*Math.cos(this.radians)
    this.launchVector.y = this.length*Math.sin(this.radians)
    
    this.endPos.x = this.startPos.x + this.launchVector.x
    this.endPos.y = this.startPos.y - this.launchVector.y
  }

  updateAngle() {
    if(this.radians > this.maxAngle) {
      this.clockwise = true
    } else if (this.radians < this.minAngle){
      this.clockwise = false
    }

    if(this.clockwise) {
      this.step--
    } else {
      this.step++
    }

    this.radians = this.step*this.angularConst + this.minAngle
  }

  updateLine(startPos_x, startPos_y) {
    this.startPos = {
      x: startPos_x,
      y: startPos_y
    }

    this.length = canvas.width*canvas.height*0.00004

    this.lineWidth = canvas.width*canvas.height*0.000004
  }

  /*TODO
  updateHead() {
    this.arrowHeadLeft.x = this.endPos.x +  
         
  }
  */

  drawLine() {
    ctx.beginPath()
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.color
    ctx.lineCap = 'round'
    ctx.moveTo(this.startPos.x, this.startPos.y)
    ctx.lineTo(this.endPos.x, this.endPos.y)
    ctx.stroke()
    ctx.closePath()
  }

  drawHead() {
    let scale = 0.25
    let leftLine = {
      x: this.endPos.x - this.length*scale,
      y: this.endPos.y + this.length*scale
    }

    let rightLine = {
      x: this.endPos.x + this.length*scale,
      y: this.endPos.y + this.length*scale
    }

    ctx.beginPath()
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.color
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.moveTo(this.endPos.x, this.endPos.y)
    ctx.lineTo(leftLine.x, leftLine.y)
    ctx.moveTo(this.endPos.x, this.endPos.y)
    ctx.lineTo(rightLine.x, rightLine.y)
    ctx.stroke()
    ctx.closePath()
  }
}
