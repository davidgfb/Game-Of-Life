// ===================================================
// =                  ONLOAD FUNCTION                =
// ===================================================

// It will be executed when the window has been fully loaded.
window.onload = function(){

  initGrid();
  initEventListeners();
  gameOfLife = createGOL(gridArr);
}


// ===================================================
// =                GAME OF LIFE OBJECT              =
// ===================================================

function createGOL(gridArr){

  return gameOfLife = {

    status: 0,        // |  * Falta por hacer tanto el número de células vivas como la velocidad.
    gen: 0,           // |
    cells: 0,         // }    gameOfLife propertie's
    map: gridArr,     // |
    speed: 1,         // |


    /*
      - Name: changeStatus.
      - Parameters: Void.
      - Objective: It alternates the status game. 'status' == 0 means that the
        game is stopped, 'status' == 1 means that the game is running.
    */
    changeStatus: function(){

      if(this.status == 0){
        this.status = 1;
      }
      else{
        this.status = 0;
      }
    },


    /*
      - Name: updateGen.
      - Parameters: Void.
      - Objective: Increase the propertie 'gen' that represents the game's
        generation.
    */
    updateGen: function(){this.gen++;},


    /*
      - Name: cellStatus.
      - Parameters: 'i','j' --> Represents the cell's index in the array.
      - Objective: Returns the cell's status [0(dead), 1(alive)].
    */
    cellStatus: function(i,j){
      return this.map[i][j];
    },


    /*
      - Name: changeCellStatus.
      - Parameters: 'i','j' --> Represents the cell's index in the array.
      - Objective: It changes the cell's status [0(dead), 1(alive)] to the
        initial opposite value.
    */
    changeCellStatus: function(i,j){

      if(this.cellStatus(i,j) == 0){
        this.map[i][j] = 1;
      }else{
        this.map[i][j] = 0;
      }
    },


    /*
      - Name: resetProperties.
      - Parameters: Void.
      - Objective: Reset the properties of the object gameOfLife.
    */
    resetProperties: function (){

      gameOfLife.gen = 0;
      gameOfLife.status = 0;
      gameOfLife.cells = 0;
      gameOfLife.speed = 1;
    },


    /*
      - Name: clickToMapIndex.
      - Parameters: Void.
      - Objective: It takes the mouse click's coordinates on the canvas and
        translates them to an array index.
    */
    clickToMapIndex: function(){

      var x = mouseClick.x;
      var y = mouseClick.y;

      x = Math.floor(x/10);
      y = Math.floor(y/10);

      return { i: x, j: y };

    },


    /*
      - Name: countNeighbours.
      - Parameters: 'i','j' --> Represents the cell's index in the array.
      - Ojective: Returns how many neighbours a cell has.
    */
    countNeighbours: function(i,j){

      var count = 0;

      // UPPER LEFT CORNER.
      if(i == 0 && j == 0){
        if(gameOfLife.map[i+1][j] == 1){count++;}
        if(gameOfLife.map[i+1][j+1] == 1){count++;}
        if(gameOfLife.map[i][j+1] == 1){count++;}

      // LOWER LEFT CONRNER.
      }else if(i == 0 && j == (gameOfLife.map.length-1)){
        if(gameOfLife.map[i][j-1] == 1){count++;}
        if(gameOfLife.map[i+1][j-1] == 1){count++;}
        if(gameOfLife.map[i+1][j] == 1){count++;}

      // UPPER RIGHT CORNER.
      }else if(i == (gameOfLife.map.length - 1) && j == 0){
        if(gameOfLife.map[i-1][j] == 1){count++;}
        if(gameOfLife.map[i-1][j+1] == 1){count++;}
        if(gameOfLife.map[i][j+1] == 1){count++;}

      // LOWER RIGHT CORNER.
      }else if(i == (gameOfLife.map.length-1) && j == i){
        if(gameOfLife.map[i][j-1] == 1){count++;}
        if(gameOfLife.map[i-1][j-1] == 1){count++;}
        if(gameOfLife.map[i-1][j] == 1){count++;}

      // UPPER ROW. (NO CORNERS)
      }else if(j == 0 && (i != 0 && i != (gameOfLife.map.length-1))){
        if(gameOfLife.map[i-1][j] == 1){count++;}
        if(gameOfLife.map[i+1][j] == 1){count++;}
        if(gameOfLife.map[i-1][j+1] == 1){count++;}
        if(gameOfLife.map[i][j+1] == 1){count++;}
        if(gameOfLife.map[i+1][j+1] == 1){count++;}

      // LOWER ROW. (NO CORNERS)
      }else if(j == (gameOfLife.map.length-1) && (i != 0 && i != (gameOfLife.map.length-1))){
        if(gameOfLife.map[i-1][j] == 1){count++;}
        if(gameOfLife.map[i+1][j] == 1){count++;}
        if(gameOfLife.map[i-1][j-1] == 1){count++;}
        if(gameOfLife.map[i][j-1] == 1){count++;}
        if(gameOfLife.map[i+1][j-1] == 1){count++;}

      // LEFT COLUMN. (NO CORNERS)
      }else if(i == 0 && (j != 0 && j != (gameOfLife.map.length-1))){
        if(gameOfLife.map[i][j-1] == 1){count++;}
        if(gameOfLife.map[i][j+1] == 1){count++;}
        if(gameOfLife.map[i+1][j-1] == 1){count++;}
        if(gameOfLife.map[i+1][j] == 1){count++;}
        if(gameOfLife.map[i+1][j+1] == 1){count++;}

      // RIGHT COLUMN. (NO CORNERS)
      }else if(i == (gameOfLife.map.length-1) && (j != 0 && j != (gameOfLife.map.length-1))){
        if(gameOfLife.map[i-1][j-1] == 1){count++;}
        if(gameOfLife.map[i-1][j] == 1){count++;}
        if(gameOfLife.map[i-1][j+1] == 1){count++;}
        if(gameOfLife.map[i][j-1] == 1){count++;}
        if(gameOfLife.map[i][j+1] == 1){count++;}

      // THE REST OF CASES.
      }else{
        if(gameOfLife.map[i-1][j-1] == 1){count++;}
        if(gameOfLife.map[i-1][j] == 1){count++;}
        if(gameOfLife.map[i-1][j+1] == 1){count++;}
        if(gameOfLife.map[i][j-1] == 1){count++;}
        if(gameOfLife.map[i][j+1] == 1){count++;}
        if(gameOfLife.map[i+1][j-1] == 1){count++;}
        if(gameOfLife.map[i+1][j] == 1){count++;}
        if(gameOfLife.map[i+1][j+1] == 1){count++;}

      }

      return count;
    },


    /*
      - Name: updateGOL.
      - Parameters: Void.
      - Objective: Update the gameOfLife.map array for the next
        generation.
    */
    updateGOL: function(){

      var auxArray = create2DArray(cols, rows);
      var auxStatus;
      var neighbours;

      for(var i = 0; i < auxArray.length; i++){
        for(var j = 0; j < auxArray.length; j++){

          neighbours = gameOfLife.countNeighbours(i,j);
          auxStatus = gameOfLife.rules(gameOfLife.cellStatus(i,j), neighbours);
          auxArray[i][j] = auxStatus;

        }
      }

      gameOfLife.map = auxArray;
      gameOfLife.updateGen();

    },


    /*
      - Name: rules.
      - Parameters: 'cellStat' --> Represents the status of a cell (Alive or dead).
                    'neighbours' --> Number alives cells that the cell has.
      - Objective: Apply the rules of Game Of Life.

    */
    rules: function(cellStat, neighbours){

      var nextStatus;

      if(cellStat == 0 && (neighbours == 3)){
        nextStatus = 1;
      }else if(cellStat == 1){
        if(neighbours > 1 && neighbours < 4){
          nextStatus = 1;
        }else{
          nextStatus = 0;
        }
      }else{
        nextStatus = cellStat;
      }

      return nextStatus;
    }
  }
}
