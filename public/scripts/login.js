async function sendResponseToServer(username, password) {
    const formData = {
        username: username,
        password: password
    };

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to send response to server');
        }

        const responseData = await response.json();
        console.log('Response from server:', responseData);
        // Do something with the response data if needed
    } catch (error) {
        console.error('Error sending response to server:', error);
        // Handle errors here
    }
}

function submitForm(event) {
    event.preventDefault(); // Prevent default form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    sendResponseToServer(username, password);
}
