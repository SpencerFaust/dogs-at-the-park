const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const dogNames = require('./modules/dogs.js')

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended:true}));

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});

app.get('/getNames', (req, res) => {
    res.send(dogNames);
})

