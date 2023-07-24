/*import fetch from "node-fetch";*/
import constant from "./constant";

export class Summoner {

    constructor(port, token) {
        this.port = port;
        this.token = token;
    }


    getName(port, token) {
        var res = "";
        /*const response = fetch("https://127.0.0.1:" + port + constant.plugins.SUMMONER,     {
            method: constant.methods.GET,
            headers: {
                "Authorization": "Basic: " + btoa("riot:" + token),
                "Content-Type": constant.httpHeaders.JSON,
                "Accept": constant.httpHeaders.JSON
            }
        });*/
        const xhr = new XMLHttpRequest();
        const url = "https://127.0.0.1:" + port + constant.plugins.SUMMONER;
        xhr.open(constant.methods.GET, url);
        xhr.setRequestHeader("Authorization", "Basic: "+ btoa("riot:" + token));
        xhr.setRequestHeader("Content-Type", constant.httpHeaders.JSON);
        xhr.setRequestHeader("Accept", constant.httpHeaders.JSON);
        xhr.send();
        xhr.onreadystatechange = (e) => {
            res = xhr.responseText;
        }
        return res;
    }
}
