const contextBridge = require('electron')
const fs = require("fs");
const https = require("https");
const axios = require("axios");


const HTTPHEADERJSON = "application/json"
const HTTPMETHODPOST = "POST"
const HTTPMETHODGET = "GET"
const HTTPMETHODDELETE = "DELETE"

const LCUSUMMONERINFO = "/lol-summoner/v1/current-summoner"

var appPort = "";
var remotingAuthToekn = "";
var appPid = "";
var clientInfo = new Map();
var res = "";






window.exposeClient = {
    clientInfo
}