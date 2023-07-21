const { app, BrowserWindow, Menu } = require('electron')
const path = require("path")
const url = require("url")
const isDev = process.env.NODE_ENV === "development"


function createWindow(){
    const win = new BrowserWindow({
        title: 'LeagueWare',
        width:  1920,
        height: 1080,
        minWidth: 1920,
        minHeight: 1080
        /*frame: false*/
    })
    win.loadURL("http://localhost:3000/")

    // win.webContents.on('dom-ready', () => {
    //     win.webContents.executeJavaScript(`
    //         const body = document.querySelector('body');
    //         body.style.webkitAppRegion = 'drag';
    //     `);
    // });
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

