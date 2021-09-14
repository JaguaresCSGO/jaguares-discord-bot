var httpRequest = require('../Jaguares/JaguaresApiHandle.js');
var CronJob = require('cron').CronJob;
var request = new httpRequest();

var job = new CronJob('* * * * * *', () => {
    request.request_call.then((response) => {



        console.log(response);



    }).catch((error) => {
        console.log(error);
    });
}, null, true, 'America/Sao_Paulo');

function updateFunction() {
    console.log("OLA");
}

function randomNumber() {
    console.log(Math.random());
}





job.start();