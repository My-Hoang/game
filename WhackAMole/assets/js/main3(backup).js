var GAME_TIME = 80;
var GAME_START = 1000;
var GAME_OVER = 1000;
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
  TextMetrics = PIXI.TextMetrics; 

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
    x: 1,
    y: 94,
    hammerx: 60,
    hammery: 10
  },
  {
    id: 2,
    x: 90,
    y: 94,
    hammerx: 135,
    hammery: 10
  },
  {
    id: 3,
    x: 170,
    y: 94,
    hammerx: 230,
    hammery: 10
  },
  {
    id: 4,
    x: 11,
    y: 160,
    hammerx: 60,
    hammery: 80
  },
  {
    id: 5,
    x: 90,
    y: 160,
    hammerx: 135,
    hammery: 80
  },
  {
    id: 6,
    x: 170,
    y: 160,
    hammerx: 230,
    hammery: 80
  },
  {
    id: 7,
    x: 11,
    y: 225,
    hammerx: 60,
    hammery: 145,
  },
  {
    id: 8,
    x: 90,
    y: 225,
    hammerx: 135,
    hammery: 145
  },
  {
    id: 9,
    x: 170,
    y: 225,
    hammerx: 230,
    hammery: 145
  }
]
var moleDelay = [0,0,0,0,0,0,0,0,0];
var isClickHera = [false,false,false,false,false,false,false,false, false];
/*random processing*/
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
 gameStart, id, start, time, timeOver, progressBar, mole, hammer, thunder, heraLose, scoreText, scoreDraw, gameEnd, bgResult1, bgResult2, bgResult3, bgResult4,
 resultTitle, resultHera, heraCount, bossCount, queenCount, heraCountText, bossCountText, queenCountText, total, totalPoint, totalPointText, heraMulti, bossMulti, queenMulti,
 gameHappen;

var countValue = GAME_TIME;

var progressWidth = 170
var timedown = progressWidth/GAME_TIME;

var hera = [];
var boss = [];
var queen = [];
var clock = [];
var hammers = [];
var thunders = [];
var moleCount = {
  hera: 0,
  boss: 0,
  queen: 0
}
var score = 0;
function addHammer (position) {
  hammer = new Sprite(id["hammer.png"]);
  hammer.x = arrPosition[position].hammerx;
  hammer.y = arrPosition[position].hammery;
  gameScene.addChild(hammer);
  hammers.push(hammer)
  hammer.visible = false;
}

