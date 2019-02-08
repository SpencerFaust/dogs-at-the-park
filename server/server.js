const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const dogNames = require('./modules/dogs');
const fetchTable = require('./modules/fetchTable');

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended:true}));

app.get('/fetchTableRequest', (req, res) => {
    res.send(fetchTable);
})

app.get('/getNames', (req, res) => {
    res.send(dogNames);
})

app.post('/newDog', (req, res) => {
    dogNames.push(req.body);
    res.sendStatus(201);
});

app.post('/newGameOfFetch', (req, res) => {

    if (req.body.scoreOne > req.body.scoreTwo) {
        {req.body.winner = req.body.firstDog}
    } else if (req.body.scoreOne < req.body.scoreTwo) {
        {req.body.winner = req.body.secondDog}
    } else {
        {req.body.winner = 'Tie Game!'}
    }
    fetchTable.push(req.body);
    res.sendStatus(201);
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});