const { app, BrowserWindow, Menu } = require('electron')
const path = require("path")
const url = require("url")
const isDev = process.env.NODE_ENV === "development"

function createWindow(){
    const win = new BrowserWindow({
        title: 'LeagueWare Beta version V1.0.0',
        width: isDev ? 1000 : 800,
        height: 600,
        minWidth: 800,
        minHeight: 600
    })
    win.loadURL("http://localhost:3000/")
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

