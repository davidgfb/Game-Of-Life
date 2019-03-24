// ===================================================
// =               VARIABLES' SECTION                =
// ===================================================

const WIDTH = 690;
const HEIGHT = 690;

let gridArr;           // Global reference to bidimensional array which
                       // represents the game's grid.

let cols = WIDTH/10;
let rows = HEIGHT/10;



// ===================================================
// =                    FUNCTIONS                    =
// ===================================================


/*
  - Name: initGrid.
  - Parameters: Void.
  - Objective: It initializes the game's grid and creates the array according
    to the said grid.
*/
function initGrid(){
  gridArr = create2DArray(cols, rows);
  drawGrid();
}


/*
  - Name: create2DArray.
  - Parameters: 'cols' -> Int that represents the number of colums in the array.
                'rows' -> Int that represents the number of rows in the array.
  - Objective: Returns a bidimensional array[x][y] of dimensions:
                  x = 'cols'
                  y = 'rows'
               which all its values are 0.
*/
function create2DArray(cols, rows){

  var arr = new Array(cols);

  for(var i = 0; i < arr.length; i++){          // |
    arr[i] = new Array(rows);                   // { Creates the array.
  }                                             // |


  for(var i = 0; i < arr.length; i++){          // |
    for(var j = 0; j < arr[i].length; j++){     // |
      arr[i][j] = 0;                            // { Initialize the array to 0.
    }                                           // |
  }                                             // |

  return arr;
}


/*
  - Name: reset2DArray.
  - Parameters: 'arr' -> Array[x][y] (bidimensional array).
  - Objective: Change all gameOfLife.map (bidimensional array) values to 0.
*/
function reset2DArray(arr){

  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < arr[i].length; j++){
      arr[i][j] = 0;
    }
  }

  gameOfLife.map = arr;
}


/*
  - Name: randomizeArray.
  - Parameters: 'arr' -> Array[x][y] (bidimensional array).
  - Objective: Change the gameOfLife.map values randomly oscillate
    between 0 and 1.
*/
function randomize2DArray(arr){

  var value;

  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < arr[i].length; j++){
      value = Math.round(Math.random());
      arr[i][j] = value
    }
  }

  gameOfLife.map = arr;
}


/*
  - Name: drawGrid.
  - Parameters: Void.
  - Objective: Take the HTML <canvas> element and draw a grid on it.
*/
function drawGrid(){

  var canvas = $("canvas");
  var ctx = canvas.getContext("2d");

  for(var i = 0; i <= WIDTH; i = i + 10){

    ctx.beginPath();
    ctx.strokeStyle = 'black';

    ctx.moveTo(i, 0);            // |
    ctx.lineTo(i, HEIGHT);       // }  DRAWS A LINE IN 'Y' AXIS
    ctx.stroke();                // |

    ctx.moveTo(0, i);            // |
    ctx.lineTo(WIDTH, i);        // }  DRAWS A LINE IN 'X' AXIS
    ctx.stroke();                // |
  }
}


/*
  - Name: paintCell.
  - Parameters: Void.
  - Objective: Paints a cell based on its index in gameOfLife.map array. Change
    the cell's status to its opposite.
*/
function paintCell(){

  var cellIndex = gameOfLife.clickToMapIndex();
  var canvas = $("canvas");
  var ctx = canvas.getContext("2d");


  if(gameOfLife.cellStatus(cellIndex.i, cellIndex.j)==0){
    ctx.fillStyle = 'black';
    ctx.fillRect(cellIndex.i*10,cellIndex.j*10,10,10);
  }else{
    ctx.fillStyle = 'white';
    ctx.clearRect((cellIndex.i*10)+1,(cellIndex.j*10)+1,9,9);
    drawGrid();
  }

  gameOfLife.changeCellStatus(cellIndex.i, cellIndex.j);
}


/*
  - Name: updateGrid.
  - Parameters: Void.
  - Objective: Check the status of each cell in the grid. It paints each
    cell:
      Black --> If the status is 1 (alive).
      White --> If the status is 0 (dead).
*/
function updateGrid(){

  var canvas = $("canvas");
  var ctx = canvas.getContext("2d");


  for(var i = 0; i < gameOfLife.map.length; i++){
    for(var j = 0; j < gameOfLife.map[i].length; j++){
      if(gameOfLife.cellStatus(i,j)==1){
        ctx.fillStyle = 'black';
        ctx.fillRect(i*10,j*10,10,10);
      }else{
        ctx.fillStyle = 'white';
        ctx.fillRect((i*10)+1,(j*10)+1,9,9);
      }
    }
  }
}
