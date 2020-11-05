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
            console.log("Player has ", playerStatus.currentLives, "lives, player is correctly initialized.\n")
        }
        else
        {
            console.log("Player has not been initialized correctly!\n");
        }
    }
    test2()
    {
        console.log("Test2: Is score initialized properly? Player should start with 0 score.")
        if(playerStatus.currentScore == 0)
        {
            console.log("Player has ", playerStatus.currentScore, "lives, player score is correctly initialized.\n")
        }
        else
        {
            console.log("Player score is not correctly initialized!\n");
        }
    }
    test3()
    {
        
    }
    runTests()
    {
        this.test1();
        this.test2();
        this.test3();
    }


}