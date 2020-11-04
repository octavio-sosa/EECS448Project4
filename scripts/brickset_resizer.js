class Brickset_Resizer
{
    constructor(brickset) 
    {
        this.brickset = brickset;
        this.starting_x_pos = 0;
        this.starting_y_pos = 0;
        this.row_length = 0;
    }

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
        }
    }

    resize_standard()
    {
        this.row_length = (this.brickset.cols * this.brickset.brick_length) + ((this.brickset.cols - 1) * this.brickset.spacing);
        this.starting_x_pos = (canvas.width - this.row_length) / 2;
        this.starting_y_pos = canvas.height / 8;
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
    resize_zigzag()
    {
        let starting_x1_pos = (canvas.width - this.brickset.brick_length * this.brickset.height) / 2;
        let starting_x2_pos = 1;//(canvas.width - this.brick_length * this.height) 0;
        let starting_x3_pos = (canvas.width - this.brickset.brick_length * this.brickset.height) - 1;
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
}