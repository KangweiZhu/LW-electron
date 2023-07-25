const { app, BrowserWindow, Menu, screen, ipcMain, ipcRenderer, shell, net } = require("electron");
const { exec } = require("child_process");
const sudo = require("sudo-prompt");
const path = require("path");
const url = require("url");
const fs = require("fs");
const axios = require("axios");
const https = require("https");

const HTTPHEADERJSON = "application/json";
const HTTPMETHODPOST = "POST";
const HTTPMETHODGET = "GET";
const HTTPMETHODDELETE = "DELETE";

const LCUSUMMONERINFO = "/lol-summoner/v1/current-summoner";

let appPort;
let remotingAuthToekn;
let appPid;

let mainWindow;

function createWindow() {
  const { screenWidth, screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  width = 1440;
  height = 800;
  const win = new BrowserWindow({
    title: "LeagueWare",
    width: width,
    height: height,
    minWidth: 800,
    minHeight: 600,
    x: Math.floor((screenWidth - width) / 2),
    y: Math.floor((screenHeight - height) / 2),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.webContents.openDevTools();
  win.loadURL("http://localhost:3000/");
  win.webContents.on("dom-ready", () => {
    //设置网页全局缩放为0.75
    win.webContents.zoomFactor = 0.75;
    //通过css设置不显示丑陋的滚动条。
    win.webContents.insertCSS("::-webkit-scrollbar { display: none; }");
  });
  return win;
}


app.commandLine.appendSwitch("ignore-certificate-errors");

app.whenReady().then(() => {
  const findPortBatPath = path.join(__dirname, "find_port.bat");
  exec(findPortBatPath);
  mainWindow = createWindow();
  Menu.setApplicationMenu(null);

  /*script();*/

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


//这三坨const和function就是为了提高下代码复用性，懒得另写js了，也懒得探索新的库。后续再改把。
const localhostUrl = "https://127.0.0.1:";

//以上代码都是例行公事，可以直接忽略。


//以下所有代码都是能跑的狗屎。为了防止以后看不懂，特地加了注释。


// 将cmd中的参数提取到文件。然后读文件，找到app-port和remotingAuthToken, 这俩个key对应的值，
fs.readFile("client-port.txt", "utf16le", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  const rawArr = data.split(" ");
  for (let i = 0; i < rawArr.length; i++) {
    var raw = rawArr[i].toString();
    var modifiedString = raw.replace(/"/g, "");
    var parts = modifiedString.split("=");
    if (i === 1400) {
      appPort = parts[1];
    }
    if (i === 1399) {
      remotingAuthToekn = parts[1];
    }
    if (i === 1411) {
      appPid = parts[1];
    }
  }

  //读完了，然后这个agent是为了避免证书的问题。可以把const agent注释掉，保证可以复现错误。
  //solve [26884:0724/140812.185:ERROR:cert_verify_proc_builtin.cc(702)] CertVerifyProcBuiltin for 127.0.0.1 failed error
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  //构造headers,没啥好说的。注意，拳头的token并不是单纯的cmd读出来的值。需要先将读出来的值前面加上“riot:"，然后base64加密，最后在加密结果前加上Basic加空格. 这才是最终的token
  const requestHeaders = {
    headers: {
      Authorization: "Basic " + btoa("riot:" + remotingAuthToekn),
      Accept: HTTPHEADERJSON,
      responseType: "json",
    },
    httpsAgent: agent,
  };
  //构建一下请求地址。
  let reqUrl = localhostUrl + appPort + LCUSUMMONERINFO;
  console.log("Basic " + btoa("riot:" + remotingAuthToekn));

  console.log(reqUrl);
  //注意，ipcMain.on(字符串，(e,args) => xxxxxx    这个字符串我们管他叫channel. 其实就是字符串匹配。你在前端，也就是react中，得先在这个相同的字符串channel发送条消息给这里，
  //大白话就是唤醒electron，告诉electron，我网页加载到这儿了，你可以给我传点可以渲染的东西。 那么electron为了能被唤醒，就得用ipcMain接受着。
  //ps: ipcMain 写在electron, ipcRenderer写在react.不可呼唤。  两者都有on和send方法，on表示监听，send表示发送。
  //这里接受到了来自layouts/dashboard/components/welcomeMark.js的提醒，然后才会执行下面代码。
  ipcMain.on("react-effect-loaded", (event, args) => {
    //发个get请求。带上url和header
    axios.get(reqUrl, requestHeaders)
      .then(response => {
        let responseData = JSON.stringify(response.data);
        const summonerInfo = JSON.parse(responseData);
        //注意这里，你通过webContent，向“"data-to-react" channel发了个数据。因此，为了接受这条数据，你需要在layouts/dashboard/components/welcomeMark.js
        //中用ipcRenderer.on（”data-to-react", xxx)监听，大白话就是等着接受这个数据。具体去看代码吧。到此，第一个数据就从electron发往react了。
        //ps：第一个请求就写的这么恶心。和写java项目相比，百度完全提供不了有用信息。
        mainWindow.webContents.send("data-to-react", summonerInfo);
      });
  });

  //第二个数据：搞一下用户排位数据，用于在profile的header.js中展示
  //1.构建url
  let reqUrl2 = localhostUrl + appPort + "/lol-ranked/v1/current-ranked-stats";
  console.log(reqUrl2)
  ipcMain.on("request-for-current-ranked-stats", (event, args) => {
    console.log("entered");
    axios.get(reqUrl2, requestHeaders).then(response => {
      let responseData = JSON.stringify(response.data);
      let jsonData = JSON.parse(responseData);
      mainWindow.webContents.send("send-current-ranked-stats", jsonData);
    })
  })


  //
});


