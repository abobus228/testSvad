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

function showPopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
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
        alert('Спасибо за ваш ответ!');
        currentSlide = slides.length - 1; // Переход на слайд с благодарностью
        showSlide(currentSlide);
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке ответа.');
    });
}