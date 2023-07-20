const handSeconds = document.getElementById('hand-seconds');
const handMinutes = document.getElementById('hand-minutes');
const handHours = document.getElementById('hand-hours');

const digitalSeconds = document.getElementById('digital-seconds');
const digitalMinutes = document.getElementById('digital-minutes');
const digitalHours = document.getElementById('digital-hours');

const clockAnalog = document.getElementById('clock-analog');
const clockDigital = document.getElementById('clock-digital');

const clockSwitchButton = document.getElementById('clock-switch');

const updateClockHands = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const minutesRotation = `rotate(${minutes * 6 + seconds / 10}deg)`;
    const hoursRotation = `rotate(${(hours % 12) * 30 + minutes / 2}deg)`;

    handSeconds.style.transform = `rotate(${seconds * 6}deg)`;
    handMinutes.style.transform = minutesRotation;
    handHours.style.transform = hoursRotation;
}

const updateDigitalTime = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    digitalSeconds.innerText = `${seconds}`;
    digitalMinutes.innerText = `${minutes}`;
    digitalHours.innerText = `${hours}`;
}

const clockSwitch = () => {
    clockAnalog.classList.toggle("clock__main--isDisabled");
    clockDigital.classList.toggle("clock__main--isDisabled");
}

setInterval(updateClockHands, 1000);
setInterval(updateDigitalTime, 1000);
clockSwitchButton.addEventListener('click', clockSwitch);
