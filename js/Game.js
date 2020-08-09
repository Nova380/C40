class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gamestate');
    gameStateRef.on("value",function(data){
       gamestate = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gamestate: state
    });
  }

  async start(){
    if(gamestate === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1img);
    car2 = createSprite(300,200);
    car2.addImage(car2img);
    car3 = createSprite(500,200);
    car3.addImage(car3img);
    car4 = createSprite(700,200);
    car4.addImage(car4img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getcarsatend();
    if(allPlayers !== undefined){
      background("blue");
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
        stroke(10);
        fill("red");
        ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
if(player.distance>4000){
gamestate=2;
player.rank+=1;
Player.updatecarsatend(player.rank);
}
    drawSprites();
  }
  end(){
    console.log("game ended");
  console.log(player.rank);
  }
}
