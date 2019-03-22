var GAME_TIME = 4000000;
var GAME_START = 2000;
var GAME_OVER = 2000;
var HERA_HEIGHT = 58;
var BOSS_HEIGHT = 64;
var QUEEN_HEIGHT = 73;
var CLOCK_HEIGHT = 73
//Aliases
var Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Graphics = PIXI.Graphics,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle;

//Create a Pixi Application
var app = new Application({
    width: 240,
    height: 240,
    antialiasing: true,
    transparent: false,
    resolution: 1
  }
);

var arrPosition = [
  {
    id: 1,
    x: 21,
    y: 96
  },
  {
    id: 2,
    x: 100,
    y: 96
  },
  {
    id: 3,
    x: 180,
    y: 96
  },
  {
    id: 4,
    x: 21,
    y: 158
  },
  {
    id: 5,
    x: 100,
    y: 158
  },
  {
    id: 6,
    x: 180,
    y: 158
  },
  {
    id: 7,
    x: 21,
    y: 228
  },
  {
    id: 8,
    x: 100,
    y: 228
  },
  {
    id: 9,
    x: 180,
    y: 228
  }
]
function getRandomInt() {
  return Math.floor(Math.random() * 2 );
}
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

loader
  .add("assets/images/whackmole.json")
  .load(setup);

//Define variables that might be used in more
//than one function
var state, startscreen, gameStart, gameScene, bg_01, bg_02, bg_03, bg_04,
 gameStart, id, start, time, timeOver, progressBar, mole;

var countValue = GAME_TIME;

var progressWidth = 170

var defaultIcon = "url('assets/images/1.png'),auto";

var hera = [];
var boss = [];
var queen = [];
var clock = [];
function createMole (x,y, type) {
  switch (type) {
    case 'hera':  mole = new Sprite(id["hera.png"]);
      mole.x = x; //21;
      mole.y = y; //38 + HERA_HEIGHT;
      mole.turn = 0;
      gameScene.addChild(mole);
      hera.push(mole);
      break;
    case 'queen': mole = new Sprite(id["queen.png"])
      mole.x = x; //21;
      mole.y = y; //38 + HERA_HEIGHT;
      gameScene.addChild(mole);
      queen.push(mole);
      break;
    case 'boss': mole = new Sprite(id["boss.png"]);
      mole.x = x; //21;
      mole.y = y; //38 + HERA_HEIGHT;
      gameScene.addChild(mole);
      boss.push(mole);
      break;
    case 'clock': mole = new Sprite(id["clock.png"]);
      mole.x = x; //21;
      mole.y = y; //38 + HERA_HEIGHT;
      gameScene.addChild(mole);
      clock.push(mole);
      break;
    }

}

function addMole (position) {
  createMole(arrPosition[position].x, arrPosition[position].y, 'hera');
  createMole(arrPosition[position].x, arrPosition[position].y, 'boss');
  createMole(arrPosition[position].x, arrPosition[position].y, 'queen');
  createMole(arrPosition[position].x, arrPosition[position].y, 'clock');
}

/*Build layout for start screen*/
function addStartScreen () {
  // Add screen start
  gameStart = new Container();
  app.stage.addChild(gameStart);
  startscreen = new Sprite(id["startscreen.png"]);
  gameStart.addChild(startscreen);
  gameStart.visible = false;
  // Opt-in to interactivity
  startscreen.interactive = true;
  // Cursor pointer
  startscreen.buttonMode = true;
}


/*Build layout for start screen*/
function addSceneScreen () {
  gameScene = new Container();
  app.stage.addChild(gameScene);

  gameScene.visible = true; // demo
  //gameScene.visible = false;


  // 4 images merge into a background
  bg_01 = new Sprite(id["bg_01.png"]);
  bg_01.zIndex = 1;
  gameScene.addChild(bg_01);
  addMole(0);
  addMole(1);
  addMole(2);


  bg_02 = new Sprite(id["bg_02.png"]);
  bg_02.x = 0;
  bg_02.y = 79;
  gameScene.addChild(bg_02);
  addMole(3);
  addMole(4);
  addMole(5);

  bg_03 = new Sprite(id["bg_03.png"]);
  bg_03.x = 0;
  bg_03.y = 145;
  gameScene.addChild(bg_03);

  addMole(6);
  addMole(7);
  addMole(8);

  bg_03 = new Sprite(id["bg_04.png"]);
  bg_03.x = 0;
  bg_03.y = 208;
  gameScene.addChild(bg_03);

  // Time text
  time = new Sprite(id["time.png"]);
  time.x = 4;
  time.y = 220
  gameScene.addChild(time);

  // progress bar
  progressBar = new Container();
  progressBar.position.set(60, 225)
  gameScene.addChild(progressBar);


  //Create the front red rectangle
  var outerBar = new Graphics();
  outerBar.beginFill(0xfaed2e);
  outerBar.drawRect(0, 0, progressWidth, 10);
  outerBar.endFill();
  progressBar.addChild(outerBar);
  progressBar.outer = outerBar;

  // Start text
  start = new Sprite(id["start.png"]);
  start.x = 240/2 - start.width/2;
  start.y = 240/2 - start.height/2;
  gameScene.addChild(start);

  // Time over text
  timeOver = new Sprite(id["time_over.png"]);
  timeOver.x = gameScene.width/2 - timeOver.width/2;
  timeOver.y = gameScene.height/2 - timeOver.height/2
  gameScene.addChild(timeOver);
  timeOver.visible = false;
}

