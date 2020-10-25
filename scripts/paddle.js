class Paddle // the thing the player controls
{

    /*
    * @Pre: creates a paddle object
    * @Post: initializes to middle of screen and sets height and width
    */
    constructor()
    {
        this.width = PADDLE_WIDTH; // width of paddle
        this.height = PADDLE_HEIGHT; // height of paddle
        this.x = canvas.width / 2;  // initial x position
        this.y = canvas.height - this.height; // initial y position
    }

    /*
    * @Pre: assumes paddle is initialized
    * @Post: updates paddle's position based on movements input by the user from eithe mouse or keyboard
    */
    update()
    {
        if (mouse.x != undefined) 
        {
            this.x = Math.min(Math.max(mouse.x - (this.width / 2), 0), canvas.width - this.width); // move paddle based on mouse position if it is defined (it is undefined until it moves)
        }
    }

    /*
    * @Pre: assumes paddle is initialized
    * @Post: draws paddle on bottom of screen
    */
    draw()
    {
        ctx.fillRect(this.x, this.y, this.width, this.height); //fill in a rectangle at (this.x, this.y) with dimensions this.width x this.height
    }

    /*
    * @Pre: assumes paddle is initialized
    * @Post: resets paddle's location to center of screen
    */
    resetPaddle(){
      this.x = canvas.width / 2;  // initial x position
      this.y = canvas.height - this.height; // initial y position

    }
}
