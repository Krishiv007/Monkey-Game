var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var ground, invisibleGround;
var banana, obstacle;
var bananaImage, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0, HI = 0;

function preload()
{
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() 
{
  createCanvas(400, 400);
  
  ground = createSprite(400, 350, 900, 10);

  invisibleGround = createSprite(400, 353, 900, 10);
  invisibleGround.visible = false;
  
  monkey = createSprite(80, 315, 10, 10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() 
{
  background(255);
  
  if(gameState === PLAY)
  {
    monkey.visible = true;
    
    if(keyDown("space") && monkey.isTouching(ground))
    {
      monkey.velocityY = -10;
    }
    
    monkey.velocityY = monkey.velocityY + 0.5;
    
    spawnBananas();
    spawnObstacles();
    
    if(monkey.isTouching(bananaGroup))
    {
      bananaGroup.destroyEach();
      
      score = score + 1;
    }
    
    if(monkey.isTouching(obstacleGroup))
    {
      gameState = END;
    }
  }
  else if(gameState === END)
  {
    if(HI < score)
    {
      HI = score;
    }
    
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.visible = false;
    
    textSize(20);
    text("GAME OVER", 150, 200);
    text("Press 'r' to restart", 150, 250);
    
    if(keyDown('r'))
    {
      gameState = PLAY;
      
      score = 0;
    }
  }
  
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  textSize(20);
  text("HI : "+HI+"    "+"Score : "+score,150, 50);
}

function spawnBananas()
{
  if(frameCount % 80 === 0)
  {
    banana = createSprite(420, random(200, 240), 50, 10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(8 + (score / 4));
    banana.lifetime = 60;
    bananaGroup.add(banana);
  }
}

function spawnObstacles()
{
  if(frameCount % 80 === 0)
  {
    obstacle = createSprite(420, 327, 10, 10);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(8 + (score / 4));
    obstacle.lifetime = 60;
    obstacleGroup.add(obstacle);
  }
}