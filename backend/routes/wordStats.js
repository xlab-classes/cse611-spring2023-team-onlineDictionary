const router = require('express').Router();
var request = require('request');
const axios = require('axios');
const fs = require('fs')


router.get('/trendingword', (_, response) => {

    // var options = {
    //     'method': 'GET',
    //     'url': 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getTrendingWords',
    //     'headers': {
    //     },
    //     'json': true
    // };
    // request(options, function (error, res) {
    //     if (error){
    //         console.log(error)
    //     }

    //     if (res.body && res.body[0]) {
    //         trendingWords = {}
    //         // response.send({ "trendingWords": res.body.map(a => a.word) })
    //         for (i of res.body) {
    //             trendingWords[i.word] = i.meaning
    //         }
    //         response.send(trendingWords)
    //     }
    //     else {
    //         response.send({
    //             "online": "available on or performed using the internet or other computer network",
    //             "dictionary": "a book or electronic resource that lists the words of a language"
    //         })
    //     }
    // });

    let data = JSON.stringify({
        "selector": {
            'type': 'word_logs',
            "wordFound": true
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apikey-v2-1n8q2t2364bw148ftwzc0j6a0n65l047vmdasejkgczn:0768e70486e28d354c46b345c0cdb5f3@dec4d4f2-acae-428a-be32-ddb04da38212-bluemix.cloudantnosqldb.appdomain.cloud/onlinedictionary/_find',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YXBpa2V5LXYyLTFuOHEydDIzNjRidzE0OGZ0d3pjMGo2YTBuNjVsMDQ3dm1kYXNlamtnY3puOjA3NjhlNzA0ODZlMjhkMzU0YzQ2YjM0NWMwY2RiNWYz'
        },
        data: data
    };

    axios.request(config)
        .then((DBResponse) => {
            trendingWords = {}
            // console.log((DBResponse.data.docs));
            DBResponse.data.docs.sort((a, b) => b.count - a.count);
            wordMeaningList = DBResponse.data.docs.map(doc => ([doc.word, doc.meaning]))

            for (pair of wordMeaningList) {
                trendingWords[pair[0]] = pair[1]
            }

            response.send(trendingWords)
        })
        .catch((error) => {
            response.send({
                "online": "available on or performed using the internet or other computer network",
                "dictionary": "a book or electronic resource that lists the words of a language"
            })
            console.log(error)
        });
});

router.get('/wordoftheday', (_, response) => {
    // var options = {
    //     'method': 'GET',
    //     'url': 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getWordOfDay',
    //     'headers': {
    //     },
    //     'json': true
    // };
    // request(options, function (error, res) {
    //     if (error) throw new Error(error);
    //     if (res.body) {
    //         response.send(res.body)
    //     }
    //     else {
    //         response.send({ "word": "dictionary", "meaning": "a book or electronic resource that lists the words of a language (typically in alphabetical order) and gives their meaning, or gives the equivalent words in a different language, often also providing information about pronunciation, origin, and usage", "pos": {} })
    //     }
    // });
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return year + month + day;
    }

    // Create the file name
    const currentDate = new Date();
    const fileName = `wordoftheday-${formatDate(currentDate)}.txt`;
    const fs = require('fs');

    const filePath = fileName;

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('word of the day File does not exist');
            let data = JSON.stringify({
                "selector": {
                    'type': 'word_logs',
                    "wordFound": true
                }
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://apikey-v2-1n8q2t2364bw148ftwzc0j6a0n65l047vmdasejkgczn:0768e70486e28d354c46b345c0cdb5f3@dec4d4f2-acae-428a-be32-ddb04da38212-bluemix.cloudantnosqldb.appdomain.cloud/onlinedictionary/_find',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic YXBpa2V5LXYyLTFuOHEydDIzNjRidzE0OGZ0d3pjMGo2YTBuNjVsMDQ3dm1kYXNlamtnY3puOjA3NjhlNzA0ODZlMjhkMzU0YzQ2YjM0NWMwY2RiNWYz'
                },
                data: data
            };

            axios.request(config)
                .then((DBResponse) => {
                    const randomIndex = Math.floor(Math.random() * DBResponse.data.docs.length);
                    // console.log(randomIndex)
                    const randomDoc = DBResponse.data.docs[randomIndex];
                    response.send({
                        "word": randomDoc.word,
                        "meaning": randomDoc.meaning,
                        "pos": randomDoc.pos
                    })

                    const jsonData = JSON.stringify({
                        "word": randomDoc.word,
                        "meaning": randomDoc.meaning,
                        "pos": randomDoc.pos
                    }, null, 2);

                    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
                        if (err) {
                            console.error('Error writing to file:', err);
                        } else {
                            console.log('word of the day file created');
                        }
                    });
                })
                .catch((error) => {
                    response.send({ "word": "dictionary", "meaning": "a book or electronic resource that lists the words of a language (typically in alphabetical order) and gives their meaning, or gives the equivalent words in a different language, often also providing information about pronunciation, origin, and usage", "pos": "noun" })
                    console.log(error)
                });
        } else {
            console.log('File exists');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.log('Error reading the file:', err);
                } else {
                    console.log('File contents:', data);
                    const jsonData = JSON.parse(data);
                    response.send(jsonData)
                }
            });

        }
    });

})

