const express = require('express');
const app = express();

app.set('view-engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/pesquisa', (req, res) => {
    res.sendFile(__dirname + '/views/pesquisa.html')
})

app.listen(3000, '192.168.0.5')