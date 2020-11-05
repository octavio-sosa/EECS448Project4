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
        console.log("Test1: Is Player initialized correctly?")
        if(playerStatus.currentLives != 0)
        {
            console.log("\nPlayer has ", playerStatus.currentLives, "lives, player is correctly initialized.\n")
        }
        else
        {
            console.log("\nPlayer has not been initialized correctly!\n");
        }
    }
    test2()
    {
        console.log("Test2: ")
    }
    runTests()
    {
        this.test1();
        this.test2();
    }


}