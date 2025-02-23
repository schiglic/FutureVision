document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Відправляю дані:', { name, email, message }); // Додаємо відлагодження

    fetch('http://127.0.0.1:5000/save-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Помилка при відправленні: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Відповідь сервера:', data);
        alert('Дякуємо! Ваше повідомлення збережено.');
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        console.error('Помилка:', error);
        alert('Сталася помилка при відправленні. Перевір консоль.');
    });
});