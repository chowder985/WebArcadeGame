window.addEventListener('load', init);
window.addEventListener('keydown', move);
window.addEventListener('click', clicked);
var canvas, context;
var LeftImg = new Image();
LeftImg.src = "image/player.png";
var RightImg = new Image();
RightImg.src = "image/player2.png";
var EnemyImg = new Image();
EnemyImg.src = "image/enemy.png";
var EnemyImg2 = new Image();
EnemyImg2.src = "image/enemy2.png";
var BackImg = new Image();
BackImg.src = "image/background.png";
var gameOverImg = new Image();
gameOverImg.src = "image/gameover.png";
var LeftImgX = 35;
var RightImgX = 288;
var RightImgDx = 0;
var LeftImgDx = 0;
var isClicked = new Boolean(false);

var EnemyCreate;
var EnemyCreate2;

var Enemy = {
  y: [],
  x: [],
  speed: 5
};

var Enemy2 = {
  x: [],
  y: [],
  speed: 5
};

var EnemyNum=0;
var EnemyNum2=0;

var score=0;
var gamestart=true;
var gameAudio = document.getElementById("audio");

function init(){
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  gameAudio.play();
  $(document).ready(function(){
    $(body).css("background-color", "black");
  });
  draw();
  //createEnemy();
}

function drawEnemy(){
  for(var i=0; i<EnemyNum; i++){
    context.drawImage(EnemyImg, Enemy.x[i], Enemy.y[i]);
  }
  for(var i=0; i<EnemyNum2; i++){
    context.drawImage(EnemyImg2, Enemy2.x[i], Enemy2.y[i]);
  }
}

function createEnemy(){
  EnemyCreate = Math.round(Math.random()*2);
  EnemyCreate2 = Math.round(Math.random()*2);

  switch(EnemyCreate){
    case 0:
      Enemy.x.push(35);
      Enemy.y.push(-50);
      break;
    case 1:
      Enemy.x.push(165);
      Enemy.y.push(-50);
      break;
    default:
      break;
  }

  switch(EnemyCreate2){
    case 0:
      Enemy2.x.push(295);
      Enemy2.y.push(-50);
      break;
    case 1:
      Enemy2.x.push(425);
      Enemy2.y.push(-50);
      break;
    default:
      break;
  }
  EnemyNum = Enemy.x.length;
  EnemyNum2 = Enemy2.x.length;
  //console.log(EnemyCreate);
}
setInterval(createEnemy, 400);

function drawPlayer(){
  context.drawImage(LeftImg, LeftImgX, 300);
  context.drawImage(RightImg, RightImgX, 300);

  LeftImgX+=LeftImgDx;
  if(LeftImgX == 35 || LeftImgX == 165)
    LeftImgDx=0;
  RightImgX+=RightImgDx;
  if(RightImgX == 418 || RightImgX == 288)
    RightImgDx=0;
}

function clicked(){
  if(gamestart!=true){
    gamestart = true;
    window.location.reload();
  }
}

function draw(){
  context.clearRect(0, 0, canvas.width, canvas.height);

  if(gamestart==true){
    context.drawImage(BackImg, 0, 0);
    //context.moveTo(125, 0);
    //context.lineTo(125, canvas.height);
    //context.moveTo(250, 0);
    //context.lineTo(250, canvas.height);
    //context.moveTo(375, 0);
    //context.lineTo(375, canvas.height);

    context.stroke();
    context.stroke();

    drawPlayer();
    drawEnemy();
    update();
    drawScore();
  }else{
    gameAudio.pause();
    context.drawImage(gameOverImg, 0, 0);
    context.font = "30px Arial";
    context.fillStyle = "#000";
    context.fillText("Score: "+score, 200, 300);
  }
}
setInterval(draw, 10);

function drawScore(){
  context.font = "16px Arial";
  context.fillStyle = "#fff";
  context.fillText("Score: "+score, 10, 20);
}

function update(){
  for(var i=0; i<EnemyNum; i++){
    Enemy.y[i] += Enemy.speed;
  }

  for(var i=0; i<EnemyNum2; i++){
    Enemy2.y[i] += Enemy2.speed;
  }

  for(var i=0; i<EnemyNum; i++){
    if(LeftImgX + 50 > Enemy.x[i] && LeftImgX < Enemy.x[i]+50 && 300 < Enemy.y[i] + 50 && 350 > Enemy.y[i]){
      gamestart = false;
    }

    if(Enemy.y[i] > canvas.height){
      Enemy.x.shift();
      Enemy.y.shift();
      EnemyNum = Enemy.x.length;
      score++;
      //console.log("공 없앰");
    }
  }

  for(var i=0; i<EnemyNum2; i++){
    if(RightImgX + 50 > Enemy2.x[i] && RightImgX < Enemy2.x[i]+50 && 300 < Enemy2.y[i] + 50 && 350 > Enemy2.y[i]){
      gamestart = false;
    }

    if(Enemy2.y[i] > canvas.height){
      Enemy2.x.shift();
      Enemy2.y.shift();
      EnemyNum2 = Enemy2.x.length;
      score++;
      //console.log("공 없앰");
    }
  }
}

function move(evt){
  switch(evt.keyCode){
    case 37:
      if(RightImgX == 418){
        RightImgDx = -10;
      }
      break;
    case 39:
      if(RightImgX == 288){
        RightImgDx = 10;
      }
      break;
    case 67:
      if(LeftImgX == 35){
        LeftImgDx = 10;
      }
      break;
    case 90:
      if(LeftImgX == 165){
        LeftImgDx = -10;
      }
      break;
  }
}
