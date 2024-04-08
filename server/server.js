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

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query the database to check if the username and password match
        const result = await db.query('SELECT * FROM admin WHERE username = $1 AND password = $2', [username, password]);

        // Check if any rows were returned from the query
        if (result.rows.length === 1) {
            // User is authenticated, send success response
            res.status(200).json({ message: 'Login successful' });
        } else {
            // User is not authenticated, send error response
            res.json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        // Send an error response
        res.status(500).json({ error: 'An error occurred during login' });
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


app.get('/api/messages/:id', async (req, res) => {
    const messageId = req.params.id;

    try {
        // Query the database to retrieve the message with the specified ID
        const result = await db.query('SELECT * FROM messages WHERE id = $1', [messageId]);

        // Check if a message with the specified ID was found
        if (result.rows.length === 1) {
            // Send the message back to the client
            res.status(200).json(result.rows[0]);
        } else {
            // If no message found with the specified ID, send a 404 Not Found response
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ error: 'An error occurred while fetching message' });
    }
});







app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`)
})