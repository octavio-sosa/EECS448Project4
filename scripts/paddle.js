class Paddle // the thing the player controls
{
    /**
     * Initializes the paddle object
     * @constructor
     * @Pre creates a paddle object
     * @Post initializes to middle of screen and sets height and width
     */
    constructor()
    {
        this.width_size = 1;
        this.init_width = 1 * PADDLE_WIDTH;
        this.width = PADDLE_WIDTH * this.width_size; // width of paddle
        this.height = PADDLE_HEIGHT; // height of paddle
        this.x = canvas.width / 2;  // initial x position
        this.y = canvas.height - this.height; // initial y position

        this.handData = JSON.parse(JSON.stringify(
                      {"handCentroid_x": 0,
                        "handCentroid_y": 0,
                        "fingerTip_x": 0,
                        "fingerTip_y": 0,
                        "frame_x": 0,
                        "frame_y": 0}))
      }

    /**
     * Updates the paddle position on screen
     * @Pre assumes paddle is initialized
     * @Post updates paddle's position based on movements input by the user from eithe mouse or keyboard
     */
    update()
    {
        if(handTrackEnabled){
          this.updateHandData()
        } else if (mouse.x != undefined){
            this.x = Math.min(Math.max(mouse.x - (this.width / 2), 0), canvas.width - this.width); // move paddle based on mouse position if it is defined (it is undefined until it moves)
        }
    }

    /**
     * Draws the paddle on the screen
     * @Pre assumes paddle is initialized
     * @Post draws paddle on bottom of screen
     */
    draw()
    {
        ctx.fillRect(this.x, this.y, this.width, this.height); //fill in a rectangle at (this.x, this.y) with dimensions this.width x this.height
    }

    /**
     * Resets the paddle to initial position on screen
     * @Pre assumes paddle is initialized
     * @Post resets paddle's location to center of screen
     */
    resetPaddle(){
      this.width_size = 1;
      this.init_width = 1 * PADDLE_WIDTH; 
      this.x = canvas.width / 2;  // initial x position
      this.y = canvas.height - this.height; // initial y position
      this.width = PADDLE_WIDTH * this.width_size; // width of paddle
      this.height = PADDLE_HEIGHT; //height of paddle
    }


    /**
     * @Pre The window has been resized, and an event listener has called this method
     * @Post The paddle's size and y-position will be updated to correspond with the new window size
     */
    resize()
    {
        this.init_width = 1 * PADDLE_WIDTH;
        this.width = PADDLE_WIDTH * this.width_size; // width of paddle
        this.height = PADDLE_HEIGHT; // height of paddle
        this.y = canvas.height - this.height; // initial y position
    }

    /**
     * Function to detect collisions with items, removes the power from the array of powers if there is a collision with the paddle.
     * @Pre Assumes powers are initialized correctly
     * @Post Removes the power from the array of powers when collides with the paddle
     */

    detect_collision(Powers)
    {
        for(let i = 0; i<Powers.fallings; i++){
            if (Powers.powers[i].x < this.x + this.width
                && Powers.powers[i].x + Powers.powers[i].power_width > this.x
                && Powers.powers[i].y < this.y + this.height
                && Powers.powers[i].y + Powers.powers[i].power_height > this.y)
                {
                    console.log("item has hit paddle");
                    Powers.powers.splice(i, 1);
                }
        }
    }

    async fetchHandPosition() {
      const response = await fetch('http://localhost:8000/handDataRead')
      const data = await response.json()
      return data
    }

    updateHandData(){
      this.fetchHandPosition()
        .then(dataRaw => {
          let data = JSON.parse(dataRaw)
          this.handData = data
        })
        .catch(dataRaw => {dataRaw})

      if(this.handData.handCentroid_x > 0){
        let handPos_x =  (this.handData.handCentroid_x / this.handData.frame_x) * canvas.width
        this.x = Math.min(Math.max(handPos_x - (this.width / 2), 0), canvas.width - this.width); // move paddle based on mouse position if it is defined (it is undefined until it moves)
      }
    }
}