router.post('/addNewWord', (request, response) => {

    // word = request.body.word
    // let data = JSON.stringify({
    //     "word": word
    // });

    // let config = {
    //     method: 'post',
    //     url: 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/addNewWord',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data: data
    // };

    // axios.request(config)
    //     .then((response) => {
    //         console.log(JSON.stringify(response.data));
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    word = request.body.word

    let data = JSON.stringify({
        'type': 'review_words',
        "word": word,
        "state": "New"
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apikey-v2-1n8q2t2364bw148ftwzc0j6a0n65l047vmdasejkgczn:0768e70486e28d354c46b345c0cdb5f3@dec4d4f2-acae-428a-be32-ddb04da38212-bluemix.cloudantnosqldb.appdomain.cloud/onlinedictionary',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YXBpa2V5LXYyLTFuOHEydDIzNjRidzE0OGZ0d3pjMGo2YTBuNjVsMDQ3dm1kYXNlamtnY3puOjA3NjhlNzA0ODZlMjhkMzU0YzQ2YjM0NWMwY2RiNWYz'
        },
        data: data
    };

    axios.request(config)
        .then((DBResponse) => {
            console.log(DBResponse.data)
            response.status(200).send('ok')
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
                if (!requestsToday) {
                    requestsToday = 0
                }
                res.data[0]["meanings searched today"] = requestsToday
                console.log(JSON.stringify(res.data));
            } catch (err) { }
            response.send(res.data[0])
        })
        .catch((error) => {
            console.log(error);
        });


})

