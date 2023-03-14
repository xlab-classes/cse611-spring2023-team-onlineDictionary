 const FormatPos = (word) =>{
    var posDictionary = {};
    var defList = [];

    word['usage'].forEach(element => {
        element['pos'] in posDictionary ? posDictionary[element['pos']]=posDictionary[element['pos']] : posDictionary[element['pos']] = []
        element['definitions'].slice(0,3).forEach(item => {
            posDictionary[element['pos']].push(item['definition']['gloss']);
            item['examples'].slice(0,1).forEach(example =>{ defList.push(example['text']);})
        });
    });
    return [posDictionary,defList];

};

export default FormatPos