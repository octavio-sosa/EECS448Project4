class Ball
{
    /**
     * Class that initializes the ball object
     * @Post initializes ball object
     * @constructor
     */
    constructor(isOriginal)
    {
        this.radius_multiplier = 1;
        this.radius = this.radius_multiplier * canvas.height / 40; // radius of ball dependent on screen size
        this.start_x = canvas.width / 2; // initial position is middle of the screen
        this.start_y = canvas.height - PADDLE_HEIGHT - this.radius - 1; // 1 pixel above paddle to avoid collision
        this.x = this.start_x;
        this.y = this.start_y;
        this.vel = {x: 0, y: 0} // initial velocities
        this.speed_multiplier = {x: 1, y: 1} // initial +/- speed
        this.numofBall = 1;
        if (isOriginal) simulate_ball = false
        this.unit_vector = (Math.sqrt(canvas.height**2 + canvas.width **2) / 200) * (Math.log10(level) + 1);
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

            this.vel.x = velocity_scale * this.vel.x * this.speed_multiplier.x
            this.vel.y = velocity_scale * this.vel.y * this.speed_multiplier.y

            this.x += this.vel.x; //increment x position based on velocity
            this.y += this.vel.y; //increment y position based on velocity
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
        if(handTrackEnabled){
          let paddle_x = gameObjects[OBJ_KEYS.PADDLE].x + PADDLE_WIDTH/2  
          this.x = Math.min(Math.max(paddle_x, PADDLE_WIDTH / 2), canvas.width - PADDLE_WIDTH / 2)
        } else {
          this.x = Math.min(Math.max(mouse.x, PADDLE_WIDTH / 2), canvas.width - PADDLE_WIDTH / 2);
        }
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

    /**
     * @Pre assumes ball is initialized and simulated
     * @Post checks for collisions against the paddle and the bricks
     * @param {paddle}: Object the user controls that the ball bounces off of.
     * @param {brickset}: set of bricks that the ball will bounce off of.
     */
    detect_collisions(paddle, brickset)
    {
        let brickIsHit = false;
        if (simulate_ball)
        {
            let y = this.y;
            let x = this.x;

            //ceiling collision
            if (y - this.radius <= 0) 
            {
                this.vel.y *= -1;
                this.y = this.radius;
            }

            //wall collision
            if (x + this.radius > canvas.width)
            {
                this.vel.x *= -1;
                this.x = canvas.width - this.radius;
            }
            else if (x - this.radius <= 0)
            {
                this.vel.x *= -1;
                this.x = 0 + this.radius;
            }

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
                        brickIsHit = !brickset.bricks[i].alive;
                        console.log(brickIsHit);
                        brickset.remaining_bricks -= 1;
                        gameObjects[OBJ_KEYS.PLAYERSTATUS].currentScore++;
                    }
                }
            }

            //paddle collision
            if (this.y >= canvas.height - paddle.height - this.radius && this.y < canvas.height - paddle.height * 0.85)
            {
                if (this.x + (this.radius / 2) >= paddle.x && this.x <= paddle.x + paddle.width)
                {
                    this.y = canvas.height - paddle.height - this.radius;
                    this.vel.y *= -1;
                    let mid_paddle = paddle.width / 2;
                    this.vel.x = (3/4 * this.unit_vector) * ((this.x - (paddle.x + mid_paddle)) / mid_paddle);
                }
            }
        }
        return brickIsHit;
    }

    /**
     * @Pre assumes ball is initialized
     * @Post Returns a boolean indicating if the ball has dropped below the game area
     */
    checkLost()
    {
        //lose life
        if (this.y - 2 * this.radius > canvas.height)
        {
            return true;
        }
    }

    /**
     * @Pre The window has been resized
     * @Post updates the size and speed of the ball for the new window size
     */
    resize()
    {
        this.radius = this.radius_multiplier * canvas.height / 40; // radius of ball dependent on screen size
        this.unit_vector = (Math.sqrt(canvas.height**2 + canvas.width **2) / 200) * (Math.log10(level) + 1)
    }
}

class BallContainer
{

    /**
     * @Pre BallContainer has been initialized
     * @Post Creates instance of Ball container, initially empty
     */
    constructor()
    {
        this.balls = [];
        this.hitBricks = false;
    }

    /**
     * @Pre a new ball has been instantiated and pushed to the BallContainer
     * @Post The new ball will now be in the BallContainer
     * @param {ball}: the ball to be pushed to the BallContainer array
     */
    push(ball)
    {
        this.balls.push(ball);
    }

    /**
     * @Pre The main game loop is executing
     * @Post updates the position and velocity of each ball in the container
     */
    update()
    {
        for (let i = 0; i < this.balls.length; i++)
        {
            this.balls[i].update();
        }
    }

    /**
     * @Pre The main game loop is executing
     * @Post draws each ball on the canvas
     */
    draw()
    {
        for (let i = 0; i < this.balls.length; i++)
        {
            this.balls[i].draw();
        }
    }

