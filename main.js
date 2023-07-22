const { app, BrowserWindow, Menu, screen} = require('electron')
const path = require("path")
const url = require("url")
const isDev = process.env.NODE_ENV === "development"


function createWindow(){
    const {screenWidth, screenHeight} = screen.getPrimaryDisplay().workAreaSize;
    width = 1440;
    height = 800;

    const win = new BrowserWindow({
        title: 'LeagueWare',
        width:  width,
        height: height,
        minWidth: 800,
        minHeight: 600,
        x: Math.floor((screenWidth - width) / 2),
        y: Math.floor((screenHeight - height) / 2),

        /*frame: false*/
    })
    win.loadURL("http://localhost:3000/")


    win.webContents.on('dom-ready', () => {
        /*win.webContents.executeJavaScript(`
            const body = document.querySelector('body');
            body.style.webkitAppRegion = 'drag';

        `);*/
        //设置网页全局缩放为0.75
        win.webContents.zoomFactor = 0.75;
        win.webContents.insertCSS('::-webkit-scrollbar { display: none; }');
     });
}

app.whenReady().then(() => {
    createWindow()
    Menu.setApplicationMenu(null)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0){
            createWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin"){
        app.quit()
    }
})

