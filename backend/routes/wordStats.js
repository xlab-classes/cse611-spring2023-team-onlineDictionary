const router = require('express').Router();
var request = require('request');
const axios = require('axios');
const fs = require('fs')

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
        else {
            response.send({ "trendingWords": ["online", "dictionary"] })
        }
    });
});

router.get('/wordoftheday', (_, response) => {
    // var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getWordOfDay',
        'headers': {
        },
        'json': true
    };
    request(options, function (error, res) {
        if (error) throw new Error(error);
        console.log(res.body);
        if (res.body) {
            response.send({ "wordoftheDay": res.body })
        }
        else {
            response.send({ "wordoftheDay": "dictionary" })
        }
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


router.get('/getstatistics', (_, response) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getStatistics',
        headers: {}
    };

    axios.request(config)
        .then((res) => {
            const date = new Date();
            const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            const filename = `${dateString}.txt`;
            try {
            const requestsToday = fs.readFileSync(filename, "utf-8").trim();
            if(!requestsToday){
                requestsToday = 0
            } 
            res.data[0]["meanings searched today"] = requestsToday
            console.log(JSON.stringify(res.data));
            }catch (err) {}
            response.send(res.data[0])
        })
        .catch((error) => {
            console.log(error);
        });


})

router.get('/getNewWords', (req, response) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getNewWords?requestedState='+req.query.requestedState,
        headers: {}
    };
    console.log(config)
    axios.request(config)
        .then((res) => {
            response.send(res.data)
        })
        .catch((error) => {
            console.log(error);
        });
})
// https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getNewWords?requestedState=New
router.post('/adminWord', (request, response) => {
    word = request.body.word
    let data = {
        word: word,
        state: request.body.state
    }

    if (request.body.state == "accept") {
        wordData = {
            word: word,
            usage: [{
                pos: "general",
                definitions: [{
                    definition: {
                        gloss: request.body.meaning,
                        source: "Online Dictionary"
                    },
                    examples: []
                }],
                etymology_text: "",
                etymology_number: 0,
                audio:[]
            }]

        }
        data.wordData = wordData
    }
    let config = {
        method: 'post',
        url: 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/acceptRejectWord',
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