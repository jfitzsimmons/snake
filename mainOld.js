const cvs =document.getElemetnById('canvas');

const ctx = cvs.getContext('2d');
//Load images
//add images | should audio be audio file?
let imageName = new Image();
imageName.src = 'path/img.png';
let audioName = new Audio();
audioName.src = 'path/audio.png'; audioName.play();

//draw images
ctx.drawImage(imageName, 40,50,25,25);

//Draw rectangle
ctx.fillStyle = 'red';
ctx.fillRect (100,300,30,30);

//unit box
let box = 32

ctx.fillStyle = 'black';
ctx.fillRect(5*box,6*box,2*box,3*box);

//snake ground food score
let snake = [];
snake[0] = {x: 9*box, y:10*box};
snake[1] = {x: 8*box, y:10*box};
let food = {
  x: Math.floor(Math.random()*17+1)*box
  y: Math.floor(Math.random()*15+3)*box };
let score = 0;

function draw(){
  ctx.drawImage(ground,0,0);
  for(let i=0; i<snake.length;i++){
    ctx.fillStyle = (i==0)?'green' : 'white';
    ctx.fillRect(snake[i].x,snake[i].y,box,box);
  }
  ctx.drawImage(foodImg,food.x,food.y);
  ctx.fillStyle='white';
  ctx.font='45px Changa One'
  ctx.fillText(score,2*box,1.6*box);
}

let game = setInterval(draw,100);

//controls
let d;
document.addEventListener('keydown',direction);

function direction(event){
  if(event.keyCode==37 && d!='RIGHT'){
    d = 'LEFT';}
  else if(event.keyCode==38 && d!='DOWN'){
    d = 'UP';}
  else if(event.keyCode==39 && d!='LEFT'){
    d = 'RIGHT';}
  else if(event.keyCode==40 && d!='UP'){
    d = 'DOWN';}
}

//snake movement
snake.pop();
snakeX = snake[0].x;
snakeY = snake[0].y;

//find new snake head direction???
//sankeX+=box;
//sankeX-=box;
//sankeY+=box;
//sankeY-=box;

let newHead = {
  x:snakeX,
  y:snakeY
}
snake.unshift(newHead);

//eats food
if (snakeX == food.x && snakeY == fod.y){
  score++;
  food={
    x:unit*Math.floor(Math.random()*17+1),
    y:unit*Math.floor(Math.random()*15+3)
  }
  //add newHead without snake.pop()
}

//game over
function collision(){
  for (let i=0; i<snake.length;i++){
    if(newHead.x == snake[i].x && newHead.y == snake[i].y){
      return true;
    }
  }
  return false;
}
//check for border collisions too
//snakeX<box || snakeY<3*box etc...
