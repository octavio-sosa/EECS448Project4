class StartScreenBall
{
    /**
     * @Pre a StartScreenBall has been instantiated
     * @Post gives the ball the appropriate properties based on the canvas size
     */
    constructor()
    {
        this.x = (Math.random() * canvas.width / 2) + canvas.width / 4;
        this.y = (Math.random() * canvas.height / 2) + canvas.height / 4;
        this.dx = canvas.width / 300;
        this.dy = canvas.height / 300;
        this.radius = canvas.height / 40;
    }

    /**
     * @Pre the game has not yet started (the PLAY button has not been pressed)
     * @Post moved the ball around the canvas
     */
    update()
    {
        if (this.x + this.radius + this.dx >= canvas.width || this.x - this.radius<= 0) this.dx *= -1;
        this.x += this.dx;

        if (this.y + this.radius + this.dy >= canvas.height || this.y - this.radius<= 0) this.dy *= -1;
        this.y += this.dy;

        this.draw();
    }

    /**
     * @Pre the game has not yet started (the PLAY button has not been pressed)
     * @Post draws the ball at its position
     */
    draw()
    {
        ctx.beginPath();
        ctx.fillStyle = "#FA8072";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
}
let startBall = new StartScreenBall;

/**
 * @Pre the game has not yet started (the PLAY button has not been pressed)
 * @Post draws polygons attached to the ball
 */
function drawStartScreen()
{

    ctx.fillStyle = "#00BFFF";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width / 5, 0);
    //ctx.lineTo(canvas.width * (3/5), canvas.height * (3/4));
    ctx.lineTo(startBall.x, startBall.y);
    ctx.lineTo(0, canvas.height / 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#DAA520";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 5, 0);
    //ctx.lineTo(canvas.width * (3/5), canvas.height * (3/4));
    ctx.lineTo(startBall.x, startBall.y);
    ctx.lineTo(canvas.width * (2/5), 0);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#90EE90";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    //ctx.lineTo(canvas.width * (3/5), canvas.height * (3/4));
    ctx.lineTo(startBall.x, startBall.y);
    ctx.lineTo(canvas.width * (2/5), canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();

    
    ctx.fillStyle = "#CD5C5C";
    ctx.beginPath();
    ctx.moveTo(canvas.width * (2/5), 0)
    //ctx.lineTo(canvas.width * (3/5), canvas.height * (3/4));
    ctx.lineTo(startBall.x, startBall.y);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.lineTo(canvas.width, 0);
    ctx.fill();

}

drawStartScreen();