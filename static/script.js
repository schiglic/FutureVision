// Обробка форми контактів
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Будь ласка, заповніть усі поля!');
            return;
        }

        const data = {
            name: name,
            email: email,
            message: message
        };

        console.log('Відправляю дані контактів:', data);

        fetch('/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.error || 'Помилка при відправці');
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
}

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

// Функція для 3D-обертання зображення
document.addEventListener('DOMContentLoaded', function() {
    const hero3d = document.querySelector('.hero-3d');
    if (hero3d) {
        const maxRotation = 20;

        hero3d.addEventListener('mousemove', function(e) {
            const rect = hero3d.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((mouseX - centerX) / centerX) * maxRotation;
            const rotateX = -((mouseY - centerY) / centerY) * maxRotation;

            hero3d.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });

        hero3d.addEventListener('mouseleave', function() {
            hero3d.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
    }
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