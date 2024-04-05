const express = require('express');
const app = express();
const port = 4500;
const path = require('path');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
});



app.post('/', (req, res) => {
    console.log(req.body)
})


app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`)
})