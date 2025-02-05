let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

// Показ первого слайда
showSlide(currentSlide);

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
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
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке ответа.');
    });
}

// Комментарий для добавления вопросов и ответов
/*
Чтобы добавить вопросы и ответы, вставьте их в блок с id="faq" в формате:
<div class="question">
    <h3>Вопрос</h3>
    <p>Ответ</p>
</div>
*/