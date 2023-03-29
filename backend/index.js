const express = require('express')
const cors = require('cors');
const axios = require('axios')
const app = express()
app.use(cors());
const util = require('util')
const fs = require('fs')

const textToSpeech = require('@google-cloud/text-to-speech')
require('dotenv').config()
const client = new textToSpeech.TextToSpeechClient()

function createGoogleAudio(responseToReact,word){
    console.log("google audio found : ",responseToReact.hasOwnProperty('GoogleAudio'))
    console.log("the original response is : " ,responseToReact)
        var outerResponse = responseToReact
        if(outerResponse.hasOwnProperty('GoogleAudio')){
            
        }
        else{
            var text = word
            var languageCode = 'hi-in';
            var ssmlVoice = 'FEMALE'; 
            async function convertTextToMp3(word,languageCode,ssmlVoice){
                const text = word 
                const request = {
                    input : {text : text},
                    voice : {languageCode : languageCode, ssmlGender : ssmlVoice},
                    audioConfig : {audioEncoding : 'MP3'}
                }
                const[response] = await client.synthesizeSpeech(request)
                const writeFile = util.promisify(fs.writeFile)
                await writeFile('google_Audios/'+ text +".mp3",response.audioContent,'binary')
                console.log("Text to speech is done.")
                var path = require('path')
                outerResponse['GoogleAudio'] = path.resolve('google_Audios/'+text+'.mp3')
                //make a post request of the response to the

            }
            convertTextToMp3(text,languageCode,ssmlVoice)
        }
}

function handleDictionaryData(word, response, body) {
    // const word = request.params.word;
    const responseToReact = { "word": word, "meanings": [] };

    for (const pos of body.usage) {
        const meaning = {};
        // part of speech added to response
        meaning.pos = pos.pos;
        meaning.definitions = [];

        // meanings added to response
        for (const definition of pos.definitions.slice(0, 5)) {
            const def = {};
            def.meaning = definition.definition.gloss;
            def.source = "Wiktionary";
            if (definition.examples[0] && definition.examples[0].text) {
                def.usage = definition.examples[0].text;
            }
            meaning.definitions.push(def);
        }

        // audio data added to response
        let audio = {};
        if (pos.audio[0] && pos.audio[0].audioLink) {
            audio.audioLink = pos.audio[0].audioLink;
            audio.source = "Wiktionary";
            meaning.audio = audio;
        }

        responseToReact.meanings.push(meaning);
    }
    // TODO: functionize solr req and response to remove redundancy
    let config = {
        method: 'get',
        url: 'http://35.223.110.79:8983/solr/mycol1/query?q=text:' + word
    }
    axios(config)
        .then(solrResponse => {
            if (solrResponse.data.response.numFound > 0) {
                // To return first few examples fetched from solr:
                // responseToReact.generalExamples = solrResponse.data.response.docs.slice(0, 5).map(({ text }) => text[0])

                // Find few random docs fetched from solr
                const documentSet = new Set(solrResponse.data.response.docs);
                const docs = [...documentSet]
                // const docs = solrResponse.data.response.docs;
                const numDocs = docs.length;
                const numRandomDocs = Math.min(numDocs, 5);
                const randomIndices = new Set();

                while (randomIndices.size < numRandomDocs) {
                    randomIndices.add(Math.floor(Math.random() * numDocs));
                    // console.log('in while')
                }
                const randomDocs = [...randomIndices].map(index => docs[index].text[0]);
                responseToReact.generalExamples = randomDocs;
            }
        })
        .finally(() => {
            createGoogleAudio(responseToReact,word)
            response.send(responseToReact)
        })
}

