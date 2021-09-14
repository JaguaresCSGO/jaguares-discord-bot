module.exports = class JaguaresApiHandle {

    #apiUrl
    #apiEndPoint
    #apiToken
    #return = null

    constructor(apiUrl, apiEndPoint, apiToken) {
        this.#apiUrl = apiUrl
        this.#apiEndPoint = apiEndPoint
        this.#apiToken = apiToken
    }

    requestVips() {
        const https = require('https')
        var arr = Array()

        const options = {
            hostname: this.#apiUrl,
            port: 443,
            path: this.#apiEndPoint,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla',
                'Authorization': this.#apiToken
            }
        }

        const req = https.request(options, res => {
            res.on('data', (d) => {
                this.#return = JSON.parse(d.toString())
            });
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    }

    returnData() {
        return this.#return;
    }

    request_call = new Promise((resolve, reject) => {
        const config = require("../../config.json");
        const https = require('https')
        var arr = Array()

        const options = {
            hostname: config.API_URL,
            port: 443,
            path: config.API_ENDPOINT,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla',
                'Authorization': config.API_TOKEN
            }
        }

        const req = https.request(options, res => {
            res.on('data', (d) => {
                //this.#return = JSON.parse(d.toString())
                resolve(JSON.parse(d.toString()));
            });
        })

        req.on('error', error => {
            //console.error(error)
            reject(error);
        })

        req.end()
    });

}