async function fetchAndRenderMessages() {
    try {
        const response = await fetch('/api/messages');
        const messages = await response.json();
        const tableBody = document.getElementById('messages-table-body');

        // Clear existing table rows
        tableBody.innerHTML = '';

        // Loop through messages and create table rows
        messages.forEach(message => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${message.id}</td>
                <td>${message.name}</td>
                <td>${message.lga}</td>
                <td>${message.address}</td>
                <td>${message.phone}</td>
                <td>${message.email}</td>
                <td>
                    <button onclick="viewMessage(${message.id})">View</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

// Call fetchAndRenderMessages when the page loads
window.onload = fetchAndRenderMessages;

// View message function (placeholder)
function viewMessage(id) {
    window.location.href = `./message?id=${id}`;
}

// Delete message function (placeholder)
function deleteMessage(id) {
    alert(`Delete message with ID ${id}`);
}