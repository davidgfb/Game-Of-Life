// ===================================================
// =               VARIABLES' SECTION                =
// ===================================================

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');


let win;               // Global reference to the main window's application.
let debug = false;     // Variable for the debugger's control.


var width = 1080;
var height = 825;


// ===================================================
// =                EVENTS' HANDLERS                  =
// ===================================================

// If the application is ready, it calls to the function CreateWindow() with
// the objetive of create the main window.
app.on('ready', () => {

  Debugger("The application is ready to start.");
  Debugger("IDM");
  CreateWindow();
});


// If all windows' application are closed, the application will be closed.
app.on('window-all-closed', () => {

  Debugger("Finished application.");
  app.quit();
});


// ===================================================
// =                   FUNCTIONS                     =
// ===================================================

/*
  - Name: CreateWindow.
  - Parameters: Void.
  - Objective: Create the main window's application with 950x760 resolution.
    This window will be shown when it has been completely rendered. If
    'closed' [window closed] event is emitted, the window's reference is
    deleted.
*/
function CreateWindow() {

  win = new BrowserWindow({width: width, height: height, show: false});
  win.setResizable(false);

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.once('ready-to-show', () => {
    Debugger("Window redered and ready to be shown.");
    Debugger("ODT");             // Shows the Development Tools
    win.show();
  });

  win.on('closed', () => {
    Debugger("'closed' event emmited. Window is closed.");
    win = null;
  });
}


/*
  - Name: Debugger.
  - Parameters: 'msg' -> String that provides debug information.
  - Objective: If the variable 'debug' is defined as 'true', the string
    contained in the argument 'msg' will be display by console. If
    'msg' === 'ODT' (Open Development Tools), the Development Tools will be
    shown. If 'msg' === 'IDM' (Init Development Mode), the screen's resolution
    will be modified to adapt itself to the Development Tools.
*/
function Debugger(msg) {
  if(debug){
    if(msg === "ODT"){
      win.webContents.openDevTools();
    }else if (msg === "IDM") {
      width = 2000;
    }
    else{
      console.log("[" + Date()+ "]: " + msg);
    }
  }
}
