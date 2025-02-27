document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    console.log('Відправляю дані:', data); 

    fetch('/save-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.error || 'Помилка при відправленні');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Відповідь сервера:', data);
        showModal('successModal'); 
        document.getElementById('contactForm').reset(); 
    })
    .catch(error => {
        console.error('Помилка:', error);
        alert('Сталася помилка: ' + error.message); 
    });
});


function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].style.display = 'none';
        }
    }
};