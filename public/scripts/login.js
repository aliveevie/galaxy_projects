async function sendResponseToServer(username, password) {
    const formData = {
        username: username,
        password: password
    };


    try {
        const response = await fetch('/api/login', {
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
          
        if(responseData.message=="Invalid username or password"){
            document.getElementById('error').innerText = responseData.message
        }else{
            window.location = "./dashboard.html"
        }
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
