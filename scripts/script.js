 

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
  
 