const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const $sprite = document.querySelector('#sprites')
const $bricks = document.querySelector('#bricks')

canvas.width = 500
canvas.height = 550

// variables ball 
// position ball
const ballRadius = 5
let x = canvas.width / 2
let y = canvas.height - 30
// velocity ball
let dx = 3
let dy = -2

/* divitions */

// draw paddle 
const paddleHeight = 10
const paddleWidth = 50
// position paddle
let paddleX = (canvas.width - paddleWidth) / 2
let paddleY = canvas.height - 25


// movement paddle
let rightPressed = false
let leftPressed = false

// speed paddle
let paddleSpeed = 7

// separations 

// draw bricks 

const bricksRowCount = 6
const bricksColumnCount = 13
const brickWidth = 30
const brickHeight = 15
const brickPadding = 4
const brickOffsetTop = 80
const brickOffsetLeft = 20
const bricks = []
const BRICK_STATUS = {
    ACTIVE: 1,
    DESTROYED: 0
}

for (let c = 0; c < bricksColumnCount; c++) {
    bricks[c] = [] // create a new array empty
    for (let r = 0; r < bricksRowCount; r++) {
        // calculating the position of each brick
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop


        const ramdon = Math.floor(Math.random() * 4) + 1

        bricks[c][r] = {
            x: brickX, y: brickY, status: BRICK_STATUS.ACTIVE, color: ramdon
        }

    }
}






function drawBall() {
    // draw the path

    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.closePath()

}
function drawPaddle() {

    ctx.drawImage(
        $sprite, // image
        29,  // cut coordinate  X
        174, // cut coordinate  Y
        paddleWidth, // width image
        paddleHeight, // height image
        paddleX, // position X
        paddleY, // position Y
        paddleWidth, // draw width
        paddleHeight // draw height
    )
}


// init events 
function initEvents() {

    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)
}

// key down 
function keyDownHandler(event) {

    const { key } = event

    if (key === 'Right' || key === 'ArrowRight') {
        rightPressed = true
    } else if (key === 'Left' || key === 'ArrowLeft') {
        leftPressed = true
    }
}

// key up 

function keyUpHandler(event) {
    const { key } = event

    if (key === 'Right' || key === 'ArrowRight') {
        rightPressed = false
    } else if (key === 'Left' || key === 'ArrowLeft') {
        leftPressed = false
    }
}



function drawBricks() {
    for (let c = 0; c < bricksColumnCount; c++) {
        for (let r = 0; r < bricksRowCount; r++) {
            const currentBricks = bricks[c][r]
            if (currentBricks.status === BRICK_STATUS.DESTROYED)
                continue;
            // draw the path

            const clipX = currentBricks.color * 32


            ctx.drawImage(
                $bricks, // image
                clipX, // cut coordinate  X
                0, // cut coordinate  Y
                32, // width image
                14, // height image
                currentBricks.x, // position X
                currentBricks.y, // position Y
                brickWidth, // draw width
                brickHeight // draw height
            )
        } //
    }
}


// movement paddle
function movePaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) { // right
        paddleX += paddleSpeed
    } else if (leftPressed && paddleX > 0) { // left
        paddleX -= paddleSpeed
    }
}
function moveBall() {
    // collision ball
    if (
        x + dx > canvas.width - ballRadius ||  // wall right
        x + dx < ballRadius // wall left
    ) {
        dx = -dx

    }


    if (
        y + dy < ballRadius // wall top
    ) {
        dy = -dy

    }
    if ( // collision paddle
        x + dx > paddleX &&
        x + dx < paddleX + paddleWidth &&
        y + dy > paddleY
    ) {
        dy = -dy // change direction ball when hit the paddle
    }


    // ball touch the wall bottom
    else if (
        y + dy > canvas.height - ballRadius // geme over
    ) {
        document.location.reload()
    }
    // movement ball
    x += dx
    y += dy
}

// check the collision
function collitionsDetection() {
    for (let c = 0; c < bricksColumnCount; c++) {
        for (let r = 0; r < bricksRowCount; r++) {
            const currentBricks = bricks[c][r]
            if (currentBricks.status === BRICK_STATUS.ACTIVE) {
                if (
                    x > currentBricks.x &&
                    x < currentBricks.x + brickWidth &&
                    y > currentBricks.y &&
                    y < currentBricks.y + brickHeight
                ) {
                    dy = -dy
                    currentBricks.status = BRICK_STATUS.DESTROYED
                    let score = document.querySelector('#score-value')
                    let scoreValue = score.innerHTML++
                    ctx.fillStyle = '#ffffff'
                    ctx.font = '20px Arial'
                    ctx.fillText(scoreValue, 10, 20)
                    if (bricksRowCount * bricksColumnCount === scoreValue) {
                        document.location.reload()
                        alert('YOU WIN')
                    }

                }
            }
        }
    }
}

// call the butor to restart 
document.querySelector('#start').addEventListener('click', () => {
    document.location.reload()
});

// clear the canvas in a new frame
function clearCanvas() {
    // clear the canvas in a new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}


function draw() {

    //draw elements 
    clearCanvas()
    drawBall()
    drawPaddle()
    drawBricks()

    //colition and movement 
    collitionsDetection()
    movePaddle()
    moveBall()


    // repeat the animation in 1/60th of a secondf
    window.requestAnimationFrame(draw)
}

// call the functions
initEvents()
draw()
