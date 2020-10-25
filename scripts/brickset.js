class Brickset
{
    /*
    * @Post Generates brickset object, which will be updated through the game loop
      @Param rows: const value indicating how many rows of bricks to generate
      @Param cols: const value indicating columns to generate
      @Param spaced: bool value that decides if bricks are spaced out or clumped together 
   */
    constructor(rows, cols, spaced)
    {
        this.rows = rows;
        this.cols = cols;
        this.brick_length = canvas.width / 15;
        this.brick_height = canvas.height / 25;
        this.spacing = 1;
        if (spaced) this.spacing = this.brick_length / 4;
        this.bricks = []

        let row_length = (cols * this.brick_length) + ((cols - 1) * this.spacing);
        let starting_x_pos = (canvas.width - row_length) / 2;
        let starting_y_pos = canvas.height / 8;
        for (let i = 0; i < rows; i++)
        {
            for (let j = 0; j < cols; j++)
            {
                let brick = {x: starting_x_pos + (j * (this.brick_length + this.spacing)),
                             y: starting_y_pos + (i * (this.brick_height + this.spacing))};
                this.bricks.push(brick);
            }
        }
    }


    //@Post no effect, this class is skipped over in the game loop
    update() {}


    /*
    * @Pre brickset is generated 
      @Post updates screen with each surviving brick
    */
    draw()
    {
        for (let i = 0; i < this.bricks.length; i++)
        {
            let brick = this.bricks[i];
            ctx.beginPath();
            ctx.fillRect(brick.x, brick.y, this.brick_length, this.brick_height);
            ctx.closePath();
        }
    }


    /*
    * @Post returns each brick to its original position
    */

    resetBrick(){
      this.spacing = this.brick_length / 4;
      this.bricks = []

      let row_length = (this.cols * this.brick_length) + ((this.cols - 1) * this.spacing);
      let starting_x_pos = (canvas.width - row_length) / 2;
      let starting_y_pos = canvas.height / 10;
      for (let i = 0; i < this.rows; i++)
      {
          for (let j = 0; j < this.cols; j++)
          {
              let brick = {x: starting_x_pos + (j * (this.brick_length + this.spacing)),
                           y: starting_y_pos + (i * (this.brick_height + this.spacing))};
              this.bricks.push(brick);
          }
      }
    }
}
