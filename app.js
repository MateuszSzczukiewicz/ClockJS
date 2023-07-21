const handMinutes = document.getElementById('hand-minutes');
const handHours = document.getElementById('hand-hours');

const digitalSeconds = document.getElementById('digital-seconds');
const digitalMinutes = document.getElementById('digital-minutes');
const digitalHours = document.getElementById('digital-hours');

const clockAnalog = document.getElementById('clock-analog');
const clockDigital = document.getElementById('clock-digital');

const clockSwitchButton = document.getElementById('clock-switch');

const clockSvgCircle = document.getElementById('clock-svgCircle');

const clockCenter = document.querySelector('.clock__center')
const clockNumbers = document.querySelectorAll('.clock__number')

const clockSection = document.getElementById('clock-section');
let isDragging = false;
let initialX, initialY;

const updateAnalogTime = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondsRotation = `calc(${942 - (942 * seconds) / 59}px)`;
    const minutesRotation = `translateX(-50%) rotate(${minutes * 6 + seconds / 10}deg)`;
    const hoursRotation = `translateX(-50%) rotate(${(hours % 12) * 30 + minutes / 2}deg)`;

    clockSvgCircle.style.strokeDashoffset = secondsRotation;
    handMinutes.style.transform = minutesRotation;
    handHours.style.transform = hoursRotation;
}

const updateDigitalTime = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    digitalSeconds.innerText = seconds < 10 ? `0${seconds}` : seconds;
    digitalMinutes.innerText = minutes < 10 ? `0${minutes}` : minutes;
    digitalHours.innerText = hours < 10 ? `0${hours}` : hours;
}

const clockSwitch = () => {
    clockAnalog.classList.toggle("clock__main--isDisabled");
    clockDigital.classList.toggle("clock__main--isDisabled");
}

const clockCenterChange = () => {
    const now = new Date();
    const seconds = now.getSeconds();

    clockCenter.style.backgroundImage = `linear-gradient(calc(${seconds} * 6deg),#ff8a00,#e52e71)`
}

const clockNumbersChange = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    let deg = 30;

    clockNumbers.forEach(clockNumber => {
        clockNumber.style.backgroundImage = `linear-gradient(${deg - seconds * 6}deg, #ff8a00, #e52e71)`;
        deg += 30;
    });
}

const moveClockSection = e => {
    if (isDragging) {
        const x = e.clientX - initialX;
        const y = e.clientY - initialY;

        clockSection.style.left = x + 'px';
        clockSection.style.top = y + 'px';
    }
};

const startDragging = e => {
    isDragging = true;

    initialX = e.clientX - clockSection.offsetLeft;
    initialY = e.clientY - clockSection.offsetTop;
}

const stopDragging = () => {
    isDragging = false;
}

setInterval(updateAnalogTime, 1000);
setInterval(updateDigitalTime, 1000);
setInterval(clockCenterChange, 1000);
setInterval(clockNumbersChange, 1000);
clockSwitchButton.addEventListener('click', clockSwitch);
clockSection.addEventListener('mousedown', startDragging)
clockSection.addEventListener('mouseup', stopDragging)
document.addEventListener('mousemove', moveClockSection)
