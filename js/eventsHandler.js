// ===================================================
// =               VARIABLES' SECTION                =
// ===================================================

let interval;   // Used to stop the game.

// ===================================================
// =             EVENTS LISTENER FUNCTION            =
// ===================================================

function initEventListeners(){

  var canvas = $("canvas");
  canvas.addEventListener('mousedown', clickOnCanvas);

  var startButton = $("start-button");
  startButton.addEventListener('click',startGame);

  var stopButton = $("stop-button");
  stopButton.addEventListener('click',stopGame);

  var resetButton = $("reset-button");
  resetButton.addEventListener('click', resetGame);

  var randomButton = $("random-button");
  randomButton.addEventListener('click', randGame);

  var exitButton = $("exit-button");
  exitButton.addEventListener('click', exit);
}


// ===================================================
// =                    FUNCTIONS                    =
// ===================================================

/*

  COMENTAR CUANDO EL PROGRAMA ESTÉ TERMINADO

*/
function startGame(){

  gameOfLife.status = 1;
  interval = setInterval(function(){

    gameOfLife.updateGOL();
    updateGrid();
  }, 100);
}


/*
  - Name: stopGame.
  - Parameters: Void.
  - Objective: Stops the game and change the game's status.
*/
function stopGame(){

  gameOfLife.status = 0;
  clearInterval(interval);
}


/*


*/
function resetGame(){

  reset2DArray(gameOfLife.map);
  gameOfLife.resetProperties();
  updateGrid();
}


/*
  - Name: randGame.
  - Parameters: Void.
  - Objective: Calls randomizeArray() function if the game's status is
    stopped (0). Else an alert will be displayed.
*/
function randGame(){

  var count;

  if(gameOfLife.status == 0){
    randomize2DArray(gameOfLife.map);
    updateGrid();
  }else{
    alert("Cannot randomize game. The Game of Life is running");
  }
}



/*
  - Name: clickOnCanvas.
  - Parameters: 'event' --> The current event ('mousedown').
  - Objective: It saves the mouse click's coordinates inside the global
    variable 'mouseClick'. (Only if the state's game is 0[stopped])
*/
function clickOnCanvas(event){

  if(gameOfLife.status == 0){

    var canvas = $("canvas");
    var x = event.x - canvas.offsetLeft;
    var y = event.y - canvas.offsetTop;
    mouseClick = { "x": x, "y": y };

    paintCell();
  }
}


/*
  - Name: exit.
  - Parameters: Void.
  - Objective: Close the window, so the application will be closed.
*/
function exit(){window.close();}
