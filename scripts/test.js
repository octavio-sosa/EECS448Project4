class testSuite {
    /**
     * 
     * @constructor
     * @pre 
     * @post 
     * @param {} : 
     * @param {} : 
     */
    constructor()
    {}

    test1()
    {
        console.log("Test1: Is Player initialized correctly? Player should have 3 lives.")
        if(playerStatus.currentLives != 0)
        {
            console.log("Passed: Player has ", playerStatus.currentLives, "lives, player is correctly initialized.\n")
        }
        else
        {
            console.log("FAIL: Player has not been initialized correctly!\n");
        }
    }
    test2()
    {
        console.log("Test2: Is score initialized properly? Player should start with 0 score.")
        if(playerStatus.currentScore == 0)
        {
            console.log("Passed: Player has ", playerStatus.currentScore, "lives, player score is correctly initialized.\n")
        }
        else
        {
            console.log("FAIL: Player score is not correctly initialized!\n");
        }
    }
    test3()
    {
        console.log("Test3: Is paddle initialized properly? Paddle.width should = PADDLE_WIDTH * this.width_size, and paddle.height should = PADDLE_HEIGHT")
        if(paddle.width != PADDLE_WIDTH * paddle.width_size && paddle.height != PADDLE_WIDTH)
        {
            console.log("FAIL: Paddle width = ", paddle.width, ", paddle height = ", paddle.height, ".\n")
        }
        else
        {
            console.log("Passed: Paddle has been correctly initialized.\n");
        }
    }
    test4()
    {
        console.log("Test4: Is ball initialized correctly? Ball radius should be ball.radius_multiplier * canvas.height/40\nBall start_x should be canvas.width/2, Ball start_y should be canvas.height - PADDLE_HEIGHT - ball.radius -1");
        if((ballContainer.balls[0].radius != (ballContainer.balls[0].radius_multiplier * canvas.height)/40)    || 
        ballContainer.balls[0].start_x != (canvas.width/2)                                                     ||
        ballContainer.balls[0].start_y != (canvas.height - PADDLE_HEIGHT - ballContainer.balls[0].radius - 1))
        {
            console.log("FAIL: Ball did not initialize correclty\n");
        }
        else
        {
            console.log("Passed: Ball has been initialized correctly\n");
        }
        
    }
    runTests()
    {
        this.test1();
        this.test2();
        this.test3();
        this.test4();
        this.test5();
        this.test6();
        this.test7();
        this.test8();
    }


}