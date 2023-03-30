
//board
var blockSize = 25;//kich thuoc 1 o la 25px
var rows = 20;
var columns = 30;
var board;
var context;
var snakeBody = [];
var gameOver = false;
const score = document.getElementById('score');

//draw a snake head 
// start place
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//food
var foodX;
var foodY;

//chagne way
var velocityX = 0;
var velocityY = 0;


window.onload = function() {
    board = document.getElementById('board');

    board.height = rows * blockSize;
    board.width = columns * blockSize;

    context = board.getContext('2d');//using to drawing on the board
    
    placeFood();
    document.addEventListener('keyup', changeDirection);
    setInterval(update, 1000/15);
}

function update() {    

    if(gameOver){
        return;
    }
    context.fillStyle = 'black';//doi mau cho canvas bang mau den
    context.fillRect(0,0,board.width,board.height);//to mau den cho tat ca khoi
    //draw a food
    context.fillStyle= 'red';
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        score.innerHTML = snakeBody.length;
        placeFood();
    }

    //draw snake head
    context.fillStyle = 'lime';

    // thay doi vi tri cua khoi lien sau
    for(let i = snakeBody.length - 1;i>0;i--) {
        snakeBody[i] = snakeBody[i -1];
    }

    if(snakeBody.length) {
        // đặt cho phần tử đầu tiên là head
        snakeBody[0] = [snakeX,snakeY];
    }

    //change direction
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    snakeBody.map((block) => {
        context.fillRect(block[0], block[1], blockSize, blockSize);
    });

    //game over condition
    if(snakeX < 0 || snakeX > columns * blockSize || snakeY < 0 || snakeY > rows * blockSize){
        gameOver = true;
        alert('Your score is: ' + snakeBody.length);
    }

    snakeBody.map((block) => {
        if(snakeX == block[0] && snakeY == block[1]){
            gameOver = true;
            alert('Your score is: ' + snakeBody.length);
        }
    })
}

function placeFood() {
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
    if(e.code == 'ArrowUp' && velocityY != 1){
        velocityY = -1;
        velocityX = 0;
    }
    else if(e.code == 'ArrowDown' && velocityY != -1){
        velocityY = 1;
        velocityX = 0;        
    }
    else if(e.code == 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;        
    }
}

function restart() {
    gameOver = false;
    snakeBody = [];
    score.innerHTML = 0;
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = velocityY = 0;
    placeFood();
    update();
}