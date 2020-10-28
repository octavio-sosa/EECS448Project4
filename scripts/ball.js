class Ball
{
    /**
     * Class that initializes the ball object 
     * @Post initializes ball object
     * @constructor
     */
    constructor()
    {
        this.radius = canvas.height / 40; // radius of ball dependent on screen size
        this.start_x = canvas.width / 2; // initial position is middle of the screen
        this.start_y = canvas.height - PADDLE_HEIGHT - this.radius - 1; // 1 pixel above paddle to avoid collision
        this.x = this.start_x;
        this.y = this.start_y;
        this.vel = {x: 0, y: 0} // initial velocities
        simulate_ball = false
        this.unit_vector = Math.sqrt(canvas.height**2 + canvas.width **2) / 200;
        this.arrowAim = new Aim(this.start_x, this.start_y);
    }

    /**
     * Updates the ball objects position and velocity
     * @Pre assumes ball is initialized
     * @Post updates balls position, and velocity
     */
    update()
    {
        if (simulate_ball)
        {
            let velocity_scale = this.unit_vector * (1 / (Math.sqrt(this.vel.x**2 + this.vel.y**2)));
            
            this.vel.x = velocity_scale * this.vel.x;
            this.vel.y = velocity_scale * this.vel.y

            this.x += this.vel.x; //increment x position based on velocity
            this.y += this.vel.y; //increment y position based on velocity
            if(numCurrentBricks <= totalBricks/2)
            {
                this.unit_vector = canvas.height / 70;
            }
        }
        else
        {
            this.lock_to_paddle();
        }
    }

    /**
     * Locks the ball to the paddle on bottom of screen, assuming they are initialized
     * @Pre assumes paddle and ball are initialized
     * @Post puts ball on the paddle to start game for initial aim and launch
     */
    lock_to_paddle()
    {
        this.y = canvas.height - PADDLE_HEIGHT - this.radius - 1; 
        this.x = Math.min(Math.max(mouse.x, PADDLE_WIDTH / 2), canvas.width - PADDLE_WIDTH / 2);
        this.arrowAim.update(this.x, this.y)
        this.vel = this.arrowAim.launchVector
        this.vel.y *= -1;
    }

    /**
     * Draws the ball on the screen based on location
     * @Pre ball is initialized
     * @Post draws the ball on the screen based on location
     */
    draw()
    {
        ctx.beginPath(); // begin drawing new shape
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2); // create an arc at (this.x, this.y) going from 0 degrees to 2pi degrees (full circle)
        ctx.fill(); // fill in the circle
        ctx.closePath(); // end drawing

        if(!simulate_ball) {
          this.arrowAim.draw()
        }
    }

    /*
    * @Pre: assumes ball is initialized and simulated
    * @Post: checks for collisions against the paddle and the bricks
    * @Param: paddle: Object the user controls that the ball bounces off of. 
    *         brickset: set of bricks that the ball will bounce off of.
    */
    detect_collisions(paddle, brickset)
    {
        if (simulate_ball)
        {
            let y = this.y;
            let x = this.x;
    
            //ceiling collision
            if (y - this.radius <= 0) this.vel.y *= -1;
    
            //wall collision
            if (x + this.radius >= canvas.width || x - this.radius <= 0) this.vel.x *= -1;
    
            let x_collide_distance = brickset.brick_length / 2 + this.radius;
            let y_collide_distance = brickset.brick_height / 2 + this.radius;
    
            for (let i = 0; i < brickset.bricks.length; i++)
            {
                let brick = brickset.bricks[i];
                if (brick.alive)
                {
                    let b_cx = brick.x + (brickset.brick_length / 2); // center of brick's x position
                    let b_cy = brick.y + (brickset.brick_height / 2); // center of y position
        
                    let x_vector = Math.abs(b_cx - x); // distance from center of brick's x to ball
                    let y_vector = Math.abs(b_cy - y);
        
                    if (x_vector <= x_collide_distance && y_vector <= y_collide_distance) // if both vectors are less than or equal to the max distance of a collision, there must be a collision
                    {
                        let prev_x = Math.abs(b_cx - (x - this.vel.x));
                        let prev_y = Math.abs(b_cy - (y - this.vel.y));
                        if (prev_x > x_collide_distance) this.vel.x *= -1;
                        if (prev_y > y_collide_distance) this.vel.y *= -1;
                        brickset.bricks[i].alive = false;
                        gameObjects[OBJ_KEYS.PLAYERSTATUS].currentScore++
                    }
                }
            }
    
            //paddle collision
            if (this.y >= canvas.height - paddle.height - this.radius && this.y < canvas.height - paddle.height * 0.85)
            {
                if (this.x + (this.radius / 2) >= paddle.x && this.x <= paddle.x + paddle.width)
                {
                    console.log("hit paddle");
                    this.y = canvas.height - paddle.height - this.radius;
                    this.vel.y *= -1;
                    let mid_paddle = paddle.width / 2;
                    this.vel.x = (3/4 * this.unit_vector) * ((this.x - (paddle.x + mid_paddle)) / mid_paddle);
                }
            }
            //lose life
            if (this.y - 2 * this.radius > canvas.height)
            {
                gameObjects[OBJ_KEYS.PLAYERSTATUS].currentLives--
                if (gameObjects[OBJ_KEYS.PLAYERSTATUS].currentLives > 0) this.resetBall();
            }
        }
    }


    /*
    * @Pre: assumes ball is initialized
    * @Post: resets ball to initial velocity
    */
    resetBall() {
      simulate_ball = false
      this.vel = {x: 0, y: 0}
    }

    /*
    * @Pre: The window has been resized, and an event listener has called this method
    * @Post: The ball's size will be updated to correspond with the new window size
    */
    resize()
    {
        this.radius = canvas.height / 40; // radius of ball dependent on screen size
        this.unit_vector = Math.sqrt(canvas.height**2 + canvas.width **2) / 200;
    }
}

