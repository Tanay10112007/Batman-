var batman,coin,ball;
var batmanImg,coinImg,ballImg;
var ground;
var coinGroup,ballGroup;
var gameState="Play";
var bg,backg; 
var jokerImg;
var score = 0;
var edges;
function preload(){
    batmanImg=loadImage("batman.gif");
    coinImg=loadImage("coin.png");
    ballImg=loadImage("fire.png");
    bg=loadImage("backg6.jpg");
    jokerImg = loadImage("joker.png");
}

function setup(){
    createCanvas(1200,600);
    batman=createSprite(200,500,20,20);
    batman.addImage(batmanImg);
    batman.scale=0.4;
    
    ground=createSprite(600,550,1200,20);
    //ground.velocityX=-4;
    ground.velocityX = -(6 + 3*score/100);
    
    coinGroup=new Group();
    ballGroup=new Group();
    backg=createSprite(600,300,1200,600);
    backg.addImage(bg);
    backg.velocityX=-4;
    backg.x=backg.width/2;
    backg.scale=5;

    egdes = createEdgeSprites();
}

function draw(){
    background(bg);
    if(gameState==="Play"){
if(keyDown("Space")){
    batman.velocityY = -10;
}
//add gravity
 batman.velocityY = batman.velocityY + 0.9;
    
    if(batman.isTouching(coinGroup)){
        coinGroup.destroyEach();
        score = score + 2;
        
    }

    textSize(30);
    fill("red");
    stroke("green");
    text("SCORE : "+score,200,100);
    batman.collide(edges);
    if(backg.x<0){
        backg.x=backg.width/2;
    }
    if(batman.isTouching(ballGroup)){
        gameState  ="end";
    }
    }
    
    if(gameState = "end"){
       ballGroup.destroyEach();
       
       background(jokerImg);
       texSize(40);
       fill("red");
       stroke("green");
       text("GAME OVER",600,320);
       text("PRESS R TO RESTART",600,400);
    }
    if(keyDown("R")){
        gameState = "Play";
        score = 0;
    }

    drawSprites();
}

function spawnCoins(){
    if(frameCount%150===0){
        coin=createSprite(1220,50,20,20);
        coin.addImage("coin", coinImg);
        coin.scale=0.3;
        coin.velocityX=-4;
        coin.y=Math.round(random(100,500));
        coin.lifetime=400;
        coin.depth=batman.depth;
        batman.depth=batman.depth+1;
        coinGroup.add(coin);
        
    }
}
function spawnObstacles(){
    if(frameCount%500===0){
        ball=createSprite(1220,250,20,20);
        ball.addImage("ball",ballImg);
        ball.scale=0.4;
        ball.y=Math.round(random(100,500));
        ball.lifetime=400;
        ball.velocityX = -(6 + 3*score/100);
        ballGroup.add(ball);

    }
}