    /**
     * @Pre The main game loop is executing
     * @Post if a ball has collided with an object, it will bounce off
     * @param {paddle}: the paddle controlled by the user
     * @param {bricket}: the collection of bricks
     */
    detect_collisions(paddle, brickset)
    {
        for (let i = 0; i < this.balls.length; i++)
        {
             let hit = this.balls[i].detect_collisions(paddle, brickset);
             if (hit) this.hitBricks = true;
             let ballLost = this.balls[i].checkLost();
             if (ballLost)
             {
                 this.remove(i);
                 if (this.isEmpty())
                 {
                    gameObjects[OBJ_KEYS.PLAYERSTATUS].currentLives--
                    if (gameObjects[OBJ_KEYS.PLAYERSTATUS].currentLives > 0)
                    {
                        this.resetBalls();
                        gameObjects[OBJ_KEYS.PADDLE].resetPaddle();
                        gameObjects[OBJ_KEYS.POWERS].resetPowers(Math.floor((Math.random() * 8) + 1));
                    }
                 }
             }
        }
    }

    /**
     * @Pre The main game loop is executing and a ball has exited the game area
     * @Post returns a boolean indicating whether there are no balls left, in which case the player will lose a life
     */
    isEmpty()
    {
        return (this.balls.length == 0);
    }

    /**
     * @Pre a ball has exited the game area
     * @Post removes the ball that has exited from the ball container, deleting it
     * @param {index}: the location in the BallContainer of the ball that has fallen
     */
    remove(index)
    {
        this.balls.splice(index, 1);
    }

    /**
     * @Pre The game has been reset
     * @Post clears the container and initializes a new ball
     */
    resetBalls()
    {
        simulate_ball = false;
        this.balls = [];
        this.push(new Ball(true));
    }

    /**
     * @Pre The player has caught a x2 power
     * @Post doubles the number of balls
     */
    x2()
    {
        let len = this.balls.length;
        for (let i = 0; i < len; i++)
        {
            let original_ball = this.balls[i];
            let new_ball = new Ball(false);
            new_ball.x = original_ball.x;
            new_ball.y = original_ball.y;
            new_ball.speed_multiplier = original_ball.speed_multiplier;
            new_ball.radius_multiplier = original_ball.radius_multiplier;
            new_ball.vel.y = Math.random() * original_ball.vel.y;
            new_ball.resize();
            this.push(new_ball);
        }
    }

    /**
     * @Pre The player has caught the speed-increase power
     * @Post increases the speed by each ball by 15%
     */
    increaseSpeed() 
    {
        let speed = this.balls[0].speed_multiplier.x;
        if (speed < 1.75)
        {
            speed *= 1.15;
            for (let i = 0; i < this.balls.length; i++)
            {
                let ball = this.balls[i];
                ball.speed_multiplier.x = speed;
                ball.speed_multiplier.y = speed;
            }
        }
    }

    /**
     * @Pre The player has caught the speed-decrease power
     * @Post decreases the speed by each ball by 20%
     */
    decreaseSpeed() 
    {
        let speed = this.balls[0].speed_multiplier.x;
        if (speed > 0.5)
        {
            speed /= 1.2;
            for (let i = 0; i < this.balls.length; i++)
            {
                let ball = this.balls[i];
                ball.speed_multiplier.x = speed;
                ball.speed_multiplier.y = speed;
            }
        }
    }

    /**
     * @Pre The player has caught the size-increase power
     * @Post increases the size by each ball by 50%
     */
    increaseSize() 
    {
        let added_radius = this.balls[0].radius_multiplier;
        let max_added_radius = added_radius * 1.5;


        if (this.balls[0].radius_multiplier < 2.5)
        {
            for (let i = 0; i < this.balls.length; i++)
            {
                let ball = this.balls[i];
                function expand()
                {
                    added_radius += 0.01;
                    ball.radius_multiplier = added_radius;
                    ball.resize();
                    if (added_radius < max_added_radius) setTimeout(expand, 10);
                }
                setTimeout(expand, 10);
            }
        }
    }

    /**
     * @Pre The player has caught the size-decrease power
     * @Post decreases the size by each ball by 50%
     */
    decreaseSize() 
    {
        let subtracted_radius = this.balls[0].radius_multiplier;
        let max_subtracted_radius = subtracted_radius /= 1.5;

        if (this.balls[0].radius_multiplier > 0.3)
        {
            for (let i = 0; i < this.balls.length; i++)
            {
                let ball = this.balls[i];
                function shrink()
                {
                    subtracted_radius -= 0.01;
                    ball.radius_multiplier = subtracted_radius;
                    ball.resize();
                    if (subtracted_radius > max_subtracted_radius) setTimeout(shrink, 10);
                }
                setTimeout(shrink, 10);
            }
        }
    }

    /**
     * @Pre The window has been resized
     * @Post resizes all balls in the BallContainer
     */
    resize()
    {
        for (let i = 0; i < this.balls.length; i++)
        {
            this.balls[i].resize();
        }
    }
}
