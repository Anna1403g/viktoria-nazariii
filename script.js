document.addEventListener('DOMContentLoaded', () => {
    
    // Елементи інтерфейсу та обгортки конверта
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const mainEnvelope = document.getElementById('mainEnvelope');
    const mainSlider = document.getElementById('mainSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const progressLine = document.querySelector('.progress-line');
    const slides = document.querySelectorAll('.slide');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isEnvelopeOpened = false;

    // ==========================================
    // ЛОГІКА ІНТЕРАКТИВНОГО ВІДКРИТТЯ КОНВЕРТА
    // ==========================================
    mainEnvelope.addEventListener('click', (e) => {
        e.stopPropagation(); // Запобігаємо миттєвому перемиканню першого слайду
        
        if (!isEnvelopeOpened) {
            isEnvelopeOpened = true;
            
            // Крок 1: Додаємо клас для запуску анімації відкривання клапана та вильоту листа
            envelopeWrapper.classList.add('open');
            
            // Крок 2: Чекаємо завершення вильоту картки (1.5 сек) і плавно ховаємо весь екран конверта
            setTimeout(() => {
                envelopeWrapper.classList.add('fade-out');
                mainSlider.classList.add('ready');
                
                // Крок 3: Робимо видимими стрілки та прогрес-бар головного сайту
                prevBtn.classList.add('visible');
                nextBtn.classList.add('visible');
                progressBar.classList.add('visible');
                
                updateProgressBar();
            }, 1800);
        }
    });

    // ==========================================
    // ЛОГІКА РОБОТИ ТА ПЕРЕМИКАННЯ СЛАЙДІВ
    // ==========================================
    function showSlide(index) {
        // Забираємо активний стан у поточного слайда
        slides[currentSlide].classList.remove('active');
        
        // Розраховуємо новий індекс (зациклене гортання)
        currentSlide = (index + totalSlides) % totalSlides;
        
        // Активуємо новий слайд
        slides[currentSlide].classList.add('active');
        
        // Оновлюємо золоту смугу прогресу
        updateProgressBar();
    }

    // Оновлення ширини верхньої лінії прогресу
    function updateProgressBar() {
        const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;
        progressLine.style.width = `${progressPercentage}%`;
    }

    // Перемикання кнопками-стрілками
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(currentSlide + 1);
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(currentSlide - 1);
    });

    // Перемикання кліками на ліву та праву частину екрана
    document.addEventListener('click', (e) => {
        // Якщо конверт ще не відкрито — ігноруємо кліки по екрану
        if (!isEnvelopeOpened) return;

        const halfWidth = window.innerWidth / 2;
        if (e.clientX > halfWidth) {
            showSlide(currentSlide + 1); // Клік праворуч — наступний
        } else {
            showSlide(currentSlide - 1); // Клік ліворуч — попередній
        }
    });

    // Перемикання стрілками на клавіатурі
    document.addEventListener('keydown', (e) => {
        if (!isEnvelopeOpened) return;
        
        if (e.key === 'ArrowRight') {
            showSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft') {
            showSlide(currentSlide - 1);
        }
    });
});