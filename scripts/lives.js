class Lives {
/**
 * Initializes the lives class to keep track of how many lives the user has
 * @constructor
 * @pre canvas and context must be declared
 * @post creates Lives object that updates and draws the player's current lives
 * @param {int} currentLives: integer representing the current lives of the player
 */
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

/**
 * Updates the current number of lives
 * @pre global 'playerHasLost' variable must be declared
 * @post 'playerHasLost' var set to true when all lives lost
 * @param {int} currentLives: integer representing the current lives of the player
 */
  update(currentLives) {

    this.playerLives = this.buildLives(currentLives)
    if(currentLives === 0) {
      playerHasLost = true
    }
  }

/**
 * Draws the lives on the screen
 * @pre canvas and context must be declared
 * @post for each life the player has, the life is drawn
 */
  draw() {

    this.playerLives.forEach(life => life.draw())
  }

/**
 * Builds the current number of lives to be displayed on screen
 * @pre canvas must be declared
 * @pre img html tag with id='img_life' must be defined with image file representing a life
 * @post lives array created with Life objects declared with position coordinates in upper left corner
 * @param {int} currentLives: integer representing the current lives of the player
 * @return lives: array of Life objects 
 */
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
/**
 * Initializes the position of the lives to be displayed
 * @pre canvas and context must be declared
 * @post creates Life object with an initialized position, size, and image
 * @param {int} position_x: integer representing x coordinate within canvas
 * @param {int} position_y: integer representing y coordinate within canvas
 */
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

/**
 * Draws the lives on the screen using coordinates from Life class
 * @pre ctx must be declared
 * @pre img html tag with id='img_life' must be defined with image file representing a life
 * @post draws life using position coordinates and height and width values 
 */
  draw() {
    ctx.drawImage(this.img, this.position.x, this.position.y,
                  this.size.width, this.size.height)
  }
}


