class PlayerStatus {
  constructor(targetScore) {

    this.statusObjects = []

    this.currentLives = 3
    this.currentScore = 0
    this.targetScore = targetScore

    this.playerLives = new Lives(this.currentLives)
    this.playerScore = new Score(this.currentScore, this.targetScore)

    this.statusObjects = [this.playerLives, this.playerScore]
  }

  update() {
    this.playerLives.update(this.currentLives)
    this.playerScore.update(this.currentScore, this.targetScore)
  }

  draw() {
    this.statusObjects.forEach(obj => obj.draw())
  }
  resetStatus(){
    this.currentLives = 3
    this.currentScore = 0

    this.playerLives = new Lives(this.currentLives)
    this.playerScore = new Score(this.currentScore, this.targetScore)

    this.statusObjects = [this.playerLives, this.playerScore]

  }
}
