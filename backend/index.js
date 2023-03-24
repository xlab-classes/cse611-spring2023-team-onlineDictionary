const express = require("express")
const request = require("request")
const cors = require('cors');
const mongoose = require('mongoose');

const app = express()
app.use(cors());

app.get('/:word', (req, response) => {
    let word = req.params.word

    var options = {
        'method': 'GET',
        'url': 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getData?word=' + req.params.word,
        'headers': {
            'apiKey': ''
        }
    };

    request(options, (error, res) => {

        if (error) throw new Error(error);

        if (res.statusCode != 200) {
            return response.send("word meaning not found")
        }

        body = JSON.parse(res.body)
        responseToReact = { "word": word, "meanings": [] }

        for (pos of body.usage) {
            meaning = {}
            meaning.pos = pos.pos
            meaning.definitions = []
            for (definition of pos.definitions.slice(0, 3)) {
                def={}
                def.meaning = definition.definition.gloss
                if (definition.examples[0] && definition.examples[0].text) {
                    def.usage = definition.examples[0].text
                }
                meaning.definitions.push(def)
            }
            audio = {}
            if(pos.audio[0] && pos.audio[0].audioLink){
                audio.audioLink = pos.audio[0].audioLink
                audio.source = "Wiktionary"
                meaning.audio = audio
            }
            
            responseToReact.meanings.push(meaning)
        }

        response.send(responseToReact)
    })
})

app.get("/api/:word", (req, response)=> {
    let word = req.params.word
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+word
    let htmlstring = "<html> <body> <h1>Word: "+word+"</h1>"
    request(url, {json:true}, (err, res, body)=> {
        if(err) return console.log(err)
        console.log("status code is "+res.statusCode)
        if (res.statusCode!=200){
            return response.send("word meaning not found")
        }
        // response.send(body)
        // let meanings = body[0].meanings
        for( let word of body){
            // console.log(meanings)
            for( p of word.phonetics){
                if(p.audio && p.audio!=""){
                    // if(p.hasOwnProperty('audio') && p.audio!=""){
                    htmlstring += '<audio controls> <source src="'+p.audio+'" type="audio/mp3"></audio>'
                    break
                }
                // else if(p.text && p.text!=""){
                //     htmlstring += "<p> IPA: "+p.text+"</p>"
                // }
            }

            for (let meaning of word.meanings) {
                // console.log(meaning)
                htmlstring = htmlstring.concat('<h3>Part of speech: '+ meaning.partOfSpeech+'</h3>')
                // console.log('Word: '+word+'. Part of speech: '+ meaning.partOfSpeech+'\n')
                
                htmlstring = htmlstring.concat('<p>Definitions:'+'</p><ul>')
                // console.log('Definitions:')

                for(let definition of meaning.definitions.slice(0,3)){
                    htmlstring = htmlstring.concat('<li>'+definition.definition+'</li>')
                    // console.log(definition.definition+'\n')
                }
                htmlstring += "</ul>"
            }
        }
        response.send(htmlstring+"<body><html>")
        
    })
    
})

const fetchWordLocalRouter = require('./routes/fetchWordLocal');
// const audioRouter = require('./routes/googleAudio');


app.use('/mongo', fetchWordLocalRouter);
// app.use('/audio', audioRouter);
app.listen(3001, ()=> {
    console.log("server run OK")
})