document.addEventListener('DOMContentLoaded', () => {
    
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const mainEnvelope = document.getElementById('mainEnvelope');
    const mainSlider = document.getElementById('mainSlider');
    const progressBar = document.getElementById('progressBar');
    const progressLine = document.querySelector('.progress-line');
    const tapHint = document.getElementById('tapHint');
    const slides = document.querySelectorAll('.slide');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isEnvelopeOpened = false;

    // ЛОГІКА ВІДКРИТТЯ КОНВЕРТА БЕЗ БАГІВ
    mainEnvelope.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (!isEnvelopeOpened) {
            isEnvelopeOpened = true;
            
            // Запуск анімації відкриття клапана
            envelopeWrapper.classList.add('open');
            
            // Після вильоту листа (1.4 сек) ховаємо конверт і запускаємо слайдер
            setTimeout(() => {
                envelopeWrapper.classList.add('fade-out');
                mainSlider.classList.add('ready');
                progressBar.classList.add('visible');
                
                updateProgressBar();
                showTapHint();
            }, 1400);
        }
    });

    function showTapHint() {
        tapHint.classList.add('show');
        setTimeout(() => {
            tapHint.classList.remove('show');
        }, 3000);
    }

    // НАВІГАЦІЯ ТАПАМИ З ОДНАКОВОЮ АНІМАЦІЄЮ НА ВСІХ СЛАЙДАХ
    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        updateProgressBar();
    }

    function updateProgressBar() {
        const percentage = ((currentSlide + 1) / totalSlides) * 100;
        progressLine.style.width = `${percentage}%`;
    }

    // Поділ екрану навпіл для гортання
    document.addEventListener('click', (e) => {
        if (!isEnvelopeOpened) return;

        // Якщо клікнули по кнопці телефону або посиланню — не гортаємо слайд
        if (e.target.tagName === 'A' || e.target.closest('.phone-btn') || e.target.closest('.text-scrollable') && e.target.tagName === 'P') {
            return; 
        }

        const screenWidth = window.innerWidth;
        const clickX = e.clientX;

        if (clickX > screenWidth / 2) {
            showSlide(currentSlide + 1); // Клік праворуч — вперед
        } else {
            showSlide(currentSlide - 1); // Клік ліворуч — назад
        }
    });

    // Підтримка стрілочок клавіатури
    document.addEventListener('keydown', (e) => {
        if (!isEnvelopeOpened) return;
        if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
        if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
    });
});