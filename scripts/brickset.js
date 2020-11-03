class Brickset
{
    /**
     * Creates the set of bricks to be displayed
     * @constructor
     * @Post Generates brickset object, which will be updated through the game loop
     */
    constructor()
    {
        this.brick_length = (canvas.width / 15) - 1;
        this.brick_height = canvas.height / 25;
        this.spacing = 1;
        this.bricks = [];
        this.total_bricks = 0;
        this.remaining_bricks = 0;
        this.rows = 0;
        this.cols = 0;
        this.height = 0;
        this.NUM_TYPES = 6
        this.brickset_type = Math.floor(Math.random() * this.NUM_TYPES);
        this.generate();
        this.brickset_resizer = new Brickset_Resizer(this);
    }

    generate()
    {
        switch (7)// (this.brickset_type)
        {
            case 0:
                this.generate_standard();
                break;
            case 1: 
                this.generate_pyramid();
                break;
            case 2: 
                this.generate_wall();
                break;
            case 3: 
                this.generate_spaced_wall();
                break;
            case 4: 
                this.generate_3_column();
                break;
            case 5:
                this.generate_alternating();
                break;
            case 6:
                this.generate_zigzag();
                break;
            case 7:
                this.generate_X();
                break;
        }
    }

    generate_standard()
    {
        this.rows = Math.floor(Math.random() * 2 + 6);
        this.cols = Math.floor(15 - this.rows);
        this.total_bricks = this.rows * this.cols;
        this.remaining_bricks = this.total_bricks; 

        if (Math.random() >= 0.5) this.spacing = this.brick_length / 4

        let row_length = (this.cols * this.brick_length) + ((this.cols - 1) * this.spacing);
        let starting_x_pos = (canvas.width - row_length) / 2;
        let starting_y_pos = canvas.height / 8;

        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                let brick = {x: starting_x_pos + (j * (this.brick_length + this.spacing)),
                             y: starting_y_pos + (i * (this.brick_height + this.spacing)),
                             alive: true};
                this.bricks.push(brick);
            }
        }
    }

    generate_pyramid()
    {
        this.height = Math.floor(Math.random() * 3 + 9);
        let starting_x_pos = (canvas.width - this.brick_length) / 2;
        let starting_y_pos = canvas.height / 20;
        for (let i = 0; i < this.height; i++)
        {
            for (let j = 0; j < i + 1; j++)
            {
                let brick = {x: starting_x_pos - (i * this.brick_length / 2) + (j * (this.brick_length + this.spacing)),
                             y: starting_y_pos + (i * (this.brick_height + this.spacing)),
                             alive: true};
                this.bricks.push(brick);
                this.total_bricks += 1;
            }
        }
        this.remaining_bricks = this.total_bricks;
    }

    generate_wall()
    {
        this.rows = Math.floor(Math.random() * 2 + 4);
        this.cols = 15;
        this.total_bricks = this.rows * this.cols;
        this.remaining_bricks = this.total_bricks; 
        let starting_y_pos = canvas.height / 8;
        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                let brick = {x: j * (this.brick_length + this.spacing),
                             y: starting_y_pos + (i * (this.brick_height + this.spacing)),
                             alive: true};
                this.bricks.push(brick);
            }
        }
    }

    generate_spaced_wall()
    {
        this.rows = 6;
        this.cols = 15;
        this.total_bricks = this.rows * this.cols;
        this.remaining_bricks = this.total_bricks; 
        let y_spacing = this.brick_height * 2.5;

        let starting_y_pos = canvas.height / 12;
        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                let brick = {x: j * (this.brick_length + this.spacing),
                             y: starting_y_pos + (i * (this.brick_height + y_spacing)),
                             alive: true};
                this.bricks.push(brick);
            }
        }
    }

    generate_3_column()
    {
        this.cols = 3;
        this.rows = Math.floor(Math.random() * 2 + 8);
        this.total_bricks = this.rows * this.cols;
        this.remaining_bricks = this.total_bricks; 
        let row_length = (this.cols * this.brick_length) + ((this.cols - 1) * this.spacing);
        let starting_x1_pos = (canvas.width - row_length) / 2;
        let starting_x2_pos = (canvas.width - row_length) / 8;
        let starting_x3_pos = (canvas.width - row_length) * (7/8);
        let starting_y_pos = canvas.height / 8;
        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                let brick1 = {x: starting_x1_pos + (j * (this.brick_length + this.spacing)),
                             y: starting_y_pos + (i * (this.brick_height + this.spacing)),
                             alive: true};
                let brick2 = {x: starting_x2_pos + (j * (this.brick_length + this.spacing)),
                             y: starting_y_pos + (i * (this.brick_height + this.spacing)),
                             alive: true};
                let brick3 = {x: starting_x3_pos + (j * (this.brick_length + this.spacing)),
                             y: starting_y_pos + (i * (this.brick_height + this.spacing)),
                             alive: true};    

                this.bricks.push(brick1);
                this.bricks.push(brick2);
                this.bricks.push(brick3);
            }
        }
    }

    generate_alternating()
    {
        this.spacing = 1;
        this.rows = Math.floor(Math.random() * 2 + 6);
        this.cols = 15;
        this.total_bricks = this.rows * this.cols / 2;
        this.remaining_bricks = this.total_bricks; 
        let starting_y_pos = canvas.height / 8;
        for (let i = 0; i < this.rows; i++)
        {
            for (let j = 0; j < this.cols; j++)
            {
                if ((i + j) % 2 == 0)
                {
                    let brick = {x: j * (this.brick_length + this.spacing),
                                 y: starting_y_pos + (i * (this.brick_height + this.spacing)),
                                 alive: true};
                    this.bricks.push(brick);
                }

            }
        }
    }

    generate_zigzag()
    {
        //1st pyramid, attached to ceiling
        this.height = 5;
        let starting_x1_pos = (canvas.width - this.brick_length * this.height) / 2;
        let starting_x2_pos = 1;//(canvas.width - this.brick_length * this.height) 0;
        let starting_x3_pos = (canvas.width - this.brick_length * this.height) - 1;
        //top 3 pyramids
        for (let i = 0; i < this.height; i++)
        {
            for (let j = this.height - 1; j >= i; j--)
            {
                let brick1 = {x: starting_x1_pos - (i * this.brick_length / 2) + (j * (this.brick_length + this.spacing)),
                             y: (i * (this.brick_height + this.spacing)),
                             alive: true};

                let brick2 = {x: starting_x2_pos - (i * this.brick_length / 2) + (j * (this.brick_length + this.spacing)),
                              y: (i * (this.brick_height + this.spacing)),
                              alive: true};

                let brick3 = {x: starting_x3_pos - (i * this.brick_length / 2) + (j * (this.brick_length + this.spacing)),
                              y: (i * (this.brick_height + this.spacing)),
                              alive: true};

                this.bricks.push(brick1);
                this.bricks.push(brick2);
                this.bricks.push(brick3);
                this.total_bricks += 3;
            }
        }

        //bottom 2 pyramids
        starting_x1_pos = canvas.width / 3 - (this.brick_length / 2);
        starting_x2_pos = canvas.width * (2/3)- (this.brick_length / 2);
        let starting_y_pos = canvas.height / 4;
        for (let i = 0; i < this.height; i++)
        {
            for (let j = 0; j < i + 1; j++)
            {
                let brick1 = {x: starting_x1_pos - (i * this.brick_length / 2) + (j * (this.brick_length + this.spacing)),
                             y: starting_y_pos + (i * (this.brick_height + this.spacing)),
                             alive: true};

                let brick2 = {x: starting_x2_pos - (i * this.brick_length / 2) + (j * (this.brick_length + this.spacing)),
                              y: starting_y_pos + (i * (this.brick_height + this.spacing)),
                              alive: true};

                this.bricks.push(brick1);
                this.bricks.push(brick2);
                this.total_bricks += 2;
            }
        }
        this.remaining_bricks = this.total_bricks;
    }

    generate_X()
    {
        //1st pyramid, ceiling
        this.height = 7
        let starting_x_pos = (canvas.width - this.brick_length * this.height) / 2;
        for (let i = 0; i < this.height; i++)
        {
            for (let j = this.height - 1; j >= i; j--)
            {
                let brick = {x: starting_x_pos - (i * this.brick_length / 2) + (j * (this.brick_length + this.spacing)),
                             y: (i * (this.brick_height + this.spacing)),
                             alive: true};

                this.bricks.push(brick);
                this.total_bricks += 1;
            }
        }

        //2nd vertical, opposite of 1st
        starting_x_pos = (canvas.width - this.brick_length) / 2;
        let starting_y_pos = canvas.height / 3;
        for (let i = 0; i < this.height; i++)
        {
            for (let j = 0; j < i + 1; j++)
            {
                let brick = {x: starting_x_pos - (i * this.brick_length / 2) + (j * (this.brick_length + this.spacing)),
                             y: starting_y_pos + (i * (this.brick_height + this.spacing)),
                             alive: true};
                this.bricks.push(brick);
                this.total_bricks += 1;
            }
        }
        this.remaining_bricks = this.total_bricks;
    }

    //@Post no effect, this class is skipped over in the game loop
    update() {}

    /**
     * Draws the brickset on the screen
     * @Pre brickset is generated 
     * @Post updates screen with each surviving brick
     */
    draw()
    {
        let stillBricksLeft = false;
        for (let i = 0; i < this.bricks.length; i++)
        {
            let brick = this.bricks[i];
            if (brick.alive)
            {
                stillBricksLeft = true;
                ctx.beginPath();
                ctx.fillRect(brick.x, brick.y, this.brick_length, this.brick_height);
                ctx.closePath();
            }
        }
        if (!stillBricksLeft) playerHasWon = true;
    }


    /*
    * @Post returns each brick to its original position
    */
    resetBrick()
    {
        this.brick_length = canvas.width / 15;
        this.brick_height = canvas.height / 25;
        this.spacing = 1;
        this.bricks = [];
        this.rows = 0;
        this.cols = 0;
        this.height = 0;
        let prev_type = this.brickset_type
        while (this.brickset_type == prev_type) this.brickset_type = Math.floor(Math.random() * this.NUM_TYPES);
        this.generate();
    }

    /*
    * @Pre: The window has been resized, and an event listener has called this method
    * @Post: Each brick's size and position will be updated to correspond with the new window size
    */
   resize()
   {
       this.brickset_resizer.resize();
   }
}
