const urlParams = new URLSearchParams(window.location.search);
        const messageId = urlParams.get('id');

        // Function to fetch message details and display them
        async function fetchAndDisplayMessage() {
            try {
                const response = await fetch(`/api/messages/${messageId}`);
                const message = await response.json();

             
                // Update HTML elements with message details
                document.getElementById('message').textContent = message.message;
                document.getElementById('email').textContent = message.email;
                document.getElementById('date').textContent = formatDate(message.created_at);
            } catch (error) {
                console.error('Error fetching message details:', error);
            }
        }

        // Call fetchAndDisplayMessage when the page loads
        window.onload = fetchAndDisplayMessage;

        // Function to print message
        function printMessage() {
            window.print();
        }

        // Function to reply to message (placeholder)
        function replyMessage() {
            alert('Reply functionality is not implemented yet.');
        }

        function formatDate(dateStr) {
            const date = new Date(dateStr);
        
            const options = { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            };
        
            const day = date.getDate();
            const suffix = day > 3 && day < 21 ? 'th' : ['th', 'st', 'nd', 'rd', 'th'][Math.min(day % 10, 4)];
            const formattedDay = day + suffix;
        
            const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
            return formattedDate.replace(String(day), formattedDay);
        }
        
        