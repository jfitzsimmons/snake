const cvs =document.getElementById('snake');
const ctx = cvs.getContext('2d');
const box = 32;

//Load images
//add images | should audio be audio file?
const groundImg = new Image();
groundImg.src = "img/ground.png";
const foodImg = new Image();
foodImg.src = "img/food.png";

//load audio
const deadAud = new Audio();
const eatAud = new Audio();
const controlAud = new Audio();

deadAud.src = 'audio/dead.mp3';
eatAud.src = 'audio/eat.mp3';
controlAud.src = 'audio/control.mp3';

//creat snake
let snake = [];
snake[0] = {x: 9*box, y:10*box};

//create food
let food = {
  x: Math.floor(Math.random()*17+1)*box,
  y: Math.floor(Math.random()*15+3)*box };

//create score
let score = 0;

//controls
let d;
document.addEventListener('keydown',direction);

function direction(event){
  if(event.keyCode==37 && d!='RIGHT'){
    controlAud.play();
    d = 'LEFT';}
  else if(event.keyCode==38 && d!='DOWN'){
    controlAud.play();
    d = 'UP';}
  else if(event.keyCode==39 && d!='LEFT'){
    controlAud.play();
    d = 'RIGHT';}
  else if(event.keyCode==40 && d!='UP'){
    controlAud.play();
    d = 'DOWN';}
}


function collision(head,array){
  for (let i=0; i<array.length;i++){
    if(head.x == array[i].x && head.y == array[i].y){
      return true;
    }
  }
  return false;
}
//check for border collisions too


//draw to canvas
function draw(){

  ctx.drawImage(groundImg,0,0);

  for( let i = 0; i < snake.length ; i++){
      ctx.fillStyle = ( i == 0 )? "green" : "white";
      ctx.fillRect(snake[i].x,snake[i].y,box,box);

      ctx.strokeStyle = "red";
      ctx.strokeRect(snake[i].x,snake[i].y,box,box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  //find new snake head direction???
  if (d="lEFT") snakeX-=box;
  if (d="UP") snakeY-=box;
  if (d="RIGHT") snakeX+=box;
  if (d="DOWN") snakeY+=box;

  //eats food
  if (snakeX == food.x && snakeY == food.y){
    score++;
    eatAud.play();
    food={
      x:unit*Math.floor(Math.random()*17+1),
      y:unit*Math.floor(Math.random()*15+3)}
  }else{snake.pop();}

  let newHead = {
    x:snakeX,
    y:snakeY
  }

  //game over
  if(snakeX<box || snakeX>17*box || snakeY<3*box || snakeY>17*box || collison(newHead,snake)){
    clearInterval(game);
    deadAud.play();
  }

  snake.unshift(newHead);

  ctx.fillStyle='white';
  ctx.font='45px Changa One'
  ctx.fillText(score,2*box,1.6*box);
}

let game = setInterval(draw,100);
