//Create variables here

var dog,dogImg,dogImg1;
var database;
var fedTime,lastFed,feed,addFood;
var foodS,foodStock,lastFed,foodObj;


function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);
  dog=createSprite(300,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46,139,87);
 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 // if(keyWentDown(UP_ARROW)){
   // writeStock(foodS);
    //dog.addImage(dogImg1);
  //}   

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }

  drawSprites();
  //add styles here

  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Press up arrow key to feed the dog",130,10,300,20);
}

function readStock(data){
  foodS=data.val();
  //foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage("dogImg.png"); 

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

