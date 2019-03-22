var GAME_TIME = 8000;
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
    width: 4000,
    height: 4000,
    antialiasing: true,
    transparent: false,
    resolution: 1
  }
);

var arrPosition = [
  {
    id: 1,
    x: 21,
    y: 96,
    hammerx: 30,
    hammery: 5
  },
  {
    id: 2,
    x: 100,
    y: 96,
    hammerx: 109,
    hammery: 5
  },
  {
    id: 3,
    x: 180,
    y: 96,
    hammerx: 189,
    hammery: 5
  },
  {
    id: 4,
    x: 21,
    y: 158,
    hammerx: 30,
    hammery: 67
  },
  {
    id: 5,
    x: 100,
    y: 158,
    hammerx: 109,
    hammery: 67
  },
  {
    id: 6,
    x: 180,
    y: 158,
    hammerx: 189,
    hammery: 67
  },
  {
    id: 7,
    x: 21,
    y: 228,
    hammerx: 30,
    hammery: 137,
  },
  {
    id: 8,
    x: 100,
    y: 228,
    hammerx: 109,
    hammery: 137
  },
  {
    id: 9,
    x: 180,
    y: 228,
    hammerx: 189,
    hammery: 137
  }
]
function getRandomInt() {
  return Math.floor(Math.random() * 2 );
}
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

