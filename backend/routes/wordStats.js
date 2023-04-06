const router = require('express').Router();
var request = require('request');

router.get('/trendingword', (_, response) => {

    var options = {
        'method': 'GET',
        'url': 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getTrendingWords',
        'headers': {
        },
        'json': true
    };
    request(options, function (error, res) {
        if (error) throw new Error(error);
        if (res.body[0]) {
            response.send({ "trendingWords": res.body.map(a => a.word) })
        }
    });
});

router.get('/wordoftheday', (_, response) => {
    // var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getTrendingWords',
        'headers': {
        },
        'json': true
    };
    request(options, function (error, res) {
        if (error) throw new Error(error);
        // console.log(res.body);
        response.send({ "wordoftheDay": res.body[Math.floor(Math.random() * res.body.length)].word })
    });
})

router.post('/addNewWord', (request, response) => {
    word = request.body.word
    let data = JSON.stringify({
        "word": word
    });

    let config = {
        method: 'post',
        url: 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/addNewWord',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
})

module.exports = router;
