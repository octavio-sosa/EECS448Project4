class test {
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

    runTests()
    {
        this.test1();
    }
    test1(){
        console.log("Test1: Is Player initialized correctly?")
        if(playerStatus.currentLives != 0)
        {
            console.log("\nPlayer has ", playerStatus.currentLives)
        }
    }

}