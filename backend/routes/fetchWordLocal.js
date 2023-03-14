const router = require('express').Router();
var request = require('request');


router.route('/:word').get((req, res) => {
    var options = {
        'method': 'GET',
        'url': 'https://us-east-1.aws.data.mongodb-api.com/app/dictionary-eokle/endpoint/getData?word='+req.params.word,
        'headers': {
          'apiKey': ''
        }
    };
    request(options, function (error, response) {

        if (error) throw new Error(error);
        console.log(response.body)
        body = JSON.parse(response.body)
        let htmlstring = "<html> <body> <h1>Word: "+req.params.word+"</h1>"

        for (pos of body.usage){
            htmlstring = htmlstring.concat('<h3>Part of speech: '+ pos.pos+'</h3>')
            // console.log(pos.pos)
            htmlstring = htmlstring.concat('<p>Definitions:'+'</p><ul>')

            for(definition of pos.definitions.slice(0,3)){
                htmlstring = htmlstring.concat('<li>'+definition.definition.gloss+'</li>')
                if (definition.examples[0] && definition.examples[0].text){
                    console.log("exampleusage :"+definition.examples[0].text)
                    htmlstring = htmlstring.concat('<strong> example usage: </strong>'+definition.examples[0].text)
                }
                
            }
            htmlstring+='</ul>'
            
        }

        //res.send(htmlstring+"<body><html>")
        res.send(response)
    });
});


module.exports = router;
