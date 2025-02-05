let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// Показ первого слайда
showSlide(currentSlide);

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

function toggleAnswer(id) {
    const answer = document.getElementById(id);
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}

function sendResponse(isAttending) {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    if (!firstName || !lastName) {
        alert('Пожалуйста, введите ваше имя и фамилию.');
        return;
    }

    // Отправка данных на сервер
    fetch('/send-response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName,
            lastName,
            isAttending,
        }),
    })
    .then(response => response.text())
    .then(data => {
        if (isAttending) {
            currentSlide = 5; // Переход на слайд с благодарностью
        } else {
            currentSlide = 6; // Переход на слайд для тех, кто не сможет прийти
        }
        showSlide(currentSlide);
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке ответа.');
    });
}