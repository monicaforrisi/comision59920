
document.getElementById("menu-toggle").addEventListener("click", function() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
});

// Configuración para cada contador
const counters = [
    { id: 'counter1', startValue: 0, endValue: 15000, duration: 2500 },
    { id: 'counter2', startValue: 0, endValue: 100, duration: 2500 },
    { id: 'counter3', startValue: 0, endValue: 5000, duration: 2500 },
];

let countersStarted = false; // Bandera para saber si los contadores ya han empezado

function startCountUp({ id, startValue, endValue, duration }) {
    const counterElement = document.getElementById(id);

    const incrementTime = 50; // Milisegundos
    const totalSteps = duration / incrementTime;
    const incrementValue = (endValue - startValue) / totalSteps;

    let currentValue = startValue;
    counterElement.textContent = currentValue.toFixed(0);

    const updateCounter = () => {
        currentValue += incrementValue;
        counterElement.textContent = Math.min(currentValue, endValue).toFixed(0);

        if (currentValue < endValue) {
            setTimeout(updateCounter, incrementTime);
        }
    };

    updateCounter();
}

function checkIfInView() {
    const counterSection = document.querySelector('.counter-section');
    const rect = counterSection.getBoundingClientRect();
    
    // Comprobar si la sección de contadores está visible en la ventana
    if (rect.top >= 0 && rect.bottom <= window.innerHeight && !countersStarted) {
        countersStarted = true; // Evitar que se reinicie la animación
        counters.forEach(counter => startCountUp(counter));
    }
}

// Escuchar el evento de scroll
window.addEventListener('scroll', checkIfInView);



// carousel
let currentSlides = {
    carousel1: 0,
    carousel2: 0
};

const totalSlides = {
    carousel1: 5, // Número de elementos en el carrusel 1
    carousel2: 5  // Número de elementos en el carrusel 2
};

function updateCarousel(carouselId) {
    const carousel = document.querySelector(`#${carouselId} .carousel`);
    const carouselWidth = document.querySelector(`#${carouselId}`).clientWidth;
    const visibleItems = window.innerWidth <= 768 ? (carouselId === 'carousel1' ? 2 : 1) : (carouselId === 'carousel1' ? 4 : 3);
    const itemWidth = carouselWidth / visibleItems;
    carousel.style.transform = `translateX(${-currentSlides[carouselId] * itemWidth}px)`;
}

function nextSlide(carouselId) {
    currentSlides[carouselId] = (currentSlides[carouselId] + 1) % totalSlides[carouselId];
    updateCarousel(carouselId);
}

function prevSlide(carouselId) {
    currentSlides[carouselId] = (currentSlides[carouselId] - 1 + totalSlides[carouselId]) % totalSlides[carouselId];
    updateCarousel(carouselId);
}

// Actualizar cada carrusel al redimensionar la ventana
window.addEventListener('resize', () => {
    updateCarousel('carousel1');
    updateCarousel('carousel2');
});

// Inicializar carruseles
updateCarousel('carousel1');
updateCarousel('carousel2');