// loader
//   .add("assets/images/whackmole.json")
//   .load(setup);
//
// //Define variables that might be used in more
// //than one function
// var state, startscreen, gameStart, gameScene, bg_01, bg_02, bg_03, bg_04,
//  gameStart, id, start, time, timeOver, progressBar, mole, hammer, thunder, heraLose, scoreText, scoreDraw;
//
// var countValue = GAME_TIME;
//
// var progressWidth = 170
//
// var defaultIcon = "url('assets/images/1.png'),auto";
//
// var hera = [];
// var boss = [];
// var queen = [];
// var clock = [];
// var hammers = [];
// var moleCount = {
//   hera: 0,
//   boss: 0,
//   queen: 0
// }
// var score = 0;
// function addHammer (position) {
//   hammer = new Sprite(id["hammer.png"]);
//   hammer.x = arrPosition[position].hammerx;
//   hammer.y = arrPosition[position].hammery;
//   gameScene.addChild(hammer);
//   hammers.push(hammer)
//   hammer.visible = false;
// }
// function createMole (x,y, type) {
//   switch (type) {
//     case 'hera':  mole = new Sprite(id["hera.png"]);
//       mole.x = x; //21;
//       mole.y = y; //38 + HERA_HEIGHT;
//       mole.turn = 0;
//       mole.interactive = true;
//       mole.buttonMode = true;
//       gameScene.addChild(mole);
//       hera.push(mole);
//       break;
//     case 'queen': mole = new Sprite(id["queen.png"])
//       mole.x = x; //21;
//       mole.y = y; //38 + HERA_HEIGHT;
//       mole.interactive = true;
//       gameScene.addChild(mole);
//       queen.push(mole);
//       break;
//     case 'boss': mole = new Sprite(id["boss.png"]);
//       mole.x = x; //21;
//       mole.y = y; //38 + HERA_HEIGHT;
//       mole.interactive = true;
//       gameScene.addChild(mole);
//       boss.push(mole);
//       break;
//     case 'clock': mole = new Sprite(id["clock.png"]);
//       mole.x = x; //21;
//       mole.y = y; //38 + HERA_HEIGHT;
//       mole.interactive = true;
//       gameScene.addChild(mole);
//       clock.push(mole);
//       break;
//     }
//
// }
//
// function addMole (position) {
//   createMole(arrPosition[position].x, arrPosition[position].y, 'hera');
//   createMole(arrPosition[position].x, arrPosition[position].y, 'boss');
//   // createMole(arrPosition[position].x, arrPosition[position].y, 'queen');
//   // createMole(arrPosition[position].x, arrPosition[position].y, 'clock');
// }
//
// /*Build layout for start screen*/
// function addStartScreen () {
//   // Add screen start
//   gameStart = new Container();
//   app.stage.addChild(gameStart);
//   startscreen = new Sprite(id["startscreen.png"]);
//   gameStart.addChild(startscreen);
//   gameStart.visible = false;
//   // Opt-in to interactivity
//   startscreen.interactive = true;
//   // Cursor pointer
//   startscreen.buttonMode = true;
// }
//
//
// /*Build layout for start screen*/
// function addSceneScreen () {
//   gameScene = new Container();
//   app.stage.addChild(gameScene);
//
//   gameScene.visible = true; // demo
//   //gameScene.visible = false;
//
//
//   // 4 images merge into a background
//   bg_01 = new Sprite(id["bg_01.png"]);
//   // gameScene.addChild(bg_01);
//   addMole(0);
//   addMole(1);
//   addMole(2);
//   addHammer(0);
//   addHammer(1);
//   addHammer(2)
//
//
//
//   bg_02 = new Sprite(id["bg_02.png"]);
//   bg_02.x = 0;
//   bg_02.y = 79;
//   // gameScene.addChild(bg_02);
//   addMole(3);
//   addMole(4);
//   addMole(5);
//   addHammer(3);
//   addHammer(4);
//   addHammer(5)
//
//   bg_03 = new Sprite(id["bg_03.png"]);
//   bg_03.x = 0;
//   bg_03.y = 145;
//   // gameScene.addChild(bg_03);
//
//   addMole(6);
//   addMole(7);
//   addMole(8);
//   addHammer(6);
//   addHammer(7);
//   addHammer(8)
//
//   bg_04 = new Sprite(id["bg_04.png"]);
//   bg_04.x = 0;
//   bg_04.y = 208;
//   // gameScene.addChild(bg_04);
//
//   // Time text
//   time = new Sprite(id["time.png"]);
//   time.x = 4;
//   time.y = 220
//   gameScene.addChild(time);
//
//   // progress bar
//   progressBar = new Container();
//   progressBar.position.set(60, 225)
//   gameScene.addChild(progressBar);
//
//
//   //Create the front red rectangle
//   var outerBar = new Graphics();
//   outerBar.beginFill(0xfaed2e);
//   outerBar.drawRect(0, 0, progressWidth, 10);
//   outerBar.endFill();
//   progressBar.addChild(outerBar);
//   progressBar.outer = outerBar;
//
//   // Start text
//   start = new Sprite(id["start.png"]);
//   start.x = 240/2 - start.width/2;
//   start.y = 240/2 - start.height/2;
//   gameScene.addChild(start);
//
//   // Time over text
//   timeOver = new Sprite(id["time_over.png"]);
//   timeOver.x = gameScene.width/2 - timeOver.width/2;
//   timeOver.y = gameScene.height/2 - timeOver.height/2
//   gameScene.addChild(timeOver);
//   timeOver.visible = false;
//
//   //Scrore
//   scoreText = new Sprite(id["score.png"]);
//   scoreText.x = 100;
//   scoreText.y = 10;
//   gameScene.addChild(scoreText);
//
//   const styleScore = new PIXI.TextStyle({
//     width: 80,
//     align: "right",
//     fontSize: 20,
//     dropShadowAngle: 0.4,
//     dropShadowColor: "#408080",
//     fill: "white",
//     fontFamily: "Arial Black",
//     fontVariant: "small-caps",
//     fontWeight: "bolder",
//     stroke: "white",
//     whiteSpace: "normal",
//     wordWrap: true,
//   });
//   scoreDraw = new PIXI.Text(score, styleScore);
//   // scoreDraw.anchor.x = 240;
//
//   scoreDraw.x = 170;
//   scoreDraw.y = 5;
//   gameScene.addChild(scoreDraw);
// }
//
// function setup () {
//   //Create an alias for the texture atlas frame ids
//   id = resources["assets/images/whackmole.json"].textures;
//
//   var heraLose = new Sprite(id["heraLose.png"]);
//
//   /**Start screen**/
//   addStartScreen();
//
//   /**Game screen**/
//   addSceneScreen()
//
//   /*Go into the game screen*/
//   // Click to screen
//   startscreen.on('pointerdown', function () {
//     gameStart.visible = false;
//     gameScene.visible = true;
//     var defaultIcon = "url('assets/images/1.png'),auto";
//   });
//
//   hera.forEach(function (mole, index) {
//     mole.on('pointerdown', function () {
//       moleCount.hera ++;
//       score += 100;
//       scoreDraw.text = score;
//       console.log('điểm: ', moleCount.hera)
//       hammers[index].visible = true;
//       setTimeout(function () {
//         hammers[index].visible = false;
//       }, 300)
//       thunder = new Sprite(id["thunder.png"]);
//       thunder.x = hera[index].x;
//       thunder.y = hera[index].y - 20;
//       hera[index].quarter = 1;
//       hera[index].texture = id["heraLose.png"];
//       gameScene.addChild(thunder);
//       setTimeout(function () {
//         thunder.destroy()
//       },400)
//     })
//
//   })
//
//
//   var gameHappen = setTimeout(function () {
//     // Start text disappears after 3s
//     start.visible = false;
//     var countDown = setInterval(function(){
//       countValue--;
//       var timedown = progressWidth/GAME_TIME
//       progressBar.outer.width -= timedown;
//       if(countValue == 0) {
//         gameScene.addChild(timeOver);
//         clearInterval(countDown);
//         timeOver.visible = true;
//         setTimeout(function () {
//           gameScene.visible = false;
//         }, GAME_OVER)
//       }
//     },1000);
//   }, GAME_START)
//   var flag;
//
//   app.ticker.add(delta => gameLoop());
// }
// function randomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// function playAnimate(itemHera) {
//   var item;
//   switch (itemHera) {
//     case hera: item = id["hera.png"];
//       break;
//     case boss: item = id["boss.png"];
//       break;
//
//   }
//   for(var i = 0; i < itemHera.length; i++) {
//     if(itemHera[i].isplay) {
//       if(itemHera[i].quarter === undefined) {
//         itemHera[i].quarter = 1;
//         itemHera[i].defaultY = itemHera[i].y;
//       }
//       if(itemHera[i].y < itemHera[i].defaultY - 59) {
//         itemHera[i].quarter = 1;
//
//       }
//       if(itemHera[i].y > itemHera[i].defaultY - 1) {
//         itemHera[i].isplay = false;
//         itemHera[i].quarter = -1;
//         itemHera[i].texture = item;
//       }
//       itemHera[i].animationSpeed = 5;
//       itemHera[i].y += 1 * itemHera[i].quarter;
//
//       // console.log(itemHera[0].y);
//     }
//   }
// }
// var delta = -1;
// var timeInterval = 0;
// var MAXTIME = 70;
// var flagHera = 0;
// var posi;
// var pos;
// function gameLoop(){
//   timeInterval += 1;
//   if(timeInterval > MAXTIME) {
//     if(moleCount.hera % 10 == 0 && moleCount.hera > flagHera) {
//       console.log('boss');
//       pos = randomInt(0, 8);
//       boss[pos].isplay = true;
//       flagHera = moleCount.hera;
//     } else {
//       do {
//         posi = randomInt(0, 8);
//       } while(hera[posi].isplay)
//       if(!hera[posi].isplay){
//         hera[posi].isplay = true;
//       }
//     }
//     // do {
//     //   var posi = randomInt(0, 8);
//     // } while(hera[posi].isplay)
//     // if(!hera[posi].isplay){
//     //   hera[posi].isplay = true;
//     // }
//
//     timeInterval = 0;
//
//   }
//   playAnimate(hera);
//   playAnimate(boss);
// }
let Frog;

var flag;
const rotateAnimation = () => {
  let counter = 0;
  let motion = 0;
  const animation = () => {
    flag = -1
    Frog.y += flag;
  };
  app.ticker.add(animation, PIXI.UPDATE_PRIORITY.NORMAL);
};

const randomMotion = () => {
  let counter = 0;
  let motion = 0;
  const animation = () => {
    if (Frog.y === 100) {
      app.ticker.remove(animation);
      rotateAnimation();
    } else  {
      flag = 1
      Frog.y += flag;
    
    } 
  };
  app.ticker.add(animation, PIXI.UPDATE_PRIORITY.NORMAL);
};

PIXI.loader
  .add('frog', './assets/images/1.png')
  .load(() => {
  Frog = new PIXI.Sprite(PIXI.loader.resources.frog.texture);
app.stage.addChild(Frog);
app.renderer.render(app.stage);

// animations
setInterval(function() {
  
}, 7000)
randomMotion();
});