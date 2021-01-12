var sword,monster,fruit,gameOver;
var swordImg,monsterImg,fruit1Img,fruit2Img,fruit3Img,fruit4Img,gameOverImg;
var knifeSound,gameoverSound

var fruitsGroup,aliensGroup;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var score;


function preload(){
  
  swordImg=loadImage("sword.png");
  monsterImg=loadAnimation("alien1.png","alien2.png");
  fruit1Img=loadImage("fruit1.png");
  fruit2Img=loadImage("fruit2.png");
  fruit3Img=loadImage("fruit3.png");
  fruit4Img=loadImage("fruit4.png");
  gameOverImg=loadImage("gameover.png");
  
  knifeSound=loadSound("knifeSwooshSound.mp3");
  gameoverSound=loadSound("gameover.mp3");
  
}

function setup()
{
  createCanvas(400,400);
  sword=createSprite(100,100);
  sword.addImage(swordImg);
  sword.scale=0.7;
  
  fruitsGroup= new Group();
  aliensGroup= new Group(); 
  
  score=0;
}
  

function draw(){
  
  background("lightblue");
  
  if(gamestate===PLAY){
    
    
    sword.x=mouseX;
    sword.y=mouseY;
    
    fruits();
    enemy();
    
    if(fruitsGroup.isTouching(sword)){
      score=score+2;
      fruitsGroup.destroyEach();
      knifeSound.play();
      
    }
    
    if(sword.isTouching(aliensGroup))
    {
      gamestate=END;
      gameoverSound.play();
    }
  
  } 
  
  if(gamestate===END){
    
    sword.addImage(gameOverImg);
    sword.x=200;
    sword.y=200;
    fruitsGroup.setVelocityXEach(0);
    aliensGroup.setVelocityXEach(0);
    
    fruitsGroup.setLifetimeEach(0);
    aliensGroup.setLifetimeEach(0);
    
    
    
  }
  textSize(20);
    text("Score: " + score,300,30);
  drawSprites();
}


function fruits(){
  
  if(frameCount%60===0){
  fruit = createSprite(0,100,20,40)
    var position= Math.round(random(1,2));
    
  
  
  switch(Math.round(random(1,4))){
    case 1:
      fruit.addImage(fruit1Img);
      break;
    case 2:
      fruit.addImage(fruit2Img);
      break;
    case 3:
      fruit.addImage(fruit3Img);
      break;
    default:
      fruit.addImage(fruit4Img);
      break;
   
  }         
    
    fruit.scale=0.2;
    if(position==1){
       fruit.velocityX=(3+score/4);
    }
    if(position==2){
      fruit.x=400;
       fruit.velocityX=-(3+score/4);
    }
   
    fruit.y=Math.round(random(50,350));
    fruit.lifetime=123;
    fruitsGroup.add(fruit);
  }
  
}


function enemy(){
  
  if(frameCount%200===0)
  { 
  var position=Math.round(random(1,2));
  monster = createSprite(0,100,20,50);
  monster.addAnimation("monster",monsterImg);
  if(position==1)
  monster.velocityX=5+score/4;
  else{
    monster.x=400;
    monster.velocityX=-(5+score/4);
  }
  monster.y=Math.round(random(50,350));
  monster.lifetime=123;  
  aliensGroup.add(monster);
  }
  
}