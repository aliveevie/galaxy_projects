const express = require('express');
const app = express();
const port = 4500;
const path = require('path');
const db = require('./index.ts');

app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
});



app.post('/', async (req, res) => {
    console.log(req.body);

    const result = await db.query(`SELECT * FROM messages;`)

    console.log(result.rows)
})


app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`)
})