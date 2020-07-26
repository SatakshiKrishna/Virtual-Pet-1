var  dog, happyDog;
var database, foodS;
var foodStock;

function preload()
{
	dogIMG = loadImage("images/dogImg.png")
  happyDogIMG = loadImage("images/dogIMG1.png")
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  dog= createSprite(200,200,100,100);
  dog.addImage(dogIMG);
  dog.scale=0.5;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
 background(46,139,87);
if (keyWentDown(UP_ARROW)) {
  writeStock(foodS);
  dog.addImage(happyDogIMG);
  dog.scale=0.5;
}
drawSprites();
  textSize(15);
  fill('white');
  stroke('black');
  text("Note:Press UP_ARROW To Feed Dargo Milk",20,20);
  text("Food Remaing:"+foodS,100,50);
}

function readStock(data){
  
  foodS = data.val();
}

function writeStock(x){
  if (x<=0) {
    x=0;
  } else {
    x=x-1;
  }
  database.ref('/').update({
     Food:x
  })
}