function addThunder (position) {
  thunder = new Sprite(id["thunder.png"]);
  gameScene.addChild(thunder);
  thunders.push(thunder);
  thunder.visible = false;
}
function createMole (x,y, type) {
  switch (type) {
    case 'hera':  mole = new Sprite(id["hera.png"]);
      mole.x = x; 
      mole.y = y; 
      mole.turn = 0;
      mole.interactive = true;
      mole.buttonMode = true;
      gameScene.addChild(mole);
      hera.push(mole);
      break;
    case 'queen': mole = new Sprite(id["queen.png"])
      mole.x = x; 
      mole.y = y; 
      mole.interactive = true;
      mole.buttonMode = true;
      gameScene.addChild(mole);
      queen.push(mole);
      break;
    case 'boss': mole = new Sprite(id["boss.png"]);
      mole.x = x; 
      mole.y = y; 
      mole.interactive = true;
      mole.buttonMode = true;
      gameScene.addChild(mole);
      boss.push(mole);
      break;
    case 'clock': mole = new Sprite(id["clock.png"]);
      mole.x = x; 
      mole.y = y; 
      mole.interactive = true;
      mole.buttonMode = true;
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


const styleScore = new PIXI.TextStyle({
  width: 80,
  align: "right",
  fontSize: 16,
  dropShadowAngle: 0.4,
  dropShadowColor: "#408080",
  fill: "white",
  fontFamily: "Arial Black",
  fontVariant: "small-caps",
  fontWeight: "bolder",
  stroke: "white",
  whiteSpace: "normal",
  wordWrap: true,
});

/*Build layout for start screen*/
function addStartScreen () {
  // Add screen start
  gameStart = new Container();
  app.stage.addChild(gameStart);
  startscreen = new Sprite(id["startscreen.png"]);
  gameStart.addChild(startscreen);
  gameStart.visible = true;
  // Opt-in to interactivity
  startscreen.interactive = true;
  // Cursor pointer
  startscreen.buttonMode = true;
}


/*Build layout for start screen*/
function addSceneScreen () {
  gameScene = new Container();
  app.stage.addChild(gameScene);

  gameScene.visible = false; // demo
  //gameScene.visible = false;


  // 4 images merge into a background
  bg_01 = new Sprite(id["bg_01.png"]);
  bg_01.interactive = true;
  gameScene.addChild(bg_01);
  addMole(0);
  addMole(1);
  addMole(2);
  addHammer(0);
  addHammer(1);
  addHammer(2);
  addThunder(0);
  addThunder(1);
  addThunder(2);



  bg_02 = new Sprite(id["bg_02.png"]);
  bg_02.interactive = true;
  bg_02.x = 0;
  bg_02.y = 79;
  gameScene.addChild(bg_02);
  addMole(3);
  addMole(4);
  addMole(5);
  addHammer(3);
  addHammer(4);
  addHammer(5)
  addThunder(3);
  addThunder(4);
  addThunder(5);

  bg_03 = new Sprite(id["bg_03.png"]);
  bg_03.x = 0;
  bg_03.y = 145;
  bg_03.interactive = true;
  gameScene.addChild(bg_03);

  addMole(6);
  addMole(7);
  addMole(8);
  addHammer(6);
  addHammer(7);
  addHammer(8);
  addThunder(6);
  addThunder(7);
  addThunder(8);

  bg_04 = new Sprite(id["bg_04.png"]);
  bg_04.x = 0;
  bg_04.y = 208;
  bg_04.interactive = true;
  gameScene.addChild(bg_04);

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
  timeOver.x = 240/2 - timeOver.width/2;
  timeOver.y = 240/2 - timeOver.height/2
  gameScene.addChild(timeOver);
  timeOver.visible = false;

  //Scrore
  scoreText = new Sprite(id["score.png"]);
  scoreText.x = 100;
  scoreText.y = 10;
  gameScene.addChild(scoreText);

  
  scoreDraw = new PIXI.Text(score, styleScore);
  scoreDraw.x = 220;
  scoreDraw.anchor.x = 1;
  scoreDraw.y = 8;
  gameScene.addChild(scoreDraw);
  
}

/*Build layout for result screen*/
function addResultScreen () {
  gameEnd = new Container();
  gameEnd.interactive = true;
  gameEnd.buttonMode = true;

  app.stage.addChild(gameEnd);

  // Add background
  bgResult1 = new Sprite(id["bg_01.png"]);
  gameEnd.addChild(bgResult1);

  bgResult2 = new Sprite(id["bg_02.png"]);
  bgResult2.x = 0;
  bgResult2.y = 79;

  gameEnd.addChild(bgResult2);
  bgResult3 = new Sprite(id["bg_03.png"]);
  bgResult3.y = 145;

  gameEnd.addChild(bgResult3);
  bgResult4 = new Sprite(id["bg_04.png"]);
  bgResult4.y = 208;

  gameEnd.addChild(bgResult4);
  var bgResult = new Graphics();
  bgResult.x = 0;
  bgResult.y = 0;

  //Add black overlay opacity 0.5
  bgResult.beginFill(0x000000, 0.5);
  bgResult.drawRect(0, 0, 240, 240);
  bgResult.endFill();
  gameEnd.addChild(bgResult);
  resultTitle = new Sprite(id["resultTitle.png"]);
  resultTitle.x = 120 - resultTitle.width/2;
  resultTitle.y = 5;
  gameEnd.addChild(resultTitle);

  // Add mole and molecount, point
  resultHera = new Sprite(id["resultHera.png"]);
  resultHera.x = 40;
  resultHera.y = 45;
  gameEnd.addChild(resultHera);

  heraMulti = new Sprite(id["multi.png"]);
  heraMulti.x = 113;
  heraMulti.y = 62;
  gameEnd.addChild(heraMulti);


  heraCount = new PIXI.Text(moleCount.hera, styleScore);
  heraCount.x = 175;
  heraCount.anchor.x = 1;
  heraCount.y = 60;
  gameEnd.addChild(heraCount);

  heraCountText = new Sprite(id["count.png"]);
  heraCountText.x = 194;
  heraCountText.y = 60;
  gameEnd.addChild(heraCountText);

  resultBoss = new Sprite(id["resultBoss.png"]);
  resultBoss.x = 33;
  resultBoss.y = 81;
  gameEnd.addChild(resultBoss);

  bossMulti = new Sprite(id["multi.png"]);
  bossMulti.x = 113;
  bossMulti.y = 103;
  gameEnd.addChild(bossMulti);

  bossCount = new PIXI.Text(moleCount.boss, styleScore);
  bossCount.x = 175;
  bossCount.anchor.x = 1;
  bossCount.y = 103;
  gameEnd.addChild(bossCount);

  bossCountText = new Sprite(id["count.png"]);
  bossCountText.x = 194;
  bossCountText.y = 103;
  gameEnd.addChild(bossCountText);

  resultQueen = new Sprite(id["resultQueen.png"]);
  resultQueen.x = 28;
  resultQueen.y = 126;
  gameEnd.addChild(resultQueen);

  queenMulti = new Sprite(id["multi.png"]);
  queenMulti.x = 113;
  queenMulti.y = 150;
  gameEnd.addChild(queenMulti);

  queenCount = new PIXI.Text(moleCount.queen, styleScore);
  queenCount.x = 175;
  queenCount.anchor.x = 1;
  queenCount.y = 153;
  gameEnd.addChild(queenCount);

  queenCountText = new Sprite(id["count.png"]);
  queenCountText.x = 194;
  queenCountText.y = 151;
  gameEnd.addChild(queenCountText);

  total = new Sprite(id["total.png"]);
  total.x = 23;
  total.y = 175;
  gameEnd.addChild(total);

  totalPoint = new PIXI.Text(score, styleScore);
  totalPoint.x = 175;
  totalPoint.anchor.x = 1;
  totalPoint.y = 183;
  gameEnd.addChild(totalPoint);

  totalPointText = new Sprite(id["point.png"]);
  totalPointText.x = 194;
  totalPointText.y = 177;
  gameEnd.addChild(totalPointText);

  // reload game
  gameEnd.on('pointerdown', function () {
    location.reload();
  })
}

function setup () {
  //Create an alias for the texture atlas frame ids
  id = resources["assets/images/whackmole.json"].textures;

  var heraLose = new Sprite(id["heraLose.png"]);
 
  // start screen
  addStartScreen();

  //game screen
  addSceneScreen();

  
  // Click to startscreen -> go to game screen
  startscreen.on('pointerdown', function () {
    gameStart.visible = false;
    gameScene.visible = true;
    play();
  });

 
  // handle hera mouse
  hera.forEach(function (mole, index) {
    mole.on('pointerdown', function () {
      whackMole(hera,index);
      console.log('hera: ' + moleCount.hera)
    })

  })
  // handle boss mouse
  boss.forEach(function (mole, index) {
    mole.on('pointerdown', function () {
      whackMole(boss,index);
      console.log('boss: ' +moleCount.boss)
    })
  })

  // handle queen mouse
  queen.forEach(function (mole, index) {
    mole.on('pointerdown', function () {
      whackMole(queen,index);
      console.log('queen: ' + moleCount.queen)
    })
  })
  clock.forEach(function (mole, index) {
    mole.on('pointerdown', function () {
      whackMole(clock,index);
    })
  })
 
  
}
function play() {
  gameHappen = setTimeout(function () {
    // Start text disappears after 3s
    start.visible = false;
    var countDown = setInterval(function(){
      countValue--;
      progressBar.outer.width -= timedown;
      if(countValue == 0) {
        gameScene.addChild(timeOver);
        clearInterval(countDown);
        timeOver.visible = true;
        setTimeout(function () {
          timeOver.visible = false;
          gameScene.visible = false;
          addResultScreen ();
        }, GAME_OVER)
      }
    },1000);
  }, GAME_START)

  
  var flag;

  app.ticker.add(delta => gameLoop());
}
/*
  Handle whack mole action
*/
var isRotation = [,false,false,false,false,false,false,false,false,false];
function whackMole(type, index) {
  if(!isClickHera[index]) {
    switch(type) {
      case hera: {
        moleCount.hera ++;
        score += 100; 
        scoreDraw.text = score;
        thunders[index].x = hera[index].x;
        thunders[index].y = hera[index].y - 20;
        hera[index].quarter = 1;
        hera[index].texture = id["heraLose.png"];
        isClickHera[index] = true;
      }
        break;
      case boss: {
        moleCount.boss ++;
        score += 1000; 
        scoreDraw.text = score;
        thunders[index].x = boss[index].x;
        thunders[index].y = boss[index].y - 20;
        boss[index].quarter = 1;
        boss[index].texture = id["bossLose.png"];
        isClickHera[index] = true;
      }
      break;
      case queen: {
        moleCount.queen ++;
        score += 10000; 
        scoreDraw.text = score;
        thunders[index].x = queen[index].x;
        thunders[index].y = queen[index].y - 20;
        queen[index].quarter = 1;
        queen[index].texture = id["queenLose.png"];
        isClickHera[index] = true;
      }
      break;
      case clock: {
        thunders[index].x = clock[index].x;
        thunders[index].y = clock[index].y - 20;
        clock[index].quarter = 1;
        clock[index].texture = id["timeup.png"];
        console.log('count trước: ' + countValue);
        countValue += 6;
        console.log('count sau: ' + countValue);
        progressBar.outer.width += 6*timedown;
      }
      
    }

    hammers[index].visible = true;
    hammers[index].anchor.x = 0.5;
    hammers[index].anchor.y = 0.5;
    isRotation[index] = true;
    console.log('trước')
    console.log(hammers[index].rotation)
    var a = hammers[index];
    // app.ticker.add(delta => rotationHammer(index));
    thunders[index].visible = true;
    console.log('sau')
    console.log(hammers[index].rotation)
    setTimeout(function () {
      hammers[index].visible = false;
      thunders[index].visible = false;
      isRotation[index] = false;
    //   hammers[index].rotation = 0;
    //   hammers[index].anchor.x = 0.5;
    // hammers[index].anchor.y = 0.5;
      console.log('out: ' + hammers[index].rotation)
    }, 300)
    
    
  }
}
function rotationHammer(index) {
  if(isRotation[index]) {
    hammers[index].rotation -= 0.05;
  }
  
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// set mole's animation
function playAnimate(itemHera) {
  var item;
  switch (itemHera) {
    case hera: item = id["hera.png"];
      break;
    case boss: item = id["boss.png"];
      break;
    case queen: item = id["queen.png"];
      break;
    case clock: item = id["clock.png"];
    break;
  }
  for(var i = 0; i < itemHera.length; i++) {
    if(itemHera[i].isplay) {
      if(itemHera[i].quarter === undefined) {
        itemHera[i].quarter = 1;
        itemHera[i].defaultY = itemHera[i].y;
      }
      switch (itemHera) {
        case hera: {
          if(itemHera[i].y < itemHera[i].defaultY - 52) { // when hera reaches the top
            itemHera[i].quarter = 0;
            moleDelay[i]++
          }
          if(moleDelay[i] == 20) { // delays 20
            itemHera[i].quarter = 1;
          }
        };
          break;
        case boss: {
          if(itemHera[i].y < itemHera[i].defaultY - 58) { // when boss reaches the top
            itemHera[i].quarter = 0;
            moleDelay[i]++
          }
          if(moleDelay[i] == 10) {//delays 10 
            itemHera[i].quarter = 1;
          }
        }
          break;
        case queen: {
          if(itemHera[i].y < itemHera[i].defaultY - 70) { // when queen reaches the top
            itemHera[i].quarter = 0;
            moleDelay[i]++
          }
          if(moleDelay[i] == 5) { //delays 5
            itemHera[i].quarter = 1;
          }
        };
          break;
        case clock: if(itemHera[i].y < itemHera[i].defaultY - 52) {// when queen reaches the top
          itemHera[i].quarter = 0;
          moleDelay[i]++
        }
        if(moleDelay[i] == 15) {
          itemHera[i].quarter = 1;
        };
        break;
      }
      
      if(itemHera[i].y > itemHera[i].defaultY - 1) { // mole at bottom
        itemHera[i].quarter = -1;
      }
      itemHera[i].animationSpeed = 5;
      itemHera[i].y += 1 * itemHera[i].quarter;
      // console.log('item ' + i +' ' + itemHera[i].y)
      if(itemHera[i].y > itemHera[i].defaultY - 1) { //mole downs bottom, reset mole
        itemHera[i].isplay = false;
        isClickHera[i] = false;
        itemHera[i].texture = item;
        moleDelay[i] = 0;
      }
    }
  }
}
var MAXTIME;
var timeInterval = 0;

var flagHera = 0;
var flagBoss = 0;
var flagClock = 0;
var posi;
var pos;

/* Random mole's position and sets animation */
function gameLoop(){
  if(countValue > 0) {// When game starts

    // The time of mole appearance decreases gradually as mole's kick increases
    if(moleCount.hera < 4) {
      MAXTIME = 70;
    } else if(moleCount.hera < 7) {
      MAXTIME = 60;
    } else if(moleCount.hera < 11) {
      MAXTIME = 50;
    } else if (moleCount.hera < 16) {
      MAXTIME = 45;
    } else if (moleCount.hera < 21) {
      MAXTIME = 40;
    }
    else if (moleCount.hera < 26) {
      MAXTIME = 35;
    } else if (moleCount.hera < 31) {
      MAXTIME = 30;
    } else {
      MAXTIME = 25;
    }
    timeInterval += 1;
    if(timeInterval > MAXTIME) {
      if(moleCount.boss % 10 == 0 && moleCount.boss > flagBoss){    // queen appears
        do {
          posi = randomInt(0, 8);
          flagBoss = moleCount.boss;
        } while(hera[posi].isplay && boss[posi].isplay && queen[posi.isplay && clock[posi.is]])
        if(!queen[posi].isplay){
          queen[posi].isplay = true;
         
        }
      } else if(moleCount.hera % 10 == 0 && moleCount.hera > flagHera) { // boss appears
        console.log('boss');
        do {
          posi = randomInt(0, 8);
          flagHera = moleCount.hera;
        } while(hera[posi].isplay && boss[posi].isplay && queen[posi.isplay && clock[posi.is]])
        if(!hera[posi].isplay && !boss[posi].isplay && !queen[posi.isplay] && !clock[posi.isplay]){
          boss[posi].isplay = true;
        }
      } else if(moleCount.hera % 12 == 0 && moleCount.hera > flagClock){ // clock appears
        do {
          posi = randomInt(0, 8);
        } while(hera[posi].isplay && boss[posi].isplay && queen[posi.isplay] && clock[posi.isplay])
        if(!hera[posi].isplay && !boss[posi].isplay && !queen[posi.isplay] && !clock[posi.isplay]){
          clock[posi].isplay = true;
          flagClock = moleCount.hera;
        }
      } else { // hera appears
        do {
          posi = randomInt(0, 8);
        } while(hera[posi].isplay && boss[posi].isplay && queen[posi.isplay] && clock[posi.isplay])
        if(!hera[posi].isplay && !boss[posi].isplay && !queen[posi.isplay] && !clock[posi.isplay]){
          hera[posi].isplay = true;
        }
      }
      timeInterval = 0;
    }
    playAnimate(hera);
    playAnimate(boss);
    playAnimate(queen);
    playAnimate(clock);
  }
}
