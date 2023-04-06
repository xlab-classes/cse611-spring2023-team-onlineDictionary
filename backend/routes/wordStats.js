const router = require('express').Router();
var request = require('request');

router.get('/trendingword', (_, response) => {

    var options = {
        'method': 'GET',
        'url': 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getWordOfDay',
        'headers': {
        },
        'json':true
    };
    request(options, function (error, res) {
        if (error) throw new Error(error);
        console.log("_____________________")
        console.log(res.body);
        console.log("_____________________")
        if(res.body[0]){

            response.send({"trendingWord":res.body[0].word})
        }
    });
});

router.get('/wordoftheday', (_, response) => {
    // var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getNewWord',
        'headers': {
        },
        'json':true
    };
    request(options, function (error, res) {
        if (error) throw new Error(error);
        console.log(res.body);
        response.send({"wordoftheDay":res.body[0].word})
    });
})

module.exports = router;
