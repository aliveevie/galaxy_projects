function submitForm(event) {
        event.preventDefault(); // Prevents the default form submission behavior
        
        // Get form data
        const form = document.getElementById('messageForm');
        const formData = new FormData(form);

        // Convert form data to JSON
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // Send form data to the server
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Form submitted successfully:', data);
            // Optionally, do something after successful submission
        })
        .catch(error => {
            console.error('There was a problem with the form submission:', error);
            // Optionally, handle errors
        });
    }

