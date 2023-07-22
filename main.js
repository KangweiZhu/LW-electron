const {app, BrowserWindow, Menu, screen, ipcMain, ipcRenderer, shell} = require('electron')
const {exec} = require('child_process')
const sudo = require('sudo-prompt');
const path = require("path")
const url = require("url")
const fs = require("fs")
function createWindow() {
    const {screenWidth, screenHeight} = screen.getPrimaryDisplay().workAreaSize;
    width = 1440;
    height = 800;

    const win = new BrowserWindow({
        title: 'LeagueWare',
        width: width,
        height: height,
        minWidth: 800,
        minHeight: 600,
        x: Math.floor((screenWidth - width) / 2),
        y: Math.floor((screenHeight - height) / 2),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.loadURL("http://localhost:3000/")
    win.webContents.on('dom-ready', () => {
        //设置网页全局缩放为0.75
        win.webContents.zoomFactor = 0.75;
        //通过css设置不显示丑陋的滚动条。
        win.webContents.insertCSS('::-webkit-scrollbar { display: none; }');
    });

}

app.whenReady().then(() => {
    const findPortBatPath = path.join(__dirname, "find_port.bat");
    exec(findPortBatPath);
    readFile();
    createWindow()
    Menu.setApplicationMenu(null)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})


function readFile(){
    fs.readFile('client-port.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        const authToken = extractAuthTokenFromText(data);
        console.log(authToken)
    });

}

function extractAuthTokenFromText(text) {
    const tokenStart = text.indexOf("--riotclient-auth-token=");
    if (tokenStart === -1) {
        return null; // Token not found
    }

    const tokenEnd = text.indexOf(" ", tokenStart);
    if (tokenEnd === -1) {
        return text.slice(tokenStart); // Token is at the end of the string
    }

    return text.slice(tokenStart, tokenEnd);
}