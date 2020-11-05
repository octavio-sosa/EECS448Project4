class PlayerStatus {
/**
 * Initializes the Playerstatus object
 * @constructor
 * @pre canvas and context must be declared
 * @post constructs PlayerStatus object with Lives and Score objects as data members
 * @param {int} targetScore: integer representing the max score for a level
 */
  constructor(targetScore) {

    this.statusObjects = []

    this.currentLives = 3
    this.currentScore = 0
    this.targetScore = targetScore

    this.playerLives = new Lives(this.currentLives)
    this.playerScore = new Score(this.currentScore, this.targetScore)

    this.statusObjects = [this.playerLives, this.playerScore]
  }

/**
 * Updates the player's lives and their score
 * @pre canvas must be declared
 * @post updates the playerLives and playerScore objects with current in-game values
 */
  update() {
    this.playerLives.update(this.currentLives)
    this.playerScore.update(this.currentScore, this.targetScore)
  }

/**
 * Draws the players lives and score at the respective corners of the screen
 * @pre context must be declared
 * @post draws the player's lives and score at top corners of screen
 */
  draw() {
    this.statusObjects.forEach(obj => obj.draw())
  }

/**
 * Resets the player to have 3 lives and 0 score
 * @pre canvas must be declared
 * @post resets the players Lives and Score objects
 */
  resetStatus(){
    this.currentLives = 3
    this.currentScore = 0

    this.playerLives = new Lives(this.currentLives)
    this.playerScore = new Score(this.currentScore, this.targetScore)

    this.statusObjects = [this.playerLives, this.playerScore]

  }

  resize(){
    
  }
}
