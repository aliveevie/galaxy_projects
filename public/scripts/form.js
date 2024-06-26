function submitForm(event) {
        event.preventDefault(); // Prevents the default form submission behavior
        
        // Get form data
        const form = document.getElementById('messageForm');
        const formData = new FormData(form);

        document.getElementById('loader').style.display = 'block';
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
                document.getElementById('error').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('error').style.display = 'none';
                }, 5000)
                throw new Error('Network response was not ok');
            }else{
                document.getElementById('loader').style.display = 'none';
                document.getElementById('success').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('success').style.display = 'none';
                }, 5000)

            }

            // return response.json();
        })
        
        .catch(error => {
            document.getElementById('error').style.display = 'block';
            setTimeout(() => {
                document.getElementById('error').style.display = 'none';
            }, 5000)
            console.error('There was a problem with the form submission:', error);
            // Optionally, handle errors
        });
    }

