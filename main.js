const boardBorder = 'black';
const boardBg = "white";
const snakeCol = 'lightblue';
const snakeBorder = 'darkblue';

let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200}
]

let score = 0;
let changingDirection = false;
let food_x;
let food_y;
let dx = 10;
let dy = 0;

const snakeBoard = document.getElementById("snakeBoard");
const snakeBoardCtx = snakeBoard.getContext("2d");

main();

genFood();

document.addEventListener('keydown', changeDirection)

function main(){

  if(hasGameEnded()) return;

  changingDirection = false;

  setTimeout(function onTick(){
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    main()
  }, 100)

}

function clearCanvas(){
  snakeBoardCtx.fillStyle = boardBg;
  snakeBoardCtx.strokeStyle = boardBorder;
  snakeBoardCtx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
  snakeBoardCtx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
}

function drawSnake(){
  snake.forEach(snakePart => {
    snakeBoardCtx.fillStyle = snakeCol;
    snakeBoardCtx.strokeStyle = snakeBorder;
    snakeBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
    snakeBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  });
}

function moveSnake(){
  const head = {x: snake[0].x + dx, y: snake[0].y +dy};
  snake.unshift(head)
  if(snake[0].x === food_x && snake[0].y === food_y){
    score += 10;
    document.getElementById('score').innerHTML = score;
    genFood()
  }else{
    snake.pop()
  }
}

function changeDirection(event){

  if(changingDirection) return;
  changingDirection = true;

  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  const key = event.code;


  if(key === 'ArrowLeft' && !goingRight){
    dx = -10;
    dy = 0;
  }

  if(key === 'ArrowRight' && !goingLeft){
    dx = 10;
    dy = 0;
  }

  if(key === 'ArrowUp' && !goingDown){
    dy = -10;
    dx = 0;
  }

  if(key === 'ArrowDown' && !goingUp){
    dy = 10;
    dx = 0;
  }
}

function hasGameEnded() {
  
  for(let i = 4; i < snake.length; i++){
    const hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;

    if(hasCollided){
      return true;
    }
  }

  const leftWall = snake[0].x < 0;
  const rightWall = snake[0].x > snakeBoard.width - 10;
  const topWall = snake[0].y < 0;
  const bottomWall = snake[0].y > snakeBoard.height - 10;
  return leftWall || rightWall || topWall || bottomWall;
}

function randomCoord(min, max){
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function genFood(){
  food_x = randomCoord(0, snakeBoard.width - 10);
  food_y = randomCoord(0, snakeBoard.height - 10);

  if(snake[0].x == food_x && snake[0].y == food_y){
    genFood();
  }
}

function drawFood(){
  snakeBoardCtx.fillStyle = 'red';
  snakeBoardCtx.strokeStyle = 'darkred';
  snakeBoardCtx.fillRect(food_x, food_y, 10, 10);
  snakeBoardCtx.strokeRect(food_x, food_y, 10, 10);
}