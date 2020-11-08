class Brickset_Resizer
{
    /**
     * @Pre a brickset has instantied a brickset_resizer
     * @Post brickset_resizer will be ready for resizing
     * @param {brickset}: the brickset this resizer is responsible for
     */
    constructor(brickset) 
    {
        this.brickset = brickset;
        this.starting_x_pos = 0;
        this.starting_y_pos = 0;
        this.row_length = 0;
    }

    /**
     * @Pre the window has been resized
     * @Post decides which type of brickset needs to be resized and calls the appropriate method
     */
    resize()
    {
        this.brickset.brick_length = canvas.width / 15 - 1;
        this.brickset.brick_height = canvas.height / 25;
        if (this.brickset.spacing > 1) this.brickset.spacing = this.brickset.brick_length / 4;

        switch(this.brickset.brickset_type)
        {
            case 0:
                this.resize_standard();
                break;
            case 1:
                this.resize_pyramid();
                break;
            case 2:
                this.resize_wall();
                break;
            case 3:
                this.resize_spaced_wall();
                break;
            case 4:
                this.resize_3_column();
                break;
            case 5:
                this.resize_alternating();
                break;
            case 6:
                this.resize_zigzag();
                break;
            case 7:
                this.resize_crisscross();
                break;
        }
    }

    /**
     * @Pre the brickset to resize is 'standard'
     * @Post updates the position of each brick
     */
    resize_standard()
    {
        this.row_length = (this.brickset.cols * this.brickset.brick_length) + ((this.brickset.cols - 1) * this.brickset.spacing);
        this.starting_x_pos = (canvas.width - this.row_length) / 2;
        this.starting_y_pos = canvas.height / 8;
        if (this.brickset.spacing > 1) this.starting_y_pos /= 2;
        let k = 0;

        for (let i = 0; i < this.brickset.rows; i++)
        {
            for (let j = 0; j < this.brickset.cols; j++)
            {
                let brick = this.brickset.bricks[k];
                if (brick.alive)
                {
                    brick.x = this.starting_x_pos + (j * (this.brickset.brick_length + this.brickset.spacing));
                    brick.y = this.starting_y_pos + (i * (this.brickset.brick_height + this.brickset.spacing))
                }
                k++;
            }
        }
    }

    /**
     * @Pre the brickset to resize is 'pyramid'
     * @Post updates the position of each brick
     */
    resize_pyramid()
    {
        this.starting_x_pos = (canvas.width - this.brickset.brick_length) / 2;
        this.starting_y_pos = canvas.height / 20;
        let k = 0;

        for (let i = 0; i < this.brickset.height; i++)
        {
            for (let j = 0; j < i + 1; j++)
            {
                let brick = this.brickset.bricks[k];
                if (brick.alive)
                {
                    brick.x = this.starting_x_pos - (i * this.brickset.brick_length / 2) + (j * (this.brickset.brick_length + this.brickset.spacing));
                    brick.y = this.starting_y_pos + (i * (this.brickset.brick_height + this.brickset.spacing));
                }
                k++;
            }
        }
    }

    /**
     * @Pre the brickset to resize is 'wall'
     * @Post updates the position of each brick
     */
    resize_wall()
    {
        this.starting_y_pos = canvas.height / 8;
        let k = 0;
        for (let i = 0; i < this.brickset.rows; i++)
        {
            for (let j = 0; j < this.brickset.cols; j++)
            {
                let brick = this.brickset.bricks[k];
                if (brick.alive)
                {
                    brick.x = j * (this.brickset.brick_length + this.brickset.spacing);
                    brick.y = this.starting_y_pos + (i * (this.brickset.brick_height + this.brickset.spacing));
                }
                k++;
            }
        }
    }

    /**
     * @Pre the brickset to resize is 'spaced-wall'
     * @Post updates the position of each brick
     */
    resize_spaced_wall()
    {
        let k = 0;
        let y_spacing = this.brickset.brick_height * 2.5;
        this.starting_y_pos = canvas.height / 12;
        for (let i = 0; i < this.brickset.rows; i++)
        {
            for (let j = 0; j < this.brickset.cols; j++)
            {
                let brick = this.brickset.bricks[k];
                if (brick.alive)
                {
                    brick.x = j * (this.brickset.brick_length + this.brickset.spacing);
                    brick.y = this.starting_y_pos + (i * (this.brickset.brick_height + y_spacing));
                }
                k++;
            }
        }
    }

    /**
     * @Pre the brickset to resize is '3-column'
     * @Post updates the position of each brick
     */
    resize_3_column()
    {
        this.row_length = (this.brickset.cols * this.brickset.brick_length) + ((this.brickset.cols - 1) * this.brickset.spacing);
        let starting_x1_pos = (canvas.width - this.row_length) / 2;
        let starting_x2_pos = (canvas.width - this.row_length) / 8;
        let starting_x3_pos = (canvas.width - this.row_length) * (7/8);
        this.starting_y_pos = canvas.height / 8;
        let k = 0;

        for (let i = 0; i < this.brickset.rows; i++)
        {
            for (let j = 0; j < this.brickset.cols; j++)
            {
                let brick1 = this.brickset.bricks[k];
                let brick2 = this.brickset.bricks[k + 1];
                let brick3 = this.brickset.bricks[k + 2];

                if (brick1.alive)
                {
                    brick1.x = starting_x1_pos + (j * (this.brickset.brick_length + this.brickset.spacing));
                    brick1.y = this.starting_y_pos + (i * (this.brickset.brick_height + this.brickset.spacing));
                }
                if (brick2.alive)
                {
                    brick2.x = starting_x2_pos + (j * (this.brickset.brick_length + this.brickset.spacing));
                    brick2.y = this.starting_y_pos + (i * (this.brickset.brick_height + this.brickset.spacing));
                }
                if (brick3.alive)
                {
                    brick3.x = starting_x3_pos + (j * (this.brickset.brick_length + this.brickset.spacing));
                    brick3.y = this.starting_y_pos + (i * (this.brickset.brick_height + this.brickset.spacing));
                }
                k += 3;
            }
        }
    }

    /**
     * @Pre the brickset to resize is 'alternating'
     * @Post updates the position of each brick
     */
    resize_alternating()
    {
        this.starting_y_pos = canvas.height / 8;
        let k = 0;
        for (let i = 0; i < this.brickset.rows; i++)
        {
            for (let j = 0; j < this.brickset.cols; j++)
            {
                if ((i + j) % 2 == 0)
                {
                    let brick = this.brickset.bricks[k];
                    if (brick.alive)
                    {
                        brick.x = j * (this.brickset.brick_length + this.brickset.spacing);
                        brick.y = this.starting_y_pos + (i * (this.brickset.brick_height + this.brickset.spacing));
                    }
                    k++;
                }
            }
        }
    }

    /**
     * @Pre the brickset to resize is 'zig-zag'
     * @Post updates the position of each brick
     */
    resize_zigzag()
    {
        let starting_x1_pos = (canvas.width - this.brickset.brick_length * this.brickset.height) / 2;
        let starting_x2_pos = 2;//(canvas.width - this.brick_length * this.height) 0;
        let starting_x3_pos = (canvas.width - this.brickset.brick_length * this.brickset.height) - 2;
        //top 3 pyramids

        let k = 0;
        for (let i = 0; i < this.brickset.height; i++)
        {
            for (let j = this.brickset.height - 1; j >= i; j--)
            {
                let brick1 = this.brickset.bricks[k]
                let brick2 = this.brickset.bricks[k + 1];
                let brick3 = this.brickset.bricks[k + 2];
                if (brick1.alive)
                {
                    brick1.x = starting_x1_pos - (i * this.brickset.brick_length / 2) + (j * (this.brickset.brick_length + this.brickset.spacing)); 
                    brick1.y = i * (this.brickset.brick_height + this.brickset.spacing);
                }

                if (brick2.alive)
                {
                    brick2.x = starting_x2_pos - (i * this.brickset.brick_length / 2) + (j * (this.brickset.brick_length + this.brickset.spacing)); 
                    brick2.y = i * (this.brickset.brick_height + this.brickset.spacing);
                }

                if (brick3.alive)
                {
                    brick3.x = starting_x3_pos - (i * this.brickset.brick_length / 2) + (j * (this.brickset.brick_length + this.brickset.spacing)); 
                    brick3.y = i * (this.brickset.brick_height + this.brickset.spacing); 
                }
                k += 3;
            }
        }

        starting_x1_pos = canvas.width / 3 - (this.brickset.brick_length / 2);
        starting_x2_pos = canvas.width * (2/3)- (this.brickset.brick_length / 2);
        let starting_y_pos = canvas.height / 4;
        for (let i = 0; i < this.brickset.height; i++)
        {
            for (let j = 0; j < i + 1; j++)
            {
                let brick1 = this.brickset.bricks[k];
                let brick2 = this.brickset.bricks[k + 1];

                if (brick1.alive)
                {
                    brick1.x = starting_x1_pos - (i * this.brickset.brick_length / 2) + (j * (this.brickset.brick_length + this.brickset.spacing));
                    brick1.y = starting_y_pos + (i * (this.brickset.brick_height + this.brickset.spacing));
                } 

                if (brick2.alive)
                {
                    brick2.x = starting_x2_pos - (i * this.brickset.brick_length / 2) + (j * (this.brickset.brick_length + this.brickset.spacing));
                    brick2.y = starting_y_pos + (i * (this.brickset.brick_height + this.brickset.spacing));
                } 
                k+=2;
            }
        }
    }

    /**
     * @Pre the brickset to resize is 'criss-cross'
     * @Post updates the position of each brick
     */
    resize_crisscross()
    {
        let cols = this.brickset.cols;
        let rows = this.brickset.rows;
        let bh = this.brickset.brick_height;
        let bl = this.brickset.brick_length;
        let s = this.brickset.spacing;
        let k = 0;

        for (let i = 0; i < cols; i++)
        {
            for (let j = 0; j < rows; j++)
            {
                let brick = this.brickset.bricks[k]
                if (brick.alive)
                {
                    brick.x = (1 + (3 * i)) * (bl + s);
                    brick.y = j * (bh + s);
                }
                k++;
            }
        }
        for (let i = 0; i < 15; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                if ((i - 1) % 3 != 0)
                {
                    let brick = this.brickset.bricks[k];
                    if (brick.alive)
                    {
                        brick.x = i * (bl + s);
                        brick.y = (3 + (4 * j)) * (bh + s);   
                    }
                    k++;
                }
            }
        }
    }
}