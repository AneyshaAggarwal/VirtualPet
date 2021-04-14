var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFeed;

function preload()
{
 sadDog=loadImage("Dog.png");
 happyDog=loadImage("happydog.png");
}

function setup() 
{
  database= firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock= database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the Dog");
  feed.position(800,100);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,130);
  addFood.mousePressed(addFoods);
}

function draw() 
{
  background("skyblue");
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data)
  {
    lastFed=data.val();
  });

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}
function readStock(data)
{
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog()
{
  dog.addImage(happyDog);
  
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0)
  {
    foodObj.updateFoodStock(food_stock_val *0);
  }
  else
  {
    foodObj.updateFoodStock(food_stock_val -1);
  }
  
  database.ref('/').update
  ({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

}

function addFoods()
{
  foodS++;
  database.ref('/').update
  ({
  Food:foodS
  })
}


