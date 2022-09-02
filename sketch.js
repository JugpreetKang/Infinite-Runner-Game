var path,boy,cash,bomb,coin,bdygrd,car;
var pathImg,boyImg,cashImg,bombImg,coinImg,bdygrdImg,carImg;
var looted = 0;
var cashG,bombG,coinG,bdygrdG;

var alive = 0;

var l1, l2;



var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  bombImg = loadImage("bomb.png");
  coinImg = loadImage("coin.png");
  bdygrdImg = loadImage("bdygrd.png");
  endImg =loadAnimation("gameOver.png");
  carImg =loadImage("car.png");
}

function setup(){
  

createCanvas(windowWidth,windowHeight);


path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


l1 = createSprite(25, height/2, 50, windowHeight);

l1 = createSprite(width-25, height/2, 50, windowHeight);


boy = createSprite(width/2,height-280,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
car = createSprite(width/2, height-1,20,20);
car.addImage(carImg);
car.scale=0.5
  
  
cashG=new Group();
coinG=new Group();
bombG=new Group();
bdygrdG=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  car.x = boy.x;
  
  edges= createEdgeSprites();
  boy.collide(edges);

  if(World.frameCount%30 === 0){
    alive = alive + 1;
  }
  
  

  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createBomb();
    createCoin();
    createBdygrd();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      looted=looted + 50;
    }
    if (coinG.isTouching(boy)) {
        coinG.destroyEach();
        looted=looted + 10;
      }
    else{
      if(bdygrdG.isTouching(boy)||bombG.isTouching(boy)) {
        car.y = boy.y;
        gameState=END;

        
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        cashG.destroyEach();
        bombG.destroyEach();
        coinG.destroyEach();
        bdygrdG.destroyEach();
        
        cashG.setVelocityYEach(0);
        bombG.setVelocityYEach(0);
        coinG.setVelocityYEach(0);
        bdygrdG.setVelocityYEach(0);
     
    }
   

  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Money Looted: "+ looted,width-200,30);
  text("Time Alive: "+ alive, width-165,60);
  }
  

}

function createCash() {
  if (World.frameCount % 500 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.3;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createBomb() {
  if (World.frameCount % 410 == 0) {
  var bomb = createSprite(Math.round(random(50, width-50),40, 10, 10));
  bomb.addImage(bombImg);
  bomb.scale=0.15;
  bomb.velocityY = 5;
  bomb.lifetime = 200;
  bombG.add(bomb);
}
}

function createCoin() {
  if (World.frameCount % 480 == 0) {
  var coin = createSprite(Math.round(random(50, width-50),40, 10, 10));
  coin.addImage(coinImg);
  coin.scale=0.3;
  coin.velocityY = 5;
  coin.lifetime = 200;
  coinG.add(coin);
  }
}

function createBdygrd(){
  if (World.frameCount % 320 == 0) {
  var bdygrd = createSprite(Math.round(random(50, width-50),40, 10, 10));
  bdygrd.addImage(bdygrdImg);
  bdygrd.scale=0.25;
  bdygrd.velocityY = 4;
  bdygrd.lifetime = 200;
  bdygrdG.add(bdygrd);
  }
}