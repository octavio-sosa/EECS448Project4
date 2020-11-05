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
    }
    runTests()
    {
        this.test1();
    }


}