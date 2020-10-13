var isGameOver;
var player;
var playerImage;
var enemy;
var enemyImage;
var backgroundImage;
var gameOverImage;
var score;
var block;
var fruit, fruitImage;

function preload() {
  playerImage = loadImage("monkey.png");
  enemyImage = loadImage("enemy.png");
  backgroundImage = loadImage("background.jpg");
  gameOverImage = loadImage("gameover.jpg");
  fruitImage = loadImage("Fruit.png");
}

function setup() {
  isGameOver = false;
  createCanvas(400, 600);
  player = createSprite(width / 2, height - (playerImage.height / 2), 0, 0);
  player.addImage(playerImage);
  player.scale=0.5;
  enemy = createSprite(width / 2, 0, 0, 0);
  enemy.addImage(enemyImage);
  enemy.rotationSpeed = 4.0;
  enemy.scale=0.1;

  fruit = createSprite(width/5,0,0,0);
  fruit.addImage(fruitImage);
  fruit.rotationSpeed= 3.0;
  fruit.scale = 0.1;
  score=0;
  block = createSprite(200,600,400,10);
  block.visible=true;

 
}

function draw() {
  console.log(mouseX,mouseY);
  if (isGameOver) {
    gameOver();
  } else {
    if (enemy.overlap(player)) {
      isGameOver = true;
    }
    if (fruit.overlap(player)) {
      player.scale+=0.0005;
    }
    
    background(backgroundImage);
    if (keyDown(RIGHT_ARROW) && player.position.x < (width - 40)) {
      player.position.x += 5;
    }
    if (keyDown(LEFT_ARROW) && player.position.x > (40)) {
      player.position.x -= 5;
    }
    enemy.position.y = enemy.position.y + (2+score/3);
    fruit.position.y = fruit.position.y + 2;
    if (enemy.position.y > height) {
      score = score+1;
      enemy.position.y = 0;
      enemy.position.x = random(5, width - 5);
    }

    if (fruit.position.y > height) {
      //score = score+1;
      fruit.position.y = 0;
      fruit.position.x = random(5, width - 5);
    }
    if(score%10===0){
      enemy.velocityY=enemy.velocityY+50
    }
    
    
    drawSprites();
  }
  textSize(18);
  fill("yellow");
  text("Score: "+score,50,20);
}

function gameOver() {
  background(gameOverImage);
  textAlign(CENTER);
  fill("orange");
  //text("Game Over!", width / 2, height / 2);
  textSize(25);
  strokeWeight(1);
  stroke("orange");
  text("Click anywhere to try again", 200,100);
}

function mouseClicked() {
  if(isGameOver === true){
  isGameOver = false;
  player.position.x = width / 2;
  player.position.y = height - (playerImage.height / 2);
  enemy.position.x = width / 2;
  enemy.position.y = 0;
  score = 0;
  }
}