router.get('/getNewWords', (req, response) => {
    // let config = {
    //     method: 'get',
    //     maxBodyLength: Infinity,
    //     url: 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getNewWords?requestedState=' + req.query.requestedState,
    //     headers: {}
    // };
    // axios.request(config)
    //     .then((res) => {
    //         response.send(res.data)
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });



    let data = JSON.stringify({
        "selector": {
            'type': 'review_words',
            "state": req.query.requestedState
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apikey-v2-1n8q2t2364bw148ftwzc0j6a0n65l047vmdasejkgczn:0768e70486e28d354c46b345c0cdb5f3@dec4d4f2-acae-428a-be32-ddb04da38212-bluemix.cloudantnosqldb.appdomain.cloud/onlinedictionary/_find',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YXBpa2V5LXYyLTFuOHEydDIzNjRidzE0OGZ0d3pjMGo2YTBuNjVsMDQ3dm1kYXNlamtnY3puOjA3NjhlNzA0ODZlMjhkMzU0YzQ2YjM0NWMwY2RiNWYz'
        },
        data: data
    };

    axios.request(config)
        .then((DBResponse) => {
            console.log(DBResponse)
            array = DBResponse.data.docs.map(doc => doc.word)
            res = []
            for (i of array) {
                res.push({ "word": i })
            }
            console.log(res)
            response.send(res)

        })
        .catch((error) => {
            console.log(error);
        });
})
// https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getNewWords?requestedState=New
router.post('/adminWord', (request, response) => {
    console.log('word', request.body.word)
    console.log('state ', request.body.state)
    word = request.body.word
    if (request.body.state == 'reject') {
        state = "Rejected"
    }
    else if (request.body.state == 'accept') {
        state = "Accepted"
    }
    else {
        state = "Added"
    }

    // if (state == 'Accepted' || state == "Rejected") {

    data = JSON.stringify({
        "selector": {
            'type': 'review_words',
            'word': word
        }
    });

    config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apikey-v2-1n8q2t2364bw148ftwzc0j6a0n65l047vmdasejkgczn:0768e70486e28d354c46b345c0cdb5f3@dec4d4f2-acae-428a-be32-ddb04da38212-bluemix.cloudantnosqldb.appdomain.cloud/onlinedictionary/_find',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YXBpa2V5LXYyLTFuOHEydDIzNjRidzE0OGZ0d3pjMGo2YTBuNjVsMDQ3dm1kYXNlamtnY3puOjA3NjhlNzA0ODZlMjhkMzU0YzQ2YjM0NWMwY2RiNWYz'
        },
        data: data
    };

    axios.request(config)
        .then((DBResponse) => {
            data = JSON.stringify({
                "_id": DBResponse.data.docs[0]._id,
                "_rev": DBResponse.data.docs[0]._rev,
                "word": word,
                "type": "review_words",
                "state": state
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://apikey-v2-1n8q2t2364bw148ftwzc0j6a0n65l047vmdasejkgczn:0768e70486e28d354c46b345c0cdb5f3@dec4d4f2-acae-428a-be32-ddb04da38212-bluemix.cloudantnosqldb.appdomain.cloud/onlinedictionary',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic YXBpa2V5LXYyLTFuOHEydDIzNjRidzE0OGZ0d3pjMGo2YTBuNjVsMDQ3dm1kYXNlamtnY3puOjA3NjhlNzA0ODZlMjhkMzU0YzQ2YjM0NWMwY2RiNWYz'
                },
                data: data
            }

            axios.request(config)
                .then((response) => {
                    console.log((response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });


    // }

    if (request.body.state == "add") {
        // data.wordData = wordData
        // data.manualAccept = request.body.manualAccept

        // let insertConfig = {
        //     method: 'post',
        //     maxBodyLength: Infinity,
        //     url: 'https://apikey-v2-1n8q2t2364bw148ftwzc0j6a0n65l047vmdasejkgczn:0768e70486e28d354c46b345c0cdb5f3@dec4d4f2-acae-428a-be32-ddb04da38212-bluemix.cloudantnosqldb.appdomain.cloud/onlinedictionary',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Basic YXBpa2V5LXYyLTFuOHEydDIzNjRidzE0OGZ0d3pjMGo2YTBuNjVsMDQ3dm1kYXNlamtnY3puOjA3NjhlNzA0ODZlMjhkMzU0YzQ2YjM0NWMwY2RiNWYz'
        //     },

        data = {
            word: word,
            type: "word_data",
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
                audio: []
            }],
            manualAccept: request.body.manualAccept,
        }
    }
    
    config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apikey-v2-1n8q2t2364bw148ftwzc0j6a0n65l047vmdasejkgczn:0768e70486e28d354c46b345c0cdb5f3@dec4d4f2-acae-428a-be32-ddb04da38212-bluemix.cloudantnosqldb.appdomain.cloud/onlinedictionary',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YXBpa2V5LXYyLTFuOHEydDIzNjRidzE0OGZ0d3pjMGo2YTBuNjVsMDQ3dm1kYXNlamtnY3puOjA3NjhlNzA0ODZlMjhkMzU0YzQ2YjM0NWMwY2RiNWYz'
        },
        data: data
    };

    console.log(JSON.stringify(config))
    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
})




module.exports = router;