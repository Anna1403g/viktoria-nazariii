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

    // ==========================================
    // ЛОГІКА ВІДКРИТТЯ КОНВЕРТА Мобільна версія
    // ==========================================
    mainEnvelope.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (!isEnvelopeOpened) {
            isEnvelopeOpened = true;
            
            // Відкриваємо кришку конверта
            envelopeWrapper.classList.add('open');
            
            // Затримка на виліт листа та зникнення конверта
            setTimeout(() => {
                envelopeWrapper.classList.add('fade-out');
                mainSlider.classList.add('ready');
                progressBar.classList.add('visible');
                
                updateProgressBar();
                showTapHint();
            }, 1500);
        }
    });

    // Показ тимчасової підказки для гостя
    function showTapHint() {
        tapHint.classList.add('show');
        setTimeout(() => {
            tapHint.classList.remove('show');
        }, 3500);
    }

    // ==========================================
    // НАВІГАЦІЯ ТАПАМИ ПО ЕКРАНУ СМАРТФОНУ
    // ==========================================
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

    // Клік по екрану ділить телефон навпіл: праворуч — вперед, ліворуч — назад
    document.addEventListener('click', (e) => {
        if (!isEnvelopeOpened) return;

        // Перевіряємо, чи користувач не натиснув на посилання або кнопку телефону
        if (e.target.tagName === 'A' || e.target.closest('.text-scrollable') && e.target.tagName === 'P') {
            return; 
        }

        const screenWidth = window.innerWidth;
        const clickX = e.clientX;

        if (clickX > screenWidth / 2) {
            showSlide(currentSlide + 1); // Клік по правій стороні
        } else {
            showSlide(currentSlide - 1); // Клік по лівій стороні
        }
    });

    // Додатково залишаємо стрілочки клавіатури, якщо хтось відкриє на ноутбуці
    document.addEventListener('keydown', (e) => {
        if (!isEnvelopeOpened) return;
        if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
        if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
    });
});