const { app, BrowserWindow, Menu } = require('electron')
const path = require("path")
const url = require("url")
const isDev = process.env.NODE_ENV === "development"


function createWindow(){
    const win = new BrowserWindow({
        title: 'LeagueWare',
        width:  1920,
        height: 1080,
        minWidth: 800,
        minHeight: 600

        /*frame: false*/
    })
    win.loadURL("http://localhost:3000/")

    win.webContents.on('dom-ready', () => {
        /*win.webContents.executeJavaScript(`
            const body = document.querySelector('body');
            body.style.webkitAppRegion = 'drag';

        `);*/
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

