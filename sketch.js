var balloon;
var database;
var position;
var balloonPosition;

function preload(){
  backgroundImg = loadImage("images/Hot Air Ballon-01.png");
  balloonImg = loadImage("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png");
  balloonUpImg = loadImage("images/Hot Air Ballon-02.png");
  balloonDownImg = loadImage("images/Hot Air Ballon-04.png");
  balloonImg2 = loadImage("images/Hot Air Ballon-03.png");
 
}

function setup() {

  database = firebase.database();

  createCanvas(500,500);

  balloon = createSprite(100, 395, 50, 50);
  balloon.addAnimation('balloon',balloonImg);
  balloon.scale = 0.4;

  var balloonPosition = database.ref("balloon/position");
  balloonPosition.on('value',readPosition,showError);
}

function draw() {
  background(backgroundImg);  
  if(keyDown(UP_ARROW)){
    updatePosition(0,-5);
    balloon.addAnimation('balloonUp',balloonUpImg);
    balloon.scale = balloon.scale - 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,5);
    balloon.addAnimation('balloonDown',balloonDownImg);
    balloon.scale = balloon.scale + 0.01;
  }
  else if(keyDown(LEFT_ARROW)){
    updatePosition(-5,0);
    balloon.addAnimation('balloonLeft',balloonImg2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(5,0);
    balloon.addAnimation('balloonRight',balloonImg2);
  }

  fill("black");
  stroke("blue");
  strokeWeight(1);
  textSize(15);
  text("Use Arrow Keys To Move The Balloon!!",20,20);

  drawSprites();
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
      'x' : position.x + x,
      'y' : position.y + y
    })
}

function readPosition(data){
  position = data.val();

  balloon.x = position.x;
  balloon.y = position.y; 
}

function showError(){
  console.log("Error in writing in the database");
}