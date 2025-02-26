// Обробка форми голосування
document.getElementById('voteForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const selectedOption = document.querySelector('input[name="vote"]:checked');
    if (!selectedOption) {
        alert('Будь ласка, виберіть варіант!');
        return;
    }

    const data = {
        vote: selectedOption.value
    };

    console.log('Відправляю дані голосування:', data); // Додаємо відлагодження

    fetch('/save-vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.error || 'Помилка при голосуванні');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Відповідь сервера:', data);
        showModal('successModal'); // Показуємо модальне вікно
        document.getElementById('voteForm').reset(); // Очищаємо форму
    })
    .catch(error => {
        console.error('Помилка:', error);
        alert('Сталася помилка: ' + error.message); // Показуємо текст помилки
    });
});

// Функції для модальних вікон
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

// Функція для 3D-обертання зображення залежно від позиції миші
document.addEventListener('DOMContentLoaded', function() {
    const hero3d = document.querySelector('.hero-3d');
    const maxRotation = 20; // Максимальний кут обертання в градусах

    hero3d.addEventListener('mousemove', function(e) {
        const rect = hero3d.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Розрахунок кутів обертання на основі позиції миші
        const rotateY = ((mouseX - centerX) / centerX) * maxRotation;
        const rotateX = -((mouseY - centerY) / centerY) * maxRotation;

        hero3d.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });

    hero3d.addEventListener('mouseleave', function() {
        hero3d.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
});

// Анімація появи секцій при прокручуванні
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.article-section, .vote-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
});