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
    const { name, email, lga, address, phone, message } = req.body;

    try {
        // Execute the INSERT query to insert the form data into the messages table
        const result = await db.query(
            `INSERT INTO messages (name, email, lga, address, phone, message)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [name, email, lga, address, phone, message]
        );

        console.log('Form data inserted successfully:');
        res.status(200).json({ message: 'Form data inserted successfully', data: result.rows[0] });
    } catch (error) {
        console.error('Error inserting form data:', error);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});



app.get('/api/messages', async (req, res) => {
    try {
        // Query the database to retrieve all messages
        const result = await db.query(`SELECT * FROM messages`);

        // Send the messages back to the client
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'An error occurred while fetching messages' });
    }
});


app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`)
})