function handleDictionaryAPI(word, response) {
    const config = {
        method: 'get',
        url: 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word
    };

    axios(config)
        .then(APIResponse => {
            if (APIResponse.status != 200 || APIResponse.data.length == 0) {
                console.log('Erroneous status code' + APIResponse.status)
                console.log('Entire API response:')
                console.log(APIResponse)
                return handleDictionaryError("Word meaning not found", response)
            }

            // TODO : sort meanings with most number of definitions to determine importance?
            const responseToReact = { "word": word, "meanings": [] };
            for (let word of APIResponse.data) {
                for (let meaning of word.meanings) {
                    let resMeaning = {}
                    resMeaning.pos = meaning.partOfSpeech
                    resMeaning.definitions = []

                    for (let definition of meaning.definitions.slice(0, 5)) {
                        let resDefinition = {}
                        resDefinition.meaning = definition.definition
                        resDefinition.usage = definition.example
                        resDefinition.source = "apidictionary.dev"
                        resDefinition.license = word.license
                        resMeaning.definitions.push(resDefinition)
                    }

                    if (word.phonetics.length != 0) {
                        phoneticData = word.phonetics.find(p => p.audio && p.audio.length > 0);
                        if (phoneticData) {
                            resMeaning.audio = {}
                            resMeaning.audio.audioLink = phoneticData.audio
                            resMeaning.audio.source = phoneticData.sourceUrl || ""
                        }
                    }

                    responseToReact.meanings.push(resMeaning)
                }
            }

            let config = {
                method: 'get',
                url: 'http://35.223.110.79:8983/solr/mycol1/query?q=text:' + word
            }

            axios(config)
                .then(solrResponse => {
                    if (solrResponse.data.response.numFound > 0) {
                        // To return first few examples fetched from solr:
                        // responseToReact.generalExamples = solrResponse.data.response.docs.slice(0, 5).map(({ text }) => text[0])

                        // Find few random docs fetched from solr
                        const documentSet = new Set(solrResponse.data.response.docs);
                        const docs = [...documentSet]
                        // const docs = solrResponse.data.response.docs;
                        const numDocs = docs.length;
                        const numRandomDocs = Math.min(numDocs, 5);
                        const randomIndices = new Set();

                        while (randomIndices.size < numRandomDocs) {
                            randomIndices.add(Math.floor(Math.random() * numDocs));
                            // console.log('in while')
                        }
                        const randomDocs = [...randomIndices].map(index => docs[index].text[0]);
                        responseToReact.generalExamples = randomDocs;
                    }
                })
                .finally(() => {
                    createGoogleAudio(responseToReact,word)
                    response.send(responseToReact)
                })
        })
        .catch(error => {
            handleDictionaryError(error, response);
        });
}

function handleDictionaryError(error, response) {
    console.error(error);
    response.status(500).send('Word meaning not found');
}

app.get('/:word', (request, response) => {
    const word = request.params.word.split(' ')[0];

    const config = {
        method: 'get',
        url: 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getData',
        headers: {
            'apiKey': 'uIb0LAUBMoAaPQT0vrvtZd7CCgGWw7W821WzrycbiwVrv3UuK3p6vY1pssCh3jb6'
        },
        params: {
            word: word
        }
    };

    axios(config)
        .then(mongoResponse => {
            if (mongoResponse.status !== 200 || mongoResponse.data == null || mongoResponse.data == "null") {
                console.log('not found in database. fallback to API')
                handleDictionaryAPI(word, response)
            }
            else {
                console.log('found in mongoDB')
                handleDictionaryData(word, response, mongoResponse.data);
            }
        })
        .catch(error => {
            handleDictionaryAPI(word, response)
        });
});

app.get("/api/:word", (req, response) => {
    let word = req.params.word
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
    let htmlstring = "<html> <body> <h1>Word: " + word + "</h1>"
    request(url, { json: true }, (err, res, body) => {
        if (err) return console.log(err)

        if (res.statusCode != 200) {
            return response.send("word meaning not found")
        }

        for (let word of body) {
            for (p of word.phonetics) {
                if (p.audio && p.audio != "") {
                    htmlstring += '<audio controls> <source src="' + p.audio + '" type="audio/mp3"></audio>'
                    break
                }
            }

            for (let meaning of word.meanings) {
                htmlstring = htmlstring.concat('<h3>Part of speech: ' + meaning.partOfSpeech + '</h3>')
                htmlstring = htmlstring.concat('<p>Definitions:' + '</p><ul>')
                for (let definition of meaning.definitions.slice(0, 3)) {
                    htmlstring = htmlstring.concat('<li>' + definition.definition + '</li>')
                }
                htmlstring += "</ul>"
            }
        }
        response.send(htmlstring + "<body><html>")
    })
})

const fetchWordLocalRouter = require('./routes/fetchWordLocal');
// const audioRouter = require('./routes/googleAudio');

app.use('/mongo', fetchWordLocalRouter);
// app.use('/audio', audioRouter);
app.listen(3001, () => {
    console.log("Node server running on port 3001")
})