function setup () {
  //Create an alias for the texture atlas frame ids
  id = resources["assets/images/whackmole.json"].textures;
  /**Start screen**/
  addStartScreen();

  /**Game screen**/
  addSceneScreen()

  /*Go into the game screen*/
  // Press enter
  var enter = keyboard(13)
  enter.press = function () {
    gameStart.visible = false;
    gameScene.visible = true;
    app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
  }
  // Click to screen
  startscreen.on('pointerdown', function () {
    gameStart.visible = false;
    gameScene.visible = true;
    var defaultIcon = "url('assets/images/1.png'),auto";
  });
  // app.ticker.add(delta => gameLoop(delta));

  var gameHappen = setTimeout(function () {
    // Start text disappears after 3s
    start.visible = false;
    var countDown = setInterval(function(){
      countValue--;
      var timedown = progressWidth/GAME_TIME
      progressBar.outer.width -= timedown;
      // app.ticker.add(delta => gameLoop(delta))
      if(countValue == 0) {
        gameScene.addChild(timeOver);
        clearInterval(countDown);
        timeOver.visible = true;
        setTimeout(function () {
          gameScene.visible = false;
        }, GAME_OVER)
      }
    },1000);
  }, GAME_START)
  // var a = setInterval(function () {
  //
  //   var positionRandom = randomInt(0,2);
  //   hera[positionRandom].turn = 1;
  //
  // },10000)
  app.ticker.add(delta => gameLoop());
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function playAnimate(itemHera) {
  for(var i = 0; i < itemHera.length; i++) {
    if(itemHera[i].isplay) {
      if(itemHera[i].quarter === undefined) {
        itemHera[i].quarter = 1;
        itemHera[i].defaultY = itemHera[i].y;
      }
      // if(itemHera[i].y === itemHera[i].defaultY) {
      //   itemHera[i].quarter = 1;
      // }
      if(itemHera[i].y < itemHera[i].defaultY - 59) {
        itemHera[i].quarter = 1;
      }
      if(itemHera[i].y > itemHera[i].defaultY - 1) {
        itemHera[i].isplay = false;
        itemHera[i].quarter = -1;
      }
      
      itemHera[i].y += 1 * itemHera[i].quarter;
      // console.log(itemHera[0].y);
    }
  }
}
var delta = -1;
var timeInterval = 0;
var MAXTIME = 30;
function gameLoop(){
  timeInterval += 1;
  if(timeInterval > MAXTIME) {
    do{
      var posi = randomInt(0, 8);
    } while(hera[posi].isplay == true)
    if(!hera[posi].isplay){
      hera[posi].isplay = true;
    }
    timeInterval = 0;
  }
  playAnimate(hera);
  
  
  
  // for(var i = 0; i < 3; i++) {
  //   console.log(hera[i].y, 'lên', i)
  //   if(hera[i].turn === 1 && !hera[i].isTurn) {
  //     hera[i].turn = 1;
  //     hera[i].y += 1*delta;
  //     hera[i].isTurn = 1;
  //     // console.log(moles[0].y)
  //     if(hera[i].y == 38) {
  //       console.log(hera[i].y, 'trên')
  //       delta *= -1;
  //     }
  //     if(hera[i].y == 96) {
  //       console.log(hera[i].y, 'dưới')
  //       delta *= -1;
  //       hera[i].turn = 0;
  //       hera[i].isTurn = 0;
  //     }
  //   }
  // }


  // moles[0].y += 1 * denta;
  // if(moles[0].y == 38) {
  //   denta *= -1;
  // }
  // if(moles[0] == (38  + 58)) {
  //   denta *= -1;
  // }
}

//The `keyboard` helper